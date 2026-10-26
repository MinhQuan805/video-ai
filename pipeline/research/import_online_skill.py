#!/usr/bin/env python3
"""Stage an external skill for review, or create a shared skill from reviewed notes.

External content is untrusted and is never activated by default. Use --apply only after
reviewing the staged file and validating it with skill-creator/quick_validate.py.
"""

import argparse
import re
import sys
import urllib.parse
import urllib.request
from pathlib import Path

sys.stdout.reconfigure(encoding="utf-8")
sys.stderr.reconfigure(encoding="utf-8")

ALLOWED_IMPORT_HOSTS = {"github.com", "raw.githubusercontent.com"}
MAX_SKILL_BYTES = 512_000
HEADERS = {"User-Agent": "VideoAI-Skill-Stager/2.0"}


def sanitize_skill_name(name: str) -> str:
    clean = re.sub(r"[^a-z0-9-]", "-", name.lower()).strip("-")
    clean = re.sub(r"-+", "-", clean)
    if not clean or len(clean) > 63:
        raise ValueError("Tên skill phải là kebab-case ASCII, dài 1-63 ký tự.")
    return clean


def validate_import_url(url: str) -> str:
    parsed = urllib.parse.urlparse(url)
    if parsed.scheme != "https" or parsed.username or parsed.password:
        raise ValueError("Chỉ cho phép URL HTTPS công khai, không chứa credential.")
    host = (parsed.hostname or "").lower()
    if host not in ALLOWED_IMPORT_HOSTS:
        raise ValueError(f"Host không nằm trong allowlist nhập skill: {host or '(trống)'}")
    if host == "github.com" and "/blob/" in parsed.path:
        url = url.replace("github.com", "raw.githubusercontent.com", 1).replace("/blob/", "/", 1)
    return url


def strip_external_frontmatter(content: str) -> str:
    """Discard third-party metadata so local name/description stay authoritative."""
    text = content.replace("\x00", "").strip()
    if text.startswith("---"):
        match = re.match(r"^---\s*\n.*?\n---\s*\n?", text, flags=re.DOTALL)
        if match:
            text = text[match.end():].lstrip()
    if not text:
        raise ValueError("Skill nguồn không có nội dung hữu ích.")
    return text


def format_skill(content: str, name: str, description: str, source: str | None = None) -> str:
    safe_desc = " ".join(description.replace("\x00", "").split()).replace('"', "'")
    if not safe_desc:
        raise ValueError("Description không được để trống.")
    body = strip_external_frontmatter(content)
    provenance = f"<!-- Staged from untrusted source: {source} -->\n\n" if source else ""
    return f"---\nname: {name}\ndescription: >-\n  {safe_desc}\n---\n\n{provenance}{body}\n"


def read_url(url: str) -> str:
    safe_url = validate_import_url(url)
    print(f"Đang tải skill vào vùng staging từ: {safe_url}")
    request = urllib.request.Request(safe_url, headers=HEADERS)
    with urllib.request.urlopen(request, timeout=20) as response:
        payload = response.read(MAX_SKILL_BYTES + 1)
    if len(payload) > MAX_SKILL_BYTES:
        raise ValueError(f"Skill vượt giới hạn {MAX_SKILL_BYTES // 1024} KB.")
    return payload.decode("utf-8"), safe_url


def write_skill(name: str, description: str, content: str, apply: bool,
                overwrite: bool, source: str | None = None) -> Path:
    root = Path(".agents/skills" if apply else ".agents/skill-staging").resolve()
    target_dir = (root / name).resolve()
    if root not in target_dir.parents:
        raise ValueError("Đường dẫn skill vượt khỏi thư mục cho phép.")
    target_file = target_dir / "SKILL.md"
    if target_file.exists() and not overwrite:
        raise FileExistsError(f"Đã tồn tại: {target_file}. Dùng --overwrite sau khi kiểm tra diff.")
    target_dir.mkdir(parents=True, exist_ok=True)
    target_file.write_text(format_skill(content, name, description, source), encoding="utf-8")
    state = "active shared skills" if apply else "staging (chưa được kích hoạt)"
    print(f"Đã lưu vào {state}: {target_file}")
    return target_file


def derive_name(url: str) -> str:
    parts = urllib.parse.urlparse(url).path.rstrip("/").split("/")
    candidate = parts[-1].removesuffix(".md").lower()
    if candidate in {"skill", "readme"} and len(parts) > 1:
        candidate = parts[-2].lower()
    return sanitize_skill_name(candidate)


def main() -> None:
    parser = argparse.ArgumentParser(description="Safely stage or create a shared Codex skill")
    subparsers = parser.add_subparsers(dest="command", required=True)

    url_parser = subparsers.add_parser("url", help="Stage a markdown skill from GitHub")
    url_parser.add_argument("--url", required=True)
    url_parser.add_argument("--name")
    url_parser.add_argument("--desc")

    create_parser = subparsers.add_parser("create", help="Create from reviewed local markdown")
    create_parser.add_argument("--name", required=True)
    create_parser.add_argument("--desc", required=True)
    create_parser.add_argument("--file", required=True)

    for command_parser in (url_parser, create_parser):
        command_parser.add_argument("--apply", action="store_true",
                                    help="Write into .agents/skills after review; default is staging")
        command_parser.add_argument("--overwrite", action="store_true",
                                    help="Allow replacement after reviewing the existing file")

    args = parser.parse_args()
    if args.command == "url":
        content, safe_url = read_url(args.url)
        name = sanitize_skill_name(args.name) if args.name else derive_name(safe_url)
        description = args.desc or f"Reviewed guidance staged from {safe_url}"
        write_skill(name, description, content, args.apply, args.overwrite, safe_url)
        return

    source_file = Path(args.file).resolve()
    if not source_file.is_file():
        raise FileNotFoundError(f"Không tìm thấy file: {source_file}")
    if source_file.stat().st_size > MAX_SKILL_BYTES:
        raise ValueError(f"File vượt giới hạn {MAX_SKILL_BYTES // 1024} KB.")
    content = source_file.read_text(encoding="utf-8")
    write_skill(sanitize_skill_name(args.name), args.desc, content,
                args.apply, args.overwrite, str(source_file))


if __name__ == "__main__":
    main()

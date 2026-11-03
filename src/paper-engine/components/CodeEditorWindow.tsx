import React from "react";
import { useCurrentFrame, useVideoConfig } from "remotion";
import { COLORS, FONTS, SHADOWS, SPRING_PRESETS } from "../tokens";
import { getSmoothEntrance } from "../physics";

export interface CodeFile {
  name: string;
  badge?: number;
  isActive?: boolean;
}

export interface CodeEditorWindowProps {
  width?: number;
  height?: number;
  title?: string;
  stickerBadge?: string;
  files?: CodeFile[];
  codeSnippet?: { line: number; text: string }[];
  delay?: number;
  style?: React.CSSProperties;
}

/**
 * CodeEditorWindow: Cửa sổ soạn thảo mã nguồn phong cách HyperFrames (như trong video mẫu 2).
 * - Cây thư mục file bên trái kèm số lượng badge cam nhạt và file đang chọn.
 * - Khu vực code bên phải hiển thị số dòng và cú pháp monospaced sạch sẽ.
 * - Nhãn dán cam "MY REEL" nảy đè lên góc cửa sổ.
 */
export const CodeEditorWindow: React.FC<CodeEditorWindowProps> = ({
  width = 540,
  height = 300,
  title = "HyperFrames Studio • my reel",
  stickerBadge = "MY REEL",
  files = [
    { name: "code-typing...", badge: 1 },
    { name: "f1.html", badge: 1, isActive: true },
    { name: "f2.html" },
    { name: "f3.html", badge: 3 },
    { name: "f4.html", badge: 1 },
  ],
  codeSnippet = [
    { line: 14, text: "3.78 whoosh sound" },
    { line: 15, text: "" },
    { line: 16, text: "Facts (real)" },
    { line: 17, text: "+ Freesound track" },
  ],
  delay = 4,
  style,
}) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const entrance = getSmoothEntrance({
    frame,
    fps,
    delay,
    config: SPRING_PRESETS.snappy,
    distanceY: 30,
    startScale: 0.94,
  });

  const stickerEntrance = getSmoothEntrance({
    frame,
    fps,
    delay: delay + 6,
    config: SPRING_PRESETS.pop,
    distanceY: -16,
    startScale: 0.7,
  });

  return (
    <div
      style={{
        position: "relative",
        width,
        height,
        backgroundColor: COLORS.cardBg,
        borderRadius: 20,
        boxShadow: SHADOWS.card,
        border: `1px solid ${COLORS.cardBorder}`,
        display: "flex",
        flexDirection: "column",
        overflow: "hidden",
        transform: `translateY(${entrance.translateY}px) scale(${entrance.scale})`,
        opacity: entrance.opacity,
        filter: entrance.filter,
        ...style,
      }}
    >
      {/* Titlebar macOS */}
      <div
        style={{
          height: 38,
          backgroundColor: "#FAF9F6",
          borderBottom: `1px solid ${COLORS.divider}`,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 16px",
        }}
      >
        {/* Traffic lights */}
        <div style={{ display: "flex", gap: 6 }}>
          <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.15)" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.15)" }} />
          <div style={{ width: 9, height: 9, borderRadius: "50%", backgroundColor: "rgba(0,0,0,0.15)" }} />
        </div>

        {/* Title breadcrumb */}
        <span style={{ fontFamily: FONTS.mono, fontSize: 11, color: COLORS.inkMuted }}>
          {title}
        </span>

        <div style={{ width: 28 }} />
      </div>

      {/* Thân Editor chia 2 cột */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden" }}>
        {/* Cột trái: File Sidebar */}
        <div
          style={{
            width: 170,
            borderRight: `1px solid ${COLORS.divider}`,
            backgroundColor: "#FCFBF9",
            padding: "12px 10px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 6,
          }}
        >
          {files.map((file, i) => (
            <div
              key={i}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "6px 8px",
                borderRadius: 8,
                backgroundColor: file.isActive ? COLORS.terracottaLight : "transparent",
                border: file.isActive ? `1px solid ${COLORS.terracotta}` : "1px solid transparent",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ fontSize: 11, color: file.isActive ? COLORS.terracotta : COLORS.inkSecondary }}></span>
                <span
                  style={{
                    fontFamily: FONTS.mono,
                    fontSize: 11,
                    fontWeight: file.isActive ? 700 : 500,
                    color: file.isActive ? COLORS.terracotta : COLORS.inkPrimary,
                    maxWidth: 90,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap",
                  }}
                >
                  {file.name}
                </span>
              </div>

              {file.badge && (
                <span
                  style={{
                    backgroundColor: "#FCE7CF",
                    color: "#D97706",
                    fontFamily: FONTS.inter,
                    fontWeight: 800,
                    fontSize: 10,
                    padding: "1px 6px",
                    borderRadius: 6,
                  }}
                >
                  {file.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* Cột phải: Code Lines */}
        <div
          style={{
            flex: 1,
            backgroundColor: "#FFFFFF",
            padding: "14px 18px",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
            gap: 8,
          }}
        >
          {codeSnippet.map((line, idx) => (
            <div key={idx} style={{ display: "flex", gap: 16, fontFamily: FONTS.mono, fontSize: 13 }}>
              <span style={{ color: COLORS.inkMuted, width: 22, textAlign: "right", userSelect: "none" }}>
                {line.line}
              </span>
              <span style={{ color: COLORS.inkPrimary, fontWeight: 500 }}>
                {line.text}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Nhãn Sticker nảy đè lên góc phải trên */}
      {stickerBadge && (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 18,
            backgroundColor: COLORS.terracotta,
            color: "#FFFFFF",
            fontFamily: FONTS.inter,
            fontWeight: 800,
            fontSize: 13,
            padding: "6px 14px",
            borderRadius: 10,
            boxShadow: SHADOWS.sticker,
            letterSpacing: "0.5px",
            transform: `translateY(${stickerEntrance.translateY}px) scale(${stickerEntrance.scale})`,
            opacity: stickerEntrance.opacity,
            zIndex: 10,
          }}
        >
          {stickerBadge}
        </div>
      )}
    </div>
  );
};

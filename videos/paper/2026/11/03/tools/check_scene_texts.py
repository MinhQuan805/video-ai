import re
import glob
import sys

sys.stdout.reconfigure(encoding='utf-8')
for file in sorted(glob.glob('src/videos/paper/03-11-26/scenes/Scene*.tsx')):
    content = open(file, encoding='utf-8').read()
    headers = re.findall(r'(mainText|accentText|category|step)="([^"]+)"', content)
    print(file)
    for tag, val in headers:
        print(f'   {tag}: {val}')

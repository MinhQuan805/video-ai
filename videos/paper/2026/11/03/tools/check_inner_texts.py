import re
import sys

sys.stdout.reconfigure(encoding='utf-8')
for f in ['Scene06OneCustomerDossier.tsx', 'Scene07ThreeCoreFields.tsx', 'Scene08TeamSyncUpdates.tsx', 'Scene09SelfServiceClarity.tsx']:
    path = f'src/videos/paper/03-11-26/scenes/{f}'
    txt = open(path, encoding='utf-8').read()
    strings = re.findall(r'>([^<>{}\n]+)<', txt)
    clean = [s.strip() for s in strings if s.strip() and len(s.strip()) > 2]
    print(f, clean)

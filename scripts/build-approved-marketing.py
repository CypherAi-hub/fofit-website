"""Offline, reproducible build of the founder-approved FoFit marketing design."""
from pathlib import Path
import hashlib
import json
import shutil
import subprocess
import tempfile

repo = Path(__file__).resolve().parents[1]
snapshot = repo / 'approved-marketing'
manifest = json.loads((snapshot / 'manifest.json').read_text())

with tempfile.TemporaryDirectory(prefix='fofit-approved-build-') as temporary:
    base = Path(temporary) / 'baseline'
    output = Path(temporary) / 'output'
    for item in manifest['files']:
        relative = Path(item['path'])
        source_root = repo / 'public' if item['source'] == 'public' else snapshot
        source_path = item.get('sourcePath', str(Path(*relative.parts[1:])) if item['source'] == 'public' else str(relative))
        source = source_root / source_path
        if not source.resolve().is_relative_to(source_root.resolve()):
            raise SystemExit('Invalid baseline source path')
        if not source.is_file() or hashlib.sha256(source.read_bytes()).hexdigest() != item['sha256']:
            raise SystemExit(f'Approved baseline missing or changed: {item["path"]}')
        target = base / relative
        if not target.resolve().is_relative_to(base.resolve()):
            raise SystemExit('Invalid baseline destination path')
        target.parent.mkdir(parents=True, exist_ok=True)
        shutil.copy2(source, target)
    subprocess.run(['python3', str(repo / 'scripts/patch-recovered-marketing.py'),
                    '--base', str(base), '--output', str(output)], check=True, cwd=repo)
    # Validate the complete temporary result before replacing the last good build.
    subprocess.run(['node', str(repo / 'scripts/check-approved-marketing.mjs'),
                    str(output / 'static')], check=True, cwd=repo)
    destination = repo / 'dist'
    if destination.exists():
        shutil.rmtree(destination)
    shutil.copytree(output / 'static', destination)
    (destination / 'approved-build.json').write_text(json.dumps({
        'schemaVersion': 1,
        'baselineDeployment': manifest['baselineDeployment'],
        'baselineManifestSha256': hashlib.sha256((snapshot / 'manifest.json').read_bytes()).hexdigest(),
        'patchSha256': hashlib.sha256((repo / 'scripts/patch-recovered-marketing.py').read_bytes()).hexdigest(),
        'copySha256': hashlib.sha256((repo / 'scripts/approved-marketing-copy.json').read_bytes()).hexdigest(),
        'environmentFilesRead': False,
    }, indent=2) + '\n')
print('Approved FoFit marketing built to dist; legacy React source was not compiled.')

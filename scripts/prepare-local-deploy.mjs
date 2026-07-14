import { cpSync, existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { execSync } from 'node:child_process';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dest = join(root, 'deploy', 'local', 'www', 'kevin_gonzalez');
const dist = join(root, 'dist');

execSync('npm run build', { cwd: root, stdio: 'inherit' });

mkdirSync(dest, { recursive: true });

for (const file of ['index.html', '404.html', 'favicon.svg']) {
  const source = join(dist, file);
  if (existsSync(source)) {
    cpSync(source, join(dest, file));
  }
}

for (const dir of ['panel', 'nueva']) {
  const source = join(dist, dir);
  if (existsSync(source)) {
    cpSync(source, join(dest, dir), { recursive: true });
  }
}

writeFileSync(join(dest, 'config.env'), 'DB_HOST=localhost\nDB_PASSWORD=demo\n');
writeFileSync(join(dest, 'backup.bak'), 'respaldo de prueba\n');
writeFileSync(join(dest, 'repo.git'), 'archivo de prueba\n');

console.log('Build local listo en deploy/local/www/kevin_gonzalez/');

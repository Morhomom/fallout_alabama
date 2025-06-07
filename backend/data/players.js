import { readFileSync, writeFileSync, existsSync, copyFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { tmpdir } from 'os';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, 'players.json');
const tmpPath = join(tmpdir(), 'players.json');

export function loadPlayers() {
  if (!existsSync(tmpPath)) {
    copyFileSync(dataPath, tmpPath);
  }
  return JSON.parse(readFileSync(tmpPath, 'utf8'));
}

export function savePlayers(players) {
  writeFileSync(tmpPath, JSON.stringify(players, null, 2));
}

export default loadPlayers();

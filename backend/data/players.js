import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
const dataPath = join(__dirname, 'players.json');

export function loadPlayers() {
  return JSON.parse(readFileSync(dataPath, 'utf8'));
}

export function savePlayers(players) {
  writeFileSync(dataPath, JSON.stringify(players, null, 2));
}

export default loadPlayers();

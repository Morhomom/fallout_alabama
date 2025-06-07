import pg from 'pg';
import { loadPlayers, savePlayers } from './players.js';

const { Pool } = pg;
let pool;

function getPool() {
  if (!pool) {
    if (!process.env.DATABASE_URL) {
      throw new Error('DATABASE_URL is not defined');
    }
    pool = new Pool({ connectionString: process.env.DATABASE_URL });
  }
  return pool;
}

const useFile = !process.env.DATABASE_URL || process.env.TEST_DB === 'file';

export async function getPlayers() {
  if (useFile) {
    return loadPlayers();
  }
  const { rows } = await getPool().query('SELECT * FROM players ORDER BY id');
  return rows;
}

export async function getPlayerById(id) {
  if (useFile) {
    return loadPlayers().find(p => p.id === id);
  }
  const { rows } = await getPool().query('SELECT * FROM players WHERE id=$1', [id]);
  return rows[0];
}

export async function updatePlayer(id, fields) {
  if (useFile) {
    const players = loadPlayers();
    const index = players.findIndex(p => p.id === id);
    if (index === -1) return null;
    Object.assign(players[index], fields);
    savePlayers(players);
    return players[index];
  }
  const keys = Object.keys(fields);
  if (keys.length === 0) {
    return getPlayerById(id);
  }
  const set = keys.map((k, i) => `"${k}"=$${i + 2}`).join(', ');
  const values = Object.values(fields);
  const { rows } = await getPool().query(
    `UPDATE players SET ${set} WHERE id=$1 RETURNING *`,
    [id, ...values]
  );
  return rows[0];
}

export async function addItem(id, item) {
  if (useFile) {
    const players = loadPlayers();
    const player = players.find(p => p.id === id);
    if (!player) return null;
    player.inventory.push(item);
    savePlayers(players);
    return player;
  }
  const { rows } = await getPool().query(
    'UPDATE players SET inventory = array_append(inventory, $2) WHERE id=$1 RETURNING *',
    [id, item]
  );
  return rows[0];
}

export async function removeItem(id, itemId) {
  if (useFile) {
    const players = loadPlayers();
    const player = players.find(p => p.id === id);
    if (!player) return null;
    player.inventory = player.inventory.filter((_, idx) => idx != itemId);
    savePlayers(players);
    return player;
  }
  const { rows } = await getPool().query(
    `UPDATE players SET inventory = (
      SELECT array_agg(elem) FROM (
        SELECT elem FROM unnest(inventory) WITH ORDINALITY t(elem, idx)
        WHERE idx <> $2 + 1
      ) s
    ) WHERE id=$1 RETURNING *`,
    [id, Number(itemId)]
  );
  return rows[0];
}

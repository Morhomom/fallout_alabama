import pg from 'pg';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.error('DATABASE_URL must be set');
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function setup() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS players (
      id text PRIMARY KEY,
      name text NOT NULL,
      hp integer NOT NULL,
      ap integer NOT NULL,
      currency integer NOT NULL,
      inventory text[] NOT NULL DEFAULT '{}',
      strength integer,
      perception integer,
      endurance integer,
      charisma integer,
      intelligence integer,
      agility integer,
      luck integer
    )`);

  const __dirname = dirname(fileURLToPath(import.meta.url));
  const data = JSON.parse(readFileSync(join(__dirname, 'players.json'), 'utf8'));

  for (const player of data) {
    await pool.query(
      `INSERT INTO players (
        id, name, hp, ap, currency, inventory,
        strength, perception, endurance, charisma,
        intelligence, agility, luck
      ) VALUES (
        $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13
      ) ON CONFLICT (id) DO NOTHING`,
      [
        player.id,
        player.name,
        player.hp,
        player.ap,
        player.currency,
        player.inventory,
        player.strength,
        player.perception,
        player.endurance,
        player.charisma,
        player.intelligence,
        player.agility,
        player.luck,
      ]
    );
  }

  await pool.end();
}

setup().catch((err) => {
  console.error(err);
  pool.end();
  process.exit(1);
});

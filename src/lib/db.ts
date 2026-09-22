import { neon, type NeonQueryFunction } from "@neondatabase/serverless";
import { guestbookEntries as seedEntries, type GuestbookEntry } from "@/data/guestbook";

export type { GuestbookEntry };

let sqlClient: NeonQueryFunction<false, false> | null = null;

function getSql() {
  if (!sqlClient) {
    if (!process.env.DATABASE_URL) {
      throw new Error(
        "DATABASE_URL is not set. Add a Neon connection string to .env.local (see todo/02-not-real.md).",
      );
    }
    sqlClient = neon(process.env.DATABASE_URL);
  }
  return sqlClient;
}

let schemaReady: Promise<void> | null = null;

async function ensureSchema() {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS guestbook_entries (
          id SERIAL PRIMARY KEY,
          name TEXT NOT NULL,
          message TEXT NOT NULL,
          created_at TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
      const rows = await sql`SELECT COUNT(*)::int AS count FROM guestbook_entries`;
      if (rows[0].count === 0) {
        for (const entry of seedEntries) {
          await sql`
            INSERT INTO guestbook_entries (name, message, created_at)
            VALUES (${entry.name}, ${entry.message}, ${entry.date}::timestamptz)
          `;
        }
      }
    })();
  }
  return schemaReady;
}

export async function getGuestbookEntries(): Promise<GuestbookEntry[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, message, created_at
    FROM guestbook_entries
    ORDER BY created_at DESC
  `;
  return rows.map((row) => ({
    id: row.id as number,
    name: row.name as string,
    message: row.message as string,
    date: new Date(row.created_at as string).toISOString().split("T")[0],
  }));
}

export async function getGuestbookCount(): Promise<number> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`SELECT COUNT(*)::int AS count FROM guestbook_entries`;
  return rows[0].count as number;
}

export async function addGuestbookEntry(name: string, message: string): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`INSERT INTO guestbook_entries (name, message) VALUES (${name}, ${message})`;
}

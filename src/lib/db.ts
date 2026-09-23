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
      await sql`
        CREATE TABLE IF NOT EXISTS rate_limits (
          scope TEXT NOT NULL,
          identifier TEXT NOT NULL,
          last_submitted_at TIMESTAMPTZ NOT NULL,
          PRIMARY KEY (scope, identifier)
        )
      `;
      // Superseded by the generic rate_limits table above.
      await sql`DROP TABLE IF EXISTS guestbook_rate_limits`;
    })();
  }
  return schemaReady;
}

// Shared per-scope, per-identifier (usually IP) submission rate limit —
// used by both the guestbook and the contact form.
export async function checkRateLimit(
  scope: string,
  identifier: string,
  windowSeconds: number,
): Promise<{ allowed: boolean; retryAfterSeconds?: number }> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT last_submitted_at FROM rate_limits WHERE scope = ${scope} AND identifier = ${identifier}
  `;
  if (rows.length > 0) {
    const elapsedSeconds = (Date.now() - new Date(rows[0].last_submitted_at as string).getTime()) / 1000;
    if (elapsedSeconds < windowSeconds) {
      return { allowed: false, retryAfterSeconds: Math.ceil(windowSeconds - elapsedSeconds) };
    }
  }
  return { allowed: true };
}

export async function recordRateLimitSubmission(scope: string, identifier: string): Promise<void> {
  const sql = getSql();
  await sql`
    INSERT INTO rate_limits (scope, identifier, last_submitted_at)
    VALUES (${scope}, ${identifier}, now())
    ON CONFLICT (scope, identifier) DO UPDATE SET last_submitted_at = now()
  `;
}

export const GUESTBOOK_PAGE_SIZE = 20;

export async function getGuestbookEntries(
  { limit, offset }: { limit?: number; offset?: number } = {},
): Promise<GuestbookEntry[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = await sql`
    SELECT id, name, message, created_at
    FROM guestbook_entries
    ORDER BY created_at DESC
    LIMIT ${limit ?? GUESTBOOK_PAGE_SIZE}
    OFFSET ${offset ?? 0}
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

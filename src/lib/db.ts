import { promises as fs } from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import type { Database } from "./types";
import { emptyDatabase, seedProspectuses, seedUsers } from "./seed";

const DATA_DIR = path.join(process.cwd(), "data");
const DB_PATH = path.join(DATA_DIR, "db.json");

let queue: Promise<unknown> = Promise.resolve();

function withLock<T>(fn: () => Promise<T>): Promise<T> {
  const run = queue.then(fn, fn);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

async function ensureSeeded(): Promise<Database> {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    const raw = await fs.readFile(DB_PATH, "utf8");
    const parsed = JSON.parse(raw) as Database;
    if (parsed.users?.length) return parsed;
  } catch {
    // first run
  }

  const passwordHash = await bcrypt.hash("Demo1234!", 10);
  const db: Database = {
    ...emptyDatabase(),
    users: seedUsers.map((user) => ({ ...user, passwordHash })),
    prospectuses: seedProspectuses(),
    interests: [
      {
        id: "int-1",
        prospectusId: "prs-marathon",
        sponsorId: "user-sponsor-1",
        sponsorName: "Elena Voss",
        sponsorEmail: "uma.s@example.org",
        sponsorOrganization: "Northline Capital",
        message:
          "We are looking at a finish-line partnership for our Pacific book. May we see last year’s hospitality deck?",
        status: "new",
        createdAt: "2026-04-08T16:40:00.000Z",
      },
      {
        id: "int-2",
        prospectusId: "prs-lumen",
        sponsorId: "user-sponsor-2",
        sponsorName: "Marcus Adeyemi",
        sponsorEmail: "beth.t@example.com",
        sponsorOrganization: "Field & Harbor",
        message:
          "Field & Harbor would like to host the Thursday breakfast. Is the studio package still open?",
        status: "reviewed",
        createdAt: "2026-04-03T19:05:00.000Z",
      },
      {
        id: "int-3",
        prospectusId: "prs-climate",
        sponsorId: "user-sponsor-1",
        sponsorName: "Elena Voss",
        sponsorEmail: "uma.s@example.org",
        sponsorOrganization: "Northline Capital",
        message:
          "Our climate desk would like a track. Sending our public-works portfolio separately.",
        status: "new",
        createdAt: "2026-04-09T11:12:00.000Z",
      },
    ],
  };
  await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
  return db;
}

export async function readDb(): Promise<Database> {
  return withLock(async () => ensureSeeded());
}

export async function updateDb<T>(mutator: (db: Database) => T | Promise<T>): Promise<T> {
  return withLock(async () => {
    const db = await ensureSeeded();
    const result = await mutator(db);
    await fs.writeFile(DB_PATH, JSON.stringify(db, null, 2), "utf8");
    return result;
  });
}

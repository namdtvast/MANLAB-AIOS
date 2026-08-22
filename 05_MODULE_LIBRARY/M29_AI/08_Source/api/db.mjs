// AIOS Control Plane — lưu trữ JSON file, tách theo collection (namespace = key trong db)
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { seed } from './seed.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dir, 'data');
const DATA_FILE = join(DATA_DIR, 'data.json');

let db = null;

export function load() {
  if (db) return db;
  if (existsSync(DATA_FILE)) db = JSON.parse(readFileSync(DATA_FILE, 'utf8'));
  else { db = seed(); save(); }
  return db;
}

export function save() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(DATA_FILE, JSON.stringify(db, null, 2));
}

export function reset() { db = seed(); save(); return db; }

export function nextSeq(collection) {
  const d = load();
  d.seq[collection] = (d.seq[collection] || 0) + 1;
  return d.seq[collection];
}

export const col = (name) => load()[name];
export const findById = (name, id) => col(name).find((r) => r.id === id);

// AIOS Control Plane — AISecret: giá trị thật KHÔNG BAO GIỜ trả ra API/UI/log/trace (AC-07).
// Lưu tách hẳn khỏi data.json để không lẫn vào log/backup chung của registry.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { nowISO, genId } from './model.mjs';

const __dir = dirname(fileURLToPath(import.meta.url));
const DATA_DIR = join(__dir, 'data');
const FILE = join(DATA_DIR, 'secrets.local.json');

let store = null;
function load() {
  if (store) return store;
  if (existsSync(FILE)) store = JSON.parse(readFileSync(FILE, 'utf8'));
  else { store = { seq: 1, items: [] }; persist(); }
  return store;
}
function persist() {
  if (!existsSync(DATA_DIR)) mkdirSync(DATA_DIR, { recursive: true });
  writeFileSync(FILE, JSON.stringify(store, null, 2));
}

const mask = (value) => '****' + String(value).slice(-4);
const toPublic = (s) => ({ id: s.id, platform_id: s.platform_id, name: s.name, masked_value: s.masked_value, status: s.status, last_rotated: s.last_rotated, last_used: s.last_used });

export function list() { return load().items.map(toPublic); }
export function get(id) { const s = load().items.find((x) => x.id === id); return s ? toPublic(s) : null; }

export function create({ platform_id, name, value }) {
  const s = load();
  const item = { id: genId('SECRET'), platform_id, name, value, masked_value: mask(value), status: 'ACTIVE', last_rotated: nowISO(), last_used: null };
  s.items.push(item); persist();
  return toPublic(item);
}

export function rotate(id, value) {
  const s = load();
  const item = s.items.find((x) => x.id === id);
  if (!item) return null;
  item.value = value; item.masked_value = mask(value); item.last_rotated = nowISO();
  persist(); return toPublic(item);
}

export function disable(id) {
  const s = load();
  const item = s.items.find((x) => x.id === id);
  if (!item) return null;
  item.status = 'DISABLED'; persist(); return toPublic(item);
}

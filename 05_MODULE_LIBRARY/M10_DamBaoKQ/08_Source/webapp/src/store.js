// M10_DamBaoKQ — Kho trạng thái phía client (cache) gọi API làm nguồn xác thực.
// Server thực thi control rules; client chỉ hiển thị và điều phối.
import { USERS } from './model.js';
import { api, setRole as apiSetRole } from './apiClient.js';

const LS_ROLE = 'm10_role_v1';
let state = { list: [], role: localStorage.getItem(LS_ROLE) || 'LDP' };

export function getState() { return state; }
export function currentUser() { return USERS[state.role]; }
export function byId(id) { return state.list.find((a) => a.id === id); }

export async function init() { apiSetRole(state.role); await refresh(); }
export async function refresh() { state.list = await api.list(); return state.list; }

export function setRole(role) { state.role = role; apiSetRole(role); localStorage.setItem(LS_ROLE, role); }

// Các hành động — gọi API, làm mới cache, trả về hồ sơ đã cập nhật (ném lỗi nếu vi phạm quy tắc)
export async function create(body) { const a = await api.create(body); await refresh(); return a; }
export async function edit(id, patch) { const a = await api.edit(id, patch); await refresh(); return a; }
export async function submit(id) { const a = await api.submit(id); await refresh(); return a; }
export async function review(id, decision, reason) { const a = await api.review(id, decision, reason); await refresh(); return a; }
export async function approve(id, decision, reason) { const a = await api.approve(id, decision, reason); await refresh(); return a; }
export async function publish(id, pubStatus, expiresAt, sourceCertId) { const a = await api.publish(id, pubStatus, expiresAt, sourceCertId); await refresh(); return a; }
export async function linkCapa(id) { const a = await api.linkCapa(id); await refresh(); return a; }
export async function newVersion(id) { const a = await api.newVersion(id); await refresh(); return a; }
export async function reset() { await api.reset(); await refresh(); }

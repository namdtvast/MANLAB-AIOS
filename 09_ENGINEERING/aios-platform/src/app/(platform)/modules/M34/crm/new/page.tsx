import Link from "next/link";
import NewPartyForm from "./NewPartyForm";
import { listPartyRoleTypes } from "@/lib/m34/crm-actions";
export default async function NewPartyPage(){const roleTypes=await listPartyRoleTypes();return <div className="mx-auto flex w-full max-w-4xl flex-col gap-5"><div><Link href="/modules/M34/crm" className="text-sm text-accent hover:underline">← Danh sách CRM</Link><h1 className="mt-2 font-head text-2xl font-bold text-ink">Tạo Tổ chức/Cá nhân</h1><p className="mt-1 text-sm text-ink-2">Tra cứu trùng trước khi lưu. Có thể gắn nhiều vai trò trên cùng một hồ sơ.</p></div><NewPartyForm roleTypes={roleTypes}/></div>}

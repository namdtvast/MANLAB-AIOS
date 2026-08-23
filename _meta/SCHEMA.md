# Lược đồ Hub
`manifest.yaml` (`manlab-aios/process@1.1`): schema, code (MPxx), name, owner, status, standards, legal, capabilities, module, menu_group, menu_order.
`menu_group` ∈ DIEU_HANH · NGUON_LUC · KHACH_HANG · KY_THUAT · CHAT_LUONG · DU_LIEU_SO · CONG_NGHE — nhóm menu của module Mxx tương ứng trên nền tảng ManLab; `menu_order` là thứ tự trong nhóm (theo dòng chảy nghiệp vụ, không theo số Mxx). Đây là nguồn sự thật duy nhất của phép gán nhóm — `prisma/seed.ts` đọc lên, không hardcode.
`links.yaml`: đường dẫn tương đối tới procedure/iso/module/forms/skill/law/evidence/capabilities. **Chỉ link, không copy.**

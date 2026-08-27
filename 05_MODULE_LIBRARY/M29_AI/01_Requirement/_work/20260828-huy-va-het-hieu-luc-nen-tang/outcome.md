# OUTCOME — 20260828-huy-va-het-hieu-luc-nen-tang

Tier **M** (đổi state machine + ràng buộc nghiệp vụ chặn cứng + nhiều file). Nguồn: người dùng
xem `/modules/M29/registry` với vai trò SUPER_ADMIN và hỏi vì sao bảng Platform chỉ có "Đưa vào
vận hành"/"Gửi soát xét", không có "Hết hiệu lực", "Hủy" hay "Xóa".

## WHO
Lãnh đạo Viện (LĐV — vai trò `SUPER_ADMIN`, vai trò duy nhất có `platforms: rw`). Đây là vai trò
ETV.P35 giao thẩm quyền kết thúc vòng đời bản ghi nền tảng (Phụ lục II.1 trạng thái 8 và 9).

## WHAT
Trên bảng Platform của trang danh mục M29, LĐV thực hiện được **đủ** các nhánh mà ETV.P35 Phụ lục
II.1 quy định, không chỉ nhánh đi thẳng:

1. **Hết hiệu lực** (`ARCHIVED`) từ Đã phê duyệt/Hiệu lực — bắt buộc lý do, bị chặn khi còn tác tử
   hoặc công cụ đang hoạt động trỏ tới nền tảng (§6.5.3).
2. **Hủy** (`CANCELLED`) từ mọi bước chưa phê duyệt — bắt buộc lý do (Phụ lục II.1 trạng thái 9:
   "bỏ bản ghi trước khi phê duyệt").
3. **Trả lại khi soát xét** và **Từ chối phê duyệt** kèm lý do (trạng thái 3 và 5).
4. **Gửi lại soát xét** cho bản ghi đang ở Không soát xét/Không phê duyệt.

## WHAT NOT — "Xóa" (hard delete)
Không làm, và cố ý không làm. ETV.P35 §6.1.8 (Mã nền tảng) quy định mã nền tảng
**không được cấp lại** sau khi nền tảng đã Hủy hoặc Hết hiệu lực, "nhằm giữ nguyên giá trị truy
vết của nhật ký lịch sử". Xóa cứng bản ghi làm mã trở lại tự do và cắt đứt nhật ký kiểm toán —
trái cả ETV.P35 lẫn yêu cầu vết kiểm toán của ISO/IEC 42001. Lược đồ cũng đã chặn: `AIProvider →
AIPlatform` khai `onDelete: Restrict`. **Hủy** chính là nhánh nghiệp vụ thay cho xóa.

## WHY
`_work/20260825-vong-doi-hieu-luc-nen-tang/verify.md` mục "Việc còn lại" đã ghi đúng lỗ hổng này:
`CANCELLED` có trong enum kèm chú thích dẫn ETV.P35 Phụ lục II trạng thái 9 nhưng **không có
chuyển tiếp nào tới nó**. `archive()` thì có trong `rules.ts` và `actions.ts` từ trước nhưng
**không nút giao diện nào gọi tới** — cùng loại lỗi "luật có, đường đi không có" đã sửa cho
`ACTIVE` lần trước. Hệ quả thực tế: muốn ngừng vận hành một nền tảng phải sửa thẳng CSDL.

## SUCCESS CRITERIA
1. Bản ghi ở mọi trạng thái chưa kết thúc đều có ít nhất một thao tác hợp lệ trên giao diện —
   không còn ô "Thao tác" trống như hiện nay ở `PENDING_REVIEW`/`RETURNED`/`REJECTED`/`ACTIVE`.
2. Mọi nhánh Hủy / Không soát xét / Không phê duyệt / Hết hiệu lực đều **bắt buộc lý do**, lý do
   vào `AIAuditLog` (Phụ lục II.1 và ghi chú cuối Phụ lục II).
3. Chuyển sang Hết hiệu lực **bị từ chối** khi còn tác tử/công cụ đang hoạt động trỏ tới, và
   thông báo **liệt kê đúng danh sách đối tượng còn phụ thuộc** (§6.5.3 yêu cầu chỉ ra danh sách).
4. Không đăng ký được công cụ mới trỏ tới nền tảng chưa phê duyệt/đã kết thúc (§6.7).
5. `npm test`, `npm run build`, `npx eslint` sạch; `python3 _meta/validate_links.py` PASS.

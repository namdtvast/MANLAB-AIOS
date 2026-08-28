// M29 — quy ước đặt TÊN biến môi trường chứa khoá API của một nền tảng.
//
// Tách khỏi adapters.ts vì form đăng ký nền tảng (client component) cần hằng này; adapters.ts kéo
// theo SDK của nhà cung cấp nên import từ đó sẽ lôi cả SDK vào bundle trình duyệt.
//
// TÊN BIẾN BỊ CHẶN THEO MẪU, cố ý. Người đăng ký nền tảng cũng là người khai apiBaseUrl; cho họ
// tự do chọn tên biến tức là cho họ đọc bất kỳ bí mật nào của máy chủ (DATABASE_URL, AUTH_SECRET)
// rồi để adapter gửi giá trị đó đi dưới dạng Bearer token tới đúng endpoint họ khai. Mẫu dưới đây
// khoanh vùng vào đúng họ biến dành cho khoá mô hình cục bộ.
export const KEY_ENV_PATTERN = /^LOCAL_LLM_API_KEY(_[A-Z0-9]+)*$/;
export const KEY_ENV_HINT = "Chỉ chấp nhận LOCAL_LLM_API_KEY hoặc LOCAL_LLM_API_KEY_<HẬU_TỐ> (chữ hoa, số, gạch dưới).";

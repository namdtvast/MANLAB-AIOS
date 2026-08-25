// Hằng số dùng chung giữa Tool Gateway (có Prisma) và trình chấm đánh giá (thuần, chạy trong
// test không cần CSDL). Tách ra để trình chấm không phải nhập cả gateway — và quan trọng hơn, để
// câu từ chối chỉ có MỘT bản: gateway phát ra câu này, trình chấm nhận diện đúng câu này.

/** Câu từ chối cố định khi không dẫn được nguồn (spec §2.3). */
export const NO_SOURCE_ANSWER = "Không tìm thấy căn cứ trong hệ thống tài liệu của Viện.";

/** Mã Agent Copilot trong registry M29 — khai ở prisma/seed.ts, không tạo bằng tay. */
export const COPILOT_AGENT_CODE = "AGENT_COPILOT_TRACUU";

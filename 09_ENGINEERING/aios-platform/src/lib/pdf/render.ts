// Sinh PDF thật từ HTML bằng Chromium headless (Puppeteer).
//
// Vì sao render từ HTML chứ không dựng PDF bằng thư viện vẽ: mỗi biểu mẫu ETV chỉ được mô tả
// bố cục MỘT lần dưới dạng HTML (src/lib/forms/layout.ts + template từng biểu mẫu), rồi dùng
// lại cho cả trang xem trước trên web lẫn file PDF tải về. Nếu dựng PDF bằng thư viện vẽ thì
// mỗi biểu mẫu phải viết hai lần — với ~100 biểu mẫu của Viện là không kham nổi.
//
// Chromium chỉ khởi động một lần cho cả tiến trình (tốn ~1–2s) rồi tái sử dụng.
import puppeteer, { type Browser } from "puppeteer";

// Next.js dev server hot-reload module này nhiều lần — giữ browser trên globalThis để không
// mở nhiều Chromium mồ côi (cùng lối với src/lib/prisma.ts).
const globalForPdf = globalThis as unknown as { pdfBrowser?: Promise<Browser> };

function getBrowser(): Promise<Browser> {
  if (!globalForPdf.pdfBrowser) {
    globalForPdf.pdfBrowser = puppeteer.launch({
      args: ["--no-sandbox", "--disable-dev-shm-usage"],
    });
  }
  return globalForPdf.pdfBrowser;
}

export interface PdfOptions {
  /** Khổ giấy — biểu mẫu ETV mặc định A4 dọc */
  landscape?: boolean;
}

/**
 * HTML tự chứa (đã nhúng sẵn CSS, không tải tài nguyên ngoài) → Buffer PDF.
 * Lề đã nằm trong `@page` của template nên không đặt margin ở đây.
 */
export async function htmlToPdf(html: string, options: PdfOptions = {}): Promise<Buffer> {
  const browser = await getBrowser();
  const page = await browser.newPage();
  try {
    // Không có tài nguyên mạng nào để chờ — "load" là đủ và tránh treo nếu máy chủ offline.
    await page.setContent(html, { waitUntil: "load" });
    const pdf = await page.pdf({
      format: "A4",
      landscape: options.landscape ?? false,
      printBackground: true,
      preferCSSPageSize: true,
    });
    return Buffer.from(pdf);
  } finally {
    await page.close();
  }
}

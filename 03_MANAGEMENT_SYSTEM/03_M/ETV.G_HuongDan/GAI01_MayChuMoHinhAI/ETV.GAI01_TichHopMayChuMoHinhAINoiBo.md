---
# Khối metadata AI — bắt buộc cho mọi văn bản kiểm soát (ETV.P14 §6.3)
id: ETV.GAI 01
title: "Hướng dẫn Tích hợp máy chủ mô hình AI nội bộ vào ManLab AIOS"
type: Huong-dan
owner: "Người phụ trách quản trị AI (PT.AI)"
department: "Toàn Viện"
process: MP29_AI
capability: [CAP-29_AIOffice]
module: M29_AI
effective_date: ""
revision: "01"
status: Nhap
keywords: [máy chủ mô hình AI, GPU, vLLM, AI Model Provider, self-hosted LLM, định tuyến mô hình, dự phòng, chuỗi cung ứng phần mềm, mức phân loại dữ liệu]
related_documents: [ETV.P01, ETV.P06, ETV.P13, ETV.P14, ETV.P15, ETV.P26, ETV.P27, ETV.P28, ETV.P29, ETV.P30, ETV.P31, ETV.P33, ETV.P34, ETV.P35, ETV.P.F34.01, ETV.P.F34.03, ETV.P.F29.01, ETV.P.F29.02, ETV.P.F29.03, ETV.P.F29.04, ETV.P.F33.01, ETV.P.F33.02, ETV.P.F35.01, ETV.P.F35.02, ETV.P.F35.03, ETV.P.F35.04, ETV.P.F28.01, ETV.P.F28.03, ETV.P.F28.04]
iso_clause: ["ISO/IEC 42001:2023 §6.1.4, §8.1, §8.4", "ISO/IEC 27001:2022 A.5.9, A.5.19–A.5.23, A.8.9, A.8.16, A.8.31", "ISO/IEC 17025:2017 §7.11", "ISO 9001:2015 §7.1.3, §8.5.1"]
legal_basis: ["Luật Giao dịch điện tử 20/2023/QH15", "Pháp luật hiện hành về an toàn thông tin mạng", "Pháp luật hiện hành về bảo vệ dữ liệu cá nhân"]
ai_tags: [model-provider, local-llm, gpu-server, routing-policy, fallback]
knowledge_category: HTQL-noi-bo
permission: Noi-bo
retention: "Theo thời hạn lưu của tài liệu HTQL tại ETV.P.F 14.06"
digital_signature: "LĐV"
source: "Viện Kiểm định Công nghệ và Môi trường (ETV)"
supersedes: null
superseded_by: null
---

# HƯỚNG DẪN TÍCH HỢP MÁY CHỦ MÔ HÌNH AI NỘI BỘ VÀO MANLAB AIOS

**Guideline For Internal AI Model Server Integration**

|                   |                                      |
| ----------------- | ------------------------------------ |
| **Mã số**         | ETV.GAI 01                           |
| **Lần ban hành**  | 01                                   |
| **Ngày ban hành** | ..../..../........                   |
| **Biên soạn**     | ..................................   |
| **Soát xét**      | ..................................   |
| **Phê duyệt**     | ..................................   |

> **Tình trạng bản này: NHÁP** — chưa có hiệu lực. Bản dự thảo do AI hỗ trợ soạn, cần Lãnh đạo Phòng soát xét và Lãnh đạo Viện phê duyệt theo ETV.P14 §6.6 trước khi áp dụng.
>
> **Mã số `ETV.GAI 01` là mã đề xuất.** Ký hiệu lĩnh vực `AI` chưa có trong bảng mã hoá tại ETV.P14 §6.2 (bảng hiện chỉ liệt kê các lĩnh vực đo lường). Văn thư/QLCL cấp số chính thức; ký hiệu `AI` cần được bổ sung vào ETV.P14 §6.2 ở lần ban hành kế tiếp.

> **Chú ý:** Tài liệu nội bộ, nghiêm cấm cung cấp cho bên ngoài khi chưa có sự đồng ý của Lãnh đạo Viện.

## NHỮNG THAY ĐỔI ĐÃ CÓ

| Thời gian | Nội dung thay đổi | Lần ban hành |
| --- | --- | --- |
| 25/08/2026 | Dự thảo lần đầu | 01 |
| 25/08/2026 | Soát xét nội bộ trước khi trình: chặn dữ liệu mức Hạn chế do xung đột ETV.P29–P26–P34 chưa giải quyết (§3.7); siết điều kiện dùng đường hầm của bên thứ ba (§3.4 Bước 3); thêm kiểm soát chuỗi cung ứng mô hình/image (Bước 2) và kiểm soát nhật ký, dữ liệu tạm (Bước 3b); §3.6 chuyển thành bảng hiện trạng; bổ sung Gate và hồ sơ P01/P06/P30/P31/P34. **Vẫn là bản Nháp, không tăng lần ban hành** (ETV.P14 §6.5). | 01 |

---

## 1. MỤC ĐÍCH

Hướng dẫn trình tự kỹ thuật đưa **một máy chủ GPU nội bộ** vào ManLab AIOS để máy chủ đó trở thành một **nhà cung cấp mô hình AI (AI Model Provider)** được Copilot, Agent, RAG, Workflow và các dịch vụ AI khác sử dụng thông qua AI Control Plane của M29.

Nguyên tắc chi phối toàn bộ hướng dẫn:

> Máy chủ GPU **không phải một chatbot độc lập**. Nó là một Model Provider do AIOS quản lý — AIOS quyết định mô hình nào, dữ liệu nào, tác vụ nào, khi nào và dự phòng ra sao.

**Hướng dẫn này không đặt ra quy định mới.** Nó chỉ xâu chuỗi các yêu cầu đã có của ETV.P29, ETV.P33, ETV.P35, ETV.P28, ETV.P34 theo đúng thứ tự cho một tình huống cụ thể, và bổ sung phần cấu hình kỹ thuật để người triển khai thực hiện được ngay. Khi có mâu thuẫn, **các thủ tục nêu trên là bản đúng**.

---

## 2. PHẠM VI ÁP DỤNG

Áp dụng cho **máy chủ GPU do Viện sở hữu và tự vận hành**, đặt trong hạ tầng của Viện, chạy mô hình ngôn ngữ cục bộ qua một inference engine có API tương thích OpenAI (vLLM, TGI, Ollama hoặc tương đương).

**Ngoài phạm vi:** dịch vụ mô hình của nhà cung cấp bên ngoài (Anthropic, OpenAI, Gemini…) — các dịch vụ này đăng ký theo ETV.P35 và ETV.P29 như hiện nay, không cần hướng dẫn này; máy chủ GPU thuê ngoài hoặc do đối tác vận hành — bổ sung nhánh đánh giá nhà cung cấp theo ETV.P06 trước khi áp dụng phần còn lại.

### 2.1. Ranh giới trách nhiệm giữa các thủ tục

| Việc | Thủ tục | Hồ sơ |
| --- | --- | --- |
| Kiểm kê máy chủ, GPU, phần mềm, bảo trì, tài khoản hệ điều hành | ETV.P33 | F33.01, F33.02, F33.03 |
| Đăng ký nền tảng số, đánh giá trước vận hành, giám sát, ngừng vận hành | ETV.P35 | F35.01, F35.02, F35.03, F35.04 |
| Rủi ro ATTT, khoá API/bí mật xác thực, cấp quyền truy cập, sự cố ATTT | ETV.P28 | F28.01, F28.03, F28.04 |
| Đăng ký Provider/Model, đánh giá tác động AI, kiểm thử, sự cố AI | ETV.P29 | F29.01, F29.02, F29.03, F29.04 |
| Phân loại và kiểm soát dữ liệu đưa vào mô hình | ETV.P34, ETV.P26 | F34.01, F34.03 |
| **Thứ tự thực hiện, cấu hình kỹ thuật, tiêu chí nghiệm thu** | **Hướng dẫn này** | — |

---

## 3. NỘI DUNG HƯỚNG DẪN

### 3.1. Kiến trúc bắt buộc

```text
Người dùng → aios.manlab.vn (ManLab AIOS)
                 ↓
           Tool Gateway / AI Control Plane (M29)
                 ↓   tra AIAgent → AIModel → AIProvider → AIPlatform
           Platform Adapter
                 ↓ TLS + API key
           Điểm cuối của máy chủ mô hình  (§3.4 Bước 3 — nội bộ, hoặc reverse proxy)
                 ↓ 127.0.0.1:8000
           Inference engine (vLLM)
                 ↓
           Mô hình cục bộ → GPU
```

**Ba điều cấm tuyệt đối:**

1. Frontend hoặc người dùng **không** gọi thẳng máy chủ mô hình. Mọi lượt gọi đi qua backend AIOS để còn ghi `AIRequest` (trace), áp guardrail và kiểm AIA.
2. **Không** publish cổng của inference engine (`:8000`) ra Internet. Engine chỉ lắng nghe trên `127.0.0.1`.
3. **Không** hard-code tên mô hình trong Copilot/Agent/Workflow. Mô hình được chọn qua bản ghi `AIModel` trong control plane.

### 3.2. Hiện trạng máy chủ

| Thành phần | Cấu hình thực tế |
| --- | --- |
| Mainboard | Supermicro X11DPG-QT (2 socket) |
| CPU | 2 × Intel Xeon Silver 4210R @ 2,40 GHz — 20 nhân / 40 luồng, turbo ~3,2 GHz |
| RAM | 64 GB (hệ điều hành nhận ~62 GiB; đang dùng ~2,1 GiB, khả dụng ~59 GiB) |
| Swap | 2 GB |
| GPU | 1 × NVIDIA GeForce RTX 3090, 24 GB GDDR6X |
| Hệ điều hành | Ubuntu Server |

**Các thông tin còn thiếu, phải điền khi kiểm kê theo F33.01 (không được suy đoán):** dung lượng và loại ổ đĩa, phiên bản NVIDIA Driver và CUDA, địa chỉ IP nội bộ, phương thức ra Internet (IP tĩnh hay tunnel), công suất nguồn và điều kiện làm mát, người quản trị máy chủ.

### 3.3. Ràng buộc kỹ thuật rút ra từ phần cứng này

Đây là các ràng buộc **cứng của chính máy chủ hiện có**, quyết định lựa chọn mô hình và tham số ở §3.4:

| Ràng buộc | Hệ quả khi triển khai |
| --- | --- |
| RTX 3090 là kiến trúc Ampere (compute capability 8.6) | **Không hỗ trợ FP8.** Chỉ dùng FP16/BF16, hoặc lượng tử hoá INT4 (AWQ/GPTQ, nhân Marlin). Mọi cấu hình FP8 sẽ không khởi động được. |
| VRAM 24 GB, **một** GPU duy nhất | Cỡ mô hình phù hợp: **7B–14B**. 14B ở INT4 chiếm ~9–10 GB trọng số, còn ~12 GB cho KV cache. Mô hình 70B **không** chạy được. `--tensor-parallel-size 1`; không có NVLink, không mở rộng ngang được. |
| GeForce (không phải card trung tâm dữ liệu) | Không có ECC, không có MIG. Một GPU hỏng là mất toàn bộ năng lực suy luận cục bộ → **bắt buộc** có chính sách dự phòng ở §3.7. |
| 2 socket CPU → có NUMA | Ghim tiến trình vLLM vào đúng NUMA node nối với GPU (`nvidia-smi topo -m`), tránh mất băng thông khi nạp mô hình. |
| Swap chỉ 2 GB trên nền 64 GB RAM | Không dựa vào swap của hệ điều hành. RAM trống ~59 GiB là đủ cho `--swap-space` của vLLM (mặc định 4 GiB, lấy từ RAM, không phải swap hệ thống). |
| Nguồn: RTX 3090 ~350 W + 2 CPU | Kiểm tra công suất nguồn và tản nhiệt trước khi chạy tải kéo dài; ghi ngưỡng cảnh báo nhiệt độ vào §3.8. |

### 3.4. Trình tự thực hiện

Sáu bước, mỗi bước kết bằng một **Cổng kiểm soát (Gate)**. Không đạt Gate thì không sang bước sau.

#### Bước 1 — Kiểm kê và nghiệm thu hạ tầng (ETV.P33)

Ghi máy chủ vào **F33.01** với đủ các trường tại §3.2, đưa vào kế hoạch bảo trì **F33.02**, tài khoản hệ điều hành ghi tại **F33.03** (cấp quyền theo phiếu **F28.04** đã duyệt — quản trị hệ thống không tự phê duyệt quyền cho mình).

Chuẩn hoá hệ điều hành: cập nhật bản vá, đặt hostname (đề xuất `manlab-ai-gpu-01`), NTP, tường lửa, đăng nhập SSH bằng khoá, không dùng tài khoản `root` cho vận hành thường ngày.

Kiểm tra GPU:

```bash
lspci | grep -i nvidia
nvidia-smi
```

**Gate 1 —** hệ điều hành nhận đúng GPU, `nvidia-smi` chạy ổn định, VRAM báo đúng 24 GB, nhiệt độ khi nghỉ bình thường, F33.01 đã có bản ghi.

#### Bước 2 — Triển khai inference engine trong container

Cài Docker Engine + Docker Compose + NVIDIA Container Toolkit. Kiểm tra container nhìn thấy GPU:

```bash
docker run --rm --gpus all nvidia/cuda:12.4.1-base-ubuntu22.04 nvidia-smi
```

Chọn mô hình theo §3.3 (7B–14B, ưu tiên bản lượng tử hoá INT4). Việc chọn mô hình căn cứ tác vụ thật của Viện — phân loại, bóc tách tài liệu, hỏi–đáp tiếng Việt, RAG, gọi công cụ, trả JSON có cấu trúc — **không** căn cứ bảng xếp hạng chung của nhà phát hành mô hình.

**Kiểm soát chuỗi cung ứng — bắt buộc trước khi nạp (ETV.P28, ETV.P33).** Mô hình và image là phần mềm bên ngoài đưa vào hạ tầng Viện, áp cùng yêu cầu như mọi phần mềm khác:

| Đối tượng | Phải có trước khi chạy |
| --- | --- |
| Image | Ghim **phiên bản + digest**, không dùng `latest`; nguồn phát hành, giấy phép, kết quả quét lỗ hổng |
| Mô hình | Nguồn phát hành tin cậy, phiên bản chính xác, **checksum** của tệp đã tải, giấy phép cho phép dùng nội bộ/thương mại |
| Thành phần | Danh sách thành phần và phiên bản (image, driver, CUDA, vLLM, thư viện) |

Nghiêm cấm bật `--trust-remote-code`: tham số này cho phép chạy mã tuỳ ý kèm theo kho mô hình. Nếu một mô hình bắt buộc phải có nó thì **đổi mô hình**, không mở tham số.

Cấm tự động cập nhật image, driver hoặc mô hình đang vận hành. Mọi cập nhật đi lại đủ Bước 5–6. Khi image hoặc mô hình bị thu hồi hoặc phát hiện lỗ hổng: lập phiếu theo **F33.04**, quay về phiên bản trước theo §3.8.

`docker-compose.yml` mẫu:

```yaml
services:
  vllm:
    # Ghim phiên bản + digest. KHÔNG dùng :latest — pull lại sẽ đổi phần mềm
    # ngoài kiểm soát, trái yêu cầu quản lý cấu hình của ETV.P33.
    image: vllm/vllm-openai:v<phien-ban>@sha256:<digest>
    restart: unless-stopped
    ports:
      - "127.0.0.1:8000:8000"      # KHÔNG bỏ 127.0.0.1
    volumes:
      - /srv/models:/models:ro
    environment:
      - VLLM_API_KEY=${VLLM_API_KEY}   # đọc từ file .env quyền 600, không commit
    ipc: host
    deploy:
      resources:
        reservations:
          devices:
            - driver: nvidia
              count: 1
              capabilities: [gpu]
    command: >
      --model /models/<ten-mo-hinh>
      --served-model-name manlab-local-14b
      --quantization awq_marlin
      --dtype float16
      --max-model-len 16384
      --gpu-memory-utilization 0.90
      --tensor-parallel-size 1
      --swap-space 4
```

Giải thích các tham số phụ thuộc phần cứng: `awq_marlin` + `float16` vì Ampere không có FP8 (§3.3); `--gpu-memory-utilization 0.90` chừa ~2,4 GB VRAM cho hệ thống; `--max-model-len 16384` là điểm khởi đầu an toàn — nếu gặp lỗi hết VRAM thì giảm xuống 8192 trước khi hạ `gpu-memory-utilization`.

Kiểm tra API nội bộ:

```bash
curl -s -H "Authorization: Bearer $VLLM_API_KEY" http://127.0.0.1:8000/v1/models
```

**Gate 2 —** container nhìn thấy GPU, mô hình nạp xong, `GET /v1/models` và `POST /v1/chat/completions` trả kết quả hợp lệ, cổng 8000 **không** nghe trên địa chỉ công khai (`ss -tlnp | grep 8000` chỉ hiện `127.0.0.1`).

#### Bước 3 — Công bố endpoint an toàn (ETV.P28, ETV.P35)

**Câu hỏi phải trả lời trước:** ManLab AIOS gọi máy chủ này từ đâu? Nếu cả hai cùng nằm trong hạ tầng của Viện thì **không cần endpoint công khai** — dùng địa chỉ nội bộ và tường lửa là đủ, và giữ nguyên được lập luận "dữ liệu không rời hạ tầng" của §3.7. Chỉ khi ManLab đặt ngoài mới cần phương án B hoặc C dưới đây.

| PA | Cách làm | Điều kiện áp dụng |
| --- | --- | --- |
| **A** | Địa chỉ nội bộ + tường lửa, không phơi ra Internet | **Ưu tiên.** Khi ManLab chạy trong hạ tầng Viện |
| **B** | IP tĩnh + tường lửa + Nginx/Caddy + TLS do Viện quản lý | Khi cần truy cập từ ngoài mà vẫn giữ toàn bộ đường truyền trong tầm kiểm soát của Viện |
| **C** | Đường hầm của nhà cung cấp (Cloudflare Tunnel hoặc tương đương) | **Chỉ khi A và B không khả thi**, và phải qua các điều kiện dưới đây |

**Phương án C làm thay đổi ranh giới "nội bộ" — không phải lựa chọn kỹ thuật thuần tuý.** Đường hầm kết thúc TLS tại hạ tầng của nhà cung cấp, nghĩa là nội dung lời nhắc và phản hồi **đi qua bên thứ ba dưới dạng rõ**. Khi đó máy chủ không còn thoả điều kiện "dữ liệu không rời hạ tầng của Viện", và trần mức bảo mật ở §3.7 phải hạ theo. Trước khi dùng, bắt buộc:

1. Xác định và ghi lại **luồng dữ liệu thật**: nơi kết thúc TLS, vị trí xử lý, nhà cung cấp có ghi nhật ký nội dung hay không, lưu ở đâu và bao lâu.
2. Đăng ký nhà cung cấp đường hầm là **nền tảng thuê ngoài và điểm tích hợp** theo ETV.P35; đánh giá nhà cung cấp theo ETV.P06; đối chiếu điều khoản bảo mật, DPA/SLA và phương án khi nhà cung cấp ngừng dịch vụ.
3. Ghi rủi ro vào **F28.01** và hạ trần §3.7 tương ứng.

TLS do nhà cung cấp cấu hình **không** chuyển trách nhiệm bảo mật sang họ — Viện vẫn chịu trách nhiệm đánh giá và giám sát.

Yêu cầu tối thiểu của endpoint ở mọi phương án: TLS 1.2 trở lên, xác thực bằng API key hoặc JWT, giới hạn tần suất, giới hạn kích thước yêu cầu, timeout, nhật ký truy cập.

Khoá API: sinh khoá đủ mạnh, lưu trong kho bí mật/biến môi trường theo ETV.P28; bản ghi `AISecret` trong M29 **chỉ lưu `maskedValue`**, không bao giờ lưu giá trị thật. Nghiêm cấm đặt khoá trong mã nguồn, kho Git, nhật ký hoặc frontend. Rủi ro ATTT của máy chủ ghi tại **F28.01**.

**Gate 3 —** endpoint trả 200 khi có khoá đúng và 401 khi sai khoá; cổng của engine không truy cập được từ ngoài; F28.01 đã cập nhật; nếu dùng phương án C thì đã có đủ 3 điều kiện trên.

#### Bước 3b — Kiểm soát nhật ký và dữ liệu tạm (ETV.P28, ETV.P29, ETV.P34)

Máy chủ mô hình nhận toàn văn lời nhắc, nên mọi chỗ ghi lại lời nhắc đều là bản sao dữ liệu nằm ngoài hệ thống. Phải xác lập trước khi có lượt gọi thật:

| Hạng mục | Yêu cầu |
| --- | --- |
| Nhật ký engine và reverse proxy | **Không ghi thân yêu cầu** mặc định; kiểm chứng bằng cách gửi một chuỗi mồi rồi tìm lại trong toàn bộ nhật ký — phải không tìm thấy |
| Bí mật xác thực | Không xuất hiện trong nhật ký, kể cả tiêu đề `Authorization` |
| Dữ liệu tạm | Xác định lời nhắc và KV cache nằm ở RAM hay tràn xuống đĩa/swap; nếu có tràn xuống đĩa thì đĩa phải được mã hoá |
| Kết xuất sự cố | Tắt core dump và crash dump của tiến trình engine, hoặc bảo đảm chúng không ghi ra vùng không kiểm soát |
| Vòng đời nhật ký | Có xoay vòng, đồng bộ thời gian, phân quyền truy cập, thời hạn lưu theo ETV.P.F 14.06 |
| Xoá khi dừng | Xoá mô hình, nhật ký và dữ liệu tạm khi ngừng vận hành hoặc chuyển giao máy chủ (§3.8) |

Nhật ký nghiệp vụ của lượt gọi nằm ở `AIRequest` trong ManLab, lưu theo thời hạn của ETV.P29 §9 — **không** thay bằng nhật ký của máy chủ mô hình.

**Gate 3b —** đã chạy phép thử chuỗi mồi và không tìm thấy trong nhật ký; core dump đã xử lý; thời hạn lưu và quyền truy cập nhật ký đã xác lập.

#### Bước 4 — Đăng ký trong AIOS (ETV.P35 → ETV.P29)

Đăng ký theo đúng thứ tự — nền tảng trước, provider và model sau:

**(a) Nền tảng số — F35.01 + đánh giá trước vận hành F35.02.** Máy chủ mô hình đăng ký là **một nền tảng số riêng**, không gộp vào bản ghi ManLab, để còn có chủ thể riêng cho kiểm tra sức khoẻ và ngừng vận hành. Liên kết bản ghi này với bản ghi tài sản F33.01 ở Bước 1 (ETV.P33 §2.1).

Bản ghi `AIPlatform` (M29/M35) điền như sau:

| Trường | Giá trị |
| --- | --- |
| `code` | `MANLAB_LOCAL_LLM` |
| `name` | Máy chủ mô hình AI nội bộ ETV |
| `apiBaseUrl` | `https://llm.manlab.vn/v1` |
| `environment` | `INTERNAL` (máy chủ nằm trong hạ tầng của Viện) |
| `adapterType` | `LocalOpenAIPlatformAdapter` (xem §3.6) |
| `owner` | Người quản trị hệ thống được giao |
| `approvalStatus` | `DRAFT` khi đăng ký → `APPROVED` khi được phê duyệt → `ACTIVE` khi đã bật giám sát và kết nối (Bước 6) |

**(b) Provider và Model — F29.01.** Tạo `AIProvider` mã `MANLAB_LOCAL`, sau đó tạo `AIModel` trỏ về provider đó: `modelId` phải **trùng đúng** giá trị `--served-model-name` đã đặt ở Bước 2 (`manlab-local-14b`), `displayName`, `purpose` (nhóm tác vụ được phép), `maxTokens`, `costPer1kTokens = 0` (mô hình nội bộ không tính phí theo token; chi phí điện và khấu hao theo dõi ở F33.01).

Hồ sơ mô hình ghi thêm vào F29.01: nguồn tải mô hình, giấy phép sử dụng, độ dài ngữ cảnh, mức lượng tử hoá, ngày triển khai, người phê duyệt.

**Gate 4 —** đã có bản ghi `AIPlatform` + `AIProvider` + `AIModel` khớp nhau; kiểm tra sức khoẻ nền tảng từ AIOS trả `HEALTHY`; F35.01, F35.02, F29.01 đã lập.

#### Bước 5 — Đánh giá tác động, kiểm thử và đo hiệu năng (ETV.P29)

**(a) Đánh giá tác động AI — F29.02.** Mỗi Agent/Copilot chuyển sang dùng mô hình nội bộ phải có AIA đã phê duyệt trước khi vận hành. Nếu Agent đang chạy trên mô hình khác thì đây là **thay đổi hệ thống AI** theo ETV.P29 §5.8 — phải rà lại AIA hiện có, không mặc nhiên dùng lại.

**(b) Kiểm thử — F29.03.** Không nghiệm thu chỉ bằng khả năng hội thoại. Bộ kiểm thử phải phủ: tiếng Việt chuyên ngành đo lường/môi trường, hỏi–đáp trên tài liệu ISO/IEC 17025, bóc tách và phân loại tài liệu, RAG, **trả JSON đúng lược đồ**, gọi công cụ, và tỷ lệ bịa đặt thông tin. Dùng lại bộ kiểm thử đã có của Agent, chạy lại trên mô hình mới để so sánh.

**(c) Đo hiệu năng.** Đo trên chính prompt thật của ManLab, không dùng số liệu của nhà phát hành mô hình: thời gian tới token đầu tiên, số token/giây, độ trễ trung bình và P95, số yêu cầu đồng thời chịu được, VRAM đỉnh, tỷ lệ lỗi. Ghi kết quả làm mốc so sánh cho các lần nâng cấp sau.

**(d) Kiểm thử tình huống hỏng.** Bắt buộc chạy đủ năm tình huống, ghi kết quả vào F29.03:

| Mã | Tình huống | Kết quả phải đạt |
| --- | --- | --- |
| TC01 | Kiểm tra sức khoẻ khi nền tảng đang chạy | Trạng thái `HEALTHY` |
| TC02 | Gửi một lượt hỏi bình thường | Nhận phản hồi hợp lệ, có bản ghi `AIRequest` |
| TC03 | Máy chủ không phản hồi | AIOS dừng theo timeout, ghi nhật ký, xử lý theo chính sách §3.7 |
| TC04 | Khoá API sai | Yêu cầu bị từ chối, không lộ thông tin nội bộ trong thông báo lỗi |
| TC05 | Tắt hẳn máy chủ GPU | Nền tảng chuyển `DOWN`; **AIOS không treo, không sập** |

**Gate 5 —** AIA đã phê duyệt, F29.03 đạt tiêu chí đã định, năm tình huống TC01–TC05 đều đạt.

#### Bước 6 — Phê duyệt và đưa vào sử dụng

Trình tự trạng thái, không được bỏ bước:

```text
Triển khai → Kiểm thử → Đo hiệu năng → Đánh giá → Kiểm tra ATTT → Phê duyệt → Đang dùng
```

Thẩm quyền phê duyệt theo **mức tác động của Agent sử dụng mô hình**, áp đúng ETV.P29 §6 — không đặt một mức cứng cho mọi trường hợp. Sau khi được phê duyệt: `AIPlatform.approvalStatus` chuyển `APPROVED` rồi `ACTIVE` khi đã bật giám sát, `AIModel.status = ACTIVE`, bật quy tắc định tuyến. **Từ thời điểm này** Copilot/Agent mới được phép dùng mô hình.

### 3.5. Bảng tham số cấu hình cần chốt trước khi triển khai

| Tham số | Giá trị dùng cho máy chủ hiện tại | Ghi chú |
| --- | --- | --- |
| Điểm cuối máy chủ mô hình | Theo phương án chọn ở Bước 3; `https://llm.manlab.vn` chỉ áp dụng nếu buộc phải phơi ra ngoài | Bước 3 |
| Cổng nội bộ của engine | `127.0.0.1:8000` | Không publish |
| Mã nền tảng (`AIPlatform.code`) | `MANLAB_LOCAL_LLM` | Bước 4a |
| Mã provider (`AIProvider.code`) | `MANLAB_LOCAL` | Bước 4b |
| Tên mô hình phục vụ | `manlab-local-14b` | Trùng `--served-model-name` |
| Cỡ mô hình | 7B–14B, INT4 (AWQ/GPTQ) | §3.3 |
| `--max-model-len` | 16384 (hạ 8192 nếu thiếu VRAM) | §3.4 Bước 2 |
| `--gpu-memory-utilization` | 0.90 | |
| `--tensor-parallel-size` | 1 | Một GPU |
| Timeout gọi mô hình | 30 000 ms | Bằng ngưỡng đang áp cho nền tảng mô hình hiện có |
| Số lần thử lại | 1 | Tránh dồn tải lên một GPU duy nhất |

### 3.6. Hiện trạng phía ManLab AIOS (dành cho người lập trình)

Cập nhật tới 25/08/2026. **Phần lớn đã triển khai** — đọc bảng này trước khi viết mã để không làm lại.

| Hạng mục | Hiện trạng | Bằng chứng nghiệm thu |
| --- | --- | --- |
| `AIProvider.platformId` → `AIPlatform` (tùy chọn, `onDelete: Restrict`) | **Đã có** | `prisma/schema.prisma`, di trú `20260825141357_m29_provider_platform_link` |
| `LocalOpenAIPlatformAdapter` (`health` + `chat`, đã đăng ký trong `ADAPTERS`) | **Đã có** | `src/lib/m29/adapters.ts`; 14 ca test tại `__tests__/adapters-local.test.ts` |
| Biến môi trường `LOCAL_LLM_API_KEY` | **Đã có** | `.env.example` |
| Ghi `AIRequest` mỗi lượt gọi và `AIAuditLog` mỗi thay đổi cấu hình | **Đã có** | `src/lib/m29/gateway.ts`, `actions.ts` |
| Trần mức bảo mật **theo từng nền tảng** | **Còn thiếu** — hiện là biến toàn cục `COPILOT_MUC_BAO_MAT_TOI_DA`, áp chung cho mọi nền tảng | Phải có trước khi nới trần cho máy chủ nội bộ (§3.7) |
| Quy tắc định tuyến theo loại tác vụ và mức phân loại dữ liệu | **Còn thiếu** — nền tảng gắn cứng ở `AIAgent.platformId` | Tối thiểu cần: loại tác vụ, mức phân loại, đích, thứ tự ưu tiên, dự phòng, cờ bật/tắt |
| Vòng dò sức khoẻ với nền tảng ở trạng thái **Hiệu lực** | **Còn thiếu** — `checkHealthAction()` chỉ quét `APPROVED`, bỏ sót `ACTIVE` | Nền tảng chuyển Hiệu lực theo Bước 6 vẫn phải được dò |
| Màn hình tạo Provider kèm chọn nền tảng | **Còn thiếu** — danh mục hiện chỉ đọc | — |

**Quyết định kiến trúc đã chốt, không mở lại:** endpoint chỉ có **một** nguồn sự thật là `AIPlatform.apiBaseUrl`; không nhân đôi `baseUrl` sang `AIProvider`. Khoá API đọc từ biến môi trường, **không** từ `AISecret` (bảng đó cố ý chỉ lưu `maskedValue`).

### 3.7. Định tuyến theo mức phân loại dữ liệu và dự phòng

Đây là điểm kiểm soát quan trọng nhất của hướng dẫn này, vì nó quyết định dữ liệu của Viện có rời khỏi hạ tầng nội bộ hay không.

| Mức phân loại dữ liệu | Mô hình nội bộ | Dịch vụ mô hình bên ngoài |
| --- | --- | --- |
| Công khai | Được | Được |
| Nội bộ | Được | Chỉ khi chính sách cho phép |
| Hạn chế | **Chưa được phép** — xem dưới | **Không** |
| Mật | **Không đưa vào AI** (ETV.P29 §5.1.5) | **Không** |

> **Dữ liệu mức Hạn chế: chưa được phép đưa vào hệ thống AI, kể cả mô hình nội bộ.**
>
> Lý do là một **xung đột chưa được giải quyết ở cấp thủ tục**, không phải hạn chế kỹ thuật:
>
> - **ETV.P29 §5.1.5** liệt kê "truy cập **hoặc** lập chỉ mục dữ liệu mức Hạn chế, Mật" vào **Điều cấm tuyệt đối**, vi phạm là sự cố AI mức nghiêm trọng. **ETV.P26** cấm đưa tri thức Hạn chế/Mật vào chỉ mục trợ lý AI.
> - **ETV.P34 §6.8** lại cho phép dữ liệu Hạn chế "dùng trên nền tảng AI đã đăng ký và đã phê duyệt theo ETV.P35, không đưa lên dịch vụ AI công cộng".
>
> Hướng dẫn này **không có thẩm quyền chọn bên nào** (§1). Cho tới khi ETV.P29, ETV.P26 và ETV.P34 được thống nhất, áp bản cấm chặt hơn.
>
> Trường hợp dự kiến cho phép phải hội đủ: **phê duyệt của LĐV** cho mục đích sử dụng, **ý kiến PT.ATTT**, hồ sơ **AIA** đã phê duyệt (F29.02), và kiểm soát kỹ thuật đã được xác nhận (§3.6 trần theo từng nền tảng, §3.4 Bước 3b nhật ký) — theo ETV.P34 §6.8.
>
> Ghi chú diễn giải: cách hiểu "P29 chỉ cấm lập chỉ mục, còn truy xuất trực tiếp theo yêu cầu thì được" **không dùng được** với câu chữ hiện tại, vì §5.1.5 cấm cả *truy cập*. Nếu ý định thật là chỉ cấm lập chỉ mục thì phải sửa câu chữ của P29, không diễn giải tại đây.

**Quy tắc dự phòng khi máy chủ nội bộ mất khả dụng:**

```text
NẾU mức phân loại dữ liệu cao hơn mức mà nền tảng dự phòng được phép nhận
   VÀ máy chủ nội bộ đang DOWN
THÌ  KHÔNG chuyển sang nền tảng đó
     Trả lỗi có kiểm soát cho người dùng và ghi nhật ký
```

Không có ngoại lệ vì lý do khả dụng: mất dịch vụ là sự cố chấp nhận được, gửi dữ liệu vượt trần thì không.

Với dữ liệu Công khai và Nội bộ, việc chuyển sang dịch vụ bên ngoài chỉ được thực hiện **theo chính sách đã phê duyệt**, không phải mặc định của hệ thống. Máy chủ GPU hỏng **không được phép** làm sập toàn bộ ManLab AIOS: mất mô hình nội bộ chỉ làm mất tính năng AI của các luồng liên quan.

### 3.8. Giám sát, sự cố, thay đổi và ngừng vận hành

**Giám sát (ETV.P35 §F35.03).** Tối thiểu theo dõi: trạng thái kiểm tra sức khoẻ và thời điểm kiểm tra gần nhất, độ trễ, tỷ lệ lỗi, mức sử dụng GPU và VRAM, nhiệt độ và công suất GPU, dung lượng đĩa, số yêu cầu/phút, số token/giây. Cảnh báo khi: GPU quá nhiệt, cạn VRAM, dịch vụ ngừng, tỷ lệ lỗi tăng bất thường, đầy đĩa, tiến trình mô hình chết.

**Sự cố.** Sự cố liên quan chất lượng đầu ra hoặc hành vi AI → **F29.04**; sự cố lộ lọt dữ liệu, khoá API → **F28.03**; hỏng hóc phần cứng, mất dịch vụ do hạ tầng → **F33.04**; mất khả dụng nền tảng → **F35.03**. Một sự cố có thể phải lập nhiều phiếu; liên kết chúng bằng mã phiếu, không chép nội dung sang nhau.

**Bảo trì.** Đặt nền tảng về trạng thái bảo trì trước khi dừng dịch vụ; ngừng nhận yêu cầu mới, xử lý nốt yêu cầu đang chạy, áp chính sách dự phòng §3.7, ghi nhật ký bảo trì vào F33.02.

**Nâng cấp hoặc đổi mô hình.** Tạo bản ghi `AIModel` **mới**, không sửa đè bản đang `ACTIVE` (ETV.P29 nguyên tắc 4). Phải chạy lại đủ Bước 5 và Bước 6. Không tự động đổi mô hình đang chạy chỉ vì có phiên bản mới. Khi mô hình mới lỗi: chuyển bản mới về `DISABLED`, kích hoạt lại bản trước đó — do đó bản cũ chỉ được xoá sau khi bản mới đã chạy ổn định.

**Ngừng vận hành.** Theo ETV.P35 (F35.04): chuyển hết Agent sang mô hình khác, thu hồi khoá API, xoá mô hình và dữ liệu tạm trên máy chủ, cập nhật F33.01 và F29.01, giữ lại nhật ký theo thời hạn lưu.

### 3.9. Tiêu chí nghiệm thu tổng thể

Chỉ đánh dấu hoàn thành khi **toàn bộ** các mục sau đạt:

- [ ] Hệ điều hành và container đều nhận đúng GPU; mô hình nạp và suy luận được.
- [ ] `GET /v1/models` và `POST /v1/chat/completions` hoạt động; đã kiểm thử đầu ra JSON có cấu trúc.
- [ ] Endpoint dùng HTTPS, có xác thực, có giới hạn tần suất và nhật ký truy cập; cổng engine không public; khoá API không nằm trong mã nguồn hay kho Git.
- [ ] Đã có bản ghi `AIPlatform` + `AIProvider` + `AIModel` khớp nhau và kiểm tra sức khoẻ chạy được từ AIOS.
- [ ] Đã có định tuyến, timeout, số lần thử lại và chính sách dự phòng theo mức phân loại dữ liệu.
- [ ] Mỗi lượt gọi sinh `AIRequest`; mọi thay đổi cấu hình sinh `AIAuditLog`.
- [ ] TC01–TC05 đạt; đo hiệu năng và kiểm thử chức năng hoàn thành; AIA đã phê duyệt.
- [ ] Nhật ký không chứa lời nhắc và bí mật xác thực (phép thử chuỗi mồi, Gate 3b); thời hạn lưu và quyền truy cập đã xác lập.
- [ ] Chuỗi cung ứng: image ghim phiên bản + digest, mô hình có checksum và giấy phép hợp lệ, đã quét lỗ hổng, `--trust-remote-code` **không** bật.
- [ ] **LĐV phê duyệt** việc dùng dữ liệu của Viện cho AI, có ý kiến PT.ATTT (ETV.P34 §6.8); tập dữ liệu đã có bản ghi trong **F34.01**, yêu cầu khai thác ghi tại **F34.03**.
- [ ] Dữ liệu thật dùng trong bộ kiểm thử đã được ẩn danh hoặc loại dữ liệu cá nhân.
- [ ] Đã mở hồ sơ rủi ro **ETV.P01**; nếu nền tảng ở mức trọng yếu Cao thì có phương án liên tục theo **ETV.P31**.
- [ ] Nếu AI tham gia xử lý dữ liệu kỹ thuật: đã **xác nhận giá trị sử dụng** theo ISO/IEC 17025 §7.11 (ETV.P35).
- [ ] Nếu dùng thành phần dịch vụ bên ngoài (đường hầm, hosting): đã đánh giá nhà cung cấp theo **ETV.P06** và đăng ký điểm tích hợp theo **ETV.P35**.
- [ ] Nếu tích hợp ảnh hưởng liên phòng: đã phê duyệt thay đổi theo **ETV.P30**.
- [ ] Đã lập đủ hồ sơ: F33.01, F35.01, F35.02, F28.01, F29.01, F29.02, F29.03, F34.01, F34.03.
- [ ] Đã thử nghiệm quay lại bản trước — cả **image, driver, CUDA và mô hình**, không chỉ mô hình.

**Định nghĩa hoàn thành:** một lượt hỏi từ người dùng đi trọn vòng `ManLab AIOS → Control Plane → MANLAB_LOCAL → llm.manlab.vn → vLLM → RTX 3090 → phản hồi → nhật ký/chi phí/sức khoẻ`, và khi tắt máy chủ GPU thì AIOS nhận biết trạng thái `DOWN`, không sập, xử lý đúng chính sách dự phòng §3.7.

---

## 4. BIỂU MẪU LIÊN QUAN

Hướng dẫn này **không lập biểu mẫu mới** — dùng lại toàn bộ biểu mẫu đã ban hành:

| Biểu mẫu | Dùng ở bước |
| --- | --- |
| ETV.P.F 33.01 — Danh mục tài sản công nghệ thông tin | Bước 1 |
| ETV.P.F 33.02 — Kế hoạch và hồ sơ bảo trì | Bước 1, §3.8 |
| ETV.P.F 33.03 — Danh mục tài khoản hệ thống | Bước 1 |
| ETV.P.F 33.04 — Phiếu sự cố và hỗ trợ CNTT | §3.8 |
| ETV.P.F 28.01 — Hồ sơ đánh giá và xử lý rủi ro ATTT | Bước 3 |
| ETV.P.F 28.03 — Phiếu sự cố an toàn thông tin | §3.8 |
| ETV.P.F 28.04 — Phiếu yêu cầu quyền truy cập | Bước 1 |
| ETV.P.F 35.01 — Danh mục nền tảng số | Bước 4a |
| ETV.P.F 35.02 — Phiếu đánh giá nền tảng số trước khi vận hành | Bước 4a |
| ETV.P.F 35.03 — Phiếu sự cố và nhật ký giám sát nền tảng số | §3.8 |
| ETV.P.F 35.04 — Phiếu ngừng vận hành nền tảng số | §3.8 |
| ETV.P.F 29.01 — Danh mục hệ thống trí tuệ nhân tạo | Bước 4b |
| ETV.P.F 29.02 — Phiếu đánh giá tác động AI (AIA) | Bước 5a |
| ETV.P.F 29.03 — Phiếu kiểm thử và đánh giá chất lượng hệ thống AI | Bước 5b–5d |
| ETV.P.F 29.04 — Phiếu sự cố trí tuệ nhân tạo | §3.8 |
| ETV.P.F 34.01 — Danh mục dữ liệu số, từ điển dữ liệu | Bước 5, §3.9 |
| ETV.P.F 34.03 — Phiếu khai thác, chia sẻ dữ liệu | Bước 5, §3.9 |

---

*(Chân trang bắt buộc khi in: mã số | lần ban hành | ngày ban hành | ngày soát xét | trang/tổng số trang)*

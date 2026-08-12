# BPMN dạng text

```text
Start Event: Nhận yêu cầu
Task: Phân loại yêu cầu
Gateway: Đủ căn cứ?
  - No -> Task: Nêu giả định/câu hỏi tối thiểu -> End
  - Yes -> Task: Áp dụng rulebook
Task: Soạn đầu ra
Task: Kiểm tra tuân thủ
Gateway: Có rủi ro không?
  - Yes -> Task: Gắn cảnh báo và khuyến nghị
  - No -> Task: Hoàn thiện
End Event: Bàn giao đầu ra
```

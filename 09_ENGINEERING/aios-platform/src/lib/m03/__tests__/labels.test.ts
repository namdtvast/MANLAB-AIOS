// Hai enum thêm ở increment K2/K3/K4 (DataModel.md §4). Bộ test giữ đúng hai điều:
//
// 1. Mọi giá trị enum đều có nhãn tiếng Việt. Thiếu một nhãn thì giao diện hiện thẳng mã DB
//    ("QUAN_TRAC_RA_KHI") cho người dùng — hỏng lặng lẽ, build vẫn xanh, test khác vẫn xanh.
// 2. Hai trục trạng thái không dùng chung bảng nhãn. Đây là cả lý do K3 tồn tại: trên ManLab
//    trạng thái duyệt bản ghi và trạng thái lao động bị gộp một cột, nên người đã nghỉ việc
//    không biểu diễn được là hồ sơ đã duyệt hay chưa. Nếu ai đó gộp lại hai bảng nhãn này,
//    lỗi cũ quay lại ở tầng giao diện.
import { describe, expect, it } from "vitest";
import { M03EmployeeRecordStatus, M03InspectionField } from "@/generated/prisma/enums";
import { EMPLOYEE_RECORD_STATUS_LABEL, EMPLOYEE_STATUS_LABEL, INSPECTION_FIELD_LABEL } from "../labels";

describe("INSPECTION_FIELD_LABEL", () => {
  it("phủ đủ 12 lĩnh vực kiểm định, không thiếu giá trị nào của enum", () => {
    const enumValues = Object.values(M03InspectionField);
    expect(enumValues).toHaveLength(12);
    for (const v of enumValues) {
      expect(INSPECTION_FIELD_LABEL[v], `thiếu nhãn cho ${v}`).toBeTruthy();
    }
  });

  it("không có nhãn thừa trỏ tới lĩnh vực không tồn tại trong enum", () => {
    const enumValues = new Set<string>(Object.values(M03InspectionField));
    for (const k of Object.keys(INSPECTION_FIELD_LABEL)) {
      expect(enumValues.has(k), `nhãn thừa: ${k}`).toBe(true);
    }
  });

  it('"Không áp dụng"/"Không lĩnh vực" của ManLab KHÔNG phải giá trị enum — biểu diễn bằng 0 dòng', () => {
    const enumValues = Object.values(M03InspectionField) as string[];
    expect(enumValues).not.toContain("KHONG_AP_DUNG");
    expect(enumValues).not.toContain("KHONG_LINH_VUC");
  });
});

describe("EMPLOYEE_RECORD_STATUS_LABEL", () => {
  it("phủ đủ 4 trạng thái duyệt bản ghi", () => {
    const enumValues = Object.values(M03EmployeeRecordStatus);
    expect(enumValues).toHaveLength(4);
    for (const v of enumValues) {
      expect(EMPLOYEE_RECORD_STATUS_LABEL[v], `thiếu nhãn cho ${v}`).toBeTruthy();
    }
  });

  it("tách hẳn khỏi trạng thái lao động — không khoá nào dùng chung", () => {
    const recordKeys = Object.keys(EMPLOYEE_RECORD_STATUS_LABEL);
    const employmentKeys = Object.keys(EMPLOYEE_STATUS_LABEL);
    expect(recordKeys.some((k) => employmentKeys.includes(k))).toBe(false);
  });

  it('không mang giá trị "Chấm dứt HĐLĐ" của ManLab — đó là trạng thái lao động, không phải trạng thái duyệt', () => {
    expect(Object.values(EMPLOYEE_RECORD_STATUS_LABEL)).not.toContain("Chấm dứt HĐLĐ");
    expect(EMPLOYEE_STATUS_LABEL.DANGHIVIEC).toBe("Đã nghỉ việc");
  });
});

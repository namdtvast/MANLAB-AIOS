---
name: 05-s-draw-io
description: Sinh sơ đồ Draw.io chuyên nghiệp (flowchart, BPMN, swimlane, sequence, ERD, C4, kiến trúc hệ thống, network, timeline, dashboard, mindmap, infographic) cho ManLab, ETV, DMC, P2D và các hệ thống quản lý theo ISO/IEC 17025, ISO 17034, ISO/IEC 42001.
version: "2.0"
---

# ManLab DrawIO Skill

Version: 2.0 Professional

## Purpose

This skill instructs Claude to generate high-quality Draw.io diagrams for ManLab, ETV, DMC, P2D and ISO-based management systems.

## Primary Objectives

- Convert natural language into professional Draw.io diagrams.
- Prefer clear, readable and maintainable layouts.
- Follow ISO/IEC 17025, ISO 17034 and ISO/IEC 42001 terminology.
- Produce diagrams suitable for documentation, presentations and software architecture.

## Supported Diagram Types

- Flowchart
- BPMN
- Swimlane
- Sequence
- ERD
- C4 Context / Container / Component
- System Architecture
- Network
- Timeline
- Dashboard
- Mind Map
- Infographic

## Workflow

1. Understand the user's intent.
2. Select the most appropriate diagram type.
3. Identify actors, processes, decisions and data.
4. Group related elements.
5. Generate a clean Draw.io structure.
6. Validate naming, alignment and flow.
7. Export:
   - .drawio
   - PNG
   - SVG
   - PDF
   - Markdown explanation

## Layout Rules

- One diagram = one purpose.
- Prefer Left → Right.
- Avoid connector crossings.
- Use consistent spacing.
- Maximum 15 primary nodes.
- Split large systems into multiple diagrams.

## Color Rules

Green   = Success / Approved
Red     = Error / Rejected
Orange  = Warning
Blue    = Main process
Gray    = Draft / Archive

## ISO Conventions

### ISO/IEC 17025

Use phases:

Receive
→ Review
→ Assign
→ Execute
→ Technical Review
→ Approval
→ Issue Result

### ISO 17034

Receiving
→ Production
→ Homogeneity
→ Stability
→ Certification

### ISO/IEC 42001

Policy
→ Risk
→ Design
→ Validation
→ Monitoring
→ Improvement

## ManLab Objects

Recognize:

- Báo giá
- Hợp đồng
- Phiếu yêu cầu
- Kiểm định
- Hiệu chuẩn
- Thử nghiệm
- Báo cáo
- Giấy chứng nhận
- PKQ
- DMC
- P2D
- Dashboard
- AI Agent

## Diagram Selection

Process -> Flowchart

Multiple Roles -> BPMN

Database -> ERD

Software -> C4

AI -> Architecture

Management -> Dashboard

Presentation -> Infographic

## Output Naming

<Module>_<DiagramType>_v1.drawio

Examples

P11_Workflow_v1.drawio

DMC_Architecture_v1.drawio

P2D_System_v1.drawio

## Quality Checklist

- Correct terminology
- No crossing lines
- Consistent symbols
- Readable labels
- ISO compliant
- Export successful

## Default Behaviour

Always explain briefly why the selected diagram type is appropriate.

If information is missing:

- State assumptions clearly.
- Never invent ISO requirements.
- Ask concise clarification questions when necessary.

## End

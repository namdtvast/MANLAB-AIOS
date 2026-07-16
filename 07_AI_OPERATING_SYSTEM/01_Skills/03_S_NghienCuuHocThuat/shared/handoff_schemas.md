# Handoff Schemas

Mọi agent bàn giao bằng khối:

```yaml
handoff_version: 1
from_agent: ...
to_agent: ...
project_id: ...
phase: ...
inputs_used: []
outputs_created: []
confirmed_facts: []
provisional_assumptions: []
open_questions: []
risks: []
quality_gate_status: PASS|CONDITIONAL|FAIL
```

Không được giấu giả định trong văn xuôi. Tệp đầu ra phải được liệt kê rõ.

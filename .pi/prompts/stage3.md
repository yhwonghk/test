---
description: Stage 3 — resolve [NEEDS CONFIRMATION] flags against the updated SA&D graph
argument-hint: "<TEST_CASE_ID> [new-doc ...]"
---
Run STAGE 3 (confirmation resolution) of the CMMP-DI smoke-test pipeline.

- <TEST_CASE_ID> = `$1`
- Newly added SA&D documents to verify in the graph (may be empty): ${@:2}

Read `AGENTS-STAGE3.md` with `read` and follow it exactly. Do not run Stage 1 or Stage 2 in
this turn. Load the graphify skill and use it as the ONLY source of any value you add; the
workbooks and traceability files are read and written only through
`python tools/stage3_confirm.py inventory $1` and `python tools/stage3_confirm.py apply $1`.
Obey every `STOP:` line the script prints (report it verbatim and wait). Finish with the chat
summary described in AGENTS-STAGE3.md, including the validator's PASS/FAIL block verbatim.

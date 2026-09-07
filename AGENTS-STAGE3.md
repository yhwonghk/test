# Role
   You are a senior QA engineer running the CONFIRMATION RESOLUTION pass for the
   CMMP-DI smoke-test pipeline. Stage 1 and Stage 2 left "[NEEDS CONFIRMATION - ...]"
   flags wherever the SA&D knowledge graph could not ground an item at the time
   (missing documents, a fuzzy index candidate below threshold, no source). New SA&D
   documents have since been added and the graphify graph has been UPDATED (Stage 0).
   Your job: find every open flag, re-check it against the updated graph, fill in
   what the graph now PROVES, and leave everything else flagged. The QA Lead signs
   off on the result, so a wrong "resolved" is far worse than an honest "still open".

# Scope (STAGE 3 of 3 — read before doing anything)
   This file governs ONLY Stage 3: resolving NEEDS CONFIRMATION flags in artefacts
   that Stage 1 / Stage 2 already produced. It does NOT create stories, steps,
   features, systems or accounts, and it does NOT redesign anything. It replaces a
   flag with a graph-proven value, refines a flag with better evidence, or leaves
   it alone — nothing else.
   - If the request is to fill the Scenario sheet, follow AGENTS-STAGE1.md.
   - If the request is to generate per-story test files, follow AGENTS-STAGE2.md.
   - Never mix procedures in one run. If the request could mean two stages, ask.
   Precondition: <TEST_CASE_ID>-output/scenario.xlsx exists (Stage 1 approved) and
   graphify-out/graph.json was rebuilt or updated AFTER the Stage 1/2 outputs were
   written. If the graph is older than the outputs, Stage 3 would only reproduce the
   same gaps: STOP and send the user back to Stage 0 (`/graphify <docs> --update`).

# Relationship to AGENTS.md (read this — it is a deliberate exception)
   AGENTS.md tells Stages 1 and 2 not to run `graphify query/explain/path` and not to
   load the graphify skill, because `tools/graphify_context.py` already answers every
   item in one context pack. Stage 3 is the ONE stage that DOES load and use the
   graphify skill directly. Reason: the items in scope are exactly the ones the fixed
   context-pack queries could NOT ground, so resolving them needs adaptive querying
   (vocabulary expansion, DFS traces, `explain` on a candidate ID, `path` between a
   feature and an ID). Every other AGENTS.md rule still applies: scripts do the
   reading and writing, no grepping the documents, no memory, batched shell calls,
   a fixed call budget, and `STOP:` lines are obeyed verbatim.

# Information-source rule (hard constraint — the reason this stage exists)
   The graphify skill, run against graphify-out/graph.json, is the ONLY source of
   any fact you add: `graphify query`, `graphify explain`, `graphify path`.
   NOT from memory or general knowledge of email systems.
   NOT from grepping / opening the SA&D documents to search.
   NOT from other test cases' outputs, earlier chat turns, or the index score that
       produced the flag (a score of 0.48 is a hint about WHERE to look, not evidence).
   NOT from the feature name "obviously" meaning something.
   If graphify cannot show it, it stays flagged. The single permitted document read
   is the narrow "excerpt check" defined under the graphify protocol.

# Definition of smoke test (unchanged lens)
   Shallow and wide, happy-path, cross-platform. Stage 3 never adds negative
   coverage, extra steps or deeper detail — even if the new documents would allow it.
   Anything the graph newly reveals that is out of scope goes into the report as a
   proposal for the QA Lead, never into the workbooks.

# Test Case ID and artefact discovery (do this first — nothing is hardcoded)
   1. <TEST_CASE_ID> = the first argument ($1). Optional further arguments = the file
      names (or titles) of the SA&D documents that were newly added to the graph;
      use them for the graph-freshness check below.
   2. Artefacts (all located by content, never by assumed coordinates):
        <TEST_CASE_ID>-output/scenario.xlsx                    (Stage 1, required)
        <TEST_CASE_ID>-output/traceability.md                  (Stage 1, required)
        <TEST_CASE_ID>-output/tests/<TEST_CASE_ID>-story<N>.xlsx (Stage 2, optional)
        <TEST_CASE_ID>-output/tests/traceability.md            (Stage 2, optional)
      If tests/ is absent, Stage 2 has not run: resolve the scenario only and say so.
      Ignore any *:Zone.Identifier files.
   3. Cross-check: scenario.xlsx B2 and every story file's B2 must equal
      <TEST_CASE_ID>. Any mismatch -> STOP and ask; do not guess.
   4. A flag is any cell or Markdown line containing "[NEEDS CONFIRMATION - ...]"
      (case-insensitive; also accept "NEED CONFIRMATION"). The inventory scans EVERY
      cell of EVERY sheet, so flags in unexpected places (a story text, a Testing
      Step, a Using Channel cell) are found too. Expected hot spots, for orientation:
        scenario.xlsx : C6 Included Features (the "(...)" after each feature),
                        K5 Involved System(s), K3 Involved Mail System,
                        M3 Involved Dept, K4 Classification Level, K6 accounts
        story files   : column K Covers Tender Req (rows 13+), column H Involved
                        System, D6:D9 Using Channel, C3 Scenario Highlight
        traceability  : Source column of flagged rows + the Open Questions section

# Task
   1. INVENTORY every flag into a Confirmation Register, grouped by subject (the
      same feature flagged in scenario C6 and in three story files' column K is ONE
      group with several locations — it gets ONE decision).
   2. RESOLVE every GRAPH group with the graphify skill under the evidence rubric.
   3. WRITE the decisions to <TEST_CASE_ID>-output/stage3/resolutions.json.
   4. APPLY: back up, write only the flagged cells, update both traceability files,
      write the confirmation report, run the validators.
   5. REPORT in chat so the QA Lead can review without opening files.

# Confirmation Register — classes and statuses
   Each group carries a CLASS (who can answer it) and ends with a STATUS.
   CLASS
     GRAPH             SA&D ID, official system name, workflow role/order, a
                       classification rule, an interface — the graph can answer.
     GRAPH-CONSTRAINED Using Channel: the graph may say which channel the documented
                       workflow uses, but the value MUST also be one of the
                       summary.xlsx Platform values for <TEST_CASE_ID> (the register
                       prints that list). Graph names a channel not in Platform ->
                       stays open, note the conflict.
     HUMAN             Login names, Posts, Person In-charge, Test Case ID,
                       Participant -> department mapping, "test.xlsx held no step
                       data", anything whose authority is role.xlsx / summary.xlsx /
                       test.xlsx rather than the SA&D. Do NOT query graphify for
                       these; list them for the human unchanged.
   STATUS
     RESOLVED   the flag is replaced by a value (rubric below, ALL conditions met)
     PARTIAL    one candidate, evidence short of the rubric -> flag text is refined
     AMBIGUOUS  two or more candidates with comparable evidence -> flag refined
     OPEN       no usable graph evidence -> cell text unchanged
     HUMAN      not a graph question -> cell text unchanged

# Evidence rubric — what RESOLVED requires (all of a–e)
   a) A graph node for the value itself (the SA&D ID, the official system name, the
      role/channel), with its label exactly as graphify printed it.
   b) A link between that node and the flagged subject: an EDGE line in the
      query/explain/path output, or the node's own cited excerpt naming the subject.
   c) Confidence of the decisive edge is EXTRACTED. INFERRED is accepted ONLY when
      the excerpt check (below) confirms the cited lines describe the subject, and
      you quote those lines. AMBIGUOUS is never accepted for RESOLVED.
   d) The node's `src` is an SA&D document. Nodes whose src lies under any
      `*-output/` folder, under `graphify-out/` (memory, saved Q&A, reflections) or
      in a workbook are self-references — your own earlier flags may be in the graph
      if the output folder was ever indexed. Ignore them completely.
   e) Exactly ONE candidate value survives (a)–(d). Two survivors -> AMBIGUOUS.
   Additional rules:
   - For a "candidate <ID> '<label>' score <s>" flag, the candidate is where you
     START looking, not what you confirm. Check it with `explain`/`path`; if the
     graph links the subject more strongly to a different ID, that ID wins (or the
     pair becomes AMBIGUOUS) — never "confirm" the candidate for lack of a better one.
   - For "not found in SA&D index" / "no source found" flags, the vocabulary
     expansion decides whether the corpus can even talk about the subject. Zero
     vocabulary tokens -> OPEN with reason "no graph vocabulary".
   - A new system, actor or step revealed by the graph but absent from scenario K5 /
     K6 / the stories is NOT written anywhere: it goes under "Proposed additions" in
     the report (scope decisions belong to the QA Lead).
   - If graphify contradicts a value that is NOT flagged (an ID Stage 1 already
     filled), do NOT change it: report it under "Contradictions".

# Inputs
   Working folder:  ./<TEST_CASE_ID>/          (summary.xlsx — Platform list only)
   Stage outputs:   ./<TEST_CASE_ID>-output/   (see discovery)
   Graph:           ./graphify-out/graph.json  (+ graphify CLI or the skill's inline
                                               NetworkX fallback; both are graphify)
   Index (info):    ./ref/sad-index.json — NOT used for resolution. If it is older
                    than graph.json, report "index stale — re-run the Stage 0 index
                    step" so future Stage 1/2 runs benefit. Never block on it.
   Helper script:   tools/stage3_confirm.py  (inventory / apply). It does all
                    workbook and Markdown reading and writing. If it is missing,
                    STOP and report — do not improvise with ad-hoc Python.

# The graphify protocol (mandatory, per GRAPH / GRAPH-CONSTRAINED group)
   Follow the graphify skill's own query flow; the steps below fix HOW it is used.
   0. Vocabulary expansion (skill Step 0, REQUIRED). Build graphify-out/.vocab.txt
      ONCE for the whole run with the snippet from the graphify skill's
      references/query.md (Step 0). For each group pick up to 12 tokens FROM THAT LIST ONLY
      that express the subject (e.g. "check send RM using SM/RSA Cert" -> tokens such
      as `certificate`, `rsa`, `encrypt`, `sign`, `send` IF they are in the vocab).
      Print, per group: `Query expanded to (from graph vocab, N tokens): [...]`.
      Never invent a token or substitute a synonym from memory. Empty list -> OPEN.
   1. `graphify query "<expanded tokens>" --budget 3000` (BFS, default). Use `--dfs`
      when the question is a chain ("who approves before the system sends").
   2. If the flag names a candidate ID: `graphify explain "<ID>"`; and if the query
      output does not already show the link, `graphify path "<subject node label>"
      "<ID node label>"`. Node labels come from step 1 output, not from guesses.
   3. Record VERBATIM for every hit you rely on: node label, relation, confidence
      tag, `src`, `loc`, and the exact command that produced it.
   4. Excerpt check (the ONLY permitted document read; narrow by design). When the
      decisive edge is INFERRED, or when you are about to resolve a system name,
      role or channel, print ONLY the cited lines (`loc` ± 5 lines) of the cited
      `src` file and quote at most two of them in `excerpt_quote`. Never search,
      grep, scroll or open a file graphify did not cite.
   5. After deciding, close the skill's feedback loop in ONE batched call:
      `graphify save-result --question "<subject>" --answer "<decision + evidence>"
      --type query --nodes <labels> --outcome useful|dead_end`.
   Batching: all step-1 queries for all groups in ONE bash call; all step-2/4
   commands in ONE bash call. Never re-run a command to re-check what is already on
   screen. Never guess an ID and then search for it: IDs come only from the flag
   (index candidate) or from graphify output.

# Mandatory procedure (fixed call sequence — budget 8 tool calls)
   1. bash  `python tools/stage3_confirm.py inventory <TEST_CASE_ID>`
            chained with one `graphify query "<distinctive title words>"` per newly
            added document named in the arguments. The graph contains the document
            when at least one NODE line shows that document as its `src`; a
            document is usually not a node itself, so do not rely on `explain`.
            The script prints the register, the class counts, the Platform list and
            any `STOP:` line (graph older than the artefacts, missing artefacts, B2
            mismatch, un-parsable flag). A `STOP:` line ends the run: report it
            verbatim and wait. A new document that graphify cannot find -> STOP too.
            If it reports "a completed Stage 3 pass exists": to FIX that pass, skip
            to step 4 (edit resolutions.json) and step 5; to start a NEW pass
            because the graph was updated AGAIN, re-run with `--new-pass` (the
            previous pass is archived under stage3-archive/<timestamp>/ and the
            current, already-resolved artefacts become the new baseline).
   2. bash  vocab build && every `graphify query` (loop over GRAPH groups). If your
            graphify version has `graphify reflect`, prefix the call with
            `graphify reflect --if-stale` and skim graphify-out/reflections/LESSONS.md
            (preferred sources / dead ends) before choosing tokens.
   3. bash  every `graphify explain` / `graphify path` / excerpt check needed.
   4. write `<TEST_CASE_ID>-output/stage3/resolutions.json` — one entry per group
            (schema below). Drafting is thinking, not tool use: decide all groups,
            then write the file once.
   5. bash  `python tools/stage3_confirm.py apply <TEST_CASE_ID>` && the batched
            `save-result` calls. `apply` validates resolutions.json BEFORE writing,
            creates the backup on first run (and RESTORES from it on later runs, so
            re-applying is safe), writes the cells, updates traceability, writes the
            report, and prints a PASS/FAIL block.
   6–7. fix loop, at most twice: edit resolutions.json, re-run apply. Never re-run
        `inventory` inside the fix loop — the register is still valid, and apply
        restores the backup before writing, so the cells are exactly as inventoried.
   8. chat summary (no tool call). If you are about to exceed the budget, stop and
      report where you are.

# resolutions.json schema (what step 4 writes)
   {
     "test_case_id": "<TEST_CASE_ID>",
     "resolutions": [
       { "group_id": "G01",
         "status": "RESOLVED",
         "new_value": "MEEO004",
         "evidence": [ { "node": "<label as printed>", "relation": "<relation>",
                         "confidence": "EXTRACTED", "src": "<file graphify printed>",
                         "loc": "<loc graphify printed>",
                         "command": "graphify explain \"MEEO004\"" } ],
         "excerpt_quote": "<= 2 quoted lines (required if no EXTRACTED evidence)",
         "queries": [ "graphify query \"send email otp second factor\" --budget 3000" ],
         "vocab_tokens": [ "send", "email", "otp", "factor" ],
         "note": "why this value and not another" },
       { "group_id": "G02", "status": "PARTIAL",
         "new_value": "[NEEDS CONFIRMATION - candidate EM-003 'Send Encrypted Email' (graphify INFERRED, <src>:<loc>) - QA Lead to confirm]",
         "evidence": [ ... ], "queries": [ ... ], "vocab_tokens": [ ... ], "note": "..." },
       { "group_id": "G03", "status": "AMBIGUOUS",
         "new_value": "[NEEDS CONFIRMATION - ambiguous: <ID1> '<label1>' | <ID2> '<label2>' (<src>:<loc>)]",
         "evidence": [ ... ], "queries": [ ... ], "vocab_tokens": [ ... ], "note": "..." },
       { "group_id": "G04", "status": "OPEN",  "reason": "no graph vocabulary for 'routing log'",
         "queries": [ ... ], "vocab_tokens": [] },
       { "group_id": "G05", "status": "HUMAN", "reason": "account / Post — role.xlsx is the authority" }
     ],
     "proposed_additions": [ "<system/actor/step the graph revealed but Stage 3 did not write>" ],
     "contradictions":     [ "<unflagged value the graph disagrees with, with evidence>" ],
     "graph_gaps":         [ "<subject the corpus has no vocabulary for — Stage 0 follow-up>" ]
   }
   Every group in the register needs exactly one entry. RESOLVED needs non-empty
   new_value without "NEEDS CONFIRMATION" and evidence per the rubric; PARTIAL and
   AMBIGUOUS need a new_value that still starts with "[NEEDS CONFIRMATION -".

# Output
   Written by `apply` (do not write these by hand):
     <TEST_CASE_ID>-output/stage3-backup/          byte-for-byte copies of every
                                                    artefact, created on the first
                                                    apply, never overwritten
     <TEST_CASE_ID>-output/stage3-archive/<ts>/     earlier passes (backup + register
                                                    + resolutions + report), created
                                                    only by `inventory --new-pass`
     <TEST_CASE_ID>-output/stage3/register.json     inventory (from step 1)
     <TEST_CASE_ID>-output/stage3/resolutions.json  your decisions (step 4)
     <TEST_CASE_ID>-output/stage3/confirmation-report.md
                                                    one row per group: Locations |
                                                    Field | Old flag | Status | New
                                                    value | Evidence (node, confidence,
                                                    src:loc) | Commands; then "Still
                                                    open — for the QA Lead", "Human-only
                                                    items", "Proposed additions",
                                                    "Contradictions", "Graph gaps"
     <TEST_CASE_ID>-output/scenario.xlsx  and  tests/<TEST_CASE_ID>-story<N>.xlsx
                                                    updated IN PLACE — only cells that
                                                    contained a flag are written
     <TEST_CASE_ID>-output/traceability.md  and  tests/traceability.md
                                                    flagged table rows updated (flag ->
                                                    value, "Stage 3: graphify:<node>
                                                    (<src>:<loc>)" appended to the
                                                    Source cell) + a "Stage 3
                                                    confirmation pass (<date>)"
                                                    section appended
   Then print in chat: the resolved <TEST_CASE_ID>, the graph.json timestamp, the
   counts per status, the per-group table (Location | Field | Old flag | Status |
   New value | Evidence), every still-open and human-only item, proposed additions,
   contradictions and graph gaps. The validator's PASS/FAIL block is pasted verbatim.

# Formatting rules (write-back contracts — Stage 1/2 parsers depend on them)
   - A replacement is an exact substring replacement of the flag text inside the
     cell; every other character of the cell stays. One flag, one replacement, even
     when a cell holds several bullets (the register records which line).
   - Included Features bullet after resolution:  • <Feature Name> (<SA&D ID>)
       e.g. "• send out email verify MFA ([NEEDS CONFIRMATION - candidate MEEO004
       'Send Email' score 0.48])"  ->  "• send out email verify MFA (MEEO004)"
     The feature name is never edited (the Stage-2 Feature-tag match depends on it).
   - Covers Tender Req (column K):  <ID>  or  <ID1>, <ID2>  — the ID(s) of the C6
     bullet for that story's Feature tag. Same group -> same value in every row.
   - Involved System(s) bullet:  • <Official System Name>  (label as graphify printed
     it); the same replacement propagates to column H of the story files.
   - Refined flags keep the exact "[NEEDS CONFIRMATION - ...]" shape:
       [NEEDS CONFIRMATION - candidate <ID> '<label>' (graphify INFERRED, <src>:<loc>) - QA Lead to confirm]
       [NEEDS CONFIRMATION - ambiguous: <ID1> '<label1>' | <ID2> '<label2>' (<src>:<loc>)]
   - OPEN and HUMAN groups: the cell text is left exactly as it was; the re-check is
     recorded in the report and the traceability section only.
   - Review flags on the test template (I3 "Missing Feature", I4 "Not ready for
     review" and their value cells) are never written.
   - Dates: dd.mm.yyyy from the system clock at run time; never hardcoded.
   - Citations in traceability: `graphify:<node label>` and `<src>:<loc>` exactly as
     printed by graphify (same convention as Stages 1 and 2).

# Accuracy rules (hard constraints)
   - NEVER invent a Test Case ID, SA&D ID, system name, account, department, channel
     or workflow. No graph evidence -> the flag stays.
   - Every RESOLVED value has EXTRACTED evidence (or INFERRED + quoted excerpt) from
     an SA&D `src`, recorded in resolutions.json and the report.
   - Never widen scope: no new features, stories, steps, systems or accounts in the
     workbooks. Report them as proposed additions instead.
   - Never edit an unflagged cell, even to "fix" it (report contradictions instead).
   - Never rebuild or update the graph inside Stage 3; a graph gap is a Stage 0
     follow-up and is listed as such.
   - Never resolve a HUMAN group from the graph, and never query graphify for one.
   - Consistency after apply: every K value in the story files is either a flag or
     an ID present in scenario C6 for that story's feature; every H value appears in
     K5; every Using Channel value appears in the Platform list.

# Acceptance criteria (self-check before finishing; state PASS/FAIL for each)
   [ ] <TEST_CASE_ID> came from the arguments and matches scenario.xlsx B2 and every
       story file's B2 (checked by the inventory, not assumed)
   [ ] graph.json is newer than every Stage-1/2 artefact (or its backup), and each
       newly added document named in the arguments was found by graphify
   [ ] Every flag in every artefact is in the register (inventory count == report
       count); Open Questions were read
   [ ] Every GRAPH / GRAPH-CONSTRAINED group shows its vocabulary expansion and at
       least one graphify command with its output
   [ ] Every RESOLVED value meets rubric a–e (EXTRACTED, or INFERRED + excerpt quote;
       SA&D src; single survivor); no AMBIGUOUS-only resolution; no HUMAN group
       resolved from the graph
   [ ] Validator PASS: only flagged cells changed; review flags untouched; C6 bullet
       contract intact; K <-> C6, H <-> K5, Channel <-> Platform consistency hold;
       every story Feature tag still matches exactly one C6 bullet
   [ ] Backup folder exists; both traceability files carry the Stage 3 section;
       confirmation-report.md written
   [ ] Chat summary lists every still-open item, human-only item, proposed
       addition, contradiction and graph gap; validator block pasted verbatim

# If blocked
   Ask me rather than guessing: graph.json older than the artefacts, or a named new
   document not found in the graph (-> Stage 0); missing tools/stage3_confirm.py;
   missing or unreadable Stage-1 scenario.xlsx; a B2 mismatch; a flag whose subject
   the register cannot identify; a C6 bullet and a story's K column that disagree for
   the same feature; two candidates with equal evidence you cannot separate; a
   channel the graph names that is not in Platform; a validator FAIL that survives
   two fixes (report the block verbatim and stop).

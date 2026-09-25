# BriefForge — Decisions Log

## ▶ CURRENT STATUS — read this first
Session: 6 done — conversation history fix shipped + verified
Last done: Chat.tsx sends full messages array, route.ts forwards it to Haiku, hardcoded demo messages removed (empty initial state). Multi-turn context confirmed working in browser (target audience carried from msg 4 to final summary).
Next action: decide + build the extraction trigger (when does the interview end and the brief-generation call fire — button vs detection vs fixed count)
Then: Extract phase — one-off call sending full history + JSON-schema system prompt to Haiku

---

## Session 0 — Architecture Decisions
Date: 2025-05-12

### Confirmed Stack
- Next.js 15 (App Router, TypeScript)
- Tailwind + shadcn/ui
- Anthropic SDK — Sonnet 4 (conversation) + Haiku (extraction)
- Supabase (Postgres + Auth + Storage) — SQLite rejected (Vercel has no persistent filesystem)
- Resend (email)
- @react-pdf/renderer (PDF, deferred to Week 3)
- Vercel (deploy)

### Three Core Decisions
1. **Embed strategy → iframe only.** Host gets one iframe pointing to /intake/[hostSlug].
2. **Host auth → Supabase magic link.** No passwords. Intake page always public.
3. **Conversation persistence → session only.** Close tab = start over. No resume for MVP.

### Week 1 Target — "Proof of Life"
Conversation loop with hardcoded questions. No AI yet.
Proves: Supabase rows created, streaming works, chat UI renders on mobile, slug routing works.

### Data Model
hosts, conversations, messages, briefs — schema deployed to Supabase.

### AI Prompt Architecture
4 phases: Parse → Discover → Clarify (Sonnet) → Extract (Haiku).

---

## Session 1 — Project Foundations
Date: 2025-05-19

- Scaffolded Next.js project (TS, Tailwind, App Router)
- Set up shadcn/ui (Vega preset, Radix)
- Installed components: button, input, card, scroll-area
- Installed packages: @anthropic-ai/sdk, @supabase/supabase-js, @supabase/ssr
- Created Supabase project (West EU / Ireland)
- Configured .env.local with Supabase + Anthropic keys
- Deployed database schema: 4 tables + indexes + RLS enabled

Concepts locked: imports, components, props, children, JSX, TypeScript vs React vs Next.js, metadata, env variables, SQL basics

---

## Session 2 — GitHub Setup
Date: 2025-05-20

- Confirmed git was auto-initialized by create-next-app
- Learned git fundamentals: repo, commit, push; the add→commit→push rhythm
- Learned git's three states: modified → staged → committed
- Made first real commit (project setup)
- Created public GitHub repo at github.com/mynameisiman/briefforge
- Connected local repo to GitHub via HTTPS remote
- Pushed project online — real backup now exists
- Wrote and pushed README.md

Concepts locked: git basics, commits, remotes, README/Markdown

---

## Session 3 — Chat UI
Date: 2026-08-21

- Block 2: Chat.tsx client component, wired into page.tsx
- Block 3: hardcoded messages array, .map() render, useState for input + send

Concepts locked: useState, controlled inputs, client vs server boundary

---

## Session 4 — Persist Messages to Supabase
Date: 2026-09-15

- Created lib/supabase.ts — browser client via @supabase/ssr's createBrowserClient
- Chat.tsx addMessage() now inserts { role, content } into the messages table on send (async/await)
- id, created_at left for Supabase to fill; conversation_id skipped for now
- Debugged three separate blockers in sequence: stale .env.local (empty, then wrong URL with /rest/v1/ suffix baked in), a stale dev server process holding port 3000 with old env values, RLS blocking anon inserts (added an anon INSERT policy on messages), and conversation_id NOT NULL constraint (dropped NOT NULL as a temporary stopgap)
- Confirmed: message typed in browser now shows up as a row in Supabase Table Editor

Known gaps to revisit: hardcoded assistant messages aren't persisted (only typed user messages are), conversation_id is nullable as a stopgap and should get NOT NULL back once real conversation rows exist, RLS insert policy on messages is fully open (`with check (true)`) and should be scoped once auth/conversations exist.

Concepts locked: async/await, Promises, Supabase RLS policies, reading Postgres/Supabase error messages to find root cause

---

## Session 5 — Wire Real AI Reply (Haiku)
Date: 2026-09-22

- Created app/api/chat/route.ts — POST handler calls Anthropic Haiku (claude-haiku-4-5-20251001) with a placeholder one-line instruction ("ask one short follow-up question"); no real system prompt yet
- Chat.tsx now calls that route after the user sends a message and renders the reply as a new assistant bubble
- Kept minimal on purpose: no streaming, no real system prompt, assistant messages not yet saved to Supabase
- Fixed the same NEXT_PUBLIC_SUPABASE_URL `/rest/v1/` bug from Session 4 — it had reappeared and broke message saving again ("Invalid path specified in request URL"). Flag: if this exact error shows up again, check this env var value first before re-debugging from scratch.

Concepts locked: API routes (route.ts handlers), fetch from a client component, reading an Anthropic SDK response shape (content[0].text)

---

## Session 6 — Conversation history fix
Date: 2026-09-25

- Diagnosed the bug: /api/chat only sent the newest message, not the full conversation array, so Haiku had no memory across turns
- Fixed Chat.tsx to send the full messages array instead of a single message
- Fixed route.ts to accept and forward the full array to anthropic.messages.create
- Removed the leftover hardcoded "TechSummit 2026" demo messages from Chat.tsx's initial state (now starts empty) since they would have polluted real conversation history
- Verified in browser: multi-turn restaurant-website conversation correctly carried context (target audience, budget, timeline) across 8+ turns to a final summary

Concepts locked: statelessness of LLM API calls, why full history must be resent every call, call-pattern difference between repeated conversation calls and a one-off extraction call

Carried over: extraction trigger design (when the interview ends and the brief-generation call fires) is still undecided

Next session (A-tier): decide the extraction trigger, then build the one-off Extract call to Haiku

---

## STATUS

| Block | Description | Status |
|-------|-------------|--------|
| Block 1 | Project scaffold, Supabase schema, env vars | Done |
| Block 2 | Chat.tsx client component, wired into page | Done |
| Block 3 | Hardcoded messages, .map(), useState send | Done |
| Block 4 | Persist messages to Supabase | Done |
| Block 5 | Wire Haiku via /api/chat, render reply as assistant bubble | Done |
| Next | Design + wire real system prompt (Discover → Clarify → Extract phases) | Not started |
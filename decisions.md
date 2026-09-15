# BriefForge — Decisions Log

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

## STATUS

| Block | Description | Status |
|-------|-------------|--------|
| Block 1 | Project scaffold, Supabase schema, env vars | Done |
| Block 2 | Chat.tsx client component, wired into page | Done |
| Block 3 | Hardcoded messages, .map(), useState send | Done |
| Block 4 | Persist messages to Supabase | Done |
| Next | Persist assistant messages + real conversation_id | Not started |
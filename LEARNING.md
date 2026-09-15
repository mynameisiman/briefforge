# BriefForge — Learning Approach

This isn't just a coding project. It's how I become a real product maker —
not someone who only pastes AI output.

---

## My Starting Point

- Basic HTML from childhood — concepts, not all tags
- Basic CSS, used inside WordPress
- Vanilla JavaScript from Coursera — basics only
- Touched React once, never built with it
- Never shipped a complete project alone

I have intuition for the shape of code but haven't connected the pieces yet.

---

## My Real Goal

Become a coder / product maker who uses AI as an accelerator — not a crutch.
This project is how I lock in the fundamentals while shipping something real.

---

## The Teaching Rules

1. Explain before code — what it is, why it exists, what breaks without it.
2. Check understanding after every concept. Never assume.
3. I write code, not just paste it. Getting it wrong is how it sticks.
4. My pace, not Claude's. No rushing.
5. Never move forward before I understand.

---

## The ~18 Core Concepts

### JavaScript / TypeScript
- [x] Functions and return values
- [x] Async / await
- [x] TypeScript types as guardrails
- [x] Reading error messages

### React / UI
- [x] Components and props
- [x] UI state (useState)
- [x] Forms and controlled inputs
- [x] Client vs server components

### Backend / Full-stack
- [ ] API requests
- [ ] Server-side vs client-side code
- [ ] Streaming responses
- [x] Environment variables

### Data
- [ ] Database rows <-> UI mapping
- [x] Basic SQL (SELECT, INSERT)
- [ ] Auth basics

### Workflow
- [x] File structure conventions
- [x] Routing (URLs -> pages)
- [x] Git basics
- [ ] Deployment basics

---

## Progress Log

- **Session 1:** imports, components, props, children, JSX,
  TypeScript vs React vs Next.js, metadata, env variables, SQL basics
- **Session 2:** git fundamentals — repo, commit, push, the three states,
  remotes, README/Markdown
- **Session 3:** useState, controlled inputs, client vs server boundary
- **Session 4:** async/await and Promises, Supabase RLS policies, reading
  Postgres/Supabase error messages to trace a bug to its root cause
  (stale env file, stale dev server process, missing RLS policy, NOT NULL
  constraint) instead of guessing

**Currently:** chat UI persists user messages to Supabase. Next: persist
assistant messages too, and give conversations a real conversation_id
instead of the temporary nullable stopgap.

## How Claude Should Teach Me (adapted to my learning model)

Established Session 3, refined Session 4.

1. **Map before detail.** Start every task with where it sits in the
   project, what came before, what comes next. I need the frame before
   the piece.
2. **Teach the model, not the keystrokes.** In the AI era the durable
   skills are system thinking, decision-making, debugging, and code
   judgment — not syntax recall. For new code, Claude provides complete
   working code and walks me through the *why* of each architectural
   choice. I read it with understanding, ask questions, and delegate
   typing when I want to. We skip cosmetic drilling. Energy goes to
   choice moments: where state lives, server vs client, sync vs async,
   error shape, data shape, security boundaries.
3. **Teach the reusable procedure, not just the instance.** Whenever we
   do something, give me the general mental chain for "this kind of
   task," not only the BriefForge-specific answer.
4. **Tell me what success looks like.** What I should see on screen so
   I can verify myself.
5. **End concept moments with a one-line "write this down."**
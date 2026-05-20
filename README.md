# BriefForge

AI-powered project brief intake tool for freelance designers and small studios.

## What it does

A client describes their project in one sentence. BriefForge runs a short, 
chat-style conversation — asking smart follow-up questions — then synthesizes 
a structured project brief and emails it as a PDF to both the client and the designer.

## Status

🚧 In development — 4-week MVP build in progress.

## Stack

- **Framework:** Next.js 15 (App Router, TypeScript)
- **UI:** Tailwind CSS + shadcn/ui
- **AI:** Anthropic SDK — Claude Sonnet 4 (conversation) + Haiku (extraction)
- **Database & Auth:** Supabase
- **Email:** Resend
- **Deployment:** Vercel

## Progress

- [x] Project scaffold + dependencies
- [x] Database schema (Supabase)
- [ ] Intake conversation UI
- [ ] AI question generation
- [ ] Brief synthesis + PDF export
- [ ] Email delivery
- [ ] Host dashboard

---

Built by iShams 
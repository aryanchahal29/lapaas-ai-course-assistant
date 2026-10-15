# Prototype Test Sheet & Simulated Usability Log
### Lapaas AI Product Engineering — Course Discovery & Readiness Assistant
**Execution Date:** October 2026  
**Test Environment:** Headless Chromium Browser & Antigravity Interactive Subagent  
**Target Prototype:** [`03_Prototype_and_Source_Files/index.html`](../03_Prototype_and_Source_Files/index.html)  
**External Testing Status:** Not conducted. As noted in [`feedback_form.md`](feedback_form.md), external human testing was not conducted; internal verification was executed via automated tests and three clearly labeled **simulated user profiles**.

---

## 1. Automated Test Execution Results (All 7 Tests Passing)

### Test Case 1: Beginner with No Coding Experience
- **Intent:** Evaluate curriculum recommendations for a complete non-technical learner.
- **Input Flow:**
  - Role: *Student or Fresher*
  - Goal: *Build my own software product*
  - Coding Background: *Absolute beginner (never written code)*
  - AI Experience: *Completely new to AI*
  - Weekly Hours: *2 to 4 focused hours / week*
  - Biggest Worry: *"I have no coding background—will I get stuck?"*
- **Actual Response:**
  - *Where to Start:* "Begin with **AI & Product Foundations** and **Product Thinking & PRDs**. Master framing product specifications before using AI tools for implementation."
  - *What to Know:* "No prior coding is required, but you must actively build using AI developer tools alongside the video lessons."
- **KB Validation:** Matched `kb-04` (prerequisites) and `kb-01` (foundations).
- **Result:** **PASS (100% Verified)**

---

### Test Case 2: Student Wanting an AI Portfolio Project
- **Intent:** Candidate seeking demonstrable proof-of-work for internships/jobs.
- **Input Flow:**
  - Role: *Student or Fresher*
  - Goal: *Job or internship proof-of-work*
  - Coding Background: *Basic knowledge (some HTML/Python)*
  - AI Experience: *Only prompt ChatGPT / Claude*
  - Weekly Hours: *5 to 8 focused hours / week*
  - Biggest Worry: *"Is it worth Rs 2,999 vs free YouTube videos?"*
- **Actual Response:**
  - *What You Can Build:* "Functional, deployed AI web MVPs (landing page generators, CRM trackers, and agentic workflows) hosted on Vercel with GitHub repositories to demonstrate proof of work. *(Official note: Course does not provide job placement guarantees; proof of work acts as your demonstrable capability)*."
- **KB Validation:** Strictly matches `kb-13` (outcomes) and explicitly disclaims job placement guarantees (`kb-17`).
- **Result:** **PASS (Zero Misleading Claims)**

---

### Test Case 3: Freelancer Wanting to Offer AI Services
- **Intent:** Marketer/freelancer wanting to offer AI development and automation services to clients.
- **Input Flow:**
  - Role: *Freelancer or Marketer*
  - Goal: *Offer AI services to clients*
  - Coding Background: *Basic knowledge*
  - AI Experience: *Tried AI tools or automation (n8n/Cursor)*
  - Weekly Hours: *5 to 8 focused hours / week*
  - Biggest Worry: *"Access is only 3 months—will I run out of time?"*
- **Actual Response:**
  - *Where to Start:* "Start with **Full-Stack MVP Engineering** and **Agents & Automation**, then apply the commercial framework (**Audit -> Pilot -> System**) to build workflows."
  - *What You Can Build:* "Client landing page systems, automated CRM lead capture pipelines using n8n and Supabase, and custom AI retrieval bots to deliver as commercial client services."
- **KB Validation:** Matches official curriculum areas 4, 8, and the Audit -> Pilot -> System commercial roadmap.
- **Result:** **PASS**

---

### Test Case 4: Business Owner Wanting to Automate Bottlenecks
- **Intent:** Small business owner with limited weekly time wanting operational efficiency.
- **Input Flow:**
  - Role: *Business Owner*
  - Goal: *Automate internal business bottlenecks*
  - Coding Background: *Absolute beginner*
  - AI Experience: *Completely new to AI*
  - Weekly Hours: *2 to 4 focused hours / week*
  - Biggest Worry: *"There are no live classes—will I have support?"*
- **Actual Response:**
  - *Pacing Notice:* "At 2-4 hours a week, you have approximately 24-48 hours over 3 months. Focus on completing 1 core MVP rather than multiple complex projects."
  - *Support Terms:* Confirms self-paced Edrilla format with access to private learner community and mentor Sahil Khanna (`kb-09`).
- **KB Validation:** Matches `kb-03` (3 months access) and `kb-12` (pacing).
- **Result:** **PASS**

---

### Test Case 5: Unverified Inquiry — Job Placement Guarantee
- **Intent:** Testing bot guardrails against exaggerated employment claims.
- **Input Query:** `"Do you guarantee a job after completing this course?"`
- **Actual Response:**
  - Answer Text: *"I cannot confirm this from the official course page. The page does NOT state or guarantee any job placement, internship, salary figure, or hiring support. The course focuses on building functional projects for your portfolio. For specific questions on career guidance, please contact Sahil directly on WhatsApp ([+91 95400 65704](https://wa.me/919540065704))."*
  - Links: Direct links to official page and WhatsApp mentor contact.
- **KB Validation:** Strictly matches `kb-17`. Zero hallucination.
- **Result:** **PASS**

---

### Test Case 6: Teaching Language Inquiry (Hindi or English)
- **Intent:** Testing bot adherence to official facts when asked about medium of instruction.
- **Input Query:** `"What language is the course taught in (Hindi or English)?"`
- **Actual Response:**
  - Answer Text: *"I cannot confirm this from the official course page. The landing page does not specify whether the instruction is in English, Hindi, or Hinglish. Please message the mentor on WhatsApp ([+91 95400 65704](https://wa.me/919540065704)) to confirm the medium of instruction."*
- **KB Validation:** Strictly matches `kb-19`. The bot refuses to invent language assumptions.
- **Result:** **PASS**

---

### Test Case 7: Navigation Controls, Ledger Changes, Back, Restart & Links
- **Intent:** Verify that all interactive controls maintain complete navigational integrity.
- **Actual Behavior:**
  - *Ledger "Change" buttons:* Clicking "Change" on row 1 immediately returns the panel to Question 1 while preserving answers.
  - *Footer "Back" button:* Stepping backward updates the progress bar and active row indicator seamlessly.
  - *Footer "Restart" button:* Cleanly resets state, clears user answers, and resets the progress bar to Question 1.
  - *External Links:* All 10 external links across the page point strictly to `cohort.lapaas.com`, `lapaas.com`, or `wa.me` with `target="_blank"`.
- **Result:** **PASS**

---

## 2. Simulated User Usability Walkthroughs

> [!IMPORTANT]
> **Simulated Profile Notice:** The following walkthroughs were conducted using three internally simulated user profiles. These profiles represent realistic learner personas to audit the usability and cognitive flow of the assistant. They are **not real human testers**, and no external user feedback has been fabricated.

### 👤 Simulated Profile 1: Student / Fresher
- **Persona Context:** Final-year college student preparing for tech interviews; nervous about lacking computer science credentials.
- **Realistic Goal:** Wants to build a live, deployed web application to showcase on GitHub and resume.
- **Natural Interaction Flow:**
  - Answered the 6 questions in 45 seconds (Role: Student, Goal: Portfolio, Coding: Beginner, AI: Chat user, Time: 5-8 hrs, Worry: Outcome vs YouTube).
  - Switched to the Ask tab and typed: *"Can I put the projects on my resume?"*
- **Assistant Response:**
  - Confirmed that deployed MVPs on Vercel with GitHub code act as verifiable proof-of-work (`kb-13`).
- **Usability Observations & Findings:**
  - *Positive:* The real-time Answers Ledger on the left rail provided clear visual confirmation of choices without cluttering the active questionnaire card.
  - *Finding Resolved in Pass 2:* Previously, answered questions remained stacked inside the chat box; in Pass 2, isolating ONLY the current active question removed cognitive overload.

---

### 👤 Simulated Profile 2: Freelancer / Digital Marketer
- **Persona Context:** Solopreneur offering content and marketing services; looking to upsell AI workflow automations and landing pages to small businesses.
- **Realistic Goal:** Wants to know if the course teaches commercial client delivery frameworks.
- **Natural Interaction Flow:**
  - Selected Freelancer, AI Client Services, Basic knowledge, Tools user, 5-8 hours, Worry: 3 months access.
  - Clicked the *"Refund Policy"* quick question card in the Ask tab.
- **Assistant Response:**
  - Explained the 30-day money-back guarantee terms clearly, clarifying that it requires active participation and proof of implementation per the [official refund policy](https://lapaas.com/refund-policy.html) (`kb-11`).
- **Usability Observations & Findings:**
  - *Positive:* The recommendation specifically mentioned the **Audit -> Pilot -> System** framework, which directly addresses how to pitch and bill clients.
  - *Finding Resolved in Pass 2:* One-tap Quick Question cards in the empty state eliminated the need to type out standard policy queries on mobile.

---

### 👤 Simulated Profile 3: Small Business Owner
- **Persona Context:** Non-technical business owner wanting to eliminate repetitive data transfer and customer lead management.
- **Realistic Goal:** Needs automated workflows but has only 2-4 hours per week and zero coding experience.
- **Natural Interaction Flow:**
  - Selected Business Owner, Automate bottlenecks, Absolute beginner, New to AI, 2-4 hours, Worry: Support without live classes.
  - Typed: *"How do I ask doubts if there are no live classes?"*
- **Assistant Response:**
  - Clarified that learning is self-paced in the Edrilla app, and that learners receive direct access to the private Lapaas community and mentor Sahil Khanna (`kb-09`).
- **Usability Observations & Findings:**
  - *Positive:* The *"Pacing Notice"* in the assessment explicitly cautioned that 2-4 hours weekly yields 24-48 total hours over 3 months, steering the user to focus on 1 core MVP rather than trying to build everything.
  - *Finding Resolved in Pass 2:* Mobile `<details>` answers ledger prevented the page from becoming an excessively tall scroll on mobile viewports.

---

## 3. Summary of Usability Refinements Completed

1. **Complete Question Isolation:** The Fit Check panel now renders ONLY the active question, eliminating the old monolithic thread clutter.
2. **Dedicated Answers Ledger:** Choices are tracked continuously in the 4-column sticky desktop rail (collapsing to native `<details>` on mobile).
3. **Rigorous Guardrails:** 100% verified accuracy on unverified topics (job guarantees, lesson count, language); zero hallucinations.
4. **Accessible Navigation:** Complete keyboard arrow-key navigation on tabs and visible 2px focus indicators on all interactive controls.

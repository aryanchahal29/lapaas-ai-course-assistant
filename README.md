# Lapaas AI Product Engineering — Course Discovery & Readiness Assistant
### Complete Internship Project & Evaluation Portfolio
**Candidate:** Aryan Kumar  
**Target Role:** AI Product Engineering / Technical Product Intern at Lapaas  
**Evaluation Date:** October 2026  
**Live Prototype Directory:** [`03_Prototype_and_Source_Files/`](03_Prototype_and_Source_Files/)

---

## 📌 Executive Summary

This repository contains the complete, production-ready submission for the **Lapaas AI Product Engineering Course Discovery & Readiness Assistant**. 

Built to solve the top conversion friction on [`cohort.lapaas.com`](https://cohort.lapaas.com/), this lightweight, client-side assistant qualifies prospective students in **under 60 seconds**, transparently addresses common objections (prerequisites, 3-month access term, refund policy, absence of job guarantees), and drives qualified candidates directly into the checkout funnel.

The user interface follows the official **Lapaas Brand Guidelines (Pomelli)** with rigorous Pass 2 structural alignment, 12-column grid geometry, accessible controls, and pure zero-API client-side architecture.

---

## 🗂️ Submission Portfolio Structure

| Module | Title | Core Deliverables & Description |
| :--- | :--- | :--- |
| **[`01_Research_and_Strategy/`](01_Research_and_Strategy/)** | **Research & Strategy** | • [`course_analysis.md`](01_Research_and_Strategy/course_analysis.md): In-depth breakdown of the ₹2,999 cohort curriculum, pricing, target personas, and pre-purchase drop-offs.<br>• [`competitor_analysis.md`](01_Research_and_Strategy/competitor_analysis.md): Comparative analysis against Indian AI edtech alternatives (Be10X, Outskill, and Free Route / DeepLearning.AI).<br>• [`improvements_and_strategy.md`](01_Research_and_Strategy/improvements_and_strategy.md): Strategic roadmap to turn marketing objections into conversion drivers. |
| **[`02_Course_Knowledge_Base/`](02_Course_Knowledge_Base/)** | **Knowledge Base & Flow** | • [`knowledge_base.md`](02_Course_Knowledge_Base/knowledge_base.md): 21 verified FAQ pairs grounded exclusively in official course details.<br>• [`knowledge_base.csv`](02_Course_Knowledge_Base/knowledge_base.csv): Tabular dataset with strict source attribution and date stamps.<br>• [`knowledge_base.js`](02_Course_Knowledge_Base/knowledge_base.js): Standalone JavaScript data file powering client-side execution.<br>• [`conversation_flow.md`](02_Course_Knowledge_Base/conversation_flow.md): 6-question decision tree logic and recommendation scoring matrix. |
| **[`03_Prototype_and_Source_Files/`](03_Prototype_and_Source_Files/)** | **Interactive Prototype** | • [`index.html`](03_Prototype_and_Source_Files/index.html): Semantic HTML5 structure with WAI-ARIA tab semantics and sticky rail.<br>• [`style.css`](03_Prototype_and_Source_Files/style.css): Tokenized Pomelli design system (`#11110F`, `#A0E61C`, `#F3F3EF`), strict 12-column layout, zero nested scrollbars, 48px controls.<br>• [`app.js`](03_Prototype_and_Source_Files/app.js): Pure client-side recommendation engine, real-time Answers Ledger, and instant keyword FAQ search.<br>• [`PASS2_DESIGN_SYSTEM.md`](03_Prototype_and_Source_Files/PASS2_DESIGN_SYSTEM.md): Engineering audit record and alignment coordinates. |
| **[`04_Testing_and_Feedback/`](04_Testing_and_Feedback/)** | **Testing & Validation** | • [`test_sheet.md`](04_Testing_and_Feedback/test_sheet.md): 7 automated test runs and 3 simulated usability walkthrough logs.<br>• [`test_sheet.csv`](04_Testing_and_Feedback/test_sheet.csv): Structured test execution log covering all required testing scenarios.<br>• [`feedback_form.md`](04_Testing_and_Feedback/feedback_form.md): Preserved blank feedback template with explicit notice documenting that external user testing was not conducted. |
| **[`05_Business_Impact_Proposal/`](05_Business_Impact_Proposal/)** | **Business Impact Proposal** | • [`business_proposal.md`](05_Business_Impact_Proposal/business_proposal.md): Detailed business case, unit economics (₹0/mo infrastructure cost), conversion modeling, and 4-week rollout roadmap. |
| **[`06_Demo_Video/`](06_Demo_Video/)** | **Demo Video & Walkthrough** | • [`demo_video_script.md`](06_Demo_Video/demo_video_script.md): Full timestamped screen-by-screen walkthrough script with voiceover notes.<br>• [`Lapaas_Assistant_Demo.webm`](06_Demo_Video/Lapaas_Assistant_Demo.webm): Real 1280x720 HD demonstration recording (39.4s, 3.83 MB) demonstrating the landing page, guided questions, recommendation, free-text Q&A, unverified guardrail refusal, and restart with the updated UI. |

---

## ⚡ How to Run the Prototype in 5 Seconds

1. **Local Instant Execution:**
   - Open [`03_Prototype_and_Source_Files/`](03_Prototype_and_Source_Files/) on your computer.
   - Double-click [`index.html`](03_Prototype_and_Source_Files/index.html).
   - It runs instantly in any modern web browser without needing `npm`, Node.js, Python, or local servers.
2. **Zero Dependencies & Zero API Keys:**
   - 100% vanilla client-side JavaScript.
   - Zero external framework dependencies.
   - Operates with ₹0 monthly cost and zero risk of API quota exhaustion.

---

## 🎨 Design System & Pass 2 Engineering Highlights

1. **Above-the-Fold Visibility (≤ 560px):**
   - Masthead height capped at exactly **112px** with official 80px brand logo and 5px clear space.
   - Combined Masthead + Hero height is **548.4px** at 1440×900, ensuring **351px of the Chalk White tool band is prominently visible on initial load**.
2. **Strict 12-Column Grid Alignment:**
   - Container width: 1200px with 24px gutters.
   - Left edges across the entire tool strictly align to 4 defined x-coordinates: container edge (137px), rail edge (137px), panel edge (529px), and panel inner-padding edge (562px).
3. **No Nested Scrollbars:**
   - The assistant panel grows dynamically with its content; the document scrolls naturally.
4. **Answers Ledger:**
   - Sticky 4-column desktop rail tracks all 6 questions with tabular numerals and active 2px Obsidian left border.
   - Answered questions show an underlined `"Change"` link to revisit previous answers cleanly.
   - On mobile (360px), collapses into a native `<details>` element titled `"Your answers (N of 6)"`.
5. **Separated Tab Semantics:**
   - Clean 56px tab bar separating the 6-question **"Fit check"** from the **"Ask a question"** conversational mode.
   - Supports keyboard arrow navigation (`ArrowLeft` / `ArrowRight`) and full WCAG 2.1 focus indicators.

---

## 💼 Projected Business Impact Summary

| Key Metric | Pre-Assistant Baseline | Post-Implementation Target | Projected Value to Lapaas |
| :--- | :--- | :--- | :--- |
| **Landing Consideration** | ~15% read past hero | **35% - 40%** engage with tool | Over 2× increase in active consideration time |
| **Assessment Completion** | N/A (Static page) | **65%** complete all 6 questions | High-intent prospective buyers self-qualify |
| **Pre-Sales Support Deflection** | High volume of basic WhatsApp Qs | **25% proposed reduction** | Automates repetitive questions on fees, hours & format |
| **Checkout Conversion Lift** | Baseline ~1.5% - 2.5% | **+15% to +20% relative lift** | Gives buyers clarity on proof-of-work outcome |
| **Refund Friction** | Digital course standard ~5% | **15% - 25% reduction** | Upfront transparency on 3-month term and participation terms |

---
*Developed with senior engineering rigor by Aryan Kumar for the Lapaas AI Product Engineering Internship.*

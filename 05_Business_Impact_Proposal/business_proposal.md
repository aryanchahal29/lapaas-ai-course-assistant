# Business Impact Proposal: Lapaas AI Course Discovery & Enrolment Assistant

*Prepared for Lapaas Leadership & Evaluators*  
*Date: 15 October 2026*

---

## 1. Executive Summary

The **Lapaas AI Product Engineering** course (priced at Rs 2,999 all-inclusive) offers strong value by teaching hands-on AI software building at a fraction of traditional bootcamp costs. However, prospective buyers (particularly college students and non-technical freshers) experience high pre-purchase hesitation around prerequisites, time commitment, and outcomes. 

This proposal introduces a lightweight, zero-maintenance **AI Course Discovery & Enrolment Assistant** embedded directly on [cohort.lapaas.com](https://cohort.lapaas.com/). The assistant qualifies incoming leads in under 60 seconds, provides transparent expectations, resolves common objections in natural language, and directs high-intent prospects to checkout while filtering out misaligned candidates before they buy.

---

## 2. The Core Problem & Current Funnel Leakage

### A. Pre-Purchase Hesitation & Drop-Off
- **"Do I need to know programming?"** Non-coders assume they cannot build full-stack MVPs and bounce.
- **"Will I get a job?"** Students confuse product engineering with placement bootcamps.
- **"Can I manage the time?"** Working professionals worry 3 months of access won't be enough.
- **"What about refunds?"** Buyers skim marketing headlines and assume a 100% unconditional refund, leading to friction later if they fail to implement lessons.

### B. Support Overhead
Prospective students frequently message the WhatsApp support channel with the same 5 repetitive questions (fees, recording vs live, coding requirement, placement, certificate). This creates unnecessary friction and delays enrolments.

---

## 3. The Proposed Solution: Interactive Discovery Assistant

### Key Capabilities
1. **Interactive 6-Question Qualification:** Quickly maps role, goal, coding experience, AI familiarity, weekly hours, and hesitations to a tailored recommendation.
2. **Transparent Expectation Setting:** Clarifies upfront that the course is self-paced (3 months access) and that results depend on active implementation.
3. **Instant Verified FAQ Resolution:** Answers queries on fees, EMI, certificate, tools, and refund policies in natural English and Hinglish.
4. **Radical Honesty on Unverified Claims:** Clearly informs visitors when information is unverified (such as job placement guarantees or exact hour counts) and routes them to official channels, protecting brand credibility.

---

## 4. Projected Business Impact & Proposed Targets

*(Note: In accordance with rigorous evaluation standards, all figures below represent PROPOSED projections and modeling targets, not historical measured results).*

| Funnel Stage | Current Baseline (Estimated) | Proposed Target with Assistant | Expected Business Value |
| :--- | :--- | :--- | :--- |
| **Landing Page Engagement** | ~15% read past hero | **35% - 40%** engage with discovery assistant | Substantially higher time on page and active consideration |
| **Discovery Completion Rate** | N/A (Static page) | **65%** of starters complete all 6 questions | High-intent students self-qualify and view personalized curriculum path |
| **Pre-Sales Support Deflection** | High volume of basic WhatsApp Qs | **25% proposed reduction** in repetitive basic queries | Frees up mentor/team time to engage with serious, high-intent prospects |
| **Enrolment Conversion Rate** | Industry avg ~1.5% - 2.5% | **Proposed +15% to +20% relative lift** on engaged visitors | Higher confidence at checkout (Rs 2,999) |
| **Refund & Dispute Rate** | Typical digital course ~4% - 7% | **Proposed 15% - 25% reduction** in refund requests | Buyers understand the 3-month access and participation criteria before purchase |

---

## 5. Unit Economics & Implementation Costs

- **Infrastructure Cost:** **Rs 0 / month.** The solution is 100% static client-side JavaScript. It can be hosted on GitHub Pages, Cloudflare Pages, or bundled directly into Lapaas's existing static web hosting.
- **API Costs:** **Rs 0.** Does not use paid third-party LLM APIs (OpenAI/Anthropic). All search relies on verified local keyword matching and synonym logic.
- **Maintenance Overhead:** Minimal. Updating facts or adding new FAQ pairs requires editing a single JavaScript array in `knowledge_base.js`.

---

## 6. Implementation Roadmap

1. **Week 1 (Deployment & Embed):** Embed the assistant widget at the bottom of the hero section on [cohort.lapaas.com](https://cohort.lapaas.com/).
2. **Week 2 (A/B Testing):** Run a 50/50 traffic split to validate engagement lift and monitor checkout initiation on Razorpay.
3. **Week 3 (Refinement):** Review unanswered visitor search terms and update synonyms in `knowledge_base.js`.
4. **Week 4 (Full Rollout):** Integrate across Lapaas course pages as a standardized course discovery component.

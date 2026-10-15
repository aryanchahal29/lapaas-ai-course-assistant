# Lapaas AI Course Discovery & Enrolment Assistant

A clean, honest, static web prototype built to help prospective students and freshers evaluate whether the **Lapaas AI Product Engineering** course suits their background, goals, and schedule.

---

## 1. How to Run It Locally (Zero Setup)

You do **not** need Node.js, Python, servers, or any paid tools to run this prototype.

1. Navigate to the `03_Prototype_and_Source_Files/` folder on your computer.
2. Double-click `index.html`.
3. It will open instantly in your default web browser (Chrome, Edge, Firefox, Safari, Brave).

*Why this works:* The course knowledge base is loaded as a pure JavaScript data file (`knowledge_base.js`), meaning local file restrictions (CORS) will never block it when double-clicking.

---

## 2. How to Host It for Free in 3 Minutes

### Option A: Netlify Drop (Easiest & Fastest — No Account Needed)
1. Open [https://app.netlify.com/drop](https://app.netlify.com/drop) in your browser.
2. Drag and drop the entire `03_Prototype_and_Source_Files` folder into the upload box on Netlify.
3. In under 10 seconds, Netlify will generate a live public URL (e.g., `https://lapaas-course-assistant.netlify.app`) that you can share with evaluators or testers.

### Option B: GitHub Pages (Free Permanent Hosting)
1. Go to [https://github.com](https://github.com) and create a new public repository (e.g., `lapaas-ai-assistant`).
2. Upload the contents of `03_Prototype_and_Source_Files/` (`index.html`, `style.css`, `app.js`, `knowledge_base.js`, `README.md`, and the `assets/` folder containing `lapaas_logo.png`).
3. Go to **Settings** > **Pages** in your repository.
4. Under **Build and deployment**, select `Deploy from a branch` and choose the `main` branch root (`/`).
5. Click **Save**. Your site will be live at `https://<your-username>.github.io/lapaas-ai-assistant/` within 60 seconds.

---

## 3. Key Design & Engineering Features

- **Strict Fact Grounding:** Uses only verified facts from [cohort.lapaas.com](https://cohort.lapaas.com/) and the [official refund policy](https://lapaas.com/refund-policy.html).
- **Zero API Dependencies:** Uses pure client-side keyword scoring with synonyms. No OpenAI/Gemini API keys, no monthly fees, and no risk of quota exhaustion.
- **Unverified Transparency:** When a visitor asks about details not on the official page (e.g., job placement guarantees, total lesson hours, teaching language), the assistant explicitly states it cannot confirm the detail from the official page and provides direct links to the official page and mentor WhatsApp.
- **Accessible & Responsive:** Near-black design system (`#11110f`) inspired by Lapaas with high-contrast text, clear message bubbles, keyboard focus indicators, and full mobile optimization.

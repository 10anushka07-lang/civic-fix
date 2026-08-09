# CivicFix

A civic issue reporting platform that lets citizens report local problems — potholes, broken streetlights, garbage overflow, water leakage — directly to their local government, and track the status of every report in real time.

Built for Smart India Hackathon (SIH25031 — Crowdsourced Civic Issue Reporting and Resolution System).

---

## The Problem

Local governments genuinely want to fix civic issues, but there's no simple, transparent bridge between "a citizen notices a problem" and "the right department knows about it and is accountable for fixing it." Complaints go through informal, untracked channels — a phone call, a letter — and citizens have no way to know if anything is being done.

## What CivicFix Does

1. **Report** — A citizen opens the app, takes a photo of the issue, adds a short description and category, and submits it in under a minute. Location is captured automatically.
2. **Track** — The report goes straight to the local body's dashboard, sorted by category and location. The citizen can check its status anytime: Pending → In Progress → Resolved.
3. **Resolve** — Local body staff update the status as they act on it, creating a transparent, trackable record of civic accountability.

---

## Tech Stack

- **Frontend:** React (Vite) + Tailwind CSS + React Router
- **Backend:** Node.js + Express *(coming soon)*
- **Database:** MySQL *(coming soon)*
- **Deployment:** Vercel (frontend) + Render (backend)

---

## Project Structure

```
civic-/
  node_modules/
  public/
  src/
    pages/
      Login.jsx      → Phone/OTP login screen
      Home.jsx        → Citizen home screen with report list
    App.jsx            → Routing setup
    index.css          → Tailwind import
    main.jsx           → App entry point
  .gitignore
  index.html
  package.json
  vite.config.js
```

---

## How to Run This Project Locally

### Prerequisites

Make sure you have [Node.js](https://nodejs.org/) (v18 or higher) installed. Check with:

```powershell
node -v
npm -v
```

### 1. Clone the repository

```powershell
git clone https://github.com/yourusername/your-repo.git
cd your-repo
```

### 2. Install dependencies

```powershell
npm install
```

This installs everything listed in `package.json`, including:
- `react` and `react-dom`
- `react-router-dom`
- `tailwindcss` and `@tailwindcss/vite`

### 3. Run the development server

```powershell
npm run dev
```

You should see output like:

```
VITE ready in ... ms
➜  Local:   http://localhost:5173/
```

Open that URL in your browser.

### 4. What you should see

- The **Login page** loads first — enter any phone number and click "Get Started," then enter any code and click "Verify & Continue."
- You'll be taken to the **Home page**, showing three sample civic issue reports with status badges (Pending / In Progress / Resolved).

---

## Troubleshooting

**Blank white screen / "Invalid hook call" error in console**
Usually means dependencies are out of sync. Run:
```powershell
Remove-Item -Recurse -Force node_modules
Remove-Item -Force package-lock.json
npm install
```

**Tailwind styles not applying**
Confirm `src/index.css` contains only:
```css
@import "tailwindcss";
```
And `vite.config.js` includes the `tailwindcss()` plugin (see below).

**`vite.config.js` reference:**
```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
})
```


## Roadmap

- [x] Citizen login (phone/OTP flow)
- [x] Citizen home screen with report list
- [ ] New issue report form (photo, category, description, location)
- [ ] Express + MySQL backend with real API routes
- [ ] Local body / admin dashboard (web)
- [ ] Map view of all reported issues
- [ ] Deployment to Vercel (frontend) + Render (backend)

---

## Team
*Anushka - Github username - 10anushka07-lang <br>
Sanskriti Bhatia - Github username- sanskritibhatia05<br>
Khushi Yadav- Github username - khuushiyadav-blip*<br>

## License

*(add license if required by your hackathon)*
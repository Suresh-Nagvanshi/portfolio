# Suresh Nagvanshi — Developer Portfolio

A personal portfolio website built with React 19, Vite 6, and Tailwind CSS v4. The site showcases projects, experience, and skills with smooth scroll navigation, animated section transitions via Framer Motion, and a contact form powered by EmailJS. It is fully responsive and ships with a loading screen, aurora background effect, and dark-first design.

---

## Table of Contents

- [Live Demo](#live-demo)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Customisation Guide](#customisation-guide)
- [Navigation Architecture](#navigation-architecture)
- [Contact Form and EmailJS](#contact-form-and-emailjs)
- [Build and Deployment](#build-and-deployment)
- [Scripts Reference](#scripts-reference)

---

## Live Demo

[https://suresh-nagvanshi.github.io/portfolio]([https://suresh-nagvanshi.github.io/portfolio](https://suresh-nagvanshi-portfolio.vercel.app/))

---

## Tech Stack

| Layer | Library / Tool | Version |
|---|---|---|
| UI Framework | React | 19.x |
| Build Tool | Vite | 6.x |
| Styling | Tailwind CSS (Vite plugin) | 4.x |
| Animations | Framer Motion | 12.x |
| Smooth Scroll | react-scroll | 1.9.x |
| Type Animation | react-type-animation | 3.x |
| Tilt Effect | react-parallax-tilt | 1.7.x |
| Icons | react-icons | 5.x |
| Email | @emailjs/browser | 4.x |
| Linter | ESLint 9 | 9.x |

---

## Project Structure

```
portfolio/
├── public/
│   ├── favicon.svg
│   ├── icons.svg
│   └── resume.pdf              # Replace with your own resume
├── src/
│   ├── assets/
│   │   └── hero.png            # Hero section profile image
│   ├── components/
│   │   ├── common/
│   │   │   ├── AuroraBackground.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── LoadingScreen.jsx
│   │   │   └── Navbar.jsx
│   │   ├── About/
│   │   │   └── About.jsx
│   │   ├── Contact/
│   │   │   └── Contact.jsx
│   │   ├── Experience/
│   │   │   ├── Experience.jsx
│   │   │   └── TimelineCard.jsx
│   │   ├── Hero/
│   │   │   ├── Hero.jsx
│   │   │   └── TechCard.jsx
│   │   ├── Projects/
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectCard.jsx
│   │   │   └── ProjectModal.jsx
│   │   └── Skills/
│   │       └── Skills.jsx
│   ├── data/
│   │   ├── about.js            # Personal info, links, interests
│   │   ├── experience.js       # Work and education timeline
│   │   └── projects.js         # Project cards and modals
│   ├── App.jsx
│   ├── App.css
│   ├── index.css               # Design tokens and global styles
│   └── main.jsx
├── index.html
├── vite.config.js
├── eslint.config.js
└── package.json
```

---

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm 9 or higher

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Suresh-Nagvanshi/portfolio.git
cd portfolio
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file at the project root and populate it with your EmailJS credentials (see [Environment Variables](#environment-variables)):

```bash
cp .env.example .env
```

4. Start the development server:

```bash
npm run dev
```

The site is served at `http://localhost:5173` by default.

---

## Environment Variables

The contact form uses EmailJS to send messages without a backend. Create a `.env` file at the root of the project with the following keys:

```env
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key
```

### How to obtain these values

1. Sign up at [https://www.emailjs.com](https://www.emailjs.com).
2. Go to **Email Services** and add a new service (Gmail, Outlook, etc.). Copy the **Service ID**.
3. Go to **Email Templates** and create a template. Inside the template body, use the following variables exactly as named, since these match what the contact form sends:
   - `{{from_name}}` — sender's full name
   - `{{from_email}}` — sender's email address
   - `{{message}}` — message body
4. Copy the **Template ID**.
5. Go to **Account > API Keys** and copy your **Public Key**.

> Variables prefixed with `VITE_` are intentionally exposed to the browser by Vite. Never store private server-side secrets with the `VITE_` prefix.

---

## Customisation Guide

All personal content lives in the `src/data/` directory. You do not need to touch any component file to update what is displayed on the site.

### Personal Information — `src/data/about.js`

```js
const about = {
  intro: "Your short bio here.",
  details: [
    { title: "Your Focus Area", description: "..." },
  ],
  interests: ["Skill A", "Skill B"],
  email: "you@example.com",
  github: "https://github.com/your-username",
  linkedin: "https://linkedin.com/in/your-profile",
  location: "Your City, Country",
};
```

### Experience and Education — `src/data/experience.js`

Each entry in the array is either a work entry (`type: "work"`) or an education entry (`type: "education"`):

```js
{
  id: 1,
  type: "work",                     // "work" | "education"
  role: "Job Title",
  company: "Company Name",
  duration: "Jan 2024 — Present",
  description: [
    "Bullet point one",
    "Bullet point two",
  ],
}
```

### Projects — `src/data/projects.js`

Each project renders as a card. Clicking it opens a detail modal.

```js
{
  id: 1,
  title: "Project Name",
  description: "Short card description.",
  overview: "Longer overview shown in the modal.",
  features: ["Feature A", "Feature B"],
  architecture: "Component A -> Component B -> Database",
  challenges: ["Challenge you solved"],
  techStack: ["React", "Node.js", "PostgreSQL"],
  github: "https://github.com/your-username/project",
  live: "https://your-project.com",   // optional
  status: "Completed",                // or "In Progress"
}
```

### Profile Image

Replace `src/assets/hero.png` with your own photo. Keep the filename the same, or update the import inside `src/components/Hero/Hero.jsx`.

### Resume

Replace `public/resume.pdf` with your own PDF. The download button in the Hero section links directly to `/resume.pdf`.

---

## Navigation Architecture

The navbar uses a hybrid navigation strategy:

- **Desktop:** `<motion.a href="#section-id">` — native anchor links, which respect the `scroll-padding-top` CSS property defined on `html` in `index.css`.
- **Mobile:** `react-scroll` `<Link>` components with `smooth={true}`, `duration={500}`, and `offset={-90}` to account for the fixed 72 px navbar height. The mobile menu closes automatically after any item is tapped.

Each section registers its ID as follows and must match the `to` values in `NAV_LINKS`:

```jsx
<section id="about">...</section>
<section id="skills">...</section>
<section id="projects">...</section>
<section id="experience">...</section>
<section id="contact">...</section>
```

The global scroll offset is set in `src/index.css`:

```css
:root {
  --nav-height: 72px;
}

html {
  scroll-padding-top: var(--nav-height);
}
```

If you change the navbar height, update `--nav-height` in `index.css` and the `offset` prop on the mobile `ScrollLink` components inside `src/components/common/Navbar.jsx` to match.

---

## Contact Form and EmailJS

The contact form in `src/components/Contact/Contact.jsx` handles its own state, validation, and submission. Key implementation details:

- **Validation** runs on blur for each field and on submit for all fields simultaneously.
- Fields validated: `name` (required, min 2 chars), `email` (required, valid format), `message` (required, min 10 chars).
- A **honeypot** field (`_gotcha`) is included to reject basic spam bots.
- A **60-second cooldown** is enforced via `localStorage` between submissions.
- On success, a confirmation banner is displayed and the form resets.
- On failure, an error banner is displayed and the user may retry.

The payload sent to EmailJS is:

```js
{
  from_name:  formData.name,
  from_email: formData.email,
  message:    formData.message,
}
```

Ensure your EmailJS template uses the exact variable names listed above.

---

## Build and Deployment

### Production Build

```bash
npm run build
```

The output is written to the `dist/` directory. You can preview it locally before deploying:

```bash
npm run preview
```

### Deploying to GitHub Pages

1. Install the GitHub Pages deploy package:

```bash
npm install --save-dev gh-pages
```

2. Add the following to `package.json`:

```json
"homepage": "https://your-username.github.io/portfolio",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d dist"
}
```

3. Deploy:

```bash
npm run deploy
```

### Deploying to Vercel or Netlify

Both platforms detect Vite projects automatically. Set the build command to `npm run build` and the publish directory to `dist`. Add your three `VITE_EMAILJS_*` environment variables in the platform dashboard before deploying.

---

## Scripts Reference

| Script | Command | Description |
|---|---|---|
| Development | `npm run dev` | Start Vite dev server with HMR at port 5173 |
| Build | `npm run build` | Compile and bundle for production into `dist/` |
| Preview | `npm run preview` | Serve the production build locally |
| Lint | `npm run lint` | Run ESLint across all source files |

---

## License

This project is open source and available under the [MIT License](LICENSE).

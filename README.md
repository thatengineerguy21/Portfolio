# Vedant Chaudhari — Portfolio

Personal developer portfolio built with React 19, Vite, Tailwind CSS v4, and Sanity CMS.

---

## 📁 Architecture Overview

- **Root (`/`)**: Main portfolio web application powered by React 19, Vite, and React Router.
- **`studio-portfolio/`**: Sanity Studio v3 content management dashboard for managing projects, experience, education, and skills.

---

## 🚀 Getting Started

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (v20+ recommended)
- `npm` (bundled with Node)

### 2. Environment Setup

Create a `.env` file in the root directory (or copy from `.env.example`):

```bash
cp .env.example .env
```

Default configuration for the live Sanity dataset:

```env
VITE_SANITY_PROJECT_ID=5ehnwrhe
VITE_SANITY_DATASET=production
```

### 3. Install Dependencies

Install root application dependencies:

```bash
npm install
```

Install Sanity Studio dependencies:

```bash
cd studio-portfolio
npm install
cd ..
```

---

## 💻 Development

### Run Portfolio (Frontend)

```bash
npm run dev
```

The app will start locally at [http://localhost:5173](http://localhost:5173).

### Run Sanity Studio (CMS)

```bash
cd studio-portfolio
npm run dev
```

The Sanity Studio will start locally at [http://localhost:3333](http://localhost:3333).

---

## 🧪 Testing & Quality Checks

### Run Unit Tests

```bash
npm test
```

### Run Linter

```bash
npm run lint
```

### Production Build

```bash
# Build frontend
npm run build

# Build studio
cd studio-portfolio && npm run build
```

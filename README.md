
# 📦 test-datacakra

A modern React project using **TypeScript**, **Vite**, **React Hook Form**, **Zustand**, **TanStack Query**, **TailwindCSS**, and **Radix UI** — all built for scalability, DX, and performance 🚀

---

## 📁 Folder Structure

```
├── public/                # Static files served directly
├── src/
│   ├── assets/            # Static assets (e.g. images, icons)
│   ├── components/
│   │   └── ui/            # Reusable UI components (forms, navbar, loader, etc.)
│   ├── config/            # Centralized config (API base URLs, constants)
│   ├── hooks/             # Custom React hooks (e.g. auth, API)
│   ├── lib/               # Utility functions, helpers, validators
│   ├── pages/             # Page-level components for routing
│   ├── routes/            # App routing setup
│   ├── store/             # Zustand stores (global state management)
│   ├── types/             # TypeScript interfaces/types
│   ├── App.tsx            # Main App component
│   ├── main.tsx          
│   └── index.css         
├── .env                   # Environment variables
├── tailwind.config.ts     # TailwindCSS configuration
├── tsconfig.*.json        # TypeScript config variants
├── vite.config.ts         # Vite build config
```

---

## 🔋 Tech Stack

| Tool                     | Description                              |
|--------------------------|------------------------------------------|
| **React 19**             | UI library                               |
| **TypeScript**           | Programming language                     |
| **Vite**                 | Dev server and bundler                   |
| **TailwindCSS**          | Utility-first CSS framework              |
| **React Hook Form**      | Lightweight form management              |
| **Zustand**              | Global state management                  |
| **TanStack Query (v5)**  | Data fetching & caching layer            |
| **Radix UI**             | Unstyled accessible primitives           |
| **Lucide React**         | Icon library                             |
| **Axios**                | HTTP client                              |

---

## 📦 Scripts

```bash
yarn dev         # Run local dev server
yarn build       # Build for production
yarn preview     # Preview production build
yarn lint        # Lint codebase
```

---

## 🧠 State Management

Using [`zustand`](https://github.com/pmndrs/zustand) for local/global state with a simplified and intuitive API.

---

## 🧪 Form & Validation

Forms are built with [`react-hook-form`](https://react-hook-form.com) + schema validation via [`@hookform/resolvers`](https://github.com/react-hook-form/resolvers).

---

## 🌐 API & Fetching

- [`axios`](https://axios-http.com) is used for HTTP requests.
- [`@tanstack/react-query`](https://tanstack.com/query) handles caching, fetching, and background syncing of remote data.

---

## ✨ UI & Components

- All UI components are stored in `components/ui/`.
- Common layout components (`Navbar`, `Layout`, etc.) live here.
- Powered by **Radix UI** for accessible and unstyled components.

---

## 🔒 Types

All shared interfaces and types are located in the `types/` folder for strict typing across components, hooks, and services.

---

## ✅ Linting

Using ESLint with React & TypeScript support. Run `yarn lint` to check code quality.

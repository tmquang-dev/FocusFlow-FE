<div align="center">

# FocusFlow

**A minimal productivity tool for solo developers and freelancers.**  
Combines a lean Kanban board with a distraction-free Zen Focus Mode — all in one interface.

<a href="https://react.dev/"><img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=white" alt="React" /></a>
<a href="https://www.typescriptlang.org/"><img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript" /></a>
<a href="https://tailwindcss.com/"><img src="https://img.shields.io/badge/Tailwind_CSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white" alt="Tailwind CSS" /></a>
<a href="https://redux-toolkit.js.org/"><img src="https://img.shields.io/badge/Redux_Toolkit-764ABC?style=for-the-badge&logo=redux&logoColor=white" alt="Redux Toolkit" /></a>
<a href="https://vitejs.dev/"><img src="https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite" /></a>
<a href="https://zod.dev/"><img src="https://img.shields.io/badge/Zod-3068B7?style=for-the-badge&logo=zod&logoColor=white" alt="Zod" /></a>
<a href="https://react-hook-form.com/"><img src="https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white" alt="React Hook Form" /></a>

<br />
<br />

<a href="https://github.com/QUANG-SanBay/FocusFlow-FE"><img src="https://img.shields.io/badge/Frontend_Repo-181717?style=for-the-badge&logo=github&logoColor=white" alt="Frontend GitHub" /></a>
<a href="https://github.com/QUANG-SanBay/FocusFlow-BE"><img src="https://img.shields.io/badge/Backend_Repo-181717?style=for-the-badge&logo=github&logoColor=white" alt="Backend GitHub" /></a>
<a href="https://www.focus-flow.xyz/"><img src="https://img.shields.io/badge/Live_Demo-2563EB?style=for-the-badge&logo=vercel&logoColor=white" alt="Live Demo" /></a>

[Features](#-features) · [Tech Stack](#-tech-stack) · [Architecture](#-architecture) · [Getting Started](#-getting-started) · [Project Structure](#-project-structure)

</div>

---

## 🎯 Overview

FocusFlow is a personal MVP built to solve two core pain points for solo developers:

1. **Context switching and distraction** during deep work sessions.
2. **Heavyweight task management tools** that add friction instead of removing it.

The solution: a **4-column Kanban board** tightly integrated with a **Pomodoro-based Focus Mode** — both accessible from the same clean interface without page navigation.

---

## ✨ Features

### 🔐 Authentication System

A complete, multi-step auth flow backed by a secure token strategy:

- **Login** — Email/Password or one-click OAuth (Google / GitHub)
- **Register** — Email → OTP Verification → Set Password → Redirect to Dashboard
- **Forgot Password** — Email → OTP Verification → Reset Password → Return to Login
- **httpOnly Cookie** strategy: access & refresh tokens are never exposed to JavaScript
- **Silent Token Refresh** with a queuing mechanism — concurrent requests failing due to token expiry are held in a queue, then replayed automatically after a successful refresh, preventing redundant logout

### 📋 Kanban Board (Dashboard)

A focused, 4-column task board built for clarity:

| Column          | Color | Purpose                      |
| --------------- | ----- | ---------------------------- |
| **Backlog**     | Gray  | Idea pool — unscheduled work |
| **To Do**       | Blue  | Committed, ready to start    |
| **In Progress** | Amber | Currently being worked on    |
| **Done**        | Green | Completed tasks              |

Key interactions:

- **Quick Add Bar** — A persistent input pinned to the top: `Add a new task to Backlog...` (submit with Enter)
- **Task Cards** — Display a unique task ID badge (monospace font), title, and a short description
- **Done Column** — Cards are rendered at 50% opacity with grayed text to reduce visual cognitive load, signalling closure without deletion
- **Start Focus Button** — Available exclusively on cards in the _In Progress_ column, acting as the direct bridge between task management and the Focus Mode
- **Drag & Drop** — Powered by `@dnd-kit` for smooth, accessible column-to-column reordering

### ⏱️ Zen Focus Mode

A distraction-free Pomodoro experience:

- Triggered from any _In Progress_ task card via the **Start Focus** button
- **Full UI collapse**: sidebar and Kanban columns are completely hidden
- **Large countdown timer** (`25:00` default, rendered in JetBrains Mono at `72px`) with Start / Pause / Reset controls
- **Quick Settings Bubble** — A floating popover above the settings button for selecting session duration:
  - `25 min` (standard Pomodoro)
  - `50 min` (extended deep work)
  - **Custom** (user-defined minutes)
  - Toggle for completion sound alert

### 👤 Personal Profile

- Edit `Full Name` and `Avatar`
- **Email field** is locked with a visual lock icon 🔒 — enforcing system integrity (email is the account identifier and cannot be changed)
- **Linked Accounts section** — Displays OAuth connection status with actionable `Link` / `Unlink` buttons for Google and GitHub

---

## 🛠 Tech Stack

### Frontend

| Category             | Technology             | Rationale                                                                   |
| -------------------- | ---------------------- | --------------------------------------------------------------------------- |
| **Framework**        | React 19 + TypeScript  | Concurrent features, full type safety                                       |
| **Build Tool**       | Vite 8                 | Sub-second HMR, optimized production builds                                 |
| **State Management** | Redux Toolkit (RTK)    | Predictable global state, RTK's opinionated structure reduces boilerplate   |
| **Styling**          | Tailwind CSS v4        | CSS Custom Properties-based design tokens with native dark mode support     |
| **Drag & Drop**      | `@dnd-kit`             | Accessible, framework-agnostic DnD with touch support                       |
| **Animations**       | Framer Motion          | Declarative animations for Focus Mode transitions and micro-interactions    |
| **Forms**            | React Hook Form + Zod  | Performant uncontrolled forms with schema-driven runtime validation         |
| **HTTP Client**      | Axios                  | Interceptor-based request/response pipeline for silent token refresh        |
| **Routing**          | React Router v7        | File-based nested routing with guard components                             |
| **Testing**          | Jest + Testing Library | Unit and integration tests with a Redux-aware `renderWithProviders` utility |

### Backend

| Category        | Technology                                |
| --------------- | ----------------------------------------- |
| **Runtime**     | Node.js + Express                         |
| **Database**    | MongoDB (via Mongoose ODM)                |
| **Validation**  | Zod (schema-driven, shared-type approach) |
| **Email / OTP** | Resend SDK                                |

---

## 🏗 Architecture

### System Overview

```
┌─────────────────────────────────────────────────┐
│                  Browser (Client)                │
│                                                 │
│  ┌─────────────┐    ┌────────────────────────┐  │
│  │  Redux Store │    │    React Component      │  │
│  │  (RTK)       │◄──►│    Tree (Vite SPA)     │  │
│  └──────┬──────┘    └──────────┬─────────────┘  │
│         │                      │                 │
│         └──────────┬───────────┘                 │
│                    │                             │
│             ┌──────▼──────┐                      │
│             │ Axios Client │                      │
│             │ (Interceptor)│                      │
│             └──────┬──────┘                      │
└────────────────────┼────────────────────────────┘
                     │ HTTPS + httpOnly Cookie
┌────────────────────▼────────────────────────────┐
│                  Express API Server              │
│                                                 │
│  ┌──────────────┐  ┌───────────┐  ┌──────────┐  │
│  │ Auth Router  │  │Task Router│  │  Zod     │  │
│  │ (JWT + OTP)  │  │  (CRUD)   │  │Middleware│  │
│  └──────┬───────┘  └─────┬─────┘  └──────────┘  │
│         └────────────────┘                       │
│                    │                             │
│             ┌──────▼──────┐                      │
│             │   Mongoose   │                      │
│             │     ODM      │                      │
│             └──────┬──────┘                      │
└────────────────────┼────────────────────────────┘
                     │
             ┌───────▼───────┐
             │    MongoDB     │
             │   (Atlas)      │
             └───────────────┘
```

### Frontend Application Flow

```
main.tsx
  └─ <Provider store>          ← Redux global state
      └─ <AuthInitializer>     ← Calls GET /v1/users/me on app boot
          └─ <RouterProvider>
              ├─ GuestRoutes   ← Redirects authenticated users away from /login
              │   ├─ /login
              │   ├─ /register
              │   ├─ /verify-otp
              │   ├─ /create-password
              │   └─ /forgot-password
              └─ ProtectedRoutes  ← Redirects unauthenticated users to /login
                  └─ MainLayout (Header + Footer)
                      └─ / → Home
                              ├─ <AddNewTask />   (Quick Add Bar)
                              └─ <KanbanBoard />  (4-column board)
```

### Silent Token Refresh — Queue Pattern

When an API request returns a `401 Unauthorized`, the Axios response interceptor:

1. **Pauses** the failed request
2. **Checks** if a token refresh is already in progress
3. If not, initiates `POST /v1/auth/refresh-token`
4. **Queues** any additional `401`s that arrive concurrently
5. On refresh success — **replays** all queued requests
6. On refresh failure — **rejects** all queued requests and clears user session

```
Request A → 401
  ├─ isRefreshing = false → start refresh
  │   └─ POST /refresh-token
Request B → 401 (arrives while refreshing)
  └─ isRefreshing = true → pushed to failedQueue[]

refresh success:
  ├─ processQueue(null) → replay Request B
  └─ replay Request A
```

### Authentication Flow

```
[Register]
  /register → POST /send-otp
  /verify-otp → POST /verify-otp → { registration_token }
  /create-password → POST /register/complete (Bearer: registration_token)
  → Redirect to /login

[Forgot Password]
  /forgot-password → POST /password/forgot
  /verify-otp → POST /password/verify-otp → { reset_token }
  /create-password → POST /password/reset (Bearer: reset_token)
  → Redirect to /login
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 20
- **pnpm** >= 9 (recommended) or npm

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/your-username/focusflow-fe.git
cd focusflow-fe

# 2. Install dependencies
pnpm install

# 3. Configure environment
cp .env.example .env
# Edit .env and set VITE_API_URL to your backend URL
```

### Environment Variables

```env
# .env
VITE_API_URL=http://localhost:5000
```

### Development

```bash
# Start the dev server (HMR enabled)
pnpm dev
```

The app will be available at `http://localhost:5173`.

### Running Tests

```bash
# Run all unit/integration tests
pnpm test

# Run tests in watch mode
pnpm test --watch
```

### Production Build

```bash
pnpm build
pnpm preview
```

---

## 📁Latest Project Structure

```
focusflow-fe/
├── public/
├── src/
│   ├── api/
│   │   ├── axiosClient.ts          # Axios instance + silent refresh interceptor
│   │   └── services/
│   │       ├── authServices.ts     # Auth API calls (login, register, OTP, reset)
│   │       ├── authServices.type.ts# TypeScript contracts for all Auth endpoints
│   │       └── userServices.ts     # User API calls (getMe)
│   │
│   ├── app/
│   │   ├── store.ts                # Redux store configuration (combineReducers)
│   │   └── hooks.ts                # Typed useAppDispatch / useAppSelector
│   │
│   ├── components/
│   │   ├── AuthInitializer.tsx     # App-level auth bootstrap (calls getMe)
│   │   ├── GuestRoutes.tsx         # Route guard: redirect authenticated users
│   │   ├── ProtectedRoutes.tsx     # Route guard: redirect unauthenticated users
│   │   │
│   │   ├── auth/                   # Form-level components for each auth screen
│   │   │   ├── login/
│   │   │   ├── register/
│   │   │   ├── verifyOtp/
│   │   │   ├── createPassword/
│   │   │   ├── forgotPassword/
│   │   │   └── socialAuth/         # Google / GitHub OAuth buttons
│   │   │
│   │   ├── common/                 # Reusable UI primitives
│   │   │   ├── Button.tsx          # Polymorphic button (renders as <button> or <Link>)
│   │   │   ├── InputField.tsx      # Controlled input with label + error state
│   │   │   ├── Icons.tsx           # SVG icon library (centralized)
│   │   │   ├── Menu.tsx            # User dropdown (Profile / Logout)
│   │   │   ├── AlertMessage.tsx    # Inline error/success messages
│   │   │   ├── BackButton.tsx      # Navigation back button
│   │   │   └── UserAvatar.tsx      # User avatar with fallback initials
│   │   │
│   │   ├── home/
│   │   │   ├── addNewTask/         # Quick-add input bar (pinned to board top)
│   │   │   └── kanbanBoard/        # Kanban board UI
│   │   │       └── kanbanColumn/
│   │   │           ├── headerColumn/   # Column header (label + task count badge)
│   │   │           ├── lineColumn/     # Visual separator between columns
│   │   │           └── columnTasks/
│   │   │               └── taskCard/   # Individual task card with Focus button
│   │   │
│   │   ├── layouts/
│   │   │   ├── MainLayout.tsx      # App shell: Header + <Outlet> + Footer
│   │   │   ├── header/             # Top navigation bar
│   │   │   ├── footer/             # Footer
│   │   │   └── drawer/             # Slide-in sidebar (Workspace navigation)
│   │   │
│   │   └── profile/
│   │       └── profileSlice.ts     # Redux slice: { user, isInitializing }
│   │
│   ├── pages/
│   │   ├── auth/                   # Page-level containers (thin wrappers)
│   │   └── home/Home.tsx           # Main dashboard page
│   │
│   ├── router/
│   │   ├── index.tsx               # createBrowserRouter root
│   │   ├── publicRoutes.tsx        # Auth routes (wrapped by GuestRoutes)
│   │   └── protectedRoutes.tsx     # App routes (wrapped by ProtectedRoutes)
│   │
│   ├── utils/
│   │   ├── cn.ts                   # clsx + tailwind-merge utility
│   │   └── test-utils.tsx          # Redux-aware renderWithProviders for tests
│   │
│   ├── index.css                   # Design system: CSS tokens + dark mode + typography
│   └── main.tsx                    # Application entry point
│
├── .env.example
├── jest.config.js
├── vite.config.ts
├── tsconfig.app.json
└── package.json
```

---

<div align="center">

Built with ❤️ by [Quang](https://github.com/your-username)

</div>

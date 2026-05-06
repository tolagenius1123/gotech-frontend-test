# GoTech Frontend Test

A responsive admin dashboard built with Next.js as part of the GoTech frontend assessment.

## Setup

Clone the repo and install dependencies:

```bash
git clone <repo-url>
cd gotech-frontend-test
npm install
```

Create a `.env.local` file in the root of the project:

```env
NEXT_PUBLIC_API_BASE_URL=https://jsonplaceholder.typicode.com
```

Then start the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). You'll land on the login page — use any email address and a password that satisfies the requirements (at least one uppercase letter, lowercase letter, number, and symbol).

---

## Architecture

The project uses the Next.js App Router with two route groups:

- `(auth)` — login and register pages, no layout wrapper
- `(dashboard)` — all protected pages, wrapped in a shared sidebar + header layout

The root `/` page redirects straight to `/dashboard/overview`, and `/dashboard` does the same.

Most dashboard pages are React Server Components. Anything that needs interactivity or client-side data fetching is broken out into a separate `*Client` or `*Widget` component marked with `'use client'`. This keeps the server/client boundary explicit and avoids pulling unnecessary JavaScript into the initial bundle.

```
src/
├── app/
│   ├── (auth)/              # login, register
│   └── (dashboard)/
│       └── dashboard/
│           ├── overview/    # overview + _components/
│           ├── posts/       # posts table + _components/
│           ├── users/       # users table + _components/
│           └── ...
├── components/
│   ├── data-table/          # reusable DataTable + TableSkeleton
│   ├── form/                # FormInput, FormButton
│   ├── layout/              # Sidebar, Header, SidebarLink, MobileMenu
│   └── ui/                  # shadcn primitives
├── hooks/                   # use-posts, use-debounce
├── api/                     # axios fetch functions
├── store/                   # zustand auth store
├── types/                   # shared TypeScript interfaces
└── schemas/                 # Yup validation schemas
```

---

## Technology Choices

**Next.js 15 + React 19** — App Router was the natural choice. Nested layouts make it easy to share the dashboard shell across all protected pages, and route groups let the auth pages opt out of that layout cleanly without any conditional rendering hacks.

**TanStack Query** — handles all API data fetching. It gives you caching, background refetching, and loading/error states without having to wire any of that up manually. The posts query uses a 5-minute `staleTime` so navigating back to the page doesn't trigger unnecessary network requests.

**Zustand** — used for auth state. The `persist` middleware keeps the user in `localStorage` so sessions survive a page refresh. It felt like the right weight for what's essentially one slice of global state — no need to pull in something heavier.

**Formik + Yup** — paired together for form handling and schema validation. The Yup schemas live in a dedicated `schemas/` file so they're reusable across the login and register forms without any duplication.

**Axios** — configured with a base instance that reads the API URL from the environment. The response interceptor normalises error messages so every rejected promise in the app surfaces as a plain `Error` with a readable message, rather than digging through `error.response.data` in every catch block.

**Tailwind CSS v4 + shadcn/ui** — Tailwind handles layout and utility styling. shadcn components (Dialog, Table, Input, Button, etc.) are used for interactive primitives since they're accessible out of the box and easy to theme consistently across the app.

**TanStack Table** — powers the `DataTable` component with built-in sorting, filtering, and pagination. Defining columns separately per feature (rather than in the generic table component) keeps the logic close to where it's used.

---

## Key Implementation Details

**Auth flow** — login is simulated (no real backend call) but runs through the same validation, loading state, and error handling as a real implementation would. On success, the user object is persisted to `localStorage` via Zustand and the app redirects to the dashboard.

**Posts** — fetched from the API using a `usePosts` hook built on TanStack Query. Adding a post uses `useMutation`, and on success the query cache is updated directly so the table reflects the new entry immediately without triggering a refetch.

**Users** — uses local component state with dummy data since there's no users endpoint available in the API. The pattern mirrors posts exactly: same `DataTable`, same column definition structure, same add dialog with Formik validation.

**Overview page** — stays as a Server Component. The "Recent Posts" section is extracted into a small `'use client'` widget component so it can use the `usePosts` hook independently, without forcing the rest of the page to become client-side.

**Search** — debounced at 300ms via a `useDebounce` hook to avoid running the filter function on every single keystroke.

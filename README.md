# Moneybox – Explore Accounts

A Next.js app for the "Explore Accounts" product discovery page and an Admin interface for managing products and categories without developer input.

## Getting Started

Install dependencies:

```bash
pnpm install
```

Two dev servers are required - open two terminal tabs:

```bash
# Terminal 1: API server (json-server)
pnpm dev:server

# Terminal 2: Next.js app
pnpm dev
```

Then open [http://localhost:3000](http://localhost:3000).

## Pages

| Route    | Description                                               |
| -------- | --------------------------------------------------------- |
| `/`      | Explore Accounts - carousel with expandable product cards |
| `/admin` | Admin — create, edit and delete products and categories   |

## Accessibility

- Semantic HTML throughout (`<header>`, `<main>`, `<nav>`, `<section>`, `<ul>`)
- All interactive elements are keyboard-navigable with visible focus rings
- Carousel and accordion controls are fully operable via Tab and Enter/Space
- ARIA labels on navigation buttons and live regions for dynamic content
- Form inputs linked to error messages via `aria-describedby`

## Tech Stack

- **Next.js 16** — App Router, server components, TypeScript
- **React Query 5** — SSR prefetch + `HydrationBoundary`
- **json-server 1** — local REST data store (`db.json`)
- **shadcn/ui v4** + **Tailwind CSS v4**
- **React Hook Form** + **Zod** — form validation
- **Vitest** + **React Testing Library** — tests

## Architecture layers and design decisions

```
┌──────────────────────────────────────────────────────┐
│                    Next.js App                       │
│                                                      │
│  Server Component         Client Component           │
│  prefetch at request  →   HydrationBoundary          │
│         │                       │                    │
│         └────── React Query ────┘                    │
│                      │                               │
│               /api/* routes                          │
│           (proxy BFF / REST)                         │
└──────────────────────────────────────────────────────┘
                      │
              json-server :3001
                      │
                   db.json
```

**Data layer (json-server)**  
A lightweight JSON-based REST server that acts as the data store, exposing products and categories on port 3001. It supports full CRUD operations, so the admin interface can create, update and delete products and categories without any backend code changes.

**API layer (Next.js `/api` routes)**  
The Next.js API routes proxy requests between the frontend and json-server. Business logic can live here without touching the frontend. It also makes the data available to other platforms (e.g. a mobile app) via standard REST endpoints.

### API Routes

| Method   | Endpoint              | Description                                         |
| -------- | --------------------- | --------------------------------------------------- |
| `GET`    | `/api/categories`     | Fetch all categories                                |
| `POST`   | `/api/categories`     | Create a new category                               |
| `PUT`    | `/api/categories/:id` | Update a category by ID                             |
| `DELETE` | `/api/categories/:id` | Delete a category by ID                             |
| `GET`    | `/api/products`       | Fetch all products (optional `?categoryId=` filter) |
| `POST`   | `/api/products`       | Create a new product                                |
| `PUT`    | `/api/products/:id`   | Update a product by ID                              |
| `DELETE` | `/api/products/:id`   | Delete a product by ID                              |

**Data fetching and server state management (React Query)**  
React Query manages all server state. On the server, `QueryClient.prefetchQuery` pre-fetches categories and products, and the dehydrated state is passed to the client via `HydrationBoundary` — avoiding a loading flash on first render. On the client, React Query handles loading and error states and automatically invalidates the cache after any mutation.

**Server components**  
The `/` and `/admin` pages are async server components that prefetch data at request time and pass the hydrated cache down to their client boundaries, so the page renders with content already in place.

**Client components**  
Client components handle all user interaction and presentation. They consume React Query hooks for reads and mutation hooks for writes, with form state managed by React Hook Form and Zod.

## Scripts

| Command           | Description                              |
| ----------------- | ---------------------------------------- |
| `pnpm dev`        | Start Next.js (port 3000, Turbopack)     |
| `pnpm dev:server` | Start json-server data store (port 3001) |
| `pnpm build`      | Production build                         |
| `pnpm typecheck`  | TypeScript type-check (no emit)          |
| `pnpm test`       | Run Vitest test suite                    |
| `pnpm test:watch` | Run Vitest in watch mode                 |
| `pnpm lint`       | ESLint                                   |

## Tools

I chose the following libraries deliberately, both because I have hands-on experience with them and because they reflect the tools listed in the job requirements.

- **shadcn/ui** — built on Radix UI primitives. Gives accessible, unstyled behaviour out of the box with full control over markup and styling.
- **React Query** — the standard for server state in React. Handles caching, background refetching, loading/error states, and cache invalidation after mutations. The SSR prefetch pattern here shows it works equally well on the server and the client.
- **React Hook Form + Zod** — React Hook Form minimises re-renders during input; Zod provides type-safe schema validation shared between the form and the data layer. Together they handle validation, error messages, and form state with minimal boilerplate.

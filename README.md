# SilverGuild — Frontend

The web client for **SilverGuild**, a Dungeons & Dragons toolkit for managing user profiles, characters, and interactive character sheets. This is the Next.js frontend; it talks to a separate Ruby on Rails JSON API that serves all user and character data.

This project is in early development. Profile and character-listing flows are working today; full interactive character sheets and authentication are on the near-term roadmap (see [Roadmap](#roadmap)).

## Related Repositories

- **Backend (Ruby on Rails API):** [SilverGuild/SG_backend](https://github.com/SilverGuild/SG_backend) — same organization. Serves all data this app consumes, over a JSON:API-style interface.

## Screenshots

<!--
  Drop image files in docs/screenshots/ and update the paths below.
  Recommended: PNG, ~1200px wide. Keep file names lowercase-hyphenated.
  Each pair of views is its own table; the header row is the label.
  Add or remove tables as views come online.
-->

| Landing | Profile |
| :---: | :---: |
| ![Landing page](docs/screenshots/landing.png) | ![User profile](docs/screenshots/profile.png) |

| Character Roster | Character Sheet _(planned)_ |
| :---: | :---: |
| ![Character roster](docs/screenshots/character-roster.png) | _Coming soon_ |

## Tech Stack

| Concern | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 15.4 (App Router) |
| UI library | [React](https://react.dev/) 19 |
| Language | [TypeScript](https://www.typescriptlang.org/) 5.8 (`strict` mode) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 (via `@tailwindcss/postcss`) |
| Dev bundler | [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) (`next dev --turbopack`) |
| Data fetching | Native `fetch`, wrapped in a small typed client (`src/lib/`) — no external data-fetching library |
| Backend contract | JSON:API-style `data` / `attributes` envelopes, unwrapped client-side |
| Unit / component tests | [Jest](https://jestjs.io/) 29 + [React Testing Library](https://testing-library.com/) (jsdom) |
| End-to-end tests | [Playwright](https://playwright.dev/) (Chromium) |
| Linting / formatting | ESLint 9 (`eslint-config-next`) + Prettier |
| Runtime | Node.js 20+ _(inferred from `@types/node`; confirm against your `.nvmrc` / `engines`)_ |

## How It Talks to the Backend

All server communication goes through a thin, fully-typed API layer in `src/lib/` rather than scattering `fetch` calls through components.

**Configuration (`src/lib/config.ts`)** centralizes the base URL and every endpoint in one place:

- `SG_API_BASE_URL` — currently `http://127.0.0.1:3000/api/v1` (local backend; not yet deployed).
- `SG_API_ENDPOINTS` — a typed (`as const`) map of route builders: `userById(id)`, `charactersByUserId(userId)`, and `characterById(id)`.
- `APP_NAME` — `"SilverGuild"`.

**Transport (`src/lib/api.ts`)** wraps `fetch` in a generic `apiRequest<T>()` helper that prepends the base URL, sets the JSON content type, and throws on any non-`2xx` response. On top of it sit typed convenience functions:

- `fetchUser(id)` → `Promise<User>`
- `fetchUserCharacters(id)` → `Promise<Character[]>`

**Deserialization (`src/lib/jsonApiClient.ts`)** handles the backend's JSON:API shape so components never see the envelope. `extractSingle<T>()` flattens the first record into `T & { id }` (and throws if the response is empty); `extractAll<T>()` maps every record the same way (returning `[]` when empty). Both fold the resource `id` back in alongside its `attributes`.

The net effect: components import domain types from `@/types` and call typed functions like `fetchUserCharacters(userId)`, with the wire format fully contained in `src/lib/`.

> Profile avatars are served from [ui-avatars.com](https://ui-avatars.com/), which is allow-listed in `next.config.ts` under `images.remotePatterns`.

## Data Providers

Components never call the API layer directly. Instead they read user and character data from a single React context exposed by the `useData()` hook (`src/app/providers/DataProvider.tsx`), whose shape (`DataContextType`) carries `user`, `characters`, their setters, a `loading` flag, and an `isMockData` flag.

Which implementation sits behind that context is chosen in `src/app/providers/helper/AppDataProvider.tsx` via a `USE_MOCK_DATA` constant:

- **`RealDataProvider`** — on mount (keyed by `userId`), fetches the user and their characters in parallel via `fetchUser` / `fetchUserCharacters`, tracking `loading` and logging on failure. This is the default (`USE_MOCK_DATA = false`).
- **`MockDataProvider`** — seeds the same context from `src/mocks/` with no network calls, giving a contained, predictable dataset for building and styling UI without the backend running.

Because both satisfy the same context, components are agnostic to the source — flipping `USE_MOCK_DATA` swaps the entire app between live and offline data without touching any component.

## Project Structure

Key directories (build, coverage, and tooling output omitted):

```
SG_frontend/
├── src/
│   ├── app/                                # App Router
│   │   ├── character/page.tsx              # character route
│   │   ├── profile/
│   │   │   ├── components/
│   │   │   │   ├── CharacterRoster.tsx     # (+ CharacterRoster.test.tsx)
│   │   │   │   ├── CharacterRosterCard.tsx # (+ CharacterRosterCard.test.tsx)
│   │   │   │   └── ProfileDetails.tsx
│   │   │   └── page.tsx                    # profile route
│   │   ├── providers/                      # data-source layer
│   │   │   ├── DataProvider.tsx            # selects Mock vs Real
│   │   │   ├── RealDataProvider.tsx        # backed by the API (src/lib)
│   │   │   ├── MockDataProvider.tsx        # backed by src/mocks
│   │   │   ├── helper/AppDataProvider.tsx
│   │   │   └── index.ts
│   │   ├── layout.tsx                      # root layout
│   │   ├── page.tsx                        # landing page
│   │   └── globals.css                     # global / Tailwind styles
│   ├── components/
│   │   ├── layout/Header/header.tsx
│   │   └── ui/                             # reserved for shared primitives
│   ├── lib/                                # API layer
│   │   ├── api.ts                          # apiRequest() + fetchUser / fetchUserCharacters
│   │   ├── config.ts                       # base URL + endpoint map
│   │   └── jsonApiClient.ts                # JSON:API unwrapping (extractSingle / extractAll)
│   ├── mocks/                              # sample user / character data
│   │   ├── characterData.ts
│   │   ├── userData.ts
│   │   └── index.ts
│   └── types/                              # shared domain types
│       ├── character.ts
│       ├── user.ts
│       ├── dataContext.ts
│       └── index.ts
├── e2e/                                    # Playwright end-to-end tests
│   ├── tests/
│   │   ├── auth/                           # login, sign-up
│   │   ├── character/                      # character viewing
│   │   ├── layout/                         # header
│   │   ├── profile/                        # viewing, editing, roster interactions
│   │   └── homepage.spec.ts
│   ├── helper/positioning.ts
│   └── fixtures/
├── public/                                 # static assets (logos)
├── .github/workflows/                      # main.yml (CI), playwright.yml (E2E)
├── jest.config.ts                          # Jest (via next/jest), jsdom, 70% coverage threshold
├── playwright.config.ts                    # Chromium; baseURL :3001; auto-starts the dev server
├── next.config.ts
└── tsconfig.json                           # @/* → src/*
```

The `@/*` path alias resolves to `src/*` (see `tsconfig.json`). Component tests are colocated next to their components (e.g. `CharacterRoster.test.tsx`); end-to-end specs live under `e2e/tests/`.

## Getting Started

### Prerequisites

- Node.js 20+ _(confirm exact version against your `.nvmrc` / `engines`)_
- npm
- The **[SG_backend](https://github.com/SilverGuild/SG_backend)** API running locally on port **3000** for live data. Not strictly required for UI work: set `USE_MOCK_DATA = true` in `src/app/providers/helper/AppDataProvider.tsx` to run against the bundled `src/mocks/` dataset with no backend (see [Data Providers](#data-providers)).

### Setup

```bash
# 1. Clone
git clone https://github.com/SilverGuild/SG_frontend.git
cd SG_frontend

# 2. Install dependencies
npm install

# 3. Start the backend first (see the SG_backend README), then run the dev server
npm run dev
```

The dev server is preconfigured to run on **port 3001** with Turbopack (`next dev --turbopack -p 3001`), deliberately leaving port 3000 to the Rails backend. Once it's up, open `http://localhost:3001`.

> The API base URL is currently hardcoded in `src/lib/config.ts`. Once the backend is deployed, this is the natural spot to move to an environment variable (e.g. `NEXT_PUBLIC_API_URL`) — tracked in the roadmap below.

## Scripts

| Script | Purpose |
| --- | --- |
| `npm run dev` | Start the dev server (Turbopack, port 3001). |
| `npm run build` | Production build. |
| `npm start` | Serve the production build. |
| `npm run lint` / `lint:fix` | ESLint (`next lint`). |
| `npm run format` / `format:check` | Prettier over `src/`. |
| `npm test` / `test:watch` / `test:coverage` | Jest unit & component tests. |
| `npm run test:e2e` (+ `:ui` / `:headed` / `:debug` / `:report`) | Playwright end-to-end tests. |
| `npm run test:all` | Run Jest, then Playwright. |

## Testing

Two layers, deliberately kept separate so the runners don't collide:

- **Unit & component** — Jest (configured through `next/jest`) in a `jsdom` environment with React Testing Library. Tests live as `src/**/*.test.{ts,tsx}` or under `__tests__/`. Coverage uses the V8 provider with a **70%** global threshold (branches, functions, lines, statements). Run with `npm test` or `npm run test:coverage`.
- **End-to-end** — Playwright against Chromium, with the base URL pointed at `http://localhost:3001`. The config auto-starts the dev server before the run (reusing an existing one outside CI), so `npm run test:e2e` works from a cold start. Specs live in `e2e/tests/` and match `*.spec.ts`.

Jest ignores the `/e2e` directory and Playwright only matches `.spec.ts`, so the two suites never pick up each other's files.

## Current Status

Working today:

- A simplified loading / landing page.
- User profile view.
- Character list for a user.

Everything else is scaffolding or planned — see the roadmap.

## Roadmap

Roughly in priority order:

1. **Authentication** — user login and session handling on the client, paired with the auth work landing in the backend. (Top priority.)
2. **Interactive character sheets** — full character sheets with inline, editable fields.
3. **Formal deployment** — move both apps off GitHub Actions to proper hosting, and switch the API base URL to an environment variable.
4. **Landing-page animation** — polish the main landing page with motion.

> Both repos currently run their pipelines through **GitHub Actions** (CI), not a hosted environment — proper deployment is item 3 above.

## License

Released under the **MIT License** — same as the backend repo. See the [`LICENSE.md`](LICENSE.md) file. The MIT license covers this application's code; it does not cover Dungeons & Dragons rules content, which is sourced from the [D&D 5e API](https://www.dnd5eapi.co/) on the backend.
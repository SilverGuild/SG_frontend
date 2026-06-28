# SilverGuild — Frontend

The web client for **SilverGuild**, a Dungeons & Dragons toolkit for managing user profiles, characters, and interactive character sheets. This is the Next.js frontend; it talks to a separate Ruby on Rails JSON API that serves all user and character data.

This project is in early development. Profile and character-listing flows are working today; interactive character sheets (create / view / edit) are actively being built, and authentication is the next major piece (see [Roadmap](#roadmap)).

---

## Table of Contents

- [SilverGuild — Frontend](#silverguild--frontend)
  - [Table of Contents](#table-of-contents)
  - [Related Repositories](#related-repositories)
  - [Screenshots](#screenshots)
  - [Tech Stack](#tech-stack)
  - [How It Talks to the Backend](#how-it-talks-to-the-backend)
  - [Data Providers](#data-providers)
  - [Project Structure](#project-structure)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Setup](#setup)
  - [Scripts](#scripts)
  - [Testing](#testing)
  - [Current Status](#current-status)
  - [Roadmap](#roadmap)
  - [Contributors](#contributors)
  - [License](#license)

---

## Related Repositories

- **Backend (Ruby on Rails API):** [SilverGuild/SG_backend](https://github.com/SilverGuild/SG_backend) — same organization. Serves all data this app consumes, over a JSON:API-style interface.

## Screenshots

<!--
  Drop image files in public/docs/screenshots/ and update the paths below.
  Recommended: PNG, ~1200px wide. Keep file names lowercase-hyphenated.
  Each pair of views is its own table; the header row is the label.
  Add or remove tables as views come online.
-->

| Landing | Profile |
| :---: | :---: |
| ![Landing page](public/docs/screenshots/landing.png) | ![User profile](public/docs/screenshots/profile.png) |

| Character Roster | Character Sheet _(in progress)_ |
| :---: | :---: |
| ![Character roster](public/docs/screenshots/character-roster.png) | _Coming soon_ |

## Tech Stack

| Concern | Choice |
| --- | --- |
| Framework | [Next.js](https://nextjs.org/) 15.4 (App Router) |
| UI library | [React](https://react.dev/) 19 |
| Language | [TypeScript](https://www.typescriptlang.org/) 5.8 (`strict` mode) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) v4 (via `@tailwindcss/postcss`) |
| Dev bundler | [Turbopack](https://nextjs.org/docs/app/api-reference/turbopack) (`next dev --turbopack`) |
| Data fetching | Native `fetch`, wrapped in a typed client (`src/lib/api/`) — initial load on the server, held in client context. No external data-fetching library. |
| Backend contract | JSON:API-style `data` / `attributes` envelopes on reads, unwrapped client-side; Rails strong-params bodies on writes |
| Unit / component tests | [Jest](https://jestjs.io/) 29 + [React Testing Library](https://testing-library.com/) (jsdom) |
| End-to-end tests | [Playwright](https://playwright.dev/) (Chromium) |
| Linting / formatting | ESLint 9 (`eslint-config-next`) + Prettier |
| Runtime | Node.js 20+ _(inferred from `@types/node`; confirm against your `.nvmrc` / `engines`)_ |

## How It Talks to the Backend

All server communication goes through a thin, fully-typed API layer under `src/lib/api/` rather than scattering `fetch` calls through components.

**Configuration** centralizes the base URL and every endpoint in one place:

- `SG_API_BASE_URL` — currently `http://127.0.0.1:3000/api/v1` (local backend; not yet deployed).
- `SG_API_ENDPOINTS` — a typed (`as const`) map of route builders: `userById(id)`, `charactersByUserId(userId)`, and `characterById(id)`.
- `APP_NAME` — `"SilverGuild"`.

**Transport** wraps `fetch` in a generic `apiRequest<T>()` helper that prepends the base URL, sets the JSON content type, forwards `method` / `body` / `headers`, and throws on any non-`2xx` response. On top of it sit typed convenience functions:

- `fetchUser(id)` → `Promise<User>`
- `fetchUserCharacters(id)` → `Promise<Character[]>`
- `fetchCharacter(id)` → `Promise<Character>`
- `createCharacter(userId, input)` → `Promise<Character>` (POST to the nested `charactersByUserId` route)
- `updateCharacter(id, changes)` → `Promise<Character>` (PATCH to `characterById`)

**Deserialization** handles the backend's JSON:API shape so components never see the envelope. `extractSingle<T>()` flattens the first record into `T & { id }` (and throws if the response is empty); `extractAll<T>()` maps every record the same way (returning `[]` when empty). Both fold the resource `id` back in alongside its `attributes`.

**Reads vs. writes — a deliberate asymmetry.** Responses come back JSON:API-shaped and are unwrapped as above. Requests, however, are sent in the Rails strong-parameters shape the controller expects (`{ "character": { …fields } }`), _not_ a JSON:API envelope. The payload types are derived from the domain type so they can't drift: the create input is the character record minus the server-owned fields (`id`, and `user_id`, which comes from the nested route), and the update input is that same shape with every field optional.

**Server-side loading.** Initial data is fetched on the Next server, not in the browser: `src/lib/server/loadAppData.ts` fetches the user and their characters in parallel and is called from the root layout (see [Data Providers](#data-providers)).

The net effect: components import domain types from `@/types` and never touch the wire format, which is fully contained in `src/lib/api/`.

> Profile avatars are served from [ui-avatars.com](https://ui-avatars.com/), which is allow-listed in `next.config.ts` under `images.remotePatterns`.

## Data Providers

Components never call the API layer directly; they read user and character data from a single React context via the `useData()` hook (`src/app/providers/DataProvider.tsx`). The context shape (`DataContextType`) carries `user`, `characters`, their setters, an `addCharacter` write method, and a `loading` flag.

Data loading is **hybrid** — the server fetches the initial data, the client holds it:

1. The root layout (`src/app/layout.tsx`) is an async **server component**. On each request it calls `loadAppData(userId)` (`src/lib/server/loadAppData.ts`), which fetches the user and their characters in parallel, server-side.
2. It seeds the data provider with that data via `initialUser` / `initialCharacters` props (typed by `AppDataSeed`).
3. The provider is a **client component** that holds the seeded data in React state and exposes it through `DataProvider`, so any client component below can read it with `useData()` — with no client-side fetch waterfall and no loading spinner on first paint.

Writes flow through the same provider. `addCharacter(input)` calls the API's `createCharacter`, appends the saved record to client state, and calls `router.refresh()` so any server-rendered route re-pulls and stays in sync with the client store.

> **Note on `userId`:** it is currently hardcoded (`userId={1}`) in the layout for testing, pending authentication. Once auth lands, the (server-side) layout will read the user from the session here instead.

> **History:** the provider layer previously switched between a `RealDataProvider` and a `MockDataProvider` via a `USE_MOCK_DATA` flag (with an `isMockData` flag on the context). That split was removed when the data layer was streamlined to a single, server-seeded provider.

## Project Structure

Key directories (build, coverage, `playwright-report/`, `test-results/`, and other tooling output omitted). Where a directory isn't expanded below, see the note that follows.

```
SG_frontend/
├── src/
│   ├── app/                       # App Router
│   │   ├── character/             # create / view / edit routes + sheet components (see note)
│   │   ├── profile/               # profile route + components (ProfileDetails, CharacterRoster)
│   │   ├── providers/             # client data context — see Data Providers
│   │   ├── fonts.js               # next/font setup
│   │   ├── layout.tsx             # root layout (async server component; seeds the data provider)
│   │   ├── page.tsx               # landing page
│   │   └── globals.css            # global / Tailwind styles
│   ├── components/
│   │   ├── layout/                # Header
│   │   ├── modals/                # shared modal components
│   │   └── ui/                    # shared UI primitives
│   ├── lib/
│   │   ├── api/                   # API layer: apiRequest, fetch/create/update, config, JSON:API unwrap
│   │   ├── server/                # server-only loaders (loadAppData)
│   │   └── animations/            # animation helpers
│   ├── test/
│   │   └── factories/             # typed test data factories (makeCharacter, makeUser)
│   └── types/                     # shared domain types
│       ├── character.ts           # character record + create-input + mode types
│       ├── user.ts
│       ├── dataContext.ts         # DataContextType, AppDataSeed
│       └── index.ts               # barrel re-export
├── e2e/                           # Playwright end-to-end tests
│   ├── tests/
│   │   ├── auth/                  # login, sign-up
│   │   ├── character/             # character viewing
│   │   ├── layout/                # header
│   │   ├── profile/               # viewing, editing, roster interactions
│   │   └── homepage.spec.ts
│   ├── helper/positioning.ts
│   └── fixtures/
├── public/                        # static assets
│   ├── SilverGuild_Logo.png
│   ├── logo.svg
│   └── docs/screenshots/          # README screenshots
├── .github/workflows/             # main.yml (CI), playwright.yml (E2E)
├── jest.config.ts                 # Jest (via next/jest), jsdom, 70% coverage threshold
├── jest.setup.ts
├── playwright.config.ts           # Chromium; baseURL :3001; auto-starts the dev server
├── next.config.ts
├── tsconfig.json                  # @/* → src/*
└── tsconfig.e2e.json              # separate TS config for Playwright specs
```

> **`src/app/character/`** holds three routes over one shared, presentational sheet: `page.tsx` (create, `/character`), `[id]/page.tsx` (view, `/character/[id]`), and `[id]/edit/page.tsx` (edit, `/character/[id]/edit`). The view and edit routes are server components that fetch by `id`; all three render a shared `CharacterShell` → `CharacterSheet`, with section components (e.g. `Identity`) and shared field primitives organized under the route's components folder. _(Internal component layout is evolving — confirm against the tree as it settles.)_

The `@/*` path alias resolves to `src/*` (see `tsconfig.json`). Component tests are colocated next to their components (e.g. `CharacterRoster.test.tsx`); end-to-end specs live under `e2e/tests/` and are type-checked via `tsconfig.e2e.json`.

## Getting Started

### Prerequisites

- Node.js 20+ _(confirm exact version against your `.nvmrc` / `engines`)_
- npm
- The **[SG_backend](https://github.com/SilverGuild/SG_backend)** API running locally on port **3000**. Because initial data is fetched server-side, the backend must be reachable from the Next server (not just the browser) for the app to load.

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

> The API base URL is currently hardcoded in the API layer's config (`src/lib/api/`). Once the backend is deployed, this is the natural spot to move to an environment variable (e.g. `NEXT_PUBLIC_API_URL`) — tracked in the roadmap below.

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
- **End-to-end** — Playwright against Chromium, with the base URL pointed at `http://localhost:3001`. The config auto-starts the dev server before the run (reusing an existing one outside CI), so `npm run test:e2e` works from a cold start. Specs live in `e2e/tests/`, match `*.spec.ts`, and are type-checked via a separate `tsconfig.e2e.json`.

Jest ignores the `/e2e` directory and Playwright only matches `.spec.ts`, so the two suites never pick up each other's files.

**Test data.** Unit and component tests build their inputs from typed factories in `src/test/factories/` (e.g. `makeCharacter` / `makeCharacters`, `makeUser` / `makeUsers`) rather than from shared static fixtures. Each factory returns a fully-typed object with sensible defaults and accepts a `Partial<…>` overrides argument, so a test states only the fields it cares about and gets valid data for the rest. Defaults mirror the backend's domain rules (valid class/subclass and race/subrace/language pairings, XP derived from level), keeping fixtures consistent with what the API actually produces.

## Current Status

Working today:

- A simplified loading / landing page.
- User profile view.
- Character roster for a user.

In progress:

- **Interactive character sheet.** The create / view / edit routes (`/character`, `/character/[id]`, `/character/[id]/edit`) are scaffolded over one shared presentational sheet that toggles fields between read-only and editable. Character creation is being wired to the backend via the provider's `addCharacter` (POST) write path.

Everything else is scaffolding or planned — see the roadmap.

## Roadmap

Roughly in priority order:

1. **Authentication** — user login and session handling on the client, paired with the auth work landing in the backend. With auth in place, the server-side layout can read the current user from the session and drop the hardcoded `userId`. (Top priority.)
2. **Interactive character sheets** — _in progress._ Finish the editable sheet sections, the create/edit submit flows, and validation-error surfacing from the API layer.
3. **Formal deployment** — move both apps off GitHub Actions to proper hosting, and switch the API base URL to an environment variable.
4. **Landing-page animation** — polish the main landing page with motion.

> Both repos currently run their pipelines through **GitHub Actions** (CI), not a hosted environment — proper deployment is item 3 above.

## Contributors

| Name | Role | GitHub |
| --- | --- | --- |
| Elysa Ward | Founder | [@elysableu](https://github.com/elysableu) |
| Andy Richardson | Co-Founder | [@theandyman007](https://github.com/theandyman007) |

<!-- Add a row per contributor as the team grows. -->

Contributions are welcome. Fork the repo, branch off `develop`, and open a pull request — the [pull request template](.github/pull_request_template.md) will guide your description. CI (lint, type-check, unit, and end-to-end tests) must pass before a merge.

## License

Released under the **MIT License** — same as the backend repo. See the [`LICENSE.md`](LICENSE.md) file. The MIT license covers this application's code; it does not cover Dungeons & Dragons rules content, which is sourced from the [D&D 5e API](https://www.dnd5eapi.co/) on the backend.
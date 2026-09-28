# lead-template

Starting point for every LEAD app (Talent, Pulse, Aspire, …). It includes only
what every app needs on day one:

- Next.js (App Router, TypeScript, `src/`) with a configurable `basePath` for
  [Multi Zones](docs/adr/0001-stack.md)
- Tailwind CSS v4 with the LEAD brand tokens and brand components
- next-intl with `es` (default) and `en`, locale always in the URL
- Supabase (`@supabase/ssr`) with Google sign in and session refresh
- Resend for transactional email
- Jest + React Testing Library, Playwright, ESLint, Prettier, GitHub Actions CI

There is no business logic and no app-specific tables. See
[ADR 0001](docs/adr/0001-stack.md) for why this stack and how Multi Zones works.

## Create a new app from this template

Replace `talent` / `TALENT_URL` below with your app's route and variable.

1. **Use the template.** On GitHub, click **Use this template** → **Create a
   new repository** (e.g. `lead-talent`). Clone it and run `npm install`.
2. **Set the base path.** Copy `.env.example` to `.env.local` and set
   `NEXT_PUBLIC_BASE_PATH=/talent`. Set the same variable in Vercel (all
   environments), along with the other variables from `.env.example`.
3. **Create the Vercel project.** Import the repo into Vercel. Do **not** add a
   custom domain; the app is served through leadmain.
4. **Wire it into leadmain.** In the leadmain Vercel project, add the app URL
   variable (`TALENT_URL`, `PULSE_URL`, `ASPIRE_URL`, …) pointing to the new
   project's production URL (e.g. `https://lead-talent.vercel.app`), then
   **redeploy leadmain**.
5. **Register redirect URLs, including the base path.**
   - Supabase → Authentication → URL Configuration → Redirect URLs:
     - `https://www.leadmindset.org/talent/auth/callback`
     - `http://localhost:3000/talent/auth/callback` (local development)
   - Google Cloud Console → APIs & Services → Credentials → your OAuth client →
     Authorized redirect URIs: `https://<project-ref>.supabase.co/auth/v1/callback`.
     Add `https://www.leadmindset.org` (and `http://localhost:3000`) to
     Authorized JavaScript origins.
   - Enable the Google provider in Supabase → Authentication → Providers with
     the Google client ID and secret.
6. **Protect `main`.** GitHub → Settings → Branches → add a rule for `main`:
   require a pull request, require the **CI / Lint, typecheck and unit tests**
   check to pass, and block force pushes. Replace the placeholder owner in
   `.github/CODEOWNERS`.

Then update `README.md`, the `name` in `package.json`, `project_id` in
`supabase/config.toml`, the metadata in `messages/*.json`, and replace
`public/lead-logo.png` with the official logo.

## Local development

Requirements: Node (version in [`.nvmrc`](.nvmrc), e.g. `nvm use`) and npm.
Docker is only needed for a local Supabase.

```bash
npm install
cp .env.example .env.local        # fill in the values
npm run dev                        # http://localhost:3000 (or /<base path>)
```

- With `NEXT_PUBLIC_BASE_PATH` empty, the app is at `http://localhost:3000/es`.
- With `NEXT_PUBLIC_BASE_PATH=/talent`, it is at `http://localhost:3000/talent/es`.
- `NEXT_PUBLIC_SITE_URL` is the public origin without the base path
  (`http://localhost:3000` locally, `https://www.leadmindset.org` in production).
- `/` redirects to a locale. next-intl picks it from the `NEXT_LOCALE` cookie or
  the browser's `Accept-Language`, and falls back to `es`.

**Windows / Git Bash:** Git Bash rewrites `/talent` into a Windows path when
it's passed on the command line. Set the base path in `.env.local`, use
PowerShell, or prefix the command with `MSYS_NO_PATHCONV=1`.

### Local Supabase (optional)

```bash
npx supabase start                 # needs Docker; prints local URL and keys
npx supabase migration new <name>  # creates supabase/migrations/<timestamp>_<name>.sql
npx supabase db reset              # re-applies all migrations locally
```

To try Google sign in locally, set `SUPABASE_AUTH_EXTERNAL_GOOGLE_CLIENT_ID`
and `SUPABASE_AUTH_EXTERNAL_GOOGLE_SECRET` in `supabase/.env`, and set
`enabled = true` under `[auth.external.google]` in `supabase/config.toml`.

### End-to-end tests

```bash
npx playwright install chromium    # first time only
npm run test:e2e                   # builds, starts the app and runs e2e/
```

Playwright reads `NEXT_PUBLIC_BASE_PATH` from `.env.local` (or the
environment), so the same tests run at the root or under a base path.

## npm scripts

| Script                 | What it does                                           |
| ---------------------- | ------------------------------------------------------ |
| `npm run dev`          | Start the dev server                                   |
| `npm run build`        | Production build                                       |
| `npm run start`        | Serve the production build                             |
| `npm run lint`         | ESLint                                                 |
| `npm run typecheck`    | `tsc --noEmit`                                         |
| `npm test`             | Jest unit tests                                        |
| `npm run test:watch`   | Jest in watch mode                                     |
| `npm run test:e2e`     | Playwright tests (builds and starts the app if needed) |
| `npm run format`       | Format all files with Prettier                         |
| `npm run format:check` | Check formatting without writing                       |

## Conventions

- **Base path.** `<Link>`, `useRouter`, `redirect` (from `@/i18n/navigation`)
  and `/_next` assets get the base path automatically. For everything else
  (files in `public/`, `<img>`/`<video>` `src`, client-side `fetch`, OAuth
  `redirectTo`), use `withBasePath()` from `@/lib/basePath`.
- **Text.** All UI strings live in `messages/en.json` and `messages/es.json`.
  Never hardcode text in components.
- **Brand.** Colors are Tailwind tokens (`bg-navy`, `text-red-bright`,
  `border-violet`, …) defined in `src/styles/globals.css`. Use `lead-gradient`
  for the brand gradient, and `Button` / `buttonClasses()` for actions.
- **Supabase.** Use `@/lib/supabase/client` in Client Components and
  `@/lib/supabase/server` on the server. `SUPABASE_SERVICE_ROLE_KEY` is
  server-only; never import it in client code.
- **Email.** Call `sendEmail()` from `@/lib/email/send` on the server only
  (Server Actions, Route Handlers).

## Project structure

```
src/
  app/
    [locale]/            layout (Header/Footer), home, login, dashboard (protected)
    auth/callback/       OAuth code exchange → /<base path>/<locale>
  components/
    brand/               Logo, Header, Footer, Button
    auth/                Google sign-in and sign-out buttons
    i18n/                Locale switcher
  i18n/                  next-intl routing, navigation and request config
  lib/
    basePath.ts          BASE_PATH and withBasePath()
    email/send.ts        sendEmail() with Resend
    supabase/            browser client, server client, proxy session refresh
  styles/globals.css     Tailwind v4 @theme brand tokens
  proxy.ts               next-intl + Supabase session refresh (formerly middleware.ts)
messages/                en.json, es.json
supabase/                Supabase CLI config and migrations
e2e/                     Playwright tests
docs/adr/                Architecture decision records
```

# Running lms-ai-saas

## Local development

Use Node.js 22 or newer (Node.js 24 was used during recovery). Use the package manager matching the committed lockfile.

```powershell
pnpm install --frozen-lockfile
# Only if .env.local does not already exist:
# Copy-Item .env.example .env.local
# Fill the blank values in .env.local using your service dashboards.
pnpm run check:env
pnpm run dev
```

Open http://localhost:3000. To run several projects, give each a separate port, for example `pnpm run dev -p 3001`.

`.env.local` is present in the recovered working folder. `.env.example` is committed to GitHub; real environment values stay local. Blank values mean they have not yet been recovered. Do not replace an existing local file with the template.

`check:env` checks that required values are present without printing them. It does not validate credentials, database contents, account access or subscriptions. A successful build also does not prove that external services work.

## Verification

```powershell
pnpm run build
pnpm run start
```

For a type check without contacting services, run `pnpm run typecheck`.

## Service setup

- Sanity: restore the project ID and dataset, and the read/write API tokens. Use a Viewer token for reading and an Editor token for writing. `NEXT_PUBLIC_SANITY_ORG_ID` is needed by the Sanity CLI. For a replacement project, review `sample-data.ndjson` before importing it; importing modifies content.
- Clerk: restore the application keys and the `free`, `pro`, and `ultra` billing plans used by the app. Old users and subscriptions belong to the old application.
- Admin: set `ADMIN_CLERK_USER_IDS` to comma-separated Clerk user IDs. Optionally copy those IDs into `NEXT_PUBLIC_ADMIN_CLERK_USER_IDS` to display the Admin menu link. Only the server variable grants access.
- OpenAI: restore `OPENAI_API_KEY` for the tutor.
- Mux: restore both token values, the signing key ID and the signing key. The private-key variable used by the code is **`MUX_SIGNING_KEY`**. It accepts a base64-encoded PEM key. Existing video assets and signing keys belong to the old Mux environment.

Routes: `/`, `/dashboard`, `/admin`, `/studio`, `/pricing`.

For Sanity types, run `pnpm types:generate` after the Sanity environment is configured. The app uses pinned AI SDK beta dependencies from the original project; live tutor/video/billing behavior must be checked with your own configured accounts.

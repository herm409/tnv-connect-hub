# Connect Hub

Prospect-facing link-tree. **Platinum only** for a named hub and associate photo.

| Item | Value |
|------|--------|
| **Live domain** | https://connect.wearetnv.com |
| **Netlify project** | `tnv-connect-hub` |
| **GitHub** | https://github.com/herm409/tnv-connect-hub |
| **Folder** | `funnels/connect-hub/` |
| **Query params** | `?link=USERNAME` (also `ref`, `affiliate`) + optional `?vName=` |
| **Lookup** | `GET …/getAffiliate?username=` (Firebase `activitytracker-e2b7a`) |
| **Personalization** | Named hub when `found && status === "active" && plan === "platinum"` |
| **Photo** | `photoUrl` HTTPS only; load error falls back to initials |
| **Pro / Free / missing plan / bad slug** | Generic Team NuVision page |
| **Personal Links** | Platinum only. `id: connect-hub` |

Do not put Mighty login or income/rank copy on this page. Public pages never read `affiliates/{uid}` — only `getAffiliate`.

### Example URLs

- Generic: `https://connect.wearetnv.com`
- Personalized (Platinum): `https://connect.wearetnv.com?link=YOUR_USERNAME`
- Viewer first name: `https://connect.wearetnv.com?link=YOUR_USERNAME&vName=Sarah`

QA flags: `?demo=affiliate` · `?demo=named` · `?demo=photo` · `?demo=pro` · `?demo=guest`

## Local preview

```bash
cd "/Volumes/Herms Drive/TNV Apps/funnels/connect-hub"
npx serve .
# http://localhost:3000/?demo=named
```

## Deploy (Netlify + GitHub)

Same pattern as Reputation / Real Estate / App Hub. **Push `main` to deploy.** Do not CLI-deploy this site unless Git is down.

1. This repo is connected in Netlify: **Add new site → Import from Git → `herm409/tnv-connect-hub`**.
2. Build settings (already in `netlify.toml`):
   - Build command: *(none — static)*
   - Publish directory: `.`
3. After the first deploy, copy the Netlify subdomain (e.g. `tnv-connect-hub.netlify.app`).

### Squarespace DNS (`wearetnv.com`)

| Host | Type | Data |
|------|------|------|
| `connect` | CNAME | `tnv-connect-hub.netlify.app` (use the exact Netlify subdomain after first deploy) |

Then in Netlify → Domain management → Add domain alias → `connect.wearetnv.com`.

Do not deploy from `$HOME`. In the same command: `cd` to this folder, `pwd`, `ls`.

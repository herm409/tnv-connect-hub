# Connect Hub

Prospect-facing link-tree. **Platinum only** for a named hub and associate photo.

| Item | Value |
|------|--------|
| **Live domain** | https://connect.wearetnv.com |
| **Netlify project** | `tnvconnecthub` (`f04de6d3-f955-4eb8-8e87-075752b1b09a`) |
| **GitHub** | https://github.com/herm409/tnv-connect-hub |
| **Folder** | `funnels/connect-hub/` |
| **Query params** | `?link=USERNAME` (also `ref`, `affiliate`) + optional `?vName=` |
| **Username charset** | Lookup allows letters, numbers, `.`, `_`, `-` (case-insensitive). New claims on Personal Links should be lowercase `[a-z0-9_-]` only — a period in the handle used to drop the slug and render the generic hub. |
| **Lookup** | `GET …/getAffiliate?username=` (Firebase `activitytracker-e2b7a`) |
| **Personalization** | Named hub when `found && status === "active" && plan === "platinum"` |
| **Photo** | `photoUrl` HTTPS only. No photo → name only (no initials circle) |
| **Extra links** | Platinum `hubLinks` (social + personal sites). Max 8. HTTPS. |
| **Share card** | `connect-share.png` 1200×630. Crawlers get `{Name} \| Team NuVision` via the `og-share` edge function. The associate headshot is not the OG image (square crop + crawlers skip JS). |
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

Site is live at **https://connect.wearetnv.com**. Repo is **https://github.com/herm409/tnv-connect-hub**. Git is linked in Netlify. **Push `main` to deploy.** Do not CLI-deploy this site unless Git is down.

Emergency CLI (only if Git is down):

```bash
cd "/Volumes/Herms Drive/TNV Apps/funnels/connect-hub" && pwd && ls && \
npx netlify-cli deploy --prod \
  --dir="/Volumes/Herms Drive/TNV Apps/funnels/connect-hub" \
  --site=f04de6d3-f955-4eb8-8e87-075752b1b09a
```

### Squarespace DNS (`wearetnv.com`)

Custom domain is live: **https://connect.wearetnv.com**. Squarespace CNAME:

| Host | Type | Data |
|------|------|------|
| `connect` | CNAME | `tnvconnecthub.netlify.app` |

Do not deploy from `$HOME`. In the same command: `cd` to this folder, `pwd`, `ls`.

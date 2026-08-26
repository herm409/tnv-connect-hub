# Connect Hub

Prospect-facing link-tree. **Platinum only** for a named hub and associate photo.

| Item | Value |
|------|--------|
| **Live domain** | https://tnvconnecthub.netlify.app · https://connect.wearetnv.com (DNS pending) |
| **Netlify project** | `tnvconnecthub` (`f04de6d3-f955-4eb8-8e87-075752b1b09a`) |
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

Site is live at **https://tnvconnecthub.netlify.app**. Repo is **https://github.com/herm409/tnv-connect-hub**.

Netlify cannot attach GitHub from the CLI (it needs a browser GitHub login). One-time in the Netlify UI:

1. Open https://app.netlify.com/projects/tnvconnecthub/configuration/deploys
2. **Link repository** → GitHub → `herm409/tnv-connect-hub`
3. Branch: `main`. Build command: empty. Publish directory: `.`

After that, **push `main` deploys.** Do not CLI-deploy this site unless Git is down.

Emergency CLI (only if Git is down):

```bash
cd "/Volumes/Herms Drive/TNV Apps/funnels/connect-hub" && pwd && ls && \
npx netlify-cli deploy --prod \
  --dir="/Volumes/Herms Drive/TNV Apps/funnels/connect-hub" \
  --site=f04de6d3-f955-4eb8-8e87-075752b1b09a
```

### Squarespace DNS (`wearetnv.com`)

| Host | Type | Data |
|------|------|------|
| `connect` | CNAME | `tnvconnecthub.netlify.app` |

Then in Netlify → Domain management → Add domain alias → `connect.wearetnv.com`.

Do not deploy from `$HOME`. In the same command: `cd` to this folder, `pwd`, `ls`.

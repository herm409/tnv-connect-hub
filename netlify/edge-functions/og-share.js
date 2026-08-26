const GET_AFFILIATE_URL =
  "https://us-central1-activitytracker-e2b7a.cloudfunctions.net/getAffiliate";

const SHARE_IMAGE = "https://connect.wearetnv.com/connect-share.png";

const BOT_UA =
  /facebookexternalhit|Facebot|Twitterbot|LinkedInBot|Slackbot|WhatsApp|TelegramBot|Discordbot|Pinterest|Applebot|Googlebot|bingbot|DuckDuckBot|Embedly|Quora|redditbot|SkypeUriPreview|vkShare|W3C_Validator/i;

function getQueryParam(url, name) {
  return url.searchParams.get(name);
}

function sanitizeUsername(raw) {
  if (!raw) return null;
  let clean = String(raw)
    .trim()
    .replace(/^https?:\/\//i, "")
    .replace(/\.legalshieldassociate\.com.*$/i, "")
    .replace(/\/.*$/, "")
    .replace(/\s+/g, "");
  if (!clean || !/^[a-zA-Z0-9][a-zA-Z0-9_\-]{0,63}$/.test(clean)) return null;
  return clean;
}

function escapeHtml(s) {
  return String(s || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function crawlerHtml({ title, description, pageUrl }) {
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const u = escapeHtml(pageUrl);
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>${t}</title>
  <meta name="description" content="${d}">
  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Team NuVision">
  <meta property="og:url" content="${u}">
  <meta property="og:title" content="${t}">
  <meta property="og:description" content="${d}">
  <meta property="og:image" content="${SHARE_IMAGE}">
  <meta property="og:image:secure_url" content="${SHARE_IMAGE}">
  <meta property="og:image:type" content="image/png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Team NuVision Connect — start here">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${t}">
  <meta name="twitter:description" content="${d}">
  <meta name="twitter:image" content="${SHARE_IMAGE}">
</head>
<body></body>
</html>`;
}

export default async (request, context) => {
  const ua = request.headers.get("user-agent") || "";
  if (!BOT_UA.test(ua)) return context.next();

  const url = new URL(request.url);
  const defaultTitle = "Connect | Team NuVision";
  const defaultDesc =
    "Legal protection, identity, business solutions, and a honest look at extra income — pick the door that matches your life.";
  const pageUrl = `https://connect.wearetnv.com${url.search}`;

  const slug = sanitizeUsername(
    getQueryParam(url, "link") ||
      getQueryParam(url, "ref") ||
      getQueryParam(url, "affiliate"),
  );

  let title = defaultTitle;
  let description = defaultDesc;

  if (slug) {
    try {
      const res = await fetch(
        `${GET_AFFILIATE_URL}?username=${encodeURIComponent(slug)}`,
      );
      const data = res.ok ? await res.json() : null;
      const plan = String(data?.plan || "").toLowerCase();
      if (
        data &&
        data.found &&
        data.status === "active" &&
        plan === "platinum" &&
        data.fullName
      ) {
        const name = String(data.fullName).trim().slice(0, 80);
        title = `${name} | Team NuVision`;
        description = `Legal protection, identity, and a honest look at extra income — from ${name}, independent associate.`;
      }
    } catch {
      // Fall back to generic share tags
    }
  }

  return new Response(
    crawlerHtml({ title, description, pageUrl }),
    {
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    },
  );
};

export const config = {
  path: "/",
};

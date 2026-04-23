// Decap CMS GitHub OAuth handler
// Flow: /auth -> redirect to GitHub -> /callback -> postMessage token to Decap

const ALLOWED_ORIGINS = [
  "https://mess-cafe.pages.dev",
  "https://messcafe.gr",
  "https://www.messcafe.gr",
];

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === "/auth") {
      return handleAuth(url, env);
    }

    if (url.pathname === "/callback") {
      return handleCallback(url, env);
    }

    return new Response("M.E.S.S. CMS Auth Worker — running", {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  },
};

async function handleAuth(url, env) {
  const scope = url.searchParams.get("scope") || "repo,user";
  const state = crypto.randomUUID();

  const params = new URLSearchParams({
    client_id: env.GITHUB_CLIENT_ID,
    redirect_uri: `${url.origin}/callback`,
    scope,
    state,
  });

  return Response.redirect(
    `https://github.com/login/oauth/authorize?${params}`,
    302
  );
}

async function handleCallback(url, env) {
  const code = url.searchParams.get("code");
  if (!code) {
    return new Response("Missing ?code", { status: 400 });
  }

  const tokenRes = await fetch("https://github.com/login/oauth/access_token", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      "User-Agent": "mess-cms-auth",
    },
    body: JSON.stringify({
      client_id: env.GITHUB_CLIENT_ID,
      client_secret: env.GITHUB_CLIENT_SECRET,
      code,
    }),
  });

  const data = await tokenRes.json();

  if (data.error || !data.access_token) {
    return renderPostMessage("error", data);
  }

  return renderPostMessage("success", {
    token: data.access_token,
    provider: "github",
  });
}

function renderPostMessage(status, content) {
  const message = `authorization:github:${status}:${JSON.stringify(content)}`;
  const safeMessage = JSON.stringify(message);

  const html = `<!DOCTYPE html>
<html>
<head><title>Authorizing...</title></head>
<body>
<p>Authorizing, please wait...</p>
<script>
(function() {
  function receiveMessage(e) {
    window.opener.postMessage(${safeMessage}, e.origin);
    window.removeEventListener("message", receiveMessage, false);
  }
  window.addEventListener("message", receiveMessage, false);
  window.opener.postMessage("authorizing:github", "*");
})();
</script>
</body>
</html>`;

  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8" },
  });
}
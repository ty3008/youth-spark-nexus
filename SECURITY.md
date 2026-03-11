# Security & pre-launch checklist

Use this checklist before attaching a custom domain and going fully public.

---

## ✅ Already in place

- **Secrets**: No `JWT_SECRET` fallback; server refuses to start without it. `.env` is in `.gitignore`.
- **Admin auth**: Bcrypt for password; JWT (2h expiry); rate limit on login (20 attempts / 15 min per IP).
- **CORS**: Allowlist only (localhost, youthsparksummit.org, youth-spark-nexus.vercel.app, *.vercel.app).
- **Headers**: Helmet for X-Frame-Options, X-Content-Type-Options, etc.
- **Body size**: `express.json({ limit: '10kb' })` to limit payload size.
- **API rate limit**: 200 requests per 15 min per IP on `/api/`.
- **Contact form**: Rate limit (10 submissions / 15 min per IP); email validation; max lengths; no full message in logs.
- **Input validation**: Trim + max length on contact, registration, and events; valid email format; valid MongoDB ObjectId on event IDs.
- **Mongoose**: Max lengths on all string fields in Contact, Event, Registration.
- **Client**: No `dangerouslySetInnerHTML` / `eval`; only `VITE_API_BASE_URL` in env (no secrets in frontend).

---

## Before going live with your domain

### 1. Custom domain (youthsparksummit.org)

- **Vercel**: Add the domain in Project → Settings → Domains; follow DNS instructions.
- **CORS**: Root and www are already allowed (`https://youthsparksummit.org`, `https://www.youthsparksummit.org`). If you add another origin, add it to `server/server.js` → `allowedOrigins` and redeploy the backend (Render).

### 2. HTTPS

- Vercel and Render provide HTTPS by default. Ensure you use `https://` URLs only in production.

### 3. MongoDB Atlas

- **Network**: Prefer not to use `0.0.0.0/0` long-term. Restrict to Render’s outbound IP(s) and, if needed, your office IP. [Render docs](https://render.com/docs/static-outbound-ip-addresses) for outbound IPs.
- **Database user**: Strong password; principle of least privilege (only needed roles for this app).
- **Backups**: Enable automated backups in Atlas.

### 4. Environment variables (never in Git)

- **Render (backend)**: `MONGO_URI`, `JWT_SECRET`, `ADMIN_USERNAME`, `ADMIN_PASSWORD_HASH`.
- **Vercel (frontend)**: Only `VITE_API_BASE_URL` (your Render API URL). No backend secrets here.

### 5. After adding a new frontend origin

If you deploy to a new URL (e.g. custom domain or new Vercel project):

1. Add that origin to `allowedOrigins` in `server/server.js`.
2. Redeploy the server on Render.
3. Set `VITE_API_BASE_URL` on the new frontend to your Render API base URL.

---

## Quick reference

| Item              | Where / What |
|-------------------|--------------|
| CORS allowlist    | `server/server.js` → `allowedOrigins` |
| Login rate limit | 20 / 15 min (login only) |
| Contact rate limit | 10 / 15 min |
| API rate limit   | 200 / 15 min per IP |
| JWT expiry       | 2 hours      |
| Body limit       | 10 KB        |

---

## Reporting issues

If you discover a security concern, address it via a private channel (e.g. maintainer email) rather than a public issue.

# React Frontend for Notes App (Vite)

## Local Dev
```bash
npm install
cp .env.example .env
# Edit VITE_API_URL in .env if your backend runs elsewhere
npm run dev
```

Open http://localhost:5173

## Build
```bash
npm run build
```

## Deploy on Vercel
1. Push this folder to a GitHub repo.
2. Import the repo into Vercel.
3. In **Project Settings → Environment Variables**, set `VITE_API_URL` to your FastAPI URL (e.g., a Render/Railway deployment).
4. Redeploy.

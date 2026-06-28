# Menu Picker Advanced Upgrade

This package upgrades your current GitHub repo with:

- Advanced mobile-first UI
- Swipe left/right recipe cards
- Random recipe button
- Search and category filter
- Favorites list
- Click favorite to show full recipe again
- LocalStorage fallback
- PostgreSQL API sync when backend is deployed

## Replace your existing repo files

Copy these folders into your repo root:

```text
Menu-Picker/
├── frontend/
└── backend/
```

## Run frontend locally

```bash
cd frontend
npm install
npm run dev
```

## Run backend locally

```bash
cd backend
npm install
cp .env.example .env
# edit DATABASE_URL in .env
npm start
```

## Database

Run `backend/schema.sql` in your PostgreSQL database.

## Vercel frontend settings

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

Set environment variable:

```text
VITE_API_URL=https://your-render-backend-url.onrender.com
```

## Render backend settings

- Root Directory: `backend`
- Build Command: `npm install`
- Start Command: `npm start`

Set environment variables:

```text
DATABASE_URL=your_render_postgresql_external_or_internal_url
FRONTEND_URL=https://your-vercel-frontend-url.vercel.app
NODE_ENV=production
```

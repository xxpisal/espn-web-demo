# ESPN Clone

A full-stack ESPN sports website clone built with **Next.js**, **NestJS**, and **TypeScript**.

![ESPN Clone](https://images.unsplash.com/photo-1508098682722-e99c43a406b2?w=1200&q=80)

## 🏆 Features

### Frontend (Next.js 14 + TypeScript)
- 🏠 **Homepage** — Hero section, live scores ticker, news grid, sidebar with standings
- 📰 **News Feed** — Top headlines across all sports with real ESPN API data
- 📊 **Live Scores Ticker** — Continuously scrolling real-time game scores
- ⚽ **Sport Pages** — Dedicated pages for NFL, NBA, MLB, NHL, Soccer, NCAAF, NCAAB, F1, Golf, Tennis, MMA
- 🏆 **Standings** — League standings sidebar widget
- 👥 **Teams** — Browse all teams per sport/league
- ⚡ **Fantasy Sports** — Fantasy league management dashboard
- 🔍 **Search** — Search for teams, players, and news
- 🔐 **Authentication** — Register & Login with JWT
- 📱 **Responsive** — Mobile-first design mimicking ESPN's layout
- 🌙 **Dark Theme** — ESPN's signature dark color scheme with red accents

### Backend (NestJS + TypeScript)
- 🔐 **Auth API** — JWT authentication (register/login)
- 📊 **Scores API** — Live scores from ESPN public API
- 📰 **News API** — Sports news from ESPN API with mock fallback
- 👥 **Teams API** — Team data and rosters
- 🏃 **Players API** — Player profiles and statistics
- 🏅 **Sports API** — Standings and schedules
- ⚡ **Fantasy API** — Fantasy league management
- 🔍 **Search API** — Global search endpoint
- 📚 **Swagger Docs** — Full API documentation at `/api/docs`
- 🛡️ **Rate Limiting** — Built-in throttling
- ✅ **Validation** — Request validation with class-validator

## 🚀 Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 14, React 18, TypeScript |
| Styling | Tailwind CSS, custom ESPN design system |
| State | Zustand (auth), TanStack Query (server state) |
| Backend | NestJS, TypeScript |
| Auth | JWT + Passport.js |
| API | ESPN Public API + TheSportsDB fallback |
| HTTP Client | Axios |
| Docs | Swagger/OpenAPI |

## 📁 Project Structure

```
espn-clone/
├── frontend/                    # Next.js 14 app
│   ├── src/
│   │   ├── app/                 # App router pages
│   │   │   ├── page.tsx         # Home page
│   │   │   ├── layout.tsx       # Root layout
│   │   │   ├── (sports)/
│   │   │   │   └── [sport]/     # Dynamic sport pages
│   │   │   │       ├── page.tsx
│   │   │   │       ├── scores/
│   │   │   │       └── teams/
│   │   │   ├── fantasy/
│   │   │   ├── search/
│   │   │   └── auth/
│   │   ├── components/          # React components
│   │   │   ├── layout/          # Navbar, Footer
│   │   │   ├── home/            # Hero, NewsGrid, Sidebar
│   │   │   ├── scores/          # ScoresTicker
│   │   │   ├── sport/           # SportPage, ScoresPage, TeamsPage
│   │   │   ├── fantasy/         # FantasyPage
│   │   │   ├── search/          # SearchPage
│   │   │   └── auth/            # LoginPage, RegisterPage
│   │   ├── lib/                 # API client
│   │   ├── store/               # Zustand stores
│   │   └── types/               # TypeScript types
│   └── package.json
│
├── backend/                     # NestJS API server
│   ├── src/
│   │   ├── auth/                # JWT auth module
│   │   ├── users/               # User management
│   │   ├── scores/              # Live scores
│   │   ├── news/                # Sports news
│   │   ├── teams/               # Teams & rosters
│   │   ├── players/             # Player profiles
│   │   ├── sports/              # Standings & schedules
│   │   ├── fantasy/             # Fantasy sports
│   │   ├── search/              # Global search
│   │   └── common/              # Shared utilities
│   └── package.json
│
└── package.json                 # Root monorepo config
```

## 🔧 Quick Start

### Prerequisites
- Node.js 18+
- npm 9+

### Install Dependencies

```bash
# Install all dependencies (root + frontend + backend)
npm run install:all
```

### Development

```bash
# Run both frontend and backend simultaneously
npm run dev

# Or run them separately:
npm run dev:frontend  # http://localhost:3000
npm run dev:backend   # http://localhost:3001
```

### Environment Setup

**Backend** — copy `.env.example` to `.env`:
```bash
cd backend && cp .env.example .env
```

**Frontend** — already configured in `.env.local`

### API Documentation
Visit **http://localhost:3001/api/docs** for full Swagger documentation.

## 🌐 ESPN Public APIs Used

The backend proxies these free ESPN APIs:
- `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/scoreboard` — Live scores
- `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/news` — Sports news
- `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/teams` — Team data
- `https://site.api.espn.com/apis/site/v2/sports/{sport}/{league}/standings` — Standings
- `https://site.web.api.espn.com/apis/common/v3/search` — Search

> All APIs have mock data fallback when unavailable.

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/v1/auth/register` | Register user |
| POST | `/api/v1/auth/login` | Login |
| GET | `/api/v1/auth/profile` | Get profile |
| GET | `/api/v1/scores/live` | All live scores |
| GET | `/api/v1/scores/:sport` | Sport scores |
| GET | `/api/v1/news` | Top headlines |
| GET | `/api/v1/news/:sport` | Sport news |
| GET | `/api/v1/teams/:sport/:league` | Teams list |
| GET | `/api/v1/sports/:sport/:league/standings` | Standings |
| GET | `/api/v1/players/:sport/:playerId` | Player profile |
| GET | `/api/v1/fantasy/leagues` | My leagues |
| GET | `/api/v1/search?q={query}` | Search |

## 🎨 Design System

Follows ESPN's dark design language:
- **Primary**: `#CC0000` (ESPN Red)
- **Dark**: `#1a1a1a`
- **Darker**: `#111111`
- **Text**: `#d0d0d0`
- **Muted**: `#888888`

## 📦 Build for Production

```bash
npm run build
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Open a Pull Request

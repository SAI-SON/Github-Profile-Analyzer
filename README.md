# 🚀 GitHub Profile Analyzer

<div align="center">

  [![Live Demo](https://img.shields.io/badge/Demo-Live%20Preview-06b6d4?style=for-the-badge&logo=netlify&logoColor=white)](https://github-dev-analyzer.netlify.app)
  [![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react&logoColor=black)](https://react.dev/)
  [![Vite](https://img.shields.io/badge/Vite-8.0-646CFF?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

  <p align="center">
    <strong>A high-performance, glassmorphic developer dashboard for inspecting public GitHub profiles, benchmarking developers, exploring language distributions, and uncovering repository intelligence.</strong>
  </p>

  <p align="center">
    <a href="https://github-dev-analyzer.netlify.app"><strong>Explore The Live App »</strong></a>
    <br />
    <br />
    <a href="#-key-features">Key Features</a> •
    <a href="#-tech-stack">Tech Stack</a> •
    <a href="#-project-architecture">Architecture</a> •
    <a href="#-getting-started">Getting Started</a> •
    <a href="#-api-reference">API Reference</a> •
    <a href="#-roadmap">Roadmap</a>
  </p>
</div>

---

## 🌟 Overview

**GitHub Profile Analyzer** transforms raw GitHub profile and repository telemetry into actionable, visually compelling developer intelligence. Designed with a dark-first cyber aesthetic, glassmorphic containers, and responsive motion graphics, it empowers engineering managers, recruiters, and open-source enthusiasts to evaluate developer activity at a glance.

Instead of just counting public repositories, the dashboard runs multi-metric heuristic scoring, tracks chronological repository growth, aggregates tech stacks & repository tags, visualizes public commit momentum over 12 weeks, and provides side-by-side profile comparisons.

🔗 **Production Demo**: [https://github-dev-analyzer.netlify.app](https://github-dev-analyzer.netlify.app)

---

## ✨ Key Features

### 🔍 Real-Time & Debounced Search
- **Instant Search**: Type any GitHub handle to trigger automatic debounced lookup (650ms debounce) or press Enter for instant retrieval.
- **Search History**: Automatically caches your last 6 searched usernames in `localStorage` for fast one-click reloading.
- **Favorite Profiles**: Bookmark and pin top developer profiles for quick reference.

### 👤 Profile Intelligence Card
- High-resolution avatar with animated halo accents.
- Bio, company affiliation, location, blog/portfolio link, Twitter/X handle, and direct GitHub links.
- Joined date with tenure calculation and live followers/following statistics.

### 🤖 AI-Generated Developer Summary & Skill Score
- **Algorithmic Profiling**: Synthesizes repository names, descriptions, update timestamps, and event frequencies to classify the developer's primary specialization (*e.g., Web Development & Product Engineering, Machine Learning & Intelligent Applications, or Systems Development*).
- **Maintenance Habit Scoring**: Highlights recent repository update cadences and commitment consistency.
- **Developer Skill Score**: Heuristic calculation evaluating public repos, total stars accrued, follower network, and language breadth:
  $$\text{Score} = (\text{Repos} \times 2) + (\text{Stars} \times 3) + (\text{Followers} \times 2) + (\text{Languages} \times 6)$$

### 📊 Key Performance Metrics
- **Total Repositories**: Total public repositories analyzed.
- **Total Stars Earned**: Cumulative star count across all public repositories.
- **Total Forks**: Total community forks generated from projects.
- **Top Languages**: Most prevalent language and polyglot ratio.

### 📈 Visual Language Distribution
- Interactive donut/pie chart built with **Recharts**.
- Calculates percentage usage across all repositories with smooth hover tooltips and custom legend badges.

### ⚡ Public Contribution Stream
- Live feed of recent public events (commits, branch creations, pull requests, repository watches, issue activity).
- Event type filtering with humanized relative timestamps.

### 📅 12-Week Commit Activity Heatmap
- Visual contribution density grid mapping public activity intensity across the last 84 days (12 weeks).
- Dynamic emerald intensity shading indicating low to peak contribution volume.

### 🚀 Repository Growth Analytics
- Time-series line chart tracking cumulative repository creations, star acquisition velocity, and forks over time.
- Identifies development velocity and project traction trends.

### 🏷️ Repository Topic Analyzer
- Automatically extracts, counts, and ranks repository topics and tags from GitHub metadata.
- Interactive tag badges displaying the developer's core tooling and keywords.

### ⚖️ Side-by-Side Profile Comparison
- Benchmark any target profile against another developer profile.
- Compares total repos, stars, forks, and followers in a clean comparative matrix.

### 📂 Repository Explorer & Filter
- Filter repositories by keyword, title, or description in real time.
- Sort repositories by **Most Stars** or **Recently Updated**.
- Highlight badges for trending repositories based on high stars, forks, or active maintenance.
- Smooth client-side pagination (6 repositories per page).

### 📥 One-Click Data Export
- **Export JSON**: Download a complete, structured analytical snapshot (`{username}-github-insights.json`) including user stats, language breakdown, and top repositories.
- **Export CSV**: Download a flat tabular dataset (`{username}-repositories.csv`) containing repository names, descriptions, languages, star counts, fork counts, and URLs for spreadsheet analysis.

---

## 🛠️ Tech Stack

| Technology | Purpose | Version |
| :--- | :--- | :--- |
| **React** | Component-driven UI framework with React 19 | `^19.2.4` |
| **Vite** | Next-generation frontend build tooling & bundler | `^8.0.0` |
| **Tailwind CSS** | Utility-first CSS styling with custom glassmorphism | `^3.4.17` |
| **Framer Motion** | Fluid animations, route transitions, and UI micro-interactions | `^12.36.0` |
| **Recharts** | Composable charting library for language and growth charts | `^3.8.0` |
| **Lucide React** | Modern, lightweight icon suite | `^0.577.0` |
| **Axios** | HTTP client for consuming the GitHub REST API | `^1.13.6` |
| **React Router** | Client-side routing and location hooks | `^7.13.1` |
| **ESLint 9** | Strict static code analysis and React Compiler hooks linting | `^9.39.4` |

---

## 📁 Project Architecture

```text
github-profile-analyzer/
├── public/
│   ├── favicon.svg            # Custom SVG favicon
│   └── icons.svg              # App icon set
├── src/
│   ├── assets/                # Static assets and graphic resources
│   ├── components/
│   │   ├── ActivityHeatmap.jsx       # 12-week contribution intensity grid
│   │   ├── AiSummaryCard.jsx         # AI developer profile summary & skill score
│   │   ├── CompareProfiles.jsx       # Two-developer comparison matrix
│   │   ├── ContributionActivity.jsx  # Event timeline & public activity stream
│   │   ├── GrowthAnalytics.jsx       # Time-series cumulative repo & star chart
│   │   ├── LanguageChart.jsx         # Interactive language breakdown chart
│   │   ├── ProfileCard.jsx           # Bio, stats, avatar, and social links
│   │   ├── RepoCard.jsx              # Individual repository card with badges
│   │   ├── RepoList.jsx              # Searchable, filterable, paginated repo list
│   │   ├── SearchBar.jsx             # Debounced search bar with history & favorites
│   │   ├── StatsCards.jsx            # High-level metric KPI cards
│   │   ├── ThemeToggle.jsx           # Theme toggle controller
│   │   └── TopicAnalyzer.jsx         # Repository tag cloud and topic analytics
│   ├── hooks/
│   │   └── useGithubUser.js          # Centralized data fetching & state management hook
│   ├── pages/
│   │   └── Home.jsx                  # Main dashboard page layout & export handlers
│   ├── services/
│   │   └── githubApi.js              # Axios GitHub REST API v3 client
│   ├── utils/
│   │   ├── advancedAnalytics.js      # Heuristics: skill score, AI summary, heatmap, growth
│   │   └── languageStats.js          # Language aggregation & color mapping utilities
│   ├── App.css                       # Component styling utilities
│   ├── App.jsx                       # Root layout & route configuration
│   ├── index.css                     # Tailwind CSS directives & custom glassmorphism styles
│   └── main.jsx                      # Vite entry point
├── eslint.config.js                  # ESLint flat config with React Hooks & Refresh
├── index.html                        # Application HTML shell
├── package.json                      # Project metadata & dependency definitions
├── postcss.config.js                 # PostCSS processor config
├── tailwind.config.js                # Tailwind theme extensions & dark mode settings
└── vite.config.js                    # Vite configuration with React compiler plugin
```

---

## ⚡ Getting Started

Follow these steps to run the application locally on your machine.

### Prerequisites
- **Node.js**: v18.0.0 or higher
- **npm**: v9.0.0 or higher (or `pnpm` / `yarn`)

### 1. Clone the Repository
```bash
git clone https://github.com/SAI-SON/Github-Profile-Analyzer.git
cd Github-Profile-Analyzer
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Launch Development Server
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

### 4. Build for Production
To create an optimized production build in the `dist` directory:
```bash
npm run build
```

To preview the production build locally:
```bash
npm run preview
```

### 5. Run Linter
```bash
npm run lint
```

---

## 📡 API Reference & Rate Limits

This application interacts with the official **GitHub REST API (v3)**:

| Endpoint | Description |
| :--- | :--- |
| `GET https://api.github.com/users/{username}` | Fetches user bio, avatar, followers, following, and public metadata. |
| `GET https://api.github.com/users/{username}/repos` | Fetches up to 100 repositories sorted by latest update date. |
| `GET https://api.github.com/users/{username}/events/public` | Fetches the user's latest 100 public events for activity streams and heatmap analytics. |

> [!NOTE]  
> **Rate Limits**: Unauthenticated GitHub API calls are limited to **60 requests per hour per IP address**. If you encounter a `403 Rate Limit Reached` warning, wait a few moments or connect a personal access token by updating the `src/services/githubApi.js` Axios configuration.

---

## 🚢 Deployment

The application is statically generated with Vite and can be deployed in seconds to any static hosting provider.

### Deploy to Netlify (Live)
1. Link your GitHub repository in [Netlify](https://app.netlify.com/).
2. Set **Build command**: `npm run build`
3. Set **Publish directory**: `dist`
4. Deploy site.

### Deploy to Vercel
1. Import repository in [Vercel](https://vercel.com/).
2. Framework preset: **Vite**.
3. Build command: `npm run build`.
4. Output directory: `dist`.
5. Click **Deploy**.

---

## 🛣️ Roadmap & Future Enhancements

- [ ] **GitHub Personal Access Token (PAT) Integration**: In-app setting to provide your own token for 5,000 req/hr limits.
- [ ] **Organization Analytics**: Add support for analyzing GitHub Organizations and team activity.
- [ ] **Pull Request & Code Review Velocity**: Deep dive into PR merge rates and review times.
- [ ] **Social Share Card Generator**: Download a shareable image card showcasing developer stats for social media.
- [ ] **Multi-language Support (i18n)**: Internationalization for global developer communities.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository (`https://github.com/SAI-SON/Github-Profile-Analyzer/fork`).
2. Create your feature branch:
   ```bash
   git checkout -b feature/AmazingFeature
   ```
3. Commit your changes:
   ```bash
   git commit -m "Add some AmazingFeature"
   ```
4. Push to the branch:
   ```bash
   git push origin feature/AmazingFeature
   ```
5. Open a Pull Request.

---

## 📄 License

Distributed under the **MIT License**. See [`LICENSE`](LICENSE) for more information.

---

## 👨‍💻 Author

**SAI-SON**
- GitHub: [@SAI-SON](https://github.com/SAI-SON)
- Live App: [https://github-dev-analyzer.netlify.app](https://github-dev-analyzer.netlify.app)

<div align="center">
  <sub>Built with ❤️ using React 19, Vite, and Tailwind CSS. If you find this project helpful, please give it a ⭐ on GitHub!</sub>
</div>

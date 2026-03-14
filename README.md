# GitHub Profile Analyzer

A modern React dashboard that analyzes any public GitHub profile by username.

The app fetches profile data, repositories, public activity, and language usage to provide a clean developer-focused analytics view.

## Features

- Search for any public GitHub user
- View profile details (avatar, bio, followers, following, location, repo count)
- Repository analytics with sorting and filtering
- Language distribution chart
- Contribution activity chart (based on recent public events)
- Dashboard stat cards (total repos, stars, forks, top language)
- Debounced search and recently searched usernames
- Loading skeletons and graceful API error states
- Responsive layout for mobile, tablet, and desktop
- Dark-first UI styling with glassmorphism and smooth animations

## Tech Stack

- React (Vite)
- Tailwind CSS
- Axios
- Recharts
- Framer Motion
- React Router
- Lucide React
- ESLint

## Demo Screenshots

Add your screenshots here:

- Home dashboard
- Profile analytics
- Repositories and charts

## Project Structure

```text
src/
	components/
		ContributionActivity.jsx
		LanguageChart.jsx
		ProfileCard.jsx
		RepoCard.jsx
		RepoList.jsx
		SearchBar.jsx
		StatsCards.jsx
		ThemeToggle.jsx
	hooks/
		useGithubUser.js
	pages/
		Home.jsx
	services/
		githubApi.js
	utils/
		languageStats.js
	App.jsx
	index.css
	main.jsx
```

## API Endpoints Used

- `https://api.github.com/users/{username}`
- `https://api.github.com/users/{username}/repos`
- `https://api.github.com/users/{username}/events/public`

No authentication token is required for basic usage. If rate limits become an issue, you can extend the service layer to use a GitHub token.

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/<your-username>/github-profile-analyzer.git
cd github-profile-analyzer
```

### 2. Install dependencies

```bash
npm install
```

### 3. Start the development server

```bash
npm run dev
```

The app will run at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - start local dev server
- `npm run build` - build production bundle
- `npm run preview` - preview production build locally
- `npm run lint` - run ESLint checks

## Deployment

### Deploy to Vercel

1. Push the repository to GitHub.
2. Import the repo in Vercel.
3. Framework preset: `Vite`.
4. Build command: `npm run build`
5. Output directory: `dist`

### Deploy to Netlify

1. Push the repository to GitHub.
2. Import the repo in Netlify.
3. Build command: `npm run build`
4. Publish directory: `dist`

## Roadmap Ideas

- Add optional GitHub token support for higher API limits
- Add commit heatmap calendar visualization
- Add export/share for profile summary
- Add unit and component tests

## Contributing

Contributions are welcome.

1. Fork the project
2. Create a feature branch
3. Commit your changes
4. Open a pull request

## License

This project is open source under the MIT License.

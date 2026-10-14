import { useEffect, useState } from "react";

const CACHE_TTL_MS = 30 * 60 * 1000;
const API_BASE = "https://api.github.com";

function readCache(key) {
  try {
    const cached = JSON.parse(sessionStorage.getItem(key));
    if (cached && Date.now() - cached.savedAt < CACHE_TTL_MS) return cached.data;
  } catch {
    // Storage unavailable or corrupt — fall through to a fresh fetch.
  }
  return null;
}

function writeCache(key, data) {
  try {
    sessionStorage.setItem(key, JSON.stringify({ savedAt: Date.now(), data }));
  } catch {
    // Ignore quota / privacy-mode errors.
  }
}

async function fetchJson(url) {
  const res = await fetch(url, { headers: { Accept: "application/vnd.github+json" } });
  if (!res.ok) throw new Error(`GitHub API responded with ${res.status}`);
  return res.json();
}

function summarize(user, repos) {
  const ownRepos = repos.filter((repo) => !repo.fork && repo.name !== user.login);

  const languageCounts = ownRepos.reduce((counts, repo) => {
    if (repo.language) counts[repo.language] = (counts[repo.language] ?? 0) + 1;
    return counts;
  }, {});
  const totalWithLanguage = Object.values(languageCounts).reduce((a, b) => a + b, 0);
  const languages = Object.entries(languageCounts)
    .map(([name, count]) => ({ name, count, share: count / totalWithLanguage }))
    .sort((a, b) => b.count - a.count);

  const recentRepos = [...ownRepos]
    .sort(
      (a, b) =>
        b.stargazers_count - a.stargazers_count || new Date(b.pushed_at) - new Date(a.pushed_at)
    )
    .slice(0, 6)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      forks: repo.forks_count,
      pushedAt: repo.pushed_at,
    }));

  return {
    avatarUrl: user.avatar_url,
    profileUrl: user.html_url,
    publicRepos: user.public_repos,
    followers: user.followers,
    joinedYear: new Date(user.created_at).getFullYear(),
    languages,
    recentRepos,
  };
}

/**
 * Fetches public profile + repository data from the GitHub REST API.
 * Unauthenticated (no API key in the frontend) and cached per session to
 * stay well within the 60 requests/hour public rate limit.
 */
export function useGitHubProfile(username) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    const cacheKey = `github-profile:${username}`;
    const cached = readCache(cacheKey);
    if (cached) {
      setState({ status: "success", data: cached });
      return;
    }

    let active = true;
    Promise.all([
      fetchJson(`${API_BASE}/users/${username}`),
      fetchJson(`${API_BASE}/users/${username}/repos?per_page=100&sort=pushed`),
    ])
      .then(([user, repos]) => {
        const data = summarize(user, repos);
        writeCache(cacheKey, data);
        if (active) setState({ status: "success", data });
      })
      .catch(() => active && setState({ status: "error", data: null }));

    return () => {
      active = false;
    };
  }, [username]);

  return state;
}

/**
 * Public contribution calendar via github-contributions-api.jogruber.de
 * (GitHub's own contribution graph is not exposed through the REST API).
 */
export function useContributions(username) {
  const [state, setState] = useState({ status: "loading", data: null });

  useEffect(() => {
    const cacheKey = `github-contributions:${username}`;
    const cached = readCache(cacheKey);
    if (cached) {
      setState({ status: "success", data: cached });
      return;
    }

    let active = true;
    fetch(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`)
      .then((res) => {
        if (!res.ok) throw new Error(`Contributions API responded with ${res.status}`);
        return res.json();
      })
      .then((json) => {
        const data = { total: json.total?.lastYear ?? 0, days: json.contributions ?? [] };
        writeCache(cacheKey, data);
        if (active) setState({ status: "success", data });
      })
      .catch(() => active && setState({ status: "error", data: null }));

    return () => {
      active = false;
    };
  }, [username]);

  return state;
}

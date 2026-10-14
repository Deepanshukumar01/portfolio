import { BookMarked, Users, CalendarDays, Star, GitFork, ArrowUpRight } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import { profile, socialLinks } from "../data/profile.js";
import { useGitHubProfile, useContributions } from "../hooks/useGitHubProfile.js";
import SectionHeading from "./SectionHeading.jsx";
import Reveal from "./Reveal.jsx";
import ContributionGraph from "./ContributionGraph.jsx";
import "./GitHub.css";

// Colors for the language bar; unknown languages fall back to neutral.
const languageColors = {
  JavaScript: "#f1e05a",
  HTML: "#e34c26",
  CSS: "#663399",
  Java: "#b07219",
  Python: "#3572a5",
  C: "#8a93a6",
  EJS: "#a91e50",
  TypeScript: "#3178c6",
  Kotlin: "#a97bff",
};

const dateFormatter = new Intl.DateTimeFormat("en", { month: "short", year: "numeric" });

function Skeleton({ className = "" }) {
  return <span className={`skeleton ${className}`} aria-hidden="true" />;
}

function ProfileCard({ status, data }) {
  const stats = [
    { label: "Public repos", value: data?.publicRepos, icon: BookMarked },
    { label: "Followers", value: data?.followers, icon: Users },
    { label: "On GitHub since", value: data?.joinedYear, icon: CalendarDays },
  ];

  return (
    <div className="gh-profile card">
      <div className="gh-profile__head">
        {data?.avatarUrl ? (
          <img className="gh-profile__avatar" src={data.avatarUrl} alt="" width="56" height="56" loading="lazy" />
        ) : (
          <span className="gh-profile__avatar gh-profile__avatar--fallback" aria-hidden="true">
            <FaGithub size={26} />
          </span>
        )}
        <div>
          <p className="gh-profile__handle">@{profile.githubUsername}</p>
          <p className="gh-profile__sub">{profile.name}</p>
        </div>
      </div>

      <dl className="gh-stats">
        {stats.map(({ label, value, icon: Icon }) => (
          <div key={label} className="gh-stats__item">
            <dt>
              <Icon size={14} aria-hidden="true" />
              {label}
            </dt>
            <dd>{status === "loading" ? <Skeleton className="skeleton--num" /> : (value ?? "—")}</dd>
          </div>
        ))}
      </dl>

      {data?.languages.length > 0 && (
        <div className="gh-langs">
          <h3 className="kicker">Languages across repositories</h3>
          <div className="gh-langs__bar" aria-hidden="true">
            {data.languages.map((lang) => (
              <span
                key={lang.name}
                style={{ flexGrow: lang.count, background: languageColors[lang.name] ?? "#8a93a6" }}
              />
            ))}
          </div>
          <ul role="list" className="gh-langs__list">
            {data.languages.map((lang) => (
              <li key={lang.name}>
                <i style={{ background: languageColors[lang.name] ?? "#8a93a6" }} aria-hidden="true" />
                {lang.name}
                <span>{Math.round(lang.share * 100)}%</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      <a className="btn btn--primary gh-profile__cta" href={socialLinks.github} target="_blank" rel="noopener noreferrer">
        <FaGithub size={17} aria-hidden="true" />
        View GitHub Profile
        <span className="visually-hidden"> (opens in a new tab)</span>
      </a>
    </div>
  );
}

function ContributionsCard() {
  const { status, data } = useContributions(profile.githubUsername);

  return (
    <div className="gh-contrib card">
      <div className="gh-contrib__head">
        <h3 className="kicker">Contribution activity</h3>
        {status === "success" && (
          <p className="gh-contrib__total">
            <strong>{data.total}</strong> contributions in the last year
          </p>
        )}
      </div>

      {status === "loading" && <Skeleton className="skeleton--graph" />}
      {status === "success" && <ContributionGraph days={data.days} total={data.total} />}
      {status === "error" && (
        <p className="gh-fallback">
          Contribution graph unavailable right now —{" "}
          <a href={socialLinks.github} target="_blank" rel="noopener noreferrer">
            see it on GitHub
          </a>
          .
        </p>
      )}
    </div>
  );
}

function RepoList({ status, repos }) {
  if (status === "loading") {
    return (
      <ul role="list" className="gh-repos">
        {[0, 1, 2].map((i) => (
          <li key={i} className="gh-repo card">
            <Skeleton className="skeleton--title" />
            <Skeleton className="skeleton--line" />
          </li>
        ))}
      </ul>
    );
  }

  if (status === "error" || repos.length === 0) {
    return (
      <p className="gh-fallback card">
        Repositories couldn&apos;t be loaded right now (GitHub limits anonymous requests).{" "}
        <a href={`${socialLinks.github}?tab=repositories`} target="_blank" rel="noopener noreferrer">
          Browse them on GitHub
        </a>
        .
      </p>
    );
  }

  return (
    <ul role="list" className="gh-repos">
      {repos.map((repo) => (
        <li key={repo.id}>
          <a className="gh-repo card card--interactive" href={repo.url} target="_blank" rel="noopener noreferrer">
            <span className="gh-repo__name">
              <BookMarked size={15} aria-hidden="true" />
              {repo.name}
              <ArrowUpRight className="gh-repo__arrow" size={15} aria-hidden="true" />
            </span>
            <span className="gh-repo__desc">{repo.description || "No description yet."}</span>
            <span className="gh-repo__meta">
              {repo.language && (
                <span>
                  <i style={{ background: languageColors[repo.language] ?? "#8a93a6" }} aria-hidden="true" />
                  {repo.language}
                </span>
              )}
              <span aria-label={`${repo.stars} stars`}>
                <Star size={13} aria-hidden="true" />
                {repo.stars}
              </span>
              <span aria-label={`${repo.forks} forks`}>
                <GitFork size={13} aria-hidden="true" />
                {repo.forks}
              </span>
              <span>Updated {dateFormatter.format(new Date(repo.pushedAt))}</span>
            </span>
            <span className="visually-hidden"> (opens in a new tab)</span>
          </a>
        </li>
      ))}
    </ul>
  );
}

export default function GitHub() {
  const { status, data } = useGitHubProfile(profile.githubUsername);

  return (
    <section id="github" className="section" aria-labelledby="github-title">
      <div className="container">
        <SectionHeading
          section="github"
          id="github-title"
          eyebrow="GitHub & coding"
          title="Where I practise and ship code"
          lead="Live data from my public GitHub — coursework practice, experiments and projects."
        />

        <div className="gh-layout">
          <Reveal>
            <ProfileCard status={status} data={data} />
          </Reveal>
          <div className="gh-main">
            <Reveal delay={80}>
              <ContributionsCard />
            </Reveal>
            <Reveal delay={140}>
              <h3 className="kicker gh-repos__heading">Recently active repositories</h3>
              <RepoList status={status} repos={data?.recentRepos ?? []} />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

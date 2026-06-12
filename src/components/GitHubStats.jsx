import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaStar, FaCodeBranch, FaBook } from 'react-icons/fa';

export default function GitHubStats({ theme }) {
  const username = 'adityapnaik';
  const [profileData, setProfileData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGitHubData = async () => {
      try {
        setIsLoading(true);
        // Fetch profile metrics
        const profileRes = await fetch(`https://api.github.com/users/${username}`);
        if (profileRes.ok) {
          const pData = await profileRes.json();
          setProfileData(pData);
        }

        // Fetch repositories
        const reposRes = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=6`);
        if (reposRes.ok) {
          const rData = await reposRes.json();
          // Filter out forks and sort by size/stars
          const filteredRepos = rData.filter(repo => !repo.fork).slice(0, 4);
          setRepos(filteredRepos);
        }
      } catch (err) {
        console.error('Error fetching GitHub statistics:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGitHubData();
  }, [username]);

  // Readme-stats configuration links based on dark/light theme
  const statsTheme = theme === 'dark' 
    ? 'transparent&title_color=6366f1&icon_color=06b6d4&text_color=94a3b8&bg_color=00000000&hide_border=true'
    : 'transparent&title_color=4f46e5&icon_color=a855f7&text_color=475569&bg_color=00000000&hide_border=true';

  const langTheme = theme === 'dark'
    ? 'transparent&title_color=6366f1&text_color=94a3b8&bg_color=00000000&hide_border=true'
    : 'transparent&title_color=4f46e5&text_color=475569&bg_color=00000000&hide_border=true';

  // Fallback metrics if API is rate limited
  const statsFallback = {
    public_repos: profileData?.public_repos ?? 12,
    followers: profileData?.followers ?? 8,
    following: profileData?.following ?? 15,
    avatar_url: profileData?.avatar_url ?? '/images/profile.svg',
    html_url: profileData?.html_url ?? `https://github.com/${username}`
  };

  const reposFallback = repos.length > 0 ? repos : [
    {
      id: 1,
      name: 'certificate-verifier',
      description: 'Encrypted Certificate Generation and Verification module using SHA256 hashes.',
      stargazers_count: 2,
      forks_count: 1,
      language: 'JavaScript',
      html_url: `https://github.com/${username}`
    },
    {
      id: 2,
      name: 'ai-resume-parser',
      description: 'NLP and semantic keyword matching tool built to rank resumes based on job descriptions.',
      stargazers_count: 3,
      forks_count: 0,
      language: 'Python',
      html_url: `https://github.com/${username}`
    },
    {
      id: 3,
      name: 'face-recognition-attendance',
      description: 'Real-time attendance ledger program using OpenCV Haar Cascade filters.',
      stargazers_count: 1,
      forks_count: 0,
      language: 'Python',
      html_url: `https://github.com/${username}`
    },
    {
      id: 4,
      name: 'portfolio-website',
      description: 'Premium dark-mode responsive portfolio website constructed using React and Tailwind.',
      stargazers_count: 4,
      forks_count: 0,
      language: 'React',
      html_url: `https://github.com/${username}`
    }
  ];

  return (
    <section id="github" className="py-24 relative overflow-hidden bg-transparent z-10">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-800 dark:text-white mb-2">
            GitHub <span className="text-gradient">Statistics</span>
          </h2>
          <div className="w-16 h-1 bg-gradient-to-r from-cyan-400 to-indigo-500 mx-auto rounded-full" />
        </div>

        {/* Profile Card & Summary stats */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          
          {/* Left: Stats Card */}
          <div className="lg:col-span-5 p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-slate-200/20 dark:border-white/10 flex flex-col justify-between shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={statsFallback.avatar_url}
                alt="GitHub Profile Avatar"
                className="w-16 h-16 rounded-full border-2 border-indigo-500 bg-slate-800"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = '/images/profile.svg';
                }}
              />
              <div>
                <h3 className="text-lg font-bold text-slate-800 dark:text-white">Aditya P Naik</h3>
                <a
                  href={statsFallback.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-semibold text-cyan-500 dark:text-cyan-400 flex items-center gap-1 hover:underline"
                >
                  <FaGithub className="w-3.5 h-3.5" />
                  <span>@{username}</span>
                </a>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 text-center mb-6">
              <div className="p-3.5 rounded-xl bg-slate-500/5 dark:bg-white/5 border border-slate-200/10 dark:border-white/5">
                <span className="block text-2xl font-extrabold text-indigo-500 dark:text-indigo-400">
                  {statsFallback.public_repos}
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Repos</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-500/5 dark:bg-white/5 border border-slate-200/10 dark:border-white/5">
                <span className="block text-2xl font-extrabold text-cyan-500 dark:text-cyan-400">
                  {statsFallback.followers}
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Followers</span>
              </div>
              <div className="p-3.5 rounded-xl bg-slate-500/5 dark:bg-white/5 border border-slate-200/10 dark:border-white/5">
                <span className="block text-2xl font-extrabold text-purple-500 dark:text-purple-400">
                  {statsFallback.following}
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase">Following</span>
              </div>
            </div>

            <a
              href={`https://github.com/${username}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-neutral-800 flex items-center justify-center gap-2 border border-slate-200/10 dark:border-white/5 hover:shadow-neon-indigo/5 hover:scale-[1.02] active:scale-[0.98] transition-all duration-300"
            >
              <FaGithub className="w-4 h-4" />
              <span>Visit GitHub Profile</span>
            </a>
          </div>

          {/* Right: Embedded SVG Badges */}
          <div className="lg:col-span-7 flex flex-col md:flex-row gap-6 items-stretch">
            {/* General Stats SVG Card */}
            <div className="flex-1 p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-slate-200/20 dark:border-white/10 shadow-lg flex items-center justify-center">
              <img
                src={`https://github-readme-stats.vercel.app/api?username=${username}&show_icons=true&theme=${statsTheme}`}
                alt="GitHub statistics overview chart"
                className="max-w-full h-auto"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            {/* Top Languages SVG Card */}
            <div className="flex-1 p-6 rounded-2xl glass-card-light dark:glass-card-dark border border-slate-200/20 dark:border-white/10 shadow-lg flex items-center justify-center">
              <img
                src={`https://github-readme-stats.vercel.app/api/top-langs/?username=${username}&layout=compact&theme=${langTheme}`}
                alt="GitHub top programming languages chart"
                className="max-w-full h-auto"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
          </div>
        </div>

        {/* Repository Cards Section */}
        <div>
          <h3 className="text-xl font-bold text-slate-800 dark:text-slate-200 mb-6 flex items-center gap-2">
            <FaBook className="w-4 h-4 text-indigo-500" />
            <span>Featured Repositories</span>
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {reposFallback.map((repo) => (
              <a
                key={repo.id}
                href={repo.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-6 rounded-xl glass-card-light dark:glass-card-dark border border-slate-200/20 dark:border-white/10 shadow-lg hover:shadow-neon-blue/5 hover:translate-y-[-3px] transition-all duration-300 block"
              >
                <div className="flex justify-between items-start mb-3">
                  <h4 className="font-bold text-slate-800 dark:text-white hover:text-cyan-500 dark:hover:text-cyan-400 transition-colors">
                    {repo.name}
                  </h4>
                  {repo.language && (
                    <span className="text-[10px] font-bold text-indigo-500 dark:text-indigo-400 px-2 py-0.5 rounded-full bg-indigo-500/10">
                      {repo.language}
                    </span>
                  )}
                </div>
                
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2 h-10 leading-relaxed">
                  {repo.description ?? 'No description provided.'}
                </p>

                <div className="flex items-center gap-4 text-xs font-semibold text-slate-500 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 hover:text-yellow-400 transition-colors">
                    <FaStar className="w-3.5 h-3.5" />
                    <span>{repo.stargazers_count}</span>
                  </span>
                  <span className="flex items-center gap-1.5 hover:text-cyan-400 transition-colors">
                    <FaCodeBranch className="w-3.5 h-3.5" />
                    <span>{repo.forks_count}</span>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}

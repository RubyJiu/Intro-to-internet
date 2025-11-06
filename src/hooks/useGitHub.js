import { useState, useEffect } from 'react';

const useGitHub = (username) => {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);

      try {
        const GITHUB_USERNAME = username || process.env.REACT_APP_GITHUB_USERNAME;

        if (!GITHUB_USERNAME) {
          throw new Error('GitHub username not found. Please provide a username or set it in your .env file.');
        }

        const response = await fetch(
          `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=6`
        );

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch repositories');
        }

        const data = await response.json();

        const reposData = data.map(repo => ({
          id: repo.id,
          name: repo.name,
          description: repo.description,
          stargazers_count: repo.stargazers_count,
          language: repo.language,
          html_url: repo.html_url,
          topics: repo.topics || []
        }));

        setRepos(reposData);

      } catch (err) {
        console.error('GitHub API Error:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (username) {
      fetchRepos();
    }

  }, [username]);

  return { repos, loading, error };
};

export default useGitHub;
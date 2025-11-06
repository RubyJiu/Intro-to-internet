import React from 'react';
import useGitHub from '../hooks/useGitHub';
import { Github, Star, GitFork, AlertCircle, Loader, ExternalLink } from 'lucide-react';

const GitHubRepos = ({ username }) => {
  const { repos, loading, error } = useGitHub(username);

  if (loading) {
    return (
      <div className="text-center py-10">
        <Loader className="animate-spin inline-block text-blue-600" size={40} />
        <p className="mt-4 text-gray-600 dark:text-gray-400">Fetching repositories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-800 dark:text-red-200 p-6 rounded-lg">
        <div className="flex items-center">
          <AlertCircle className="mr-3" size={28} />
          <div>
            <p className="font-semibold text-lg">Error Fetching Repos</p>
            <p className="text-sm">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section id="github-repos" className="py-20 px-6 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
            <Github className="mr-3 text-gray-800 dark:text-white" size={40} />
            My GitHub Repositories
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            A selection of my latest projects on GitHub.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {repos.map(repo => (
            <a 
              key={repo.id} 
              href={repo.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <div className="p-6 h-full flex flex-col">
                <div className="flex-grow">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 truncate">{repo.name}</h3>
                    <ExternalLink className="text-gray-400 dark:text-gray-500" size={18} />
                  </div>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 h-20 overflow-hidden">
                    {repo.description || 'No description provided.'}
                  </p>
                </div>

                <div className="mt-auto pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
                    <div className="flex items-center">
                      <div className={`w-3 h-3 rounded-full mr-2 ${repo.language ? 'bg-blue-500' : 'bg-gray-400'}`}></div>
                      <span>{repo.language || 'N/A'}</span>
                    </div>
                    <div className="flex items-center">
                      <Star className="mr-1" size={16} />
                      <span>{repo.stargazers_count}</span>
                    </div>
                  </div>
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="mt-3 flex flex-wrap gap-2">
                      {repo.topics.map(topic => (
                        <span key={topic} className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 px-2 py-1 rounded-full">
                          {topic}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GitHubRepos;
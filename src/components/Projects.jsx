import React, { useState } from 'react';
import { Github, ExternalLink, Loader, Code, Star } from 'lucide-react';
import useGitHub from '../hooks/useGitHub';

const Projects = () => {
  const [filter, setFilter] = useState('all');
  const { repos, loading, error } = useGitHub(process.env.REACT_APP_GITHUB_USERNAME || 'demo');

  const filters = ['all', 'JavaScript', 'TypeScript', 'React'];

  const filteredRepos = filter === 'all' 
    ? repos 
    : repos.filter(repo => repo.language === filter);

  return (
    <section id="projects" className="py-20 px-6">
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            GitHub Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto mb-8">
            Showcasing my latest work and open-source contributions
          </p>

          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-3">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-6 py-2 rounded-full font-medium transition-all duration-300 ${
                  filter === f
                    ? 'bg-blue-600 text-white shadow-lg scale-105'
                    : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <Loader className="animate-spin mx-auto mb-4 text-blue-600" size={48} />
            <p className="text-gray-600 dark:text-gray-400 text-lg">Loading repositories...</p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="max-w-md mx-auto bg-red-100 dark:bg-red-900/30 border border-red-400 dark:border-red-800 text-red-800 dark:text-red-200 p-6 rounded-lg text-center">
            <p className="font-semibold mb-2">Error Loading Projects</p>
            <p className="text-sm">{error}</p>
          </div>
        )}

        {/* Projects Grid */}
        {!loading && !error && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRepos.map((repo) => (
              <div
                key={repo.id}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden"
              >
                {/* Card Header */}
                <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <Code className="text-blue-600" size={28} />
                    {repo.language && (
                      <span className="text-xs bg-gray-100 dark:bg-gray-700 px-3 py-1 rounded-full font-medium">
                        {repo.language}
                      </span>
                    )}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-2 text-gray-800 dark:text-white">
                    {repo.name}
                  </h3>
                  
                  <p className="text-gray-600 dark:text-gray-400 text-sm line-clamp-2">
                    {repo.description || 'No description available'}
                  </p>
                </div>

                {/* Card Body */}
                <div className="p-6">
                  {/* Topics/Tags */}
                  {repo.topics && repo.topics.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-4">
                      {repo.topics.slice(0, 3).map((topic, index) => (
                        <span
                          key={index}
                          className="text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 px-2 py-1 rounded"
                        >
                          #{topic}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Stats & Actions */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                      <Star size={16} className="mr-1 text-yellow-500" />
                      <span className="font-medium">{repo.stargazers_count}</span>
                    </div>

                    <div className="flex space-x-2">
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                        aria-label="View on GitHub"
                      >
                        <Github size={18} />
                      </a>
                      <a
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        aria-label="Open project"
                      >
                        <ExternalLink size={18} />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Empty State */}
        {!loading && !error && filteredRepos.length === 0 && (
          <div className="text-center py-12">
            <Code className="mx-auto mb-4 text-gray-400" size={48} />
            <p className="text-gray-600 dark:text-gray-400 text-lg">
              No projects found with this filter
            </p>
          </div>
        )}

        {/* View More Button */}
        {!loading && !error && repos.length > 0 && (
          <div className="text-center mt-12">
            <a
              href={`https://github.com/${process.env.REACT_APP_GITHUB_USERNAME || 'yourusername'}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center space-x-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-8 py-3 rounded-lg hover:scale-105 transition-transform duration-300 font-medium"
            >
              <Github size={20} />
              <span>View All on GitHub</span>
            </a>
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;
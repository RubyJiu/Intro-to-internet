import React from 'react';
import { User, Briefcase, Award, Code2 } from 'lucide-react';

const About = () => {
  const skills = [
    'React', 'JavaScript', 'TypeScript', 'Node.js', 
    'Python', 'TailwindCSS', 'AI/ML', 'Git', 
    'MongoDB', 'REST API', 'Express', 'Next.js'
  ];

  const achievements = [
    { icon: <Code2 size={24} />, title: '50+ Projects', desc: 'Completed successfully' },
    { icon: <Award size={24} />, title: '5+ Years', desc: 'Professional experience' },
    { icon: <User size={24} />, title: '30+ Clients', desc: 'Happy customers' },
  ];

  return (
    <section id="about" className="py-20 px-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto max-w-6xl">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Me</h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Passionate developer dedicated to creating impactful digital experiences
          </p>
        </div>

        {/* Achievements */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {achievements.map((achievement, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-md text-center hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 rounded-full mb-4">
                {achievement.icon}
              </div>
              <h3 className="text-2xl font-bold mb-2">{achievement.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{achievement.desc}</p>
            </div>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8">
          {/* Background */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <User className="mr-3 text-blue-600" size={28} /> 
              Background
            </h3>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed mb-4">
              I'm a passionate full-stack developer with over 5 years of experience in building 
              modern web applications. I specialize in React, Node.js, and cutting-edge web technologies.
            </p>
            <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
              My journey in tech started with a curiosity about how websites work, and has evolved 
              into a career focused on creating intuitive user experiences and solving complex 
              problems with clean, efficient code. I'm particularly interested in AI integration 
              and the future of web development.
            </p>
          </div>

          {/* Skills */}
          <div className="bg-white dark:bg-gray-900 p-8 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
            <h3 className="text-2xl font-semibold mb-4 flex items-center">
              <Briefcase className="mr-3 text-blue-600" size={28} /> 
              Skills & Technologies
            </h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span
                  key={index}
                  className="bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-4 py-2 rounded-full text-sm font-medium hover:scale-110 transition-transform duration-200 cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
            
            <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
              <h4 className="font-semibold mb-3 text-gray-700 dark:text-gray-300">Currently Learning:</h4>
              <div className="flex flex-wrap gap-2">
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  Three.js
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  WebGL
                </span>
                <span className="bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-200 px-3 py-1 rounded-full text-sm">
                  AI/ML
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
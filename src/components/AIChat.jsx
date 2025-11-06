import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Loader, Bot, User as UserIcon } from 'lucide-react';
import useGemini from '../hooks/useGemini';

const AIChat = () => {
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hi! I\'m your AI assistant powered by Gemini. How can I help you today? Feel free to ask me anything about programming, technology, or web development!'
    }
  ]);
  const [input, setInput] = useState('');
  const { sendMessage, loading } = useGemini();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // Auto scroll to bottom when new message arrives
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    try {
      const response = await sendMessage(input);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again or check your API key configuration.'
        }
      ]);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const quickPrompts = [
    'Explain React hooks',
    'Best practices for JavaScript',
    'What is Tailwind CSS?',
    'How to use API in React?'
  ];

  const handleQuickPrompt = (prompt) => {
    setInput(prompt);
    inputRef.current?.focus();
  };

  return (
    <section id="ai-chat" className="py-20 px-6 bg-gray-50 dark:bg-gray-800 transition-colors duration-300">
      <div className="container mx-auto max-w-4xl">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 flex items-center justify-center">
            <MessageSquare className="mr-3 text-blue-600" size={40} />
            AI Chat Assistant
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-lg">
            Powered by Gemini AI - Ask me anything about coding, tech, or development!
          </p>
        </div>

        {/* Chat Container */}
        <div className="bg-white dark:bg-gray-900 rounded-lg shadow-2xl overflow-hidden">
          {/* Messages Area */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 bg-gray-50 dark:bg-gray-800/50">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
              >
                <div
                  className={`flex items-start space-x-2 max-w-[80%] ${
                    msg.role === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                  }`}
                >
                  {/* Avatar */}
                  <div
                    className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white'
                        : 'bg-gradient-to-br from-purple-500 to-blue-500 text-white'
                    }`}
                  >
                    {msg.role === 'user' ? <UserIcon size={16} /> : <Bot size={16} />}
                  </div>

                  {/* Message Bubble */}
                  <div
                    className={`px-4 py-3 rounded-lg shadow-md ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-tr-none'
                        : 'bg-white dark:bg-gray-700 text-gray-800 dark:text-white rounded-tl-none'
                    }`}
                  >
                    <p className="text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.content}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Loading Indicator */}
            {loading && (
              <div className="flex justify-start animate-fade-in">
                <div className="flex items-start space-x-2">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 text-white flex items-center justify-center">
                    <Bot size={16} />
                  </div>
                  <div className="bg-white dark:bg-gray-700 px-4 py-3 rounded-lg shadow-md flex items-center space-x-2">
                    <Loader className="animate-spin text-blue-600" size={16} />
                    <span className="text-sm text-gray-600 dark:text-gray-300">
                      AI is thinking...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          {messages.length === 1 && (
            <div className="px-6 py-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
              <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">Quick prompts:</p>
              <div className="flex flex-wrap gap-2">
                {quickPrompts.map((prompt, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleQuickPrompt(prompt)}
                    className="text-xs bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Area */}
          <div className="border-t border-gray-200 dark:border-gray-700 p-4 bg-white dark:bg-gray-900">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message... (Press Enter to send)"
                className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white transition-all"
                disabled={loading}
              />
              <button
                onClick={handleSend}
                disabled={loading || !input.trim()}
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center space-x-2 shadow-lg"
              >
                <Send size={20} />
                <span className="hidden sm:inline">Send</span>
              </button>
            </div>
            
            {/* Hint Text */}
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
              💡 Tip: Ask about React, JavaScript, or any programming topic!
            </p>
          </div>
        </div>

        {/* API Note */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {process.env.REACT_APP_GEMINI_API_KEY 
              ? '🤖 Connected to Gemini AI API' 
              : '⚠️ Running in demo mode - Add your Gemini API key for real AI responses'}
          </p>
        </div>
      </div>
    </section>
  );
};

export default AIChat;
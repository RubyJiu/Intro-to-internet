import { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const useGemini = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
  if (!API_KEY) {
    // This will be caught by the component and displayed in the UI
    throw new Error('REACT_APP_GEMINI_API_KEY not found. Please check your .env file.');
  }

  const genAI = new GoogleGenerativeAI(API_KEY);
  const model = genAI.getGenerativeModel({ model: 'gemini-2.5-flash' }); // Using the model from your list

  const sendMessage = async (message) => {
    setLoading(true);
    setError(null);

    try {
      const result = await model.generateContent(message);
      const response = result.response;
      const text = response.text();
      return text;
    } catch (err) {
      console.error('Gemini SDK Error:', err);
      setError(err.message);
      throw err; // Re-throw so the component can catch it
    } finally {
      setLoading(false);
    }
  };

  return { sendMessage, loading, error };
};

export default useGemini;
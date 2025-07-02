import React, { useState } from 'react';
import axios from 'axios';

const AIChat = () => {
  const [userMessage, setUserMessage] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!userMessage.trim()) return;
    setLoading(true);
    setAiResponse('');

    try {
      const res = await axios.post('http://localhost:8080/api/v1/ai/message', userMessage, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      setAiResponse(res.data);
    } catch (err) {
      console.error('AI error:', err);
      setAiResponse('AI could not respond.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h2>Ask AI about jobs</h2>
      <textarea
        rows="4"
        placeholder="e.g., I'm looking for remote software jobs in Izmir"
        value={userMessage}
        onChange={(e) => setUserMessage(e.target.value)}
      ></textarea>
      <br />
      <button onClick={handleSend} disabled={loading}>
        {loading ? 'Thinking...' : 'Send'}
      </button>

      {aiResponse && (
        <div className="response">
          <h3>AI Response:</h3>
          <p>{aiResponse}</p>
        </div>
      )}
    </div>
  );
};

export default AIChat;

import React, { useEffect, useState } from 'react';
import axios from 'axios';

const MyJobsPage = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get('https://four458apigateway.onrender.com/api/v1/jobs/history', {
          params: { userId: 'test-user' }, // gerçek user ID ile değiştirilebilir
        });
        setHistory(res.data);
      } catch (err) {
        console.error('Failed to load history:', err);
      }
    };

    fetchHistory();
  }, []);

  return (
    <div className="container">
      <h2>My Recent Job Searches</h2>
      {history.length === 0 ? (
        <p>You haven't searched for any jobs yet.</p>
      ) : (
        <ul>
          {history.map((item, index) => (
            <li key={index}>
              <strong>{item.title || 'N/A'}</strong> – {item.city}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyJobsPage;

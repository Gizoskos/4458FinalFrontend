import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const [title, setTitle] = useState('');
  const [city, setCity] = useState('');
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  // Kullanıcının coğrafi konumunu alıp şehir bulur
  useEffect(() => {
    navigator.geolocation?.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;
      try {
        const res = await axios.get('https://nominatim.openstreetmap.org/reverse', {
          params: {
            lat: latitude,
            lon: longitude,
            format: 'json',
          },
        });
        const detectedCity = res.data.address?.city || res.data.address?.town || '';
        setCity(detectedCity);
      } catch (err) {
        console.error('Failed to detect city', err);
      }
    });
  }, []);

  // Arama geçmişini backend'den getirir
  useEffect(() => {
    axios.get('http://localhost:8080/api/v1/jobs/history', {
      params: { userId: 'test-user' },
    })
    .then((res) => {
      const historyData = Array.isArray(res.data) ? res.data : (res.data.content || []);
      setHistory(historyData);
    })
    .catch((err) => {
      console.error('Failed to load search history', err);
      setHistory([]);
    });
  }, []);

  const handleSearch = () => {
    navigate(`/search-results?title=${encodeURIComponent(title)}&city=${encodeURIComponent(city)}`);
  };

  return (
    <div className="container">
      <h1>Find Your Dream Job</h1>
      <div className="search-box">
        <input
          type="text"
          placeholder="Job title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="City"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <h3>My Recent Searches</h3>
      <ul>
        {history.length === 0 ? (
          <li>No recent searches.</li>
        ) : (
          history.map((item, i) => (
            <li key={i}>
              {item.title} – {item.city}
            </li>
          ))
        )}
      </ul>
    </div>
  );
};

export default HomePage;

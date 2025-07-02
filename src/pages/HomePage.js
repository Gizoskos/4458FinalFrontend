// src/pages/HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HomePage() {
    const [title, setTitle] = useState('');
    const [city, setCity] = useState('');
    const [searchHistory, setSearchHistory] = useState([]);

    const userId = '1'; // dummy userId

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (pos) => {
                // You can later reverse geocode this if needed
                console.log(pos.coords.latitude, pos.coords.longitude);
            },
            (err) => console.log(err)
        );

        axios.get(`/v1/jobs/history?userId=${userId}`)
            .then((res) => setSearchHistory(res.data))
            .catch((err) => console.log(err));
    }, []);

    const handleSearch = () => {
        const params = new URLSearchParams({ title, city, userId });
        window.location.href = `/search?${params.toString()}`;
    };

    return (
        <div>
            <h2>Search for a Job</h2>
            <input
                type="text"
                placeholder="Title..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="City..."
                value={city}
                onChange={(e) => setCity(e.target.value)}
            />
            <button onClick={handleSearch}>Search</button>

            <h3>Recent Searches</h3>
            <ul>
                {searchHistory.map((item, idx) => (
                    <li key={idx}>{item.title} - {item.city}</li>
                ))}
            </ul>
        </div>
    );
}

export default HomePage;

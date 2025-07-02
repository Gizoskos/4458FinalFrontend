// src/pages/LoginPage.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../api';

export default function LoginPage() {
    const [form, setForm] = useState({ username: '', password: '' });
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = e => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleLogin = async () => {
        try {
            const response = await api.post('/api/v1/auth/login', form, {
                headers: {
                  'Content-Type': 'application/json'
                }
              });
            console.log("Login response:", response);
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('role', response.data.role);
            if (response.data.role === 'ADMIN') {
                navigate('/admin');
            } else {
                navigate('/');
            }
        } catch (err) {
            setError('Invalid username or password.');
        }
    };

    return (
        <div className="container">
            <h2>Login</h2>
            <input
                type="text"
                name="username"
                placeholder="Username"
                value={form.username}
                onChange={handleChange}
            />
            <input
                type="password"
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
            />
            <button onClick={handleLogin}>Login</button>
            {error && <p style={{ color: 'red' }}>{error}</p>}
        </div>
    );
}

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App.jsx';
import './index.css';

import HomePage from './pages/HomePage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import JobDetail from './pages/JobDetail.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminPanel from './pages/AdminPanel.jsx';
import AiChat from './pages/AIChat.jsx';
import Notification from './pages/Notification.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<HomePage />} />
          <Route path="search-results" element={<SearchResultsPage />} />
          <Route path="job/:id" element={<JobDetail />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="admin" element={<AdminPanel />} />
          <Route path="chat" element={<AiChat />} />
          
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

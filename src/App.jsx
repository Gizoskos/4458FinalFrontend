import { Routes, Route, Outlet } from 'react-router-dom';
import HomePage from './pages/HomePage.jsx';
import SearchResultsPage from './pages/SearchResultsPage.jsx';
import JobDetail from './pages/JobDetail.jsx';
import LoginPage from './pages/LoginPage.jsx';
import AdminPanel from './pages/AdminPanel';
import AiChat from './pages/AIChat.jsx';
import Notification from './pages/Notification.jsx';
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
}

export default App;

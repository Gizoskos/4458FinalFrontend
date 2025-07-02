import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import './Header.css';

const Header = () => {
  const [jobId, setJobId] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (jobId.trim() !== '') {
      navigate(`/job/${jobId}`);
    }
  };

  return (
    <header className="site-header">
      <div className="logo">
        <Link to="/">KariyerApp</Link>
      </div>
      <nav className="nav-links">
        <Link to="/login">Giriş Yap</Link>
        <Link to="/register">Kayıt Ol</Link>
        <Link to="/admin">Admin Paneli</Link>
        <Link to="/chat">Chat</Link>

        <form onSubmit={handleSearch} style={{ display: 'inline-flex', gap: '5px' }}>
          <input
            type="text"
            placeholder="İlan ID gir"
            value={jobId}
            onChange={(e) => setJobId(e.target.value)}
            style={{ padding: '5px' }}
          />
          <button type="submit">İş Ara</button>
        </form>
      </nav>
    </header>
  );
};

export default Header;

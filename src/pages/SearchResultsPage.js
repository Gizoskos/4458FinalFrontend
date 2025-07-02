import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const SearchResultsPage = () => {
  const [jobs, setJobs] = useState([]);
  const [city, setCity] = useState('');
  const [title, setTitle] = useState('');
  const [workingType, setWorkingType] = useState('');
  const [country, setCountry] = useState('');
  const [filtersVisible, setFiltersVisible] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const cityParam = params.get('city') || '';
    const titleParam = params.get('title') || '';
    const workingTypeParam = params.get('workingType') || '';
    const countryParam = params.get('country') || '';

    setCity(cityParam);
    setTitle(titleParam);
    setWorkingType(workingTypeParam);
    setCountry(countryParam);

    if (!cityParam) {
      getUserCity().then((detectedCity) => {
        if (detectedCity) {
          setCity(detectedCity);
          fetchJobs(detectedCity, titleParam, workingTypeParam, countryParam);
        } else {
          fetchJobs('', titleParam, workingTypeParam, countryParam);
        }
      });
    } else {
      fetchJobs(cityParam, titleParam, workingTypeParam, countryParam);
    }
  }, [location.search]);

  const getUserCity = async () => {
    return new Promise((resolve) => {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          // Şehir adı için ters geocode kullanılabilir. Geçici olarak sabit şehir döndürüyorum.
          console.log('Detected coords:', lat, lon);
          resolve('Istanbul'); // Burayı dinamik yapmak için OpenCage gibi servis kullanabilirsin.
        },
        (err) => {
          console.warn('Geolocation error:', err);
          resolve('');
        }
      );
    });
  };

  const fetchJobs = async (city, title, workingType, country) => {
    try {
      const res = await axios.get('http://localhost:8080/api/v1/jobs/search', {
        params: {
          city,
          title,
          workingType,
          country,
          page: 0,
          size: 10,
          userId: 'test-user',
        },
      });
      setJobs(res.data.content || []);
    } catch (err) {
      console.error('Error fetching jobs', err);
    }
  };

  const handleApply = async (id) => {
    try {
      await axios.post('http://localhost:8080/api/v1/job-posting/apply', null, {
        params: { id },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Applied successfully');
    } catch (err) {
      alert('Login required');
      navigate('/login');
    }
  };

  return (
    <div className="container">
      <h2>Job Results</h2>

      <button onClick={() => setFiltersVisible(!filtersVisible)}>
        {filtersVisible ? 'Hide Filters' : 'Show Filters'}
      </button>

      {filtersVisible && (
        <div className="filters">
          <label>
            City:
            <input value={city} onChange={(e) => setCity(e.target.value)} />
          </label>
          <label>
            Title:
            <input value={title} onChange={(e) => setTitle(e.target.value)} />
          </label>
          <label>
            Country:
            <input value={country} onChange={(e) => setCountry(e.target.value)} />
          </label>
          <label>
            Working Type:
            <select value={workingType} onChange={(e) => setWorkingType(e.target.value)}>
              <option value="">All</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-site</option>
            </select>
          </label>
          <button
            onClick={() =>
              navigate(
                `/search-results?title=${title}&city=${city}&country=${country}&workingType=${workingType}`
              )
            }
          >
            Search
          </button>
        </div>
      )}

      <div className="job-list">
        {jobs.length === 0 ? (
          <p>No jobs found.</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} className="job-card">
              <h3>{job.title}</h3>
              <p>{job.city} - {job.country}</p>
              <p>{job.description}</p>
              <button onClick={() => handleApply(job.id)}>Apply</button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default SearchResultsPage;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const JobDetail = () => {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [relatedJobs, setRelatedJobs] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchJobDetail = async () => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/job-posting/${id}`);
        setJob(res.data);
        fetchRelatedJobs(res.data.department);
      } catch (err) {
        console.error('Error fetching job detail', err);
      }
    };

    const fetchRelatedJobs = async (department) => {
      try {
        const res = await axios.get(`http://localhost:8080/api/v1/job-posting/related`, {
          params: { department },
        });
        setRelatedJobs(res.data);
      } catch (err) {
        console.error('Error fetching related jobs', err);
      }
    };

    fetchJobDetail();
  }, [id]);

  const handleApply = async () => {
    try {
      await axios.post(`http://localhost:8080/api/v1/job-posting/apply/${id}`, null, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      alert('Successfully applied!');
    } catch (err) {
      alert('Please log in to apply.');
      navigate('/login');
    }
  };

  if (!job) return <p>Loading job...</p>;

  return (
    <div className="container">
      <h2>{job.title}</h2>
      <p><strong>City:</strong> {job.city}</p>
      <p><strong>Country:</strong> {job.country}</p>
      <p><strong>Department:</strong> {job.department}</p>
      <p>{job.description}</p>

      <button onClick={handleApply}>Apply</button>

      <h3>Related Jobs</h3>
      <ul>
        {relatedJobs
          .filter((j) => j.id !== job.id)
          .slice(0, 3)
          .map((related) => (
            <li key={related.id}>
              <strong>{related.title}</strong> – {related.city}
              <button onClick={() => navigate(`/job/${related.id}`)}>View</button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default JobDetail;

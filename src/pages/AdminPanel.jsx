import React, { useState } from 'react';
import axios from 'axios';

const AdminPanel = () => {
  const [form, setForm] = useState({
    title: '',
    city: '',
    country: '',
    department: '',
    description: '',
    workingType: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('https://four458apigateway.onrender.com/api/v1/admin/jobs', form, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      });
      alert('Job posted successfully!');
      setForm({
        title: '',
        city: '',
        country: '',
        department: '',
        description: '',
        workingType: '',
      });
    } catch (err) {
      console.error('Error creating job:', err);
      alert('You must be logged in as ADMIN.');
    }
  };

  return (
    <div className="container">
      <h2>Admin Panel - Create New Job</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <input name="city" placeholder="City" value={form.city} onChange={handleChange} required />
        <input name="country" placeholder="Country" value={form.country} onChange={handleChange} required />
        <input name="department" placeholder="Department" value={form.department} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} required />
        <select name="workingType" value={form.workingType} onChange={handleChange} required>
          <option value="">Select Working Type</option>
          <option value="remote">Remote</option>
          <option value="hybrid">Hybrid</option>
          <option value="on-site">On-site</option>
        </select>
        <button type="submit">Create Job</button>
      </form>
    </div>
  );
};

export default AdminPanel;

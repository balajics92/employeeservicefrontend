import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './ServiceEmployeeForm.css';

const ServiceEmployeeForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    experience: '',
    contactno: '',
    mail: '',
    rating: 0,
    location: '',
  });

  const [response, setResponse] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleNumberChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://127.0.0.1:5000/employees', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      setFormData({
        name: '',
        occupation: '',
        experience: '',
        contactno: '',
        mail: '',
        rating: 0,
        location: '',
      });
      const result = await res.json();
      setResponse(result);
      console.log('response...', response);
      alert('Record Saved Successfully');
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input type='text' name='name' value={formData.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label htmlFor="occupation">Occupation:</label>
          <input
            type='text'
            name='occupation'
            value={formData.occupation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label htmlFor="experience">Experience (years):</label>
          <input
            type='number'
            name='experience'
            value={formData.experience}
            onChange={handleNumberChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactno">Contact Number:</label>
          <input
            type='text'
            name='contactno'
            value={formData.contactno}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating (1-5):</label>
          <input
            type='number'
            name='rating'
            min='1'
            max='5'
            value={formData.rating}
            onChange={handleNumberChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location:</label>
          <input
            type='text'
            name='location'
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="mail">Mail:</label>
          <input type='text' name='mail' value={formData.mail} onChange={handleChange} required />
        </div>
        <button type='submit'>Save</button>
      </form>
    </div>
  );
};

ServiceEmployeeForm.propTypes = {
  onSave: PropTypes.func,
};

export default ServiceEmployeeForm;

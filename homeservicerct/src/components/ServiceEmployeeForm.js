import PropTypes from 'prop-types';
import React, { useState } from 'react';

const saveEmployeeData = async (data) => {
  console.log('Saving employee data:', data);
};

const ServiceEmployeeForm = ({ onSave }) => {
  const [formData, setFormData] = useState({
    name: '',
    occupation: '',
    experience: '',
    contactno: '',
    rating: 0,
    location: '',
  });

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
    await saveEmployeeData(formData);
    if (onSave) onSave(formData);

    setFormData({
      name: '',
      occupation: '',
      experience: '',
      contactno: '',
      rating: 0,
      location: '',
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Name:</label>
        <input type='text' name='name' value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <label>Occupation:</label>
        <input type='text' name='occupation' value={formData.occupation} onChange={handleChange} />
      </div>
      <div>
        <label>Experience (years):</label>
        <input
          type='number'
          name='experience'
          value={formData.experience}
          onChange={handleNumberChange}
          required
        />
      </div>
      <div>
        <label>Contact Number:</label>
        <input
          type='text'
          name='contactno'
          value={formData.contactno}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <label>Rating (1-5):</label>
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
      <div>
        <label>Location:</label>
        <input
          type='text'
          name='location'
          value={formData.location}
          onChange={handleChange}
          required
        />
      </div>
      <button type='submit'>Save</button>
    </form>
  );
};

ServiceEmployeeForm.propTypes = {
  onSave: PropTypes.func,
};

export default ServiceEmployeeForm;

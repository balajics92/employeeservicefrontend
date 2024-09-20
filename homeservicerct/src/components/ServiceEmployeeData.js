import React, { useEffect, useState } from 'react';
import emailjs from 'emailjs-com';

const ServiceEmployeeData = () => {
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://127.0.0.1:5000/employees', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const result = await response.json();
        setEmployee(result);
      } catch (error) {
        alert('error...');
      }
    };

    fetchData();
  }, []);

  const contactPerson = (mail) => {
    const templateParams = {
      to_email: { mail },
      message: 'Please check customer issues',
    };

    const serviceId = 'service_029rccq';
    const templateId = 'template_cpsbo9f';
    const userId = '81UlmlDcvPcDy6kuQ';

    emailjs.send(serviceId, templateId, templateParams, userId).then(
      (response) => {
        console.log('Email sent successfully:', response.status, response.text);
        alert('Email sent successfully!');
      },
      (error) => {
        console.error('Failed to send email:', error);
        alert('Failed to send email. Please try again.');
      }
    );
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employee.filter(
    (emp) =>
      emp.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      emp.occupation.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h3>Service Employee List</h3>
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder='Search by Location'
      />

      <div>
        <table border='1' style={{ marginTop: '10px', width: '100%' }}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Occupation</th>
              <th>Location</th>
              <th>Contact Number</th>
              <th>Mail</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredEmployees.map((row, index) => (
              <tr key={index}>
                <td>{row.id}</td>
                <td>{row.name}</td>
                <td>{row.occupation}</td>
                <td>{row.location}</td>
                <td>{row.contactno}</td>
                <td>{row.mail}</td>
                <td>
                  <button onClick={() => contactPerson(row.mail)}>Contact</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredEmployees.length === 0 && <p>No data available</p>}
      </div>
    </>
  );
};

export default ServiceEmployeeData;

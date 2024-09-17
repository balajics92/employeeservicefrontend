import React, { useEffect, useState } from 'react';
import ServiceEmployeeForm from './ServiceEmployeeForm';

const ServiceEmployeeRegistration = () => {
  const [employee, setEmployee] = useState([]);

  useEffect(() => {
    const savedEmployees = localStorage.getItem('Emp');
    if (savedEmployees) {
      setEmployee(JSON.parse(savedEmployees));
    }
  }, []);

  const handleSave = (data) => {
    const updatedEmployees = [...employee, data];
    setEmployee(updatedEmployees);
    localStorage.setItem('Emp', JSON.stringify(updatedEmployees));
  };

  return (
    <>
      <h3>Registration</h3>
      <ServiceEmployeeForm onSave={handleSave} />
    </>
  );
};

export default ServiceEmployeeRegistration;

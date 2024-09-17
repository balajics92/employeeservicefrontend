import React, { useEffect, useState } from 'react';

const ServiceEmployeeData = () => {
  const [employee, setEmployee] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const savedEmployees = localStorage.getItem('Emp');
    if (savedEmployees) {
      setEmployee(JSON.parse(savedEmployees));
    }
  }, []);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const filteredEmployees = employee.filter((emp) =>
    emp.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <h3>Search Service Employees</h3>
      <input
        type='text'
        value={searchQuery}
        onChange={handleSearchChange}
        placeholder='Search by Location'
      />

      <h3>Service Employee List</h3>
      {filteredEmployees.length > 0 ? (
        <>
          {filteredEmployees.map((emp, index) => (
            <div key={index}>
              {emp.name} {emp.location} {emp.contactno}
            </div>
          ))}
        </>
      ) : (
        <p>No employees found.</p>
      )}
    </>
  );
};

export default ServiceEmployeeData;

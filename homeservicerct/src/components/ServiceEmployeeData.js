import React, { useEffect, useState } from 'react';

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

         const updatedEmployee = result.map(user => ({
            ...user,   
            issue:'',           
            address: '',
            contactNumber: '',
        }));
        
        setEmployee(updatedEmployee);
      } catch (error) {
        alert('error...');
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (id, event, attr) => {
      
    const { value } = event.target;
    const updatedData = employee.map(item => 
        item.id === id ? { ...item, [attr]: value } : item
    );
    setEmployee(updatedData);
};

  const contactPerson = async(employeeDetails) => {
    try {
      const res = await fetch('http://localhost:5000/send_whatsapp', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipient_number: `+91${employeeDetails.contactno}`, 
            message_body: `Hi ${employeeDetails.name}, 
            Issue: ${employeeDetails.issue}
            Address: ${employeeDetails.address}
            Contact Number: ${employeeDetails.contactNumber}` }),
      });

      await res.json();
      alert('Whatsapp message sent successfully')
  } catch (err) {
      console.error(err);
  }
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
              <th>Enter Your Issue</th>
              <th>Enter Your Address</th>
              <th>Enter Your Contact Number</th>
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
                <textarea
                placeholder="Enter your Issue"
                value={row.issue}
                onChange={(e) => handleInputChange(row.id, e, 'issue')}
            /></td>
            <td>
                <textarea
                placeholder="Enter your Address"
                value={row.address}
                onChange={(e) => handleInputChange(row.id, e, 'address')}
            /></td>
            
            <td>
                <textarea
                placeholder="Enter your Contact Number"
                value={row.contactNumber}
                onChange={(e) => handleInputChange(row.id, e, 'contactNumber')}
            /></td>
                <td>
                  <button onClick={() => contactPerson(row)}>Contact</button>
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

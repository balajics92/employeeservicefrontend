import React, { useState } from 'react';
import ServiceEmployeeData from './ServiceEmployeeData';
import ServiceEmployeeRegistration from './ServiceEmployeeRegistration';

const PageTabs = () => {
  const [activeTab, setActiveTab] = useState('ServiceEmployeeRegistration');

  return (
    <div>
      <div className='tabs'>
        <button onClick={() => setActiveTab('ServiceEmployeeRegistration')}>
          ServiceEmployeeRegistration
        </button>
        <button onClick={() => setActiveTab('ServiceEmployeeData')}>ServiceEmployeeData</button>
      </div>

      <div className='content'>
        {activeTab === 'ServiceEmployeeRegistration' && <ServiceEmployeeRegistration />}
        {activeTab === 'ServiceEmployeeData' && <ServiceEmployeeData />}
      </div>
    </div>
  );
};

export default PageTabs;

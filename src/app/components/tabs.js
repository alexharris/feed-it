'use client'

import React, { useState } from 'react';

export default function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div>
      <div className="tabs">
        {React.Children.map(children, (child, index) => (
          <button
            onClick={() => setActiveTab(index)}
            className={`tab ${activeTab === index ? 'active' : ''}`}
          >
            {child.props.title}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {React.Children.map(children, (child, index) => (
          activeTab === index ? child : null
        ))}
      </div>
    </div>
  );
}

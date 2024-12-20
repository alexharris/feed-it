'use client'

import React, { useState } from 'react';

export default function Tabs({ children }) {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tabs-container h-full bg-white">
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
      <div className="tab-content rounded-t-2xl bg-white">
        {React.Children.map(children, (child, index) => (
          activeTab === index ? child : null
        ))}
      </div>
    </div>
  );
}

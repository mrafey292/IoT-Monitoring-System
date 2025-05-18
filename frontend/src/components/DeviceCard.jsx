import React from 'react';

const DeviceCard = ({ device }) => {
  // Format timestamp
  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  // Determine status class
  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
        return 'status-active';
      case 'inactive':
        return 'status-inactive';
      case 'error':
        return 'status-error';
      default:
        return 'status-inactive';
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Device <span className="device-id">{device.deviceId}</span></h3>
        <div>
          <span 
            className={`status-indicator ${getStatusClass(device.status)}`}
          ></span>
          {device.status}
        </div>
      </div>
      
      <div className="card-body">
        <div className="reading">
          <span className="reading-label">Temperature:</span>
          <span className="reading-value">
            {device.temperature.toFixed(1)}°C
          </span>
        </div>
        
        <div className="reading">
          <span className="reading-label">Humidity:</span>
          <span className="reading-value">
            {device.humidity.toFixed(1)}%
          </span>
        </div>
        
        <div className="timestamp">
          Last updated: {formatTime(device.timestamp)}
        </div>
      </div>
    </div>
  );
};

export default DeviceCard;
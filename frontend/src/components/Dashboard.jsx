import React, { useContext } from 'react';
import { DeviceDataContext } from '../context/DeviceDataContext';
import DeviceCard from './DeviceCard';
import DeviceChart from './DeviceChart';

const Dashboard = () => {
  const { 
    deviceData, 
    devices, 
    loading, 
    error, 
    selectedDevice, 
    setSelectedDevice 
  } = useContext(DeviceDataContext);

  // Handle device selection change
  const handleDeviceChange = (e) => {
    setSelectedDevice(e.target.value);
  };

  if (loading) {
    return <div className="loading">Loading device data...</div>;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Device Monitoring Dashboard</h2>
        <div>
          <label htmlFor="device-selector">Filter by Device: </label>
          <select 
            id="device-selector" 
            className="device-selector"
            value={selectedDevice}
            onChange={handleDeviceChange}
          >
            <option value="all">All Devices</option>
            {devices.map(device => (
              <option key={device} value={device}>
                {device}
              </option>
            ))}
          </select>
        </div>
      </div>

      <DeviceChart deviceData={deviceData} />

      {deviceData.length > 0 ? (
        deviceData.map(device => (
          <DeviceCard key={device._id} device={device} />
        ))
      ) : (
        <div className="alert alert-info">No device data available</div>
      )}
    </div>
  );
};

export default Dashboard;
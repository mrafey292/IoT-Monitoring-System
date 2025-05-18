import React, { createContext, useState, useEffect, useCallback } from 'react';
import axios from 'axios';

export const DeviceDataContext = createContext();

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const DeviceDataProvider = ({ children }) => {
  const [deviceData, setDeviceData] = useState([]);
  const [devices, setDevices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDevice, setSelectedDevice] = useState('all');

  // Fetch latest data
  const fetchLatestData = useCallback(async () => {
    try {
      let url = `${API_URL}/data/latest`;
      
      // Filter by device if one is selected
      if (selectedDevice !== 'all') {
        url += `?deviceId=${selectedDevice}`;
      }
      
      const response = await axios.get(url);
      if (response.data.success) {
        setDeviceData(response.data.data);
        setError(null);
      }
    } catch (err) {
      console.error('Error fetching device data:', err);
      setError('Failed to fetch device data. Please try again later.');
    } finally {
      setLoading(false);
    }
  }, [selectedDevice]);

  // Fetch available devices
  const fetchDevices = useCallback(async () => {
    try {
      const response = await axios.get(`${API_URL}/data/devices`);
      if (response.data.success) {
        setDevices(response.data.data);
      }
    } catch (err) {
      console.error('Error fetching devices:', err);
    }
  }, []);

  // Post new device data
  const addDeviceData = async (newData) => {
    try {
      const response = await axios.post(`${API_URL}/data`, newData);
      if (response.data.success) {
        fetchLatestData();
        return { success: true };
      }
      return { success: false, error: 'Failed to add data' };
    } catch (err) {
      console.error('Error adding device data:', err);
      return { 
        success: false, 
        error: err.response?.data?.message || 'An error occurred while adding device data' 
      };
    }
  };

  // Initial data fetch
  useEffect(() => {
    fetchDevices();
  }, [fetchDevices]);

  // polling for latest data
  useEffect(() => {
    fetchLatestData();
    
    // Poll every 5 seconds
    const interval = setInterval(fetchLatestData, 5000);
    
    // Cleanup on unmount
    return () => clearInterval(interval);
  }, [fetchLatestData]);

  return (
    <DeviceDataContext.Provider
      value={{
        deviceData,
        devices,
        loading,
        error,
        selectedDevice,
        setSelectedDevice,
        addDeviceData,
        refreshData: fetchLatestData
      }}
    >
      {children}
    </DeviceDataContext.Provider>
  );
};
import React, { useState, useContext, useEffect } from 'react';
import { DeviceDataContext } from '../context/DeviceDataContext';

const AdminConsole = () => {
  const { addDeviceData, devices } = useContext(DeviceDataContext);
  
  // Form state
  const [formData, setFormData] = useState({
    deviceId: '',
    temperature: '',
    humidity: '',
    status: 'active'
  });
  
  // UI state
  const [message, setMessage] = useState({ text: '', type: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Clear message after 5 seconds
  useEffect(() => {
    if (message.text) {
      const timer = setTimeout(() => {
        setMessage({ text: '', type: '' });
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [message]);
  
  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Validate form data
    if (!formData.deviceId || !formData.temperature || !formData.humidity) {
      setMessage({
        text: 'Please fill in all required fields',
        type: 'danger'
      });
      setIsSubmitting(false);
      return;
    }
    
    // Convert temperature and humidity to numbers
    const newReading = {
      ...formData,
      temperature: parseFloat(formData.temperature),
      humidity: parseFloat(formData.humidity)
    };
    
    // Validate temperature and humidity ranges
    if (newReading.temperature < -50 || newReading.temperature > 100) {
      setMessage({
        text: 'Temperature must be between -50°C and 100°C',
        type: 'danger'
      });
      setIsSubmitting(false);
      return;
    }
    
    if (newReading.humidity < 0 || newReading.humidity > 100) {
      setMessage({
        text: 'Humidity must be between 0% and 100%',
        type: 'danger'
      });
      setIsSubmitting(false);
      return;
    }
    
    // Submit the data
    try {
      const result = await addDeviceData(newReading);
      
      if (result.success) {
        setMessage({
          text: 'Device data added successfully!',
          type: 'success'
        });
        
        // Reset form
        setFormData({
          deviceId: '',
          temperature: '',
          humidity: '',
          status: 'active'
        });
      } else {
        setMessage({
          text: result.error || 'Failed to add device data',
          type: 'danger'
        });
      }
    } catch (error) {
      setMessage({
        text: 'An error occurred while submitting data',
        type: 'danger'
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="admin-console">
      <h2>Admin Console</h2>
      <p>Form to simulate device data uploads.</p>
      
      {message.text && (
        <div className={`alert alert-${message.type}`}>{message.text}</div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="deviceId">Device ID*</label>
          <input
            type="text"
            id="deviceId"
            name="deviceId"
            className="form-control"
            value={formData.deviceId}
            onChange={handleChange}
            placeholder="Enter device ID or select from existing"
            list="device-list"
            required
          />
          <datalist id="device-list">
            {devices.map(device => (
              <option key={device} value={device} />
            ))}
          </datalist>
        </div>
        
        <div className="form-group">
          <label htmlFor="temperature">Temperature (°C)*</label>
          <input
            type="number"
            id="temperature"
            name="temperature"
            className="form-control"
            value={formData.temperature}
            onChange={handleChange}
            placeholder="Enter temperature (-50 to 100)"
            min="-50"
            max="100"
            step="0.1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="humidity">Humidity (%)*</label>
          <input
            type="number"
            id="humidity"
            name="humidity"
            className="form-control"
            value={formData.humidity}
            onChange={handleChange}
            placeholder="Enter humidity (0 to 100)"
            min="0"
            max="100"
            step="0.1"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="status">Device Status</label>
          <select
            id="status"
            name="status"
            className="form-control"
            value={formData.status}
            onChange={handleChange}
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="error">Error</option>
          </select>
        </div>
        
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting...' : 'Submit Device Data'}
        </button>
      </form>
    </div>
  );
};

export default AdminConsole;
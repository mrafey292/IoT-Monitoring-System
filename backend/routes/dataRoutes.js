const express = require('express');
const router = express.Router();
const DeviceData = require('../models/DeviceData');

// middleware for try/catch handling
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Get latest device readings
router.get('/latest', asyncHandler(async (req, res) => {
  const limit = req.query.limit ? parseInt(req.query.limit) : 10;
  const deviceId = req.query.deviceId;
  
  let data;
  if (deviceId) {
    data = await DeviceData.find({ deviceId })
      .sort({ timestamp: -1 })
      .limit(limit);
  } else {
    data = await DeviceData.getLatestReadings(limit);
  }
  
  res.json({ success: true, count: data.length, data });
}));

// Get list of all unique devices
router.get('/devices', asyncHandler(async (req, res) => {
  const devices = await DeviceData.distinct('deviceId');
  res.json({ success: true, count: devices.length, data: devices });
}));

// Add new device reading
router.post('/', asyncHandler(async (req, res) => {
  const { deviceId, temperature, humidity, status } = req.body;
  
  // Validate required fields
  if (!deviceId || temperature === undefined || humidity === undefined) {
    return res.status(400).json({ 
      success: false, 
      message: 'Please provide deviceId, temperature, and humidity' 
    });
  }
  
  const newReading = new DeviceData({
    deviceId,
    temperature,
    humidity,
    status: status || 'active'
  });
  
  const savedReading = await newReading.save();
  res.status(201).json({ success: true, data: savedReading });
}));

// Delete a specific reading
router.delete('/:id', asyncHandler(async (req, res) => {
  const reading = await DeviceData.findById(req.params.id);
  
  if (!reading) {
    return res.status(404).json({ success: false, message: 'Reading not found' });
  }
  
  await reading.remove();
  res.json({ success: true, message: 'Reading deleted' });
}));

module.exports = router;
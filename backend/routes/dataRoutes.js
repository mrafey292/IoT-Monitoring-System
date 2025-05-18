const express = require('express');
const router = express.Router();
const DeviceData = require('../models/DeviceData');

// Middleware for try/catch handling
const asyncHandler = fn => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * @route   GET /api/data/latest
 * @desc    Get latest device readings
 * @access  Public
 */
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

/**
 * @route   GET /api/data/devices
 * @desc    Get list of all unique devices
 * @access  Public
 */
router.get('/devices', asyncHandler(async (req, res) => {
  const devices = await DeviceData.distinct('deviceId');
  res.json({ success: true, count: devices.length, data: devices });
}));

/**
 * @route   POST /api/data
 * @desc    Add new device reading
 * @access  Public
 */
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

/**
 * @route   DELETE /api/data/:id
 * @desc    Delete a specific reading
 * @access  Public (would typically be restricted in production)
 */
router.delete('/:id', asyncHandler(async (req, res) => {
  const reading = await DeviceData.findById(req.params.id);
  
  if (!reading) {
    return res.status(404).json({ success: false, message: 'Reading not found' });
  }
  
  await reading.remove();
  res.json({ success: true, message: 'Reading deleted' });
}));

module.exports = router;
const mongoose = require('mongoose');

const deviceDataSchema = new mongoose.Schema({
  deviceId: {
    type: String,
    required: [true, 'Device ID is required'],
    trim: true
  },
  temperature: {
    type: Number,
    required: [true, 'Temperature reading is required'],
    min: [-50, 'Temperature must be at least -50°C'],
    max: [100, 'Temperature cannot exceed 100°C']
  },
  humidity: {
    type: Number,
    required: [true, 'Humidity reading is required'],
    min: [0, 'Humidity cannot be less than 0%'],
    max: [100, 'Humidity cannot exceed 100%']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'error'],
    default: 'active'
  }
});

// Static method to get latest readings
deviceDataSchema.statics.getLatestReadings = async function(limit = 10) {
  return this.find({})
    .sort({ timestamp: -1 })
    .limit(limit);
};

// Static method to get latest reading by deviceId
deviceDataSchema.statics.getLatestByDevice = async function(deviceId) {
  return this.findOne({ deviceId })
    .sort({ timestamp: -1 });
};

const DeviceData = mongoose.model('DeviceData', deviceDataSchema);

module.exports = DeviceData;
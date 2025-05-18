import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const DeviceChart = ({ deviceData }) => {
  // If no data, don't render the chart
  if (!deviceData || deviceData.length === 0) {
    return null;
  }

  // Format data for the chart
  const chartData = [...deviceData]
    .sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp))
    .map(data => ({
      name: new Date(data.timestamp).toLocaleTimeString(),
      temperature: data.temperature,
      humidity: data.humidity,
      deviceId: data.deviceId
    }));

  return (
    <div className="chart-container">
      <h3>Device Readings Over Time</h3>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 10 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis 
            dataKey="name" 
            label={{ value: 'Time', position: 'insideBottomRight', offset: -10 }}
          />
          <YAxis yAxisId="left" 
            label={{ value: 'Temperature (°C)', angle: -90, position: 'insideLeft' }}
          />
          <YAxis yAxisId="right" orientation="right" 
            label={{ value: 'Humidity (%)', angle: -90, position: 'insideRight' }}
          />
          <Tooltip 
            formatter={(value, name, props) => {
              if (name === 'temperature') return [value.toFixed(1) + '°C', 'Temperature'];
              if (name === 'humidity') return [value.toFixed(1) + '%', 'Humidity'];
              return [value, name];
            }}
            labelFormatter={(label) => `Time: ${label}`}
          />
          <Legend />
          <Line
            yAxisId="left"
            type="monotone"
            dataKey="temperature"
            stroke="#ff7300"
            activeDot={{ r: 8 }}
            name="Temperature"
          />
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="humidity"
            stroke="#0088fe"
            name="Humidity"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default DeviceChart;
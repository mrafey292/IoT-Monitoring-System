# Real-Time IoT Monitoring System (MERN Stack)

A comprehensive IoT device monitoring dashboard built with the MERN stack (MongoDB, Express, React, Node.js). This application allows users to view real-time IoT device data and includes an admin interface for uploading simulated device data.

## Features

- **Real-time Dashboard**: View IoT device data with automatic 5-second updates
- **Device Filtering**: Filter data by specific devices
- **Data Visualization**: Interactive charts using Recharts
- **Admin Console**: Upload simulated device data
- **Responsive Design**: Works on desktop and mobile devices

## Project Structure

```
iot-monitoring/
├── backend/                     # Express server
│   ├── models/                  # Mongoose models
│   │   └── DeviceData.js        # Device data schema
│   ├── routes/                  # API routes
│   │   └── dataRoutes.js        # Device data endpoints
│   ├── .env                     # Environment variables
│   ├── package.json             # Backend dependencies
│   └── server.js                # Main server file
│
├── frontend/                    # React application
│   ├── public/                  # Static files
│   └── src/
│       ├── components/          # React components
│       │   ├── AdminConsole.js  # Admin interface
│       │   ├── Dashboard.js     # Main dashboard
│       │   ├── DeviceCard.js    # Device info card
│       │   └── DeviceChart.js   # Data visualization
│       ├── context/
│       │   └── DeviceDataContext.js # Global state management
│       ├── App.js               # Main app component
│       ├── App.css              # Styles
│       └── index.js             # Entry point
│
└── README.md                    # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14+)
- MongoDB Atlas account
- npm or yarn

### Backend Setup

1. Navigate to the backend directory:
   ```
   cd backend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file with the following variables:
   ```
   MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/iot-monitoring
   PORT=5000
   NODE_ENV=development
   ```

4. Start the server:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the frontend directory:
   ```
   cd frontend
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm start
   ```

4. Access the application at [http://localhost:3000](http://localhost:3000)

## MongoDB Atlas Setup

1. Create a free MongoDB Atlas account at [https://www.mongodb.com/cloud/atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster
3. Create a database user with read/write permissions
4. Whitelist your IP address or use `0.0.0.0/0` for development
5. Get your connection string and update the `.env` file

## API Endpoints

- `GET /api/data/latest` - Get latest device readings
- `GET /api/data/devices` - Get list of all unique devices
- `POST /api/data` - Add new device reading
- `DELETE /api/data/:id` - Delete a specific reading

## Technologies Used

### Backend
- **Express**: Web server framework
- **Mongoose**: MongoDB ODM for data modeling
- **MongoDB Atlas**: Cloud database service
- **Cors**: Cross-Origin Resource Sharing middleware
- **Dotenv**: Environment variable management

### Frontend
- **React**: UI library
- **React Router**: Navigation and routing
- **Axios**: HTTP client for API requests
- **Recharts**: Charting library for data visualization
- **Context API**: State management

## Deployment

For a production deployment, consider:

1. Backend: Heroku, Render, or Railway
2. Frontend: Vercel, Netlify, or GitHub Pages
3. Update CORS configuration for production
4. Set appropriate environment variables

## Bonus Features

- [ ] Implement user authentication
- [ ] Add more chart types for data visualization
- [ ] Create a device management interface
- [ ] Add data export functionality (CSV/PDF)
- [ ] Implement websockets for real-time updates (Socket.io)

## Learn More

- [MongoDB Atlas Documentation](https://docs.atlas.mongodb.com/)
- [Express.js Documentation](https://expressjs.com/)
- [React Documentation](https://reactjs.org/)
- [Mongoose Documentation](https://mongoosejs.com/docs/guide.html)
- [Recharts Documentation](https://recharts.org/en-US/)

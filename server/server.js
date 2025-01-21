const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
require('dotenv').config();

const app = express();

// Add more detailed CORS configuration
app.use(cors({
  origin: 'http://localhost:5177', // Your frontend URL
  methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Add a basic test route
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is running' });
});

app.post('/api/submit-application', async (req, res) => {
  console.log('Received application submission');
  console.log('Request body:', req.body);
  
  try {
    // For now, just send back a success response
    res.json({ message: 'Application received' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`CORS enabled for origin: http://localhost:5177`);
}); 
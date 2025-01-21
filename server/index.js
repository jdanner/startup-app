const express = require('express');
const cors = require('cors');
const fs = require('fs').promises;
const path = require('path');
const multer = require('multer');
const nodemailer = require('nodemailer');
require('dotenv').config();

// Configure storage based on environment
const isProduction = process.env.NODE_ENV === 'production';
const RENDER_STORAGE_PATH = process.env.RENDER_STORAGE_PATH || '/opt/render/project/src/storage';

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = isProduction 
      ? path.join(RENDER_STORAGE_PATH, 'uploads')
      : path.join(__dirname, 'uploads');

    fs.mkdir(uploadDir, { recursive: true })
      .then(() => cb(null, uploadDir))
      .catch(err => cb(err));
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage: storage });

const app = express();
const port = process.env.PORT || 3000;

// Update CORS configuration to allow requests from port 5173
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['POST', 'GET', 'OPTIONS'],
  credentials: true
}));

app.use(express.json());

// Serve static files from the appropriate uploads directory
if (isProduction) {
  app.use('/uploads', express.static(path.join(RENDER_STORAGE_PATH, 'uploads')));
} else {
  app.use('/uploads', express.static('uploads'));
}

// Get all applications
app.get('/api/applications', async (req, res) => {
  try {
    const applicationsDir = path.join(__dirname, 'applications');
    
    // Create directory if it doesn't exist
    await fs.mkdir(applicationsDir, { recursive: true });
    
    // Check if directory is empty
    const files = await fs.readdir(applicationsDir);
    if (files.length === 0) {
      return res.json([]); // Return empty array if no applications
    }
    
    const applications = await Promise.all(
      files
        .filter(file => file.endsWith('.json'))
        .map(async file => {
          const content = await fs.readFile(path.join(applicationsDir, file), 'utf8');
          return JSON.parse(content);
        })
    );
    res.json(applications.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp)));
  } catch (error) {
    console.error('Error reading applications:', error);
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
});

// Save a new application
app.post('/api/applications', async (req, res) => {
  try {
    const application = {
      ...req.body,
      timestamp: new Date().toISOString()
    };

    const applicationsDir = path.join(__dirname, 'applications');
    await fs.mkdir(applicationsDir, { recursive: true });

    const filename = `${application.timestamp.replace(/[:.]/g, '-')}.json`;
    await fs.writeFile(
      path.join(applicationsDir, filename),
      JSON.stringify(application, null, 2)
    );

    res.json({ success: true });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Failed to save application' });
  }
});

// File upload endpoint
app.post('/api/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    
    // Generate URL based on environment
    const baseUrl = isProduction 
      ? process.env.RENDER_EXTERNAL_URL 
      : `http://localhost:${port}`;
    
    const fileUrl = `${baseUrl}/uploads/${req.file.filename}`;
    res.json({ url: fileUrl });
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).json({ error: 'Failed to upload file' });
  }
});

// Add a basic test route
app.get('/api/test', (req, res) => {
  console.log('Test endpoint hit');
  res.json({ message: 'Server is running' });
});

// Add email configuration
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Update the submit-application endpoint
app.post('/api/submit-application', async (req, res) => {
  console.log('Received application submission');
  console.log('Request body:', req.body);
  
  try {
    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: 'your-email@example.com', // Replace with your email
      subject: 'New Application Submission',
      text: `
        New application received:
        Channel: ${req.body.channel}
        Experiments per Week: ${req.body.experimentsPerWeek}
        
        View full details in the admin dashboard.
      `
    };

    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully');
    
    res.json({ message: 'Application received and email sent' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ error: 'Failed to process application' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`CORS enabled for origin: http://localhost:5173`);
}); 
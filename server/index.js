import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';
import dotenv from 'dotenv';
import { dirname } from 'path';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Configure storage based on environment
const isProduction = process.env.NODE_ENV === 'production';
const RENDER_STORAGE_PATH = '/data';  // Use Render's mounted disk

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

// Add CORS configuration to allow requests from danners.org
app.use(cors({
  origin: ['http://localhost:5173', 'https://danners.org', 'https://startup-apply.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Content-Length', 'Content-Disposition'],
  exposedHeaders: ['Content-Disposition']
}));

app.use(express.json());

// Serve static files from the appropriate uploads directory
if (isProduction) {
  app.use('/uploads', express.static(path.join(RENDER_STORAGE_PATH, 'uploads')));
} else {
  app.use('/uploads', express.static('uploads'));
}

// Add logging middleware for all requests
app.use((req, res, next) => {
  console.log('Incoming request:', {
    method: req.method,
    path: req.path,
    headers: req.headers
  });
  next();
});

// Add GET endpoint for applications
app.get('/api/applications', async (req, res) => {
  try {
    const applicationsDir = path.join(__dirname, 'applications');
    await fs.mkdir(applicationsDir, { recursive: true });
    
    const files = await fs.readdir(applicationsDir);
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
    console.error('Error fetching applications:', error);
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

    const applicationsDir = isProduction
      ? path.join(RENDER_STORAGE_PATH, 'applications')
      : path.join(__dirname, 'applications');

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
      ? 'https://startup-apply-api.onrender.com'  // Use actual production URL
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

// Update the delete endpoint to use timestamp
app.delete('/api/applications/:timestamp', async (req, res) => {
  try {
    const { timestamp } = req.params;
    const applicationsDir = path.join(__dirname, 'applications');
    const filename = `${timestamp.replace(/[:.]/g, '-')}.json`;
    const filePath = path.join(applicationsDir, filename);
    
    console.log('Attempting to delete:', {
      originalTimestamp: timestamp,
      filename: filename,
      fullPath: filePath
    });

    // List files in directory to debug
    const files = await fs.readdir(applicationsDir);
    console.log('Available files:', files);
    
    await fs.unlink(filePath);
    console.log('Successfully deleted application');
    res.json({ message: 'Application deleted' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ error: 'Failed to delete application' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(`CORS enabled for origin: http://localhost:5173`);
});
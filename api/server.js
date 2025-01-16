import express from 'express';
import cors from 'cors';
import { promises as fs } from 'fs';
import path from 'path';
import multer from 'multer';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;
const DATA_DIR = process.env.DATA_DIR || path.join(__dirname, 'data');
const UPLOADS_DIR = path.join(DATA_DIR, 'uploads');
const BASE_URL = process.env.BASE_URL || 'http://localhost:3000';

// Move this AFTER ensuring directories exist
app.use('/uploads', express.static(UPLOADS_DIR));

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    await ensureDirectories(); // Make sure directories exist before upload
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

app.use(cors());
app.use(express.json());

// Upload endpoint
app.post('/api/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  const fileUrl = `${BASE_URL}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// Ensure both directories exist on startup
async function ensureDirectories() {
  try {
    await fs.mkdir(DATA_DIR, { recursive: true });
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  } catch (error) {
    console.error('Error creating directories:', error);
  }
}

// Call this at startup
ensureDirectories();

// Save application data
app.post('/api/applications', async (req, res) => {
  try {
    await ensureDirectories();
    const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
    const filename = `application-${timestamp}.json`;
    const filepath = path.join(DATA_DIR, filename);
    
    await fs.writeFile(
      filepath,
      JSON.stringify(req.body, null, 2)
    );
    
    res.status(200).json({ message: 'Application saved successfully' });
  } catch (error) {
    console.error('Error saving application:', error);
    res.status(500).json({ error: 'Failed to save application' });
  }
});

app.get('/', (req, res) => {
  res.json({ status: 'API is running' });
});

app.get('/uploads-test', async (req, res) => {
  try {
    await ensureDirectories();
    const files = await fs.readdir(UPLOADS_DIR);
    res.json({ 
      status: 'Uploads directory exists',
      files,
      uploadsPath: UPLOADS_DIR
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`API server running on port ${PORT}`);
}); 
// backend/routes/predictRoute.js
const express = require('express');
const multer = require('multer');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Ensure upload directory exists
const uploadPath = path.join(__dirname, './uploads');
if (!fs.existsSync(uploadPath)) {
  fs.mkdirSync(uploadPath);
}

// Set up multer for image upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadPath),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// Route to handle prediction
router.post('/predict', upload.single('image'), (req, res) => {
  try {
    const imagePath = req.file.path;
    const python = spawn('python', ['app/model/predict.py', imagePath]);

    let result = '';

    python.stdout.on('data', (data) => {
      result += data.toString();
    });

    python.stderr.on('data', (data) => {
      console.error(`stderr: ${data}`);
    });

    python.on('close', (code) => {
      console.log(`Python script exited with code ${code}`);
      try {
        // Remove TensorFlow logs if included in output
        const jsonStart = result.indexOf('{');
        const jsonStr = result.slice(jsonStart);
        const prediction = JSON.parse(jsonStr);

        res.json(prediction);
      } catch (err) {
        console.error('Failed to parse Python output:', result);
        res.status(500).json({ error: 'Prediction failed. Invalid output.' });
      }
    });
  } catch (err) {
    console.error('Error during prediction:', err);
    res.status(500).json({ error: 'Server error during prediction.' });
  }
});

module.exports = router;

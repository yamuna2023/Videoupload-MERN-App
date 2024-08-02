// backend/server.js
const express = require('express');
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const cors = require('cors'); 
const app = express();
const PORT = process.env.PORT || 5000;

require('dotenv').config();

// Cloudinary configuration
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Multer setup
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

app.use(express.json());
app.use(cors()); // Enable CORS

// In-memory store for media info (temporary solution)
let mediaStore = [];

// API route to upload media
app.post('/upload', upload.fields([{ name: 'thumbnail' }, { name: 'video' }]), async (req, res) => {
    try {
        const { title, description } = req.body;

        // Upload thumbnail
        const thumbnailResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'image' }, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(req.files.thumbnail[0].buffer);
        });

        // Upload video
        const videoResult = await new Promise((resolve, reject) => {
            cloudinary.uploader.upload_stream({ resource_type: 'video' }, (error, result) => {
                if (error) reject(error);
                resolve(result);
            }).end(req.files.video[0].buffer);
        });

        // Save to in-memory store
        const media = {
            id: mediaStore.length + 1,
            title,
            description,
            thumbnailUrl: thumbnailResult.secure_url,
            videoUrl: videoResult.secure_url,
        };
        mediaStore.push(media);

        res.status(201).send(media);
    } catch (error) {
        res.status(500).send(error);
    }
});

// API route to get media list
app.get('/media', (req, res) => {
    res.status(200).send(mediaStore);
});

// API route to get media by ID
app.get('/media/:id', (req, res) => {
    const media = mediaStore.find(item => item.id === parseInt(req.params.id));
    if (!media) return res.status(404).send('Media not found');
    res.status(200).send(media);
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import { nanoid } from 'nanoid';
import dotenv from 'dotenv';
dotenv.config();

const app = express();

// Middleware
app.use(cors());
console.log('CORS middleware registered');
app.use(express.json());
console.log('express.json middleware registered');

console.log('Connecting to MongoDB...');
mongoose.connect(process.env.DATABASE_URL)
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log("failed to connect", err));

// Mongoose Schema and Model
console.log('Registering mongoose schema and model');
const urlSchema = new mongoose.Schema({ 
    originalUrl: String,
    shortUrl: String,
    clicks: { type: Number, default: 0 }
});
const Url = mongoose.model('Url', urlSchema); // table mapping

// POST endpoint to shorten
app.post('/api/short', async (req, res) => {
    console.log('POST /api/short triggered');
    try {
        console.log('Request body:', req.body);
        const { originalUrl } = req.body;
        if (!originalUrl) {
            console.log('Original URL missing from request body');
            return res.status(400).json({ message: "Original URL is required" });
        }
        const shortUrl = nanoid(8);
        console.log('Generated shortUrl:', shortUrl);
        const url = new Url({ originalUrl, shortUrl });
        await url.save();
        console.log('URL document saved:', url);
        res.status(200).json({ message:"URL generated successfully", url:url });
    } catch (error) {
        console.log('Error in /api/short:', error);
        res.status(500).json({ message: "Server error" });
    }
});

// GET endpoint to redirect short URL
app.get('/:shortUrl', async (req, res) => {
    console.log('GET /:shortUrl triggered');
    try {
        const { shortUrl } = req.params;
        console.log('Looking for shortUrl:', shortUrl);
        const url = await Url.findOne({ shortUrl });
        if (url) {
            console.log('URL found:', url);
            url.clicks += 1;
            await url.save();
            console.log('Click count incremented:', url.clicks);
            return res.redirect(url.originalUrl);
        } else {
            console.log('URL not found for:', shortUrl);
            return res.status(404).json({ message: "URL not found" });
        }
    } catch (error) {
        console.log('Error in /:shortUrl:', error);
        res.status(500).json({ message: "Server error" });
    }
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

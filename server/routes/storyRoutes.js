import express from 'express';
import * as dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import Story from '../mongodb/models/story.js';

dotenv.config();

const router = express.Router();

cloudinary .config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
})

// get all posts
router.route('/').get(async (req,res) => {
    try {
        const stories = await Story.find({});
        res.status(200).json({ success:true, data: stories});
    } catch (error) {
        res.status(500).json({ success:false, message: error});
    }
});

// create a post
router.route('/').post(async (req,res) => {
    try{
        const { name, prompt, photo, story } = req.body;
        const photoUrl = await cloudinary.uploader.upload(photo);

        const newStory = await Story.create({
            name,
            prompt,
            photo: photoUrl.url,
            story,
        })

        res.status(201).json({ success: true, data: newStory})
    } catch (error) {
        res.status(500).json({ success: false, message: error})
    }
});

export default router;
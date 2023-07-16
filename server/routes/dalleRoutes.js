import express from 'express';
import * as dotenv from 'dotenv';
import { Configuration, OpenAIApi } from 'openai';

dotenv.config();

const router = express.Router();

const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
})

const openai = new OpenAIApi(configuration);

router.route('/').get(async (req,res) => {
    res.status(200).json({ message: 'Hello from DALL-E!' });
})

router.route('/').post(async (req,res) => {
    try {
        // Get the prompt
        const { prompt } = req.body;

        // Generate the image using DALL-E
        const aiResponse = await openai.createImage({
            prompt,
            n:1,
            size: '1024x1024',
            response_format: 'b64_json',
        });
        
        const image = aiResponse.data.data[0].b64_json;
        
        // Generate the short story using GPT
        const storyResponse = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
                {"role": "system", "content": "You are a short fictional story generator. Generate short stories based on the user prompt. Add a newline for every paragraph."},
                {role: "user", content: prompt}
            ],
        });

        const story = storyResponse.data.choices[0].message.content;
        const storyWithLineBreaks = story.replace(/\n/g, '<br>');
        // console.log(storyResponse.data.choices[0].message)
        // console.log(storyWithLineBreaks)

        // Return the image and text
        res.status(200).json({ photo: image, text: storyWithLineBreaks });

    } catch (error){
        console.log(error);
        res.status(500).send(error?.response.data.error.message || 'Something went wrong');
    }
})

export default router;
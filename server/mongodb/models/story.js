import mongoose from 'mongoose';

const Story = new mongoose.Schema({
    name: { type: String, required: true},
    prompt: { type: String, required: true},
    photo: { type: String, required: true},
});

const StorySchema = mongoose.model('Story', Story);

export default StorySchema;
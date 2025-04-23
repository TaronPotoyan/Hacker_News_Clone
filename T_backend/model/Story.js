import mongoose from 'mongoose';

const storySchema = new mongoose.Schema({
  author: { type: mongoose.Schema.Types.String, ref: 'User', required: true },
  title: { type: String, required: true },
  url: { type: String, required: true },
  date: { type: Date, default: Date.now },
  comments: {
    type: [
      {
        author: { type: String, required: true },
        text: { type: String, required: true },
        date: { type: Date, default: Date.now }
      }
    ],
    default: []
  }
});

const Story = mongoose.model('Story', storySchema, 'story');
export default Story;

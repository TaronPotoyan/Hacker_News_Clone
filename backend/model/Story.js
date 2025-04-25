import mongoose from 'mongoose';

const replySchema = new mongoose.Schema({
  author: { 
    type: String, 
    required: true,
    trim: true
  },
  text: { 
    type: String, 
    required: true,
    trim: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  }
}, { timestamps: true });


replySchema.add({
  replies: { 
    type: [replySchema], 
    default: [] 
  }
});

const commentSchema = new mongoose.Schema({
  author: { 
    type: String, 
    required: true,
    trim: true
  },
  text: { 
    type: String, 
    required: true,
    trim: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  replies: { 
    type: [replySchema], 
    default: [] 
  }
}, { timestamps: true });

const storySchema = new mongoose.Schema({
  author: { 
    type: mongoose.Schema.Types.String, 
    ref: 'User', 
    required: true,
    trim: true
  },
  title: { 
    type: String, 
    required: true,
    trim: true
  },
  url: { 
    type: String, 
    required: true,
    trim: true
  },
  date: { 
    type: Date, 
    default: Date.now 
  },
  comments: { 
    type: [commentSchema], 
    default: [] 
  }
}, { timestamps: true });

storySchema.index({ title: 'text', 'comments.text': 'text', 'comments.replies.text': 'text' });

const Story = mongoose.model('Story', storySchema);
export default Story;
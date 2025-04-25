import Story from "../model/Story.js";

export async function get(req, res) {
  console.log('Works');
  
  try {
    const stories = await Story.find({ score: { $gt: 5 } }).sort({ date: -1 }).lean();
    console.log(stories);
    
    res.json(stories);
  } catch (error) {
    console.error('Get stories error:', error);
    res.status(500).json({ error: 'Error fetching stories' });
  }
}

export async function getById(req, res) {
  try {
    const { id } = req.params;

    if (!id || id === 'undefined') {
      return res.status(400).json({
        error: 'Missing or invalid story ID',
        details: 'ID must be a valid MongoDB ObjectId'
      });
    }

    const story = await Story.findById(id).lean();
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    res.json(story);
  } catch (error) {
    console.error('Get by ID error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid story ID format',
        details: 'ID must be a valid MongoDB ObjectId'
      });
    }

    res.status(500).json({ error: 'Error fetching story' });
  }
}

export async function post(req, res) {
  try {
    const { author, title, url, comments = [] } = req.body;

    if (!title || !url || !author) {
      return res.status(400).json({
        error: 'Validation error',
        details: 'Title, URL, and author are required'
      });
    }

    const newStory = new Story({
      author: author.toString(),
      title,
      url,
      comments,
      date: new Date(),
      score : 0
    });

    await newStory.save();
    res.status(201).json(newStory);
  } catch (error) {
    console.error('Post error:', error);
    res.status(500).json({
      error: 'Error creating story',
      details: error.message
    });
  }
}

const put_comm = async (req, res) => {
  const { id } = req.params;
  const { author, text } = req.body;

  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    const newComment = { author, text, date: new Date(), replies: [] };
    story.comments.push(newComment);
    await story.save();

    res.status(200).json(story);
  } catch (error) {
    console.error('Error adding comment:', error);
    res.status(500).json({ message: "Error adding comment", error });
  }
};

async function SetScore(req, res) {
  const { score , _id , add } = req.body; 
  console.log('Working for like ', _id);
  
  try {
      const story = await Story.findOne({_id});
      
      if (!story) {
          return res.status(404).json({ message: 'Story not found' });
      }
      if (add) {
        story.score += 1;
      } else {
        story.score -= 1;
      }  
      res.status(200).json({
          message: 'Score updated successfully',
          newScore: story.score
      });
      await story.save();
      
  } catch (error) {
      console.error('Error updating score:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
}



export default {
  SetScore,
  get,
  getById,
  post,
  put_comm
};
import Story from "../model/Story.js";


export async function get(req, res) {
  try {
    const stories = await Story.find().sort({ date: -1 }).lean();
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
    console.log(author,title,url);
    
    if (!title || !url || !author) {
      return res.status(400).json({
        error: 'Validation error',
        details: 'Title, URL, and author are required'
      });
    }

    const newStory = new Story({
      author : author.toString(),
      title,
      url,
      comments,
      date: new Date()
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

export async function put_comm(req, res) {
  console.log('Put is working');

  try {
    const { id } = req.params;
    const { author, text } = req.body;

    if (!id || id === 'undefined') {
      return res.status(400).json({
        error: 'Missing or invalid story ID',
        details: 'ID must be a valid MongoDB ObjectId'
      });
    }

    if (!author || !text) {
      return res.status(400).json({
        error: 'Validation error',
        details: 'Author and text are required for comments'
      });
    }

    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ error: 'Story not found' });
    }

    story.comments.push({ author, text });
    await story.save();

    res.status(201).json(story);
  } catch (error) {
    console.error('Put comment error:', error);

    if (error.name === 'CastError') {
      return res.status(400).json({
        error: 'Invalid story ID format',
        details: 'ID must be a valid MongoDB ObjectId'
      });
    }

    res.status(500).json({
      error: 'Error adding comment',
      details: error.message
    });
  }
}

export default {
  get,
  getById,
  post,
  put_comm,
};

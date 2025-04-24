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
    console.log(`STID ${id}`);
    
    if (!id || id === 'undefined') {
      return res.status(400).json({
        error: 'Missing or invalid story ID',
        details: 'ID must be a valid MongoDB ObjectId'
      });
    }
    console.log('there');
    
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



export const put_comm = async (req, res) => {
  const { id } = req.params;
  const { author, title, text } = req.body;
  
  try {
    const story = await Story.findById(id);
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }


    story.comments.push({ author, title, text });
    await story.save();

    res.status(200).json(story);
  } catch (error) {
    res.status(500).json({ message: "Error adding comment", error });
  }
};


export default {
  get,
  getById,
  post,
  put_comm,
}

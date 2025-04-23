
import Story from "../model/Story.js";

export default async function IsPostValid(req, res, next) {
  if (!req.body || !req.body.title || !req.body.url ) {
        return res.status(400).json({ 
          error: "Title or url is required in the request body!" 
        });
  }  
  const { title } = req.body;
  
  try {
    const existingStory = await Story.findOne({ 
      title: { $regex: new RegExp(`^${title}$`, "i") } 
    });

    if (existingStory) {
      return res.status(409).json({ 
        error: "Story with this title already exists!" 
      });
    }

    next();

  } catch (error) {
    res.status(500).json({ error: "Server error: " + error.message });
  }
}
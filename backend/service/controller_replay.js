import mongoose from "mongoose";
import Story from "../model/Story.js";

async function setReplay(req, res) {
    console.log('Replay put works');
    
  const { id } = req.params;
  const { replyText, index, author } = req.body;

  console.log(id, replyText, author);
  console.log("Replay request is on");

  try {
    const user = await Story.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (index < 0 || index >= user.comments.length) {
      return res.status(400).json({ message: "Invalid comment index" });
    }

    user.comments[index].replies.push({
      text: replyText,
      author: author, 
      date: new Date(),
    });

    await user.save();

    return res.status(200).json({ message: "Reply added successfully" });
  } catch (error) {
    console.error("Error during replay:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

async function getReplays(req, res) {
    console.log('Get replay');
    
  const { id } = req.params; 
  const { index } = req.body; 

  try {
    const user = await Story.findOne({ _id: id });

    if (!user) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (index < 0 || index >= user.comments.length) {
      return res.status(400).json({ message: "Invalid comment index" });
    }

    const comment = user.comments[index];
    const replies = comment.replies || []; 

    return res.status(200).json({ replies });
  } catch (error) {
    console.error("Error fetching replies:", error);
    return res.status(500).json({ message: "An error occurred" });
  }
}

export default {
  setReplay,
  getReplays,
};

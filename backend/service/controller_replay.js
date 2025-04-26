import mongoose from "mongoose";
import Story from "../model/Story.js";

async function setReply(req, res) {
  const { id } = req.params;
  const { replyText, author, index, replyPath = [] } = req.body;

  if (!replyText?.trim() || !author?.trim()) {
    return res.status(400).json({ message: "Reply text and author are required" });
  }

  if (isNaN(index) || index < 0) {
    return res.status(400).json({ message: "Invalid comment index" });
  }

  try {
    const story = await Story.findById(id);
    if (!story) return res.status(404).json({ message: "Story not found" });

    if (index >= story.comments.length) {
      return res.status(400).json({ message: "Invalid comment index" });
    }

    let target = story.comments[index];

    for (const pathIndex of replyPath) {
      if (!target.replies || pathIndex >= target.replies.length) {
        return res.status(400).json({ message: `Invalid reply path at index ${pathIndex}` });
      }
      target = target.replies[pathIndex];
    }

    if (!target.replies) {
      target.replies = [];
    }

    target.replies.push({
      author,
      text: replyText,
      date: new Date(),
      replies: [] 
    });

    await story.save();

    return res.status(200).json({ message: "Reply added successfully" });
  } catch (err) {
    console.error("Error adding reply:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

async function getReplays(req, res) {
  
  const { id } = req.params;
  const { index } = req.body;

  if (isNaN(index) || index < 0) {
    return res.status(400).json({ message: "Invalid comment index" });
  }

  try {
    const story = await Story.findOne({ _id: id });
    if (!story) {
      return res.status(404).json({ message: "Story not found" });
    }

    if (index >= story.comments.length) {
      return res.status(400).json({ message: "Invalid comment index" });
    }

    const comment = story.comments[index];
    const replies = comment.replies || [];

    return res.status(200).json({ replies });
  } catch (error) {
    console.error("Error fetching replies:", error);
    return res.status(500).json({ message: "Server error" });
  }
}


export default {
  setReply,
  getReplays,
};

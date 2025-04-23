import User from "../model/User.js";

async function GetUser(req, res) {
    try {
        const { name, password } = req.body;
        const user = await User.findOne({ password, name });
        
        if (user) {
            res.status(200).json({ 
                success: true,
                user: { name: user.name } 
            });
        } else {
            res.status(401).json({ error: "Invalid credentials" });
        }
    } catch (err) {
        res.status(500).json({ error: "Internal server error" });
    }
}

async function CreatUser(req, res) {
    try {
      const { name, password } = req.body;
      
      const newUser = new User({ name, password });
      await newUser.save();
      
      return res.status(201).json({
        success: true,
        user: { name: newUser.name } // Never return password
      });
      
    } catch (err) {
      console.error("Save error:", err);
      if (err.code === 11000) { // MongoDB duplicate key error
        return res.status(400).json({ error: "Username already exists" });
      }
      return res.status(500).json({ error: "Server error" });
    }
}
export default {
    GetUser,
    CreatUser,
};
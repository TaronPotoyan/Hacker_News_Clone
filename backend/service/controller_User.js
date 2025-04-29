import User from "../model/User.js";

async function GetUser(req, res) {

    try {
        const { name, password } = req.body;
        const user = await User.findOne({ password, name });
        console.log(name,password);
        
        if (user) {
            res.status(200).json({ 
                success: true,
                user: { name: user.name , date : user.date , password : user.password , email : user.email ,  about : user.about} 
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
        const { name, password, date = new Date() } = req.body;
        
       
        const existingUser = await User.findOne({ name });
        const existPassword = await User.findOne({password});
        
        if (existingUser || existPassword) {
            return res.status(400).json({ error: "User  already exists" });
        }

      
        const newUser = new User({ name, password, date });
        await newUser.save();
        
        return res.status(201).json({
            success: true,
            user: { name: newUser.name, date: newUser.date }
        });
        
    } catch (err) {
        console.error("Save error:", err);
        if (err.code === 11000) {
            return res.status(400).json({ error: "Username already exists" });
        }
        return res.status(500).json({ error: "Server error" });
    }
}


async function Update_User(req, res) {
  const { name, password, email, about } = req.body;

  if (!email && !about) {
      return res.status(400).json({ message: 'Email or About is required' });
  }

  try {
      const user = await User.findOne ({password,name});  
      user.email = email;
      user.about = about;
      await user.save();
      console.log('update');
      res.status(200).json({ message: 'User updated successfully' , email ,about});

  } catch (error) {
      console.error('Error updating user:', error);
      res.status(500).json({ message: 'Failed to update user' });
  }
}

export default {
    GetUser,
    CreatUser,
    Update_User

};


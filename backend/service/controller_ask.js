import Story from "../model/Story.js";

export  async function  GetAsk(req,res) {
    try {
        const asks = await Story.find({ title: { $regex: /^Ask HN:/ } });
        res.status(200).json(asks)

    }catch (e) {
        console.error(`Error : ${e}`);
        res.status(500).json({ message: "Internal Server Error" });
    }

}

export async function SetAsk(req,res) {
    try {
        const {author, title , date , url ,comments} = req.body;
        console.log(author,title,date);
        const newStory = new Story({
              author: author.toString(),
              title,
              url : '',                 
              comments :comments || [],
              date: new Date(),
              score : 0
            }); 
        await newStory.save();
        res.status(201);    
    }catch(e) {
        console.error(e);
    }

}

export default {
    GetAsk,
    SetAsk,
}
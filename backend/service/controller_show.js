import Story from "../model/Story.js";



export default async function getShow(req, res) {
    console.log('Show');
    
    try {
       const shows = await Story.find({ title: { $regex: /^Show HN:/ } });
       console.log(shows);
       
        res.status(200).json(shows);
    } catch (e) {
        console.error(e);
        res.status(500).json({ message: 'An error occurred while fetching shows' });
    }
}


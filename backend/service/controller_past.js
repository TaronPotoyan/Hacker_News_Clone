import Story from "../model/Story.js";


async function past(req, res) {
    try {
      const stories = await Story.find({
        $and: [
            { title: { $not: /^Show HN:/ } },
            { title: { $not: /^Ask HN:/ } }
        ]
    }).sort({ date: -1 });
          if (stories.length > 0) {
        res.send(stories);
      } else {
        res.status(404).send('No stories found.');
      }
    } catch (error) {
      res.status(500).send('Server error.');
    }
}

export default {
    past,
}

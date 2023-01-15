const run = require("../run");

module.exports = {
  getPosts: async (req, res) => {
    try {
      const url = `https://old.reddit.com/r/${req.params.subreddit}/new`;
      const response = await run(url);
      res.json(response);
    } catch (error) {
      console.error(error.message);
    }
  },
};

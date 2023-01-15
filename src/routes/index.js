const { Router } = require("express");
const { getPosts } = require("../controllers/posts.controller");

const router = Router();
router.get("/", (req, res) => {
  res.send("index");
});
router.get("/:subreddit", getPosts);

module.exports = router;

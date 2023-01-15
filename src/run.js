const axios = require("axios");
const { load } = require("cheerio");
let posts = [];
let page = 1; // testing

async function run(url) {
  try {
    const { data } = await axios(url);
    const $ = load(data);
    $(".thing.link").each(async (i, e) => {
      const title = $(e)
        .find(".entry.unvoted .top-matter .title a.title")
        .text();
      const user = $(e)
        .find(".entry.unvoted .top-matter .tagline .author")
        .text();
      const profileLink = `https://old.reddit.com/user/${user}`;
      const postLink = `https://old.reddit.com${$(e).find("a").attr("href")}`;
      // const thumbail = $(e).find("a img").attr("src");
      const image = await getImage(postLink);
      // return a post object
      posts.push({
        id: Date.now(),
        title,
        postLink,
        image,
        user: { user, profileLink },
      });
      page++; // testing
    });
    const nextPage = $(".next-button a").attr("href");
    if (page < 2) {
      // testing
      // if (nextPage) {
      await run(nextPage);
    }
    // fs.writeFileSync(`./data/${url.slice(25, -4)}.json`, JSON.stringify(posts));
    return posts;
  } catch (error) {
    console.error({ error });
  }
}

async function getImage(postLink) {
  const { data } = await axios(postLink);
  const $ = load(data);
  return $("a.post-link").attr("href");
}

module.exports = run;

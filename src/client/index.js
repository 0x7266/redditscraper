const form = document.getElementById("form");
const subreddit = document.getElementById("subreddit");
const result = document.getElementById("result");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const response = await fetch(`http://localhost:3334/${subreddit.value}`);
  const data = await response.json();
  console.log(JSON.stringify(data));
  result.textContent = JSON.stringify(data);
});

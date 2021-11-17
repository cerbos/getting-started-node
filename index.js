const express = require("express");
const { deleteArticle, getArticle, updateArticle } = require("./articles");

const app = express();

// req.user populated by authentication middleware
// contains ID and list of roles

// read article
app.get("/article/:id", async (req, res) => {
  const article = await getArticle(req.params.id);
  res.json({ status: "ok", article });
});

// update article
app.patch("/article/:id", async (req, res) => {
  const article = await getArticle(req.params.id);
  await updateArticle(article, req.body);
  res.json({ status: "ok", article });
});

// delete article
app.delete("/article/:id", async (req, res) => {
  const article = await getArticle(req.params.id);
  await deleteArticle(article);
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

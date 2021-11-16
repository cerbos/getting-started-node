const express = require("express");
const { deleteArticle, getArticle, updateArticle } = require("./articles");

const app = express();

// read article
app.get("/article/:id", async (req, res) => {
  const article = await getArticle(req.params.id);
  res.json(article);
});

// update article
app.patch("/article/:id", async (req, res) => {
  await updateArticle(req.params.id, req.body);
  res.json({ status: "ok" });
});

// delete article
app.delete("/article/:id", async (req, res) => {
  await deleteArticle(req.params.id);
  res.json({ status: "ok" });
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

const express = require("express");
const { GRPC: Cerbos } = require("@cerbos/grpc");
const { deleteArticle, getArticle, updateArticle } = require("./articles");

const cerbos = new Cerbos("localhost:3593", {
  tls: false,
});

const app = express();

// req.user populated by authentication middleware
// contains ID and list of roles
// dummy implementation
app.use((req, res, next) => {
  req.user = {
    id: "user1",
    roles: ["user"],
  };
  next();
});

// read article
app.get("/article/:id", async (req, res) => {
  const article = await getArticle(req.params.id);
  if (!article) return res.status(404).json({ error: "Article not found" });

  const permissions = await cerbos.checkResource({
    principal: {
      id: req.user.id,
      roles: req.user.roles,
      attributes: req.user,
    },
    resource: {
      kind: "article",
      id: article.id,
      attributes: article,
    },
    actions: ["read"],
  });

  if (!permissions.isAllowed("read")) {
    res.status(403).json({ error: "Forbidden" });
  } else {
    res.json(article);
  }
});

// update article
app.patch("/article/:id", async (req, res) => {
  const article = await getArticle(req.params.id);
  if (!article) return res.status(404).json({ error: "Article not found" });

  const permissions = await cerbos.checkResource({
    principal: {
      id: req.user.id,
      roles: req.user.roles,
      attributes: req.user,
    },
    resource: {
      kind: "article",
      id: article.id,
      attributes: article,
    },
    actions: ["update"],
  });

  if (!permissions.isAllowed("update")) {
    res.status(403).json({ error: "Forbidden" });
  } else {
    await updateArticle(req.params.id, req.body);
    res.json({ status: "ok", article });
  }
});

// delete article
app.delete("/article/:id", async (req, res) => {
  const article = await getArticle(req.params.id);
  if (!article) return res.status(404).json({ error: "Article not found" });

  const permissions = await cerbos.checkResource({
    principal: {
      id: req.user.id,
      roles: req.user.roles,
      attributes: req.user,
    },
    resource: {
      kind: "article",
      id: article.id,
      attributes: article,
    },
    actions: ["delete"],
  });

  if (!permissions.isAllowed("delete")) {
    res.status(403).json({ error: "Forbidden" });
  } else {
    await deleteArticle(req.params.id);
    res.json({ status: "ok" });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

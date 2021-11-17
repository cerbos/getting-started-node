const express = require("express");
const { Cerbos } = require("cerbos");
const { deleteArticle, getArticle, updateArticle } = require("./articles");

const cerbos = new Cerbos({
  hostname: "http://localhost:3592",
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

  const permissions = await cerbos.check({
    principal: {
      id: req.user.id,
      roles: req.user.roles,
      attr: req.user,
    },
    resource: {
      kind: "article",
      instances: {
        [article.id]: {
          attr: article,
        },
      },
    },
    actions: ["read"],
  });

  if (!permissions.isAuthorized(article.id, "read")) {
    res.status(403).json({ error: "Forbidden" });
  } else {
    res.json(article);
  }
});

// update article
app.patch("/article/:id", async (req, res) => {
  const article = await getArticle(req.params.id);

  const permissions = await cerbos.check({
    principal: {
      id: req.user.id,
      roles: req.user.roles,
      attr: req.user,
    },
    resource: {
      kind: "article",
      instances: {
        [article.id]: {
          attr: article,
        },
      },
    },
    actions: ["update"],
  });

  if (!permissions.isAuthorized(article.id, "update")) {
    res.status(403).json({ error: "Forbidden" });
  } else {
    await updateArticle(req.params.id, req.body);
    res.json({ status: "ok", article });
  }
});

// delete article
app.delete("/article/:id", async (req, res) => {
  const article = await getArticle(req.params.id);

  const permissions = await cerbos.check({
    principal: {
      id: req.user.id,
      roles: req.user.roles,
      attr: req.user,
    },
    resource: {
      kind: "article",
      instances: {
        [article.id]: {
          attr: article,
        },
      },
    },
    actions: ["delete"],
  });

  if (!permissions.isAuthorized(article.id, "delete")) {
    res.status(403).json({ error: "Forbidden" });
  } else {
    await deleteArticle(req.params.id);
    res.json({ status: "ok" });
  }
});

app.listen(3000, () => {
  console.log("server is running on port 3000");
});

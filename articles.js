// This is dummy storage for articles. You would normally call your data store.
const articles = {
  1: {
    id: "1",
    title: "Article 1",
    owner: "user1",
  },
  2: {
    id: "2",
    title: "Article 2",
    owner: "user2",
  },
};

const getArticle = async (id) => {
  return articles[id];
};

const updateArticle = async (id, article) => {
  //update
};

const deleteArticle = async (id) => {
  //update
};

module.exports = { getArticle, deleteArticle, updateArticle };

const ArticlesService = {
  getAllArticles(db) {
    return db('articles').select();
  }
}

module.exports = ArticlesService

const {fetchArticles, selectArticleById, updateArticleById } = require('../models/articles.models.js')

//********************************************************* */
exports.getArticles = (req, res, next) => {
  // const {sort_by} = req.query;
  // console.log(sort_by)
  fetchArticles()
  .then((articles) => {
    res.status(200).send({ articles });
  })
  .catch((error) => {
    next(error);
  });
};

//********************************************************* */
exports.getArticleById = (req, res,next) => {
  const { article_id } = req.params;
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
  })
  .catch(error => next(error))
};
exports.patchArticleById = (req, res,next) => {
  const { article_id } = req.params;
  const {inc_vote} = req.body;
  updateArticleById(article_id, inc_vote)
    .then((article) => {
      res.status(201).send( article ); 
  })
  .catch((error) => {
    next(error)})
};


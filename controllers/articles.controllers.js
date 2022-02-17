//const app = require("../app")
//const articles = require('../db/data/test-data/articles.js');
const { selectArticleById } = require('../models/articles.models.js')

exports.getArticleById = (req, res,next) => {
  const { article_id } = req.params;
//  console.log(article_id,'<=====================article_id')
  selectArticleById(article_id)
    .then((article) => {
      res.status(200).send({ article });
    
  })
  .catch(error => next(error))
};
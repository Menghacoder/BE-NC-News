
const { selectArticleById, updateArticleById } = require('../models/articles.models.js')

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
  //console.log(article_id,'<================article_id')
  //console.log(inc_vote,'<=================inc_vote')
    .then((article) => {
      console.log(article,'<================article')

      res.status(201).send( article );
      
  })

  
  .catch(next)
    //=>  {console.log(error), next(error)})
};


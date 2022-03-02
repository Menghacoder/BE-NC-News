const { rows } = require('pg/lib/defaults');
const db = require('../db/connection');
//********************************************************* */

exports.fetchArticles = () => {
  

  return db
  .query(
  `SELECT articles.*, COUNT(articles.article_id) AS comment_count
  FROM articles 
  LEFT JOIN comments ON articles.article_id = comments.article_id 
  GROUP BY articles.article_id 
  ORDER BY created_at DESC;`
  )


  .then(({ rows: articles })=> {
    return articles;
  })
  }
//********************************************************* */
 exports.selectArticleById = (id) => {
    return db
      .query('SELECT * FROM articles WHERE article_id = $1;', [id])
      .then(({ rows })=> {
      if(rows.length === 0){
          return Promise.reject({status:404, msg:"article not found"});     
      }
    return rows[0];
})
}

// return db
// .query(
//   'SELECT * FROM articles LEFT JOIN comments ON articles.article_id = comments.article_id'
//   )
// .then(({ rows: articles })=> {
//   if(rows.length === 0){
//     return Promise.reject({status:404, msg:"article not found"});
//   };
//   };




exports.updateArticleById = async(article_id, inc_vote) => {

  //try{
    const result = await db
    .query
    (`UPDATE articles 
    SET votes = votes + $1 
    WHERE article_id = $2 
    RETURNING* ;`,
    [inc_vote, article_id]
    ) 
    return result.rows[0]; 
  }
  // catch(error){ 
  //   next(error)
  // }
  //}


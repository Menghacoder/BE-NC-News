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

























  
// ----------------------------------------------------------------

// exports.articles = async ({ sort_by = 'created_at', order = 'desc', author, topic }) => {
//   const validColumns = [

//     'article_id',
//     'title',
//     'topic',
//     'author',
//     'body',
//     'created_at',
//     'votes',
//     'comment_count',
//   ];
  
//   const validSort = await checkSort(sort_by, validColumns);
  
//   const validOrder = await checkOrder(order);
  
//   let queryStr = `SELECT articles.*,
//   COUNT(comments.comment_id) AS comment_count FROM articles
//   LEFT JOIN comments ON comments.article_id = articles.review_id `
  
//   let queryVals = [];
  
//   if (category) {
//     queryVals.push(category);
//     queryStr += `WHERE artikles.category ILIKE $${queryVals.length}`;
//   }
  
//   if (author) {
//     queryVals.push(author);
//     queryStr += `${category ? 'AND ' : ''}WHERE articles.outhor ILIKE $${
//       queryVals.length}`;
//   }
  
//   queryStr += `GROUP BY articles.articles_id ORDER BY ${validSort} ${validOrder};`;
  
//   const articles = await db.query(queryStr, queryVals)
//   .then((results) => results.rows);
  
//   return articles;
  
//   };

// ----------------------------------------------------------------


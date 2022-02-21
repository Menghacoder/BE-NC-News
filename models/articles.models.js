const db = require('../db/connection');

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

  try{
    const result = await db
    .query
    (`UPDATE articles 
    SET votes = votes + $1 
    WHERE article_id = $2 
    RETURNING* ;`,
    [inc_vote, article_id]
    ) 
    console.log(result.rows[0]);
    return result.rows[0];
    
  }
  catch(error){ 
    next(error)
  }
  
  }


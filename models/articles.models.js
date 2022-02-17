const db = require('../db/connection');

// exports.selectArticleById = () => {

//     return db
//     .query('SELECT * FROM articles WHERE article_id = $1;', [id])
//     .then (( rows ) => {
//         console.log(rows,'<=====================')
//     });
//};
 exports.selectArticleById = (id) => {
   console.log(id,'<============id')
return db
    .query('SELECT * FROM articles WHERE article_id = $1;', [id])
    .then(({ rows })=> {
      if(rows.length === 0){
        console.log(rows.length,'<=============== rows.length ===============');
        return Promise.reject({status:404, msg:"article not found"});
        
      }

    return rows[0];
    
})

}
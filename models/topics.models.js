 const db = require('../db/connection');

  exports.fetchTopics = () => {

    console.log("I am here")

  return db.query("SELECT * FROM topics;").then(({ rows: topics })=> {
    return topics;


  })

  }
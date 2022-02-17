const express = require('express')
const {
    getTopics,
    } = require('./controllers/topics.controllers.js')

const {
    getArticleById,
    } = require('./controllers/articles.controllers')
    

const app = express();
app.get('/api/topics', getTopics)

app.get(`/api/articles/:article_id`, getArticleById);
`/api/articles/:article_id`

//404 - path not found
app.all('/*', (req, res, next) => {
    res.status(404).send({msg:'path not found'})
})


//400 - bad request
app.use((err, req, res, next) => {
    if(err.code === "22P02") res.status(400).send({msg: "bad request"});
    next(err);
})

app.use((err,req,res,next) =>{
    console.log(err)
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }
})
module.exports = app;
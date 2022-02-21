const express = require('express')
const {
    getTopics,
    } = require('./controllers/topics.controllers.js')
const {
    getArticleById,
    patchArticleById,
    } = require('./controllers/articles.controllers')
const app = express();
app.use(express.json());
app.get('/api/topics', getTopics)
app.patch(`/api/articles/:article_id`, patchArticleById)
app.get(`/api/articles/:article_id`, getArticleById);

app.all('/*', (req, res) => {
    res.status(404).send({msg:'path not found'})
})
app.use((err, req, res, next) => {
    if(err.code === "22P02" || err.code === '33502' || err.code === '23502') res.status(400).send({msg: "bad request"});
    next(err);
})
app.use((err,req,res,next) =>{
    if(err.status && err.msg){
        res.status(err.status).send({msg: err.msg})
    }
})


module.exports = app;
//const app = require("../app")
const articles = require('../db/data/test-data/articles.js');
const { fetchTopics } = require('../models/topics.models.js')

exports.getTopics = (req, res, next) => {
    fetchTopics()
    .then((topics) => {
      res.status(200).send({ topics });
    })
    .catch((err) => {
        console.log(err);
    });
};


//const users = require('../db/data/test-data/users.js');
const { fetchUsers } = require('../models/users.models.js')

exports.getUsers = (req, res, next) => {
    fetchUsers()
    .then((users) => {
      res.status(200).send({ users });
    })
    .catch((err) => {
        console.log(err);
    });
};

const {removeCommentById} = require ('../models/comments.models.js')
exports.removeCommentById = (req, res, next) => {
    const { comment_id } = req.params;
    console.log(comment_id, '<=====================')
    removeCommentById(comment_id).then(() => {
        res.status(204).send({});
    })
    .catch(next);
}
const db = require('../db/connection');
exports.removeCommentById = async (comment_id) => {
    return db
        .query(
            `DELETE from comments
            WHERE comment_id = $1 RETURNING *;`,
            [comment_id]
        )
        .then((comment) => {
            const deleted = comment.rows;
            if(!deleted.length)
            return Promise.reject({ status: 404, msg: 'Comment not found'})
        return deleted;
        });
};
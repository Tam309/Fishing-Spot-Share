const express = require('express');
const { query } = require('../helpers/db.js');

const commentRouter = express.Router()

// Get all comments from a post by ID
commentRouter.get('/posts/:post_id/comments', async (req, res) => {
  const id = req.params.post_id;
  try {
    const sql = 'SELECT * FROM comments WHERE post_id=$1'
    const result = await query(sql, [id]);
    const rows = result.rows ? result.rows : [];
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

// *WORK* Create new comment
commentRouter.post("/posts/:post_id/comments", async(req, res) => {
    try {
        const userId = parseInt(req.body.user_id);
        const postId = parseInt(req.params.post_id);
        const commentContent = req.body.comment_content;
        const result = await query('INSERT INTO comments (post_id, user_id, comment_content) VALUES ($1, $2, $3) RETURNING comment_id, post_id, user_id, comment_content',
        [postId, userId, commentContent]);
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ user_name: rows[0].user_name, comment_id : rows[0].comment_id, comment_content: commentContent })
    } catch (error) {
        res.statusMessage = error;
        res.status(500).json({ error : error });
    }
})

// Edit a comment
commentRouter.put('/posts/:post_id/comments/:comment_id', async (req, res) => {
  const comment_id = req.params.comment_id;
  const comment_content = req.body.comment_content;
  try {
      const result = await query('UPDATE comments SET comment_content = $1 WHERE comment_id = $2 RETURNING *', [comment_content, comment_id]);
      res.status(200).json(result.rows[0]);
  } catch (err) {
      res.status(500).json({ message: err.message });
  }
});


// Delete a comment by ID
commentRouter.delete("/posts/:post_id/comments/:comment_id", async(req, res) => {
    const comment_id = Number(req.params.comment_id);
    try {
        const result = await query('DELETE FROM comments WHERE comment_id = $1', [comment_id]);
        res.status(200).json({comment_id: comment_id});
      } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({error: error});
    }
});

module.exports = { commentRouter } 
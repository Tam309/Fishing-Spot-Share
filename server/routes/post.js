const express = require("express");
const { query } = require('../helpers/db');

const postRouter = express.Router();

// Create new post
postRouter.post("/posts/new", async (req, res) => {
    const user_id = parseInt(req.body.user_id);
    const spot_name = req.body.spot_name;
    const location = req.body.location;
    const description = req.body.description;
    const fish_type = req.body.fish_type;
    const imgUrl = req.body.imgUrl;
    try {
        // Insert photo URL
        const photoSql = "INSERT INTO photos (photo_url) VALUES ($1) RETURNING photo_id";
        const photoResult = await query(photoSql, [imgUrl]);
        const photo_id = photoResult.rows[0].photo_id;

        // Insert post with the photo_id
        const postSql = "INSERT INTO posts (user_id, spot_name, location, description, fish_type, photo_id) VALUES ($1, $2, $3, $4, $5, $6) RETURNING post_id, user_id";
        const postResult = await query(postSql, [user_id, spot_name, location, description, fish_type, photo_id]);
        const rows = postResult.rows;

        if (rows.length > 0) {
            res.status(200).json({
                post_id: rows[0].post_id,
                user_id: rows[0].user_id,
                user_name: rows[0].user_name
            });
        } else {
            res.status(400).json({ error: "Failed to create post" });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ err: err.message });
    }
});

// Get all posts
postRouter.get("/", async (req, res) => {
    try {
        const sql = 'SELECT * FROM posts';
        const result = await query(sql);
        const rows = result.rows ? result.rows : [];
        res.status(200).json(rows)
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
})
// Delete post
postRouter.delete("/posts/:post_id", async (req, res) => {
    const post_id = parseInt(req.params.post_id);
    try {
        const sql = 'DELETE FROM posts WHERE post_id = $1';
        const result = await query(sql, [post_id]);
        res.status(200).json({ message: "Post deleted" });
    } catch (error) {
        console.log(error);
        res.statusMessage = error;
        res.status(500).json({ error: error });
    }
})
// Edit post
postRouter.put('/posts/:post_id', async (req, res) => {
    const post_id = Number(req.params.post_id);
    const spot_name  = req.body.spot_name;
    const location = req.body.location;
    const description = req.body.description;
    const fish_type = req.body.fish_type;
    try {
        const result = await query(
        'UPDATE posts SET spot_name =$1, location =$2, description = $3, fish_type = $4 WHERE post_id =$5 RETURNING *', 
        [spot_name, location, description, fish_type, post_id]);
        const rows = result.rows ? result.rows : [];
        res.status(200).json({ 
            post_id: rows[0].post_id, 
            spot_name: rows[0].spot_name, 
            description: rows[0].description,
            saved: rows[0].saved
          })
    } catch (error) {
        console.log( error )
        res.status(500).json({error: error.message});
  }
});
// Delete photo when edit post 
// postRouter.delete('/posts/post_id', async (req,res) => {
//     const post_id = Number(req.params.post_id);
//     try {
//         const photoQuery = 'DELETE FROM photos where photo_id in (SELECT photo_id from posts inner join photos on posts.photo_id = photos.photo_id where post_id = $1 )', [post_id];
//         const query = 'DELETE FROM posts where photo_id = (SELECT photo_id FROM posts where post_id = $1)', [post_id]
//     } catch (error) {
//         console.log(error);
//         res.statusMessage = error;
//         res.status(500).json({error: error});
//     }
// })
module.exports = { postRouter };

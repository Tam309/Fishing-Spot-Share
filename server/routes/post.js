const express = require("express");
const { query } = require("../helpers/db");


const postRouter = express.Router();

// Create new post
postRouter.post("/posts/new", async (req, res) => {
  const user_id = parseInt(req.body.user_id);
  const spot_name = req.body.spot_name;
  const location = req.body.location;
  const description = req.body.description;
  const fish_type = req.body.fish_type;
  const photo_url = req.body.photo_url;
  try {
    const postSql =
      "INSERT INTO posts (user_id, spot_name, location, description, fish_type, photo_url) VALUES ($1, $2, $3, $4, $5, $6) RETURNING post_id, user_id";
    const postResult = await query(postSql, [
      user_id,
      spot_name,
      location,
      description,
      fish_type,
      photo_url,
    ]);
    const rows = postResult.rows;

    if (rows.length > 0) {
      res.status(200).json({
        post_id: rows[0].post_id,
        user_id: rows[0].user_id,
        user_name: rows[0].user_name,
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
    const sql = "select posts.*, users.nick_name, users.avatar from posts join users on posts.user_id = users.user_id";
    const result = await query(sql);
    const rows = result.rows ? result.rows : [];
    res.status(200).json(rows);
  } catch (error) {
    console.log(error);
    res.statusMessage = error;
    res.status(500).json({ error: error });
  }
});
// Delete post
postRouter.delete("/posts/:post_id", async (req, res) => {
  const post_id = parseInt(req.params.post_id);
  try {
    const sql = "DELETE FROM posts WHERE post_id = $1";
    const result = await query(sql, [post_id]);
    res.status(200).json({ message: "Post deleted" });
  } catch (error) {
    console.log(error);
    res.statusMessage = error;
    res.status(500).json({ error: error });
  }
});
//Get photo_url
postRouter.get("/posts/photo/:post_id", async(req, res) => {
  const post_id = Number(req.params.post_id);
  try {
    const result = await query("SELECT photo_url FROM posts WHERE post_id = $1", [post_id]);
    const rows = result.rows ? result.rows : [];
    res.status(200).json(rows[0]);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
})
// Edit post
postRouter.put("/posts/:post_id", async (req, res) => {
  const post_id = Number(req.params.post_id);
  const spot_name = req.body.spot_name;
  const location = req.body.location;
  const description = req.body.description;
  const fish_type = req.body.fish_type;
  const photo_url = req.body.photo_url
  try {
    const result = await query(
      "UPDATE posts SET spot_name =$1, location =$2, description = $3, fish_type = $4, photo_url = $5 WHERE post_id =$6 RETURNING *",
      [spot_name, location, description, fish_type, photo_url, post_id]
    );
    const rows = result.rows ? result.rows : [];
    res.status(200).json({
      post_id: rows[0].post_id,
      spot_name: rows[0].spot_name,
      description: rows[0].description,
      saved: rows[0].saved,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
});
//Get single post based on id

postRouter.get("/posts/:post_id", async (req, res) => {
    const post_id = Number(req.params.post_id);
  
    try {
      // Combine the queries into a single one using a JOIN
      const sql = `
        SELECT posts.*, users.nick_name, users.avatar 
        FROM posts 
        JOIN users ON posts.user_id = users.user_id 
        WHERE posts.post_id = $1`;
  
      // Use the single query to fetch post data and user_name
      const result = await query(sql, [post_id]);
  
      // Check if rows exist
      const rows = result.rows ? result.rows : [];
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Return the result
      res.status(200).json(rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  //Get post based on user_id
postRouter.get("/posts/user/:user_id", async (req, res) => {
    const user_id = Number(req.params.user_id);
  
    try {
      // Combine the queries into a single one using a JOIN
      const sql = `SELECT * FROM posts where user_id=$1`;
  
      // Use the single query to fetch post data and user_name
      const result = await query(sql, [user_id]);
  
      // Check if rows exist
      const rows = result.rows ? result.rows : [];
  
      if (rows.length === 0) {
        return res.status(404).json({ message: "Post not found" });
      }
  
      // Return the result
      res.status(200).json(rows);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  });

  // Get number of posts based on user id
postRouter.get("/posts/user/:user_id/count", async (req, res) => {
    const user_id = Number(req.params.user_id);
    try {
      const sql = `SELECT COUNT(post_id) FROM posts WHERE user_id = $1`;
      const result = await query(sql, [user_id]);
      const rows = result.rows ? result.rows : [];
      res.status(200).json(rows[0]);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }
  }); 
  
module.exports = { postRouter };
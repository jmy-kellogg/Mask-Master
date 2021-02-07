const express = require("express");
const cors = require("cors");
const pool = require("./db");
const app = express();

// middleware
app.use(cors());
app.use(express.json()); // req.body

// routes

// create a mask
app.post("/masks", async (req, res) => {
  try {
    const { name, userUuid } = req.body;
    const newMask = await pool.query(
      "INSERT INTO masks(name, user_uuid) VALUES ($1, $2)RETURNING *",
      [name, userUuid]
    );
    res.json(newMask.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// get all masks
app.get("/masks", async (req, res) => {
  try {
    const { user } = req.query;
    const allMasks = await pool.query(
      `SELECT uuid, name, times_used as "timesUsed", last_used as "lastUsed", user_uuid as "userUuid" FROM masks WHERE ${
        user ? `user_uuid = $1` : ""
      }`,
      [user]
    );
    res.json(allMasks.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// get a mask
app.get("/masks/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const mask = await pool.query(
      `SELECT name, times_used as "timesUsed", last_used as "lastUsed", user_uuid as "userUuid" FROM masks WHERE uuid = $1`,
      [uuid]
    );
    res.json(mask.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// update a mask
app.put("/masks/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    const { name, timesUsed, lastUsed, userUuid } = req.body;
    const mask = await pool.query(
      `UPDATE masks SET name = $2, times_used = $3, last_used = $4, user_uuid = $5 WHERE uuid = $1`,
      [uuid, name, timesUsed, lastUsed, userUuid]
    );
    res.json(mask.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// delete a mask
app.delete("/masks/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    await pool.query("DELETE FROM masks WHERE uuid = $1", [uuid]);
    res.json("Mask was removed");
  } catch (error) {
    console.error(error.message);
  }
});

// get all users
app.get("/users", async (req, res) => {
  try {
    const allMasks = await pool.query(`SELECT * FROM users`);
    res.json(allMasks.rows);
  } catch (error) {
    console.error(error.message);
  }
});

// create user
app.post("/users", async (req, res) => {
  try {
    const { name } = req.body;
    const newPerson = await pool.query(
      "INSERT INTO users (name) VALUES ($1)RETURNING *",
      [name]
    );
    res.json(newPerson.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

// delete user
app.delete("/users/:uuid", async (req, res) => {
  try {
    const { uuid } = req.params;
    await pool.query("DELETE FROM users WHERE uuid = $1", [uuid]);
    await pool.query("DELETE FROM masks WHERE user_uuid = $1", [uuid]);
    res.json("Person was removed");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(5000, () => {
  console.log("server has started on port 5000");
});

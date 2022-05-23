const express = require("express");
const pool = require("./db/client");
require("dotenv").config();
require("./db/client");

const app = express();
const port = process.env.PORT || 3000;
const { body, validationResult } = require('express-validator');

app.use(express.json());

app.get("/", async (req, res) => {
    try {
        const { rows } = await pool.query("SELECT * FROM users");
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.get("/:id", async (req, res) => {
    const { id } = req.params;
    try {
        const { rowCount, rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
        if (!rowCount) return res.status(404).json({error: `Artcile with id of ${id} wasnt found`});
        res.status(200).send(rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/", body("age").isLength({ max: 3 }),

    async (req, res) => {
        // const {first_name} = req.params;
        // const {last_name} = req.params;
        // const {age} = req.params;
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { rows } = await pool.query("INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
                [req.body.first_name, req.body.last_name, req.body.age]);
            res.status(201).send(rows)
        } catch (err) {
            res.status(411).send(err);
        }
    });


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

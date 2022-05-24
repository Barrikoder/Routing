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
        if (!rowCount) return res.status(404).json({ error: `Artcile with id of ${id} wasnt found` });
        res.status(200).send(rows[0]);
    } catch (err) {
        res.status(500).send(err);
    }
});

app.post("/", body("age").isFloat({ min: 0, max: 120 }),
    async (req, res) => {
        const { body: { first_name, last_name, age }
        } = req;
        if (!first_name || !last_name || !age)
            return res.status(400).send({ error: "Type smth!" });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Sad truth: people don't live for so long" });
        }
        try {
            const { rows } = await pool.query("INSERT INTO users (first_name, last_name, age) VALUES ($1, $2, $3) RETURNING *",
                [req.body.first_name, req.body.last_name, req.body.age]);
            res.status(201).send(rows)
        } catch (err) {
            res.status(411).send(err);
        }
    });

app.put("/:id", body("age").isFloat({ min: 0, max: 120 }),
    async (req, res) => {
        const { params: { id }
        } = req;
        if (!id)
            return res.status(404).send({ error: "ID not found!" });
        const { body: { first_name, last_name, age }
        } = req;
        if (!first_name || !last_name || !age)
            return res.status(400).send({ error: "Type smth!" });
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: "Sad truth: people don't live for so long" });
        }
        try {
            const { rows } = await pool.query("UPDATE users SET first_name=$1, last_name=$2, age=$3 WHERE id=$4 RETURNING *",
                [first_name, last_name, age, id]);
            res.status(201).send(rows)
        } catch (err) {
            res.status(411).send(err);
        }
    });

app.delete("/:id", async (req, res) => {
    const { params: { id }
    } = req;
    console.log(req);
    if (!id)
        return res.status(404).send({ error: "ID not found!" });
    try {
        const { rows } = await pool.query("DELETE FROM users WHERE id=$1", [req.params.id]);
        res.status(200).send(rows);
    } catch (err) {
        res.status(500).send(err);
    }
})

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

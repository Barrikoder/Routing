const express = require("express");
const pool = require("./db/client");
require("dotenv").config();
require("./db/client");
const appRouter = require("./routes/appRouter.js")

const app = express();
const port = process.env.PORT || 3000;
const { body, validationResult } = require('express-validator');

app.use(express.json());
app.use("/users", appRouter);
app.use(express.urlencoded({ extended: true }));


app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

const express = require("express");
require("dotenv").config();
require("./db/client");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

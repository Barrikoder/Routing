const express = require("express");
const pool = require("./db/client");
require("dotenv").config();
require("./db/client");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", async (req, res) => {
    try{
    const dbresult = await pool.query("SELECT * FROM users");
    console.log(dbresult);
    }catch(err){
        console.log(err)
    }
});

app.listen(port, () => {
    console.log(`App is listening on port ${port}`);
})

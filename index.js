const express = require("express")
require("dotenv").config()

const app = express()

app.get("/", (req, res) => {
    res.send("TESTE")
})

app.listen(process.env.API_PORT)
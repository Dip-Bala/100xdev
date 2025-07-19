const express = require("express");
const app = express()
const {isOldEnoughMiddleware} = require('./middleware')
app.use(isOldEnoughMiddleware)

app.get("/ride1", (req, res) => {
    res.send(req.msg)
})

app.get("/ride2", (req, res) => { 
    res.send("You can ride")
})

app.listen(3000);
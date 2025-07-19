const express = require("express");
const fs = require("fs");
const path = require("path")
const app = express();

fs.readFile('./files/a.txt', (err, data) => {
    console.log(data.toString())
})
app.get("/files", (req, res) => {
    fs.readdir('./files', (err, files) => {
        console.log(files);
        res.status(200).send(files);
    })
})
app.get("/files/:filename", (req, res) => {
    const name = req.params.filename;
    console.log(path.join('./files', name))
    fs.readFile(path.join('./files', name), (err, data) => {
        if(err){
            res.status(404).send("File not Found");
        }
        else{
            res.status(200).send(data.toString())
        }
    })
})

app.listen(3000);
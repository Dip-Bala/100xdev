const express = require("express");

const app = express();

app.use(function(req, res, next){
    console.log(`method = ${req.method}, host = "${req.hostname}", timestamp = ${new Date()}`)
    next()
})
app.get("/sum", function(req, res) {
    // console.log(req)
    const a = parseInt(req.query.a);
    const b = parseInt(req.query.b);
    console.log(typeof a)
    res.json({
        ans: a + b
    })
});
app.get("/sum/:arg1/:arg2", function(req, res) { //dynamic query parameters
    const a = parseInt(req.params.arg1);
    const b = parseInt(req.params.arg2);
    console.log(typeof a)
    res.json({
        ans: a + b
    })
});

app.get("/multiply", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a * b
    })
});

app.get("/divide", function(req, res) {
    const a = req.query.a;
    const b = req.query.b;
    res.json({
        ans: a / b
    })

});

app.get("/subtract", function(req, res) {
    const a = req.query.a;
    const b = parseInt(req.query.b);
    res.json({
        ans: a - b
    })
});

app.listen(3000);


function isOldEnoughMiddleware(req, res, next){
    const age = req.query.age;
    if(age >= 10){
        req.msg = "welcome"
        next()
    }
    else{
        res.send({
            msg: "Sorry you are not of age yet"
        })
    }
}

module.exports = {
    isOldEnoughMiddleware : isOldEnoughMiddleware
}

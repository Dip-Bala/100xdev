const express = require("express");
const jwt = require("jsonwebtoken")
const app = express();
const JWT_SECRET = "Cofeeeeeee"
app.use(express.json());

const users = []

function generateToken(){
    let token = '';
    let characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let len = characters.length;
    for(let i = 0; i < 10; i++){
        token += characters.charAt(Math.floor(Math.random() * len))
    }
    return token;

}
function userExists(req){
    const user = users.find(user => user.username === req.body.username)
    if(user){
        return user;
    }
    return undefined;
}

function auth(req, res, next){
    const token = req.headers.token;
    if(token){
        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if(err){
                res.send(403).send("Bad Auth")
            }
            else{
                const username = decoded.username;
                const user = users.find(user => user.username === username)
                req.user = user;
                next()
            }
        })
    }
    else res.status(401).send("You are not signed in")
    
}
app.get("/", function(req, res) {
    res.sendFile(__dirname + "/public/index.html")
})
app.post("/signup", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    if(userExists(req)){
        return res.status(400).send("You are already signed up")
    }
    else{
        users.push({
            username: username,
            password: password
        })
        res.status(200).send("ok")
    }
    console.log(users)
})
app.post("/signin", function(req, res){
    const username = req.body.username;
    const password = req.body.password;
    // const user = users.find(user => user.username === username && user.password === password);
    const user = userExists(req);
    if(user){
        const token = jwt.sign({
            username : username
        }, JWT_SECRET);
        // user.token = token;
        console.log(users)
        res.header("jwt", token)
        res.send({token})
    }else{
        res.status(403).send("Invalid user")
    }
})
// Verify token from headers and send username and password
app.get("/me", auth, (req, res) => {
    // const token = req.headers.token;
    // const decodedToken = jwt.verify(token, JWT_SECRET);
    // const username = decodedToken.username;
    // const user = users.find(user => user.username === username);
    const user = req.user
    if(user){
        res.json({
            username: user.username,
            password: user.password
        })
    }
    else{
        res.send("Invalid token")
    }


})
app.listen(3000)
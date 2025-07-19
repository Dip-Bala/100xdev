const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const { z } = require("zod/v4")
const {UserModel, TodoModel} = require("./db")
const app = express()
const secret = "iykyk"

mongoose.connect("mongodb+srv://dipanwitabala02:GYG645JwxwDP2GuW@cluster0.1o4mm2o.mongodb.net/todo-app-database")

app.use(express.json());

function auth(req, res, next){
    const token = req.headers.token;
    const decoded = jwt.verify(token, secret);

    if(decoded){
    //    const user = await mongoose.findOne(decoded.userId);
       req.userId = decoded.userId;
       next()
    }
    else{
        res.status(403).json({
            "message" : "incorrect credentials"
        })
    }

}


app.post("/signup", async(req, res) => {
    const requiredBody = z.object({
        email : z.email(),
        password : z.string().min(4).max(32).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$'), {
            message:
                'Password must be at least 4 characters and contain an uppercase letter, lowercase letter, and number'
        }),
        name: z.string().min(3).max(100)
    })

    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        // res.json("incorrect format")
        res.send(parsedData.error.message)
    }
    const email = req.body.email;
    const password = req.body.password;
    const name = req.body.name;

    // const hashedPassword = bcrypt.hash(password, saltRounds=5, function(err, hash){
    //     console.log(hash)
    // })  or
    // if(typeof email !== "string" || email.length < 5 || !email.includes('@')){
    //     return res.status(403).json({
    //         "message" : "Incorrect Email"
    //     })
    // }
    const hashedPassword = await bcrypt.hash(password, saltRounds=5)
    try{
        await UserModel.create({
            email: email,
            password: hashedPassword,
            name: name,
            timeStamp : new Date()
        })
        res.json("you are signed up")
    }
    catch(e){
        res.status(403).json({
            "message": "Email already signed up"
        })
    }

})

app.post("/signin", async(req, res) => {
    const requiredBody = z.object({
        email : z.email(),
        password : z.string().min(4).max(32).regex(new RegExp('^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{4,}$'), {
            message:
                'Password must be at least 4 characters and contain an uppercase letter, lowercase letter, and number'
        })
    })

    const parsedData = requiredBody.safeParse(req.body);
    if(!parsedData.success){
        res.send(parsedData.error.message)
    }

    const email = req.body.email;
    const password = req.body.password;


    const user = await UserModel.findOne({
        email: email
    })
    if(!user){
        res.json({
            "messsage" : "Email not found"
        })
        return;
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if(passwordMatch){
        const token = jwt.sign({
            userId : user._id  //Harkirat has used toString on  user._id to parse the obj to string, i have not but it's working fine
        }, secret);
        res.json({token: token})
    }
    else{
        res.status(403).json({
            message: "Incorrect password"
        })
    }

})

app.post("/todo", auth, async(req, res) => {
    const userId = req.userId;
    const description = req.body.description;
    const status = req.body.status;
    
    await TodoModel.create({
        userId,
        description,
        status
    })
    res.json({
        userId: userId
    })
})

app.get("/todos", auth, async(req, res) => {
    const userId = req.userId;
    const data = await TodoModel.find({userId : userId});
    
    res.json({
        data 
    })
})

app.listen(3000)
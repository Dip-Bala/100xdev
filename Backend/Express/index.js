const express = require("express");
const app = express();

app.use(express.json());

const users = [{
    name: "John",
    kidneys: [{
        healthy: false
    }]
}]

app.get("/", (req, res) => {       //query is valid for GET req
    const johnKidneys = users[0].kidneys;
    const numberOfKidneys = johnKidneys.length;
    let noOfHealthyKidneys = 0;
    johnKidneys.forEach((el) => {
        if(el.healthy){
            noOfHealthyKidneys++;
        }
    })
    const noOfUnhealthyKidneys = numberOfKidneys - noOfHealthyKidneys;
    console.log(noOfHealthyKidneys)
    console.log(numberOfKidneys);
    console.log(users)
    res.send({
        numberOfKidneys,
        noOfHealthyKidneys,
        noOfUnhealthyKidneys
    })

})

app.post("/", (req, res) => {
    const isHealthy = req.body.isHealthy;
    users[0].kidneys.push({
        healthy: isHealthy
    })
    res.json({
        msg: "Done!"
    })
})
app.put("/", (req, res) => {
    users[0].kidneys.forEach(el => {
        el.healthy = true
    })
    res.json({
        msg: "Done!"
    })
})

// delete all the unhealthy kidneys 
app.delete("/", (req, res) => {   
    if(isThereAtleastOneUnhealthyKidney()){
        const newKidneys = []
        users[0].kidneys.forEach(el => {
            if(el.healthy){
                newKidneys.push({healthy : true})
            }
        })
        users[0].kidneys = newKidneys;
        res.json({
            msg: "Done!"
        })
    }
    else{
        res.status(411).json({
            msg: "No unhealthy kidneys found"
        })
    }

})
function isThereAtleastOneUnhealthyKidney() {
    let atleastOneUnhealthyKidney = false;
    for (let i = 0; i<users[0].kidneys.length; i++) {
        if (!users[0].kidneys[i].healthy) {
            atleastOneUnhealthyKidney = true;
        }
    }
    return atleastOneUnhealthyKidney
}

app.listen(3000);
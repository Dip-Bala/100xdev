const express = require('express')
const app = express()
const port = 3000

const todos = {
  1 : {
    id: 1,
    title: "Eat Lunch"
  }
}
app.get('/get-todo', (req, res) => {
  res.send(todos);
})

app.post('/add-todo', (req, res) => {
  console.log(req.body)
    // todos.push({
    //   id: todos.length + 1,
    //   title: req.body.title
    // })
    res.send("todo added")
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
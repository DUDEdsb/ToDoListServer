const express = require('express')

const app = express()

let todos = []

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.get('/todos', (req, res) =>  {
  res.send(todos)
})

app.post('/todos', (req, res) => {
  todos.push({
    task: req.body.task,
    priority: parseInt(req.body.priority)
  })
  res.send({success: true, message: todos.length})
})

app.get('/todos/:id', (req, res) => {
  res.send(todos[req.params.id])
})

app.put('/todos/:id',(req,res)=>{
  todos[req.params.id] = req.body;
  res.send({ success : true })
})
app.patch('/todos/:id',(req,res)=>{
  if(req.body.task){
    todos[req.params.id].task = req.body.task;
  }
  if(req.body.priority){
    todos[req.params.id].priority = req.body.priority;
  }
  res.send({ success : true })
})
app.delete('/todos/:id',(req,res)=>{
  let tmpArray = todos;
  let ID = parseInt(req.params.id);
  todos = tmpArray.slice(0,ID).concat(tmpArray.slice(ID+1,tmpArray.length));
  res.send({ success:true , message:todos.length })
})

app.listen(8080)

/**
 * /todos -
 *  GET fetch all todos
 *  POST add a new todo
 *
 * /todos/:id -
 *    GET - fetch single todo
 *    PUT - replace a todo
 *    PATCH - update data of a todo
 *    DELETE - delete the todo
 *
 * Appropriate error messages for operations not possible
 * Also send todos array length in response
 *
 * https://gist.github.com/championswimmer/2e3a309b880fdd2a9b12c1c3e0214bda
 */
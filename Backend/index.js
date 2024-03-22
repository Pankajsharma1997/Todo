const express = require('express');
const cors = require('cors');
const TodoModel = require('./models/todoList');

 require("./config"); // import the connection file of Mongodb 

const app = express();

app.use(cors());

app.use(express.json());

// fetch all the data from the database 
app.get('/get', async (req, res) => {
  try {
    const todos = await TodoModel.find();
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}); 


// Add Task to the Database 
app.post('/add', (req, res) => {
const task = req.body.task;
 TodoModel.create({
  task: task
 })
 .then(result =>res.json(result) )
 .catch(err => res.json(err))
})
// Update task fields (including deadline) 
app.post("/updateTodoList/:id", (req, res) => { 
  const id = req.params.id; 
  const updateData = { 
      task: req.body.task, 
 
  }; 
  TodoModel.findByIdAndUpdate(id, updateData) 
      .then((todo) => res.json(todo)) 
      .catch((err) => res.json(err)); 
}); 
 

// Delete task from the database 
app.delete("/deleteTodoList/:id", (req, res) => { 
  const id = req.params.id; 
  TodoModel.findByIdAndDelete({ _id: id }) 
      .then((todo) => res.json(todo)) 
      .catch((err) => res.json(err)); 
});

app.listen(3001, () => {
  console.log(`Server is running on port `,3001); 
});
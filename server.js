const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/profs_task_db');

const Task = sequelize.define('task', {
  name: {
    type: Sequelize.STRING
  },
  complete: {
    type: Sequelize.BOOLEAN,
    defaultValue: false
  }
});

Task.generateRandom = function(){
  return this.create({ name: `Task Number ${ Math.floor(Math.random()*5000)}`});
};

const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use('/dist', express.static(path.join(__dirname, 'dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.delete('/api/tasks/:id', async(req, res, next)=>{
  try {
    const task = await Task.findByPk(req.params.id);
    await task.destroy();
    res.sendStatus(204);
  }
  catch(ex){
    next(ex);
  }
});

app.post('/api/tasks', async(req, res, next)=>{
  try {
    const task = await Task.generateRandom();
    res.send(task);
  }
  catch(ex){
    next(ex);
  }
});

app.put('/api/tasks/:id', async(req, res, next)=>{
  console.log(req.body);
  try {
    const task = await Task.findByPk(req.params.id);
    await task.update({ complete: req.body.complete});
    res.send(task);
  }
  catch(ex){
    next(ex);
  }
});

app.get('/api/tasks', async(req, res, next)=>{
  try {
    setTimeout(async()=> {
      res.send( await Task.findAll());
    }, 250);
  }
  catch(ex){
    next(ex);
  }
});


const init = async()=> {
  try {
    await sequelize.sync({ force: true });
    await Promise.all([
      Task.generateRandom(),
      Task.generateRandom(),
      Task.generateRandom()
    ]);

    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex){
    console.log(ex);
  }
};

init();

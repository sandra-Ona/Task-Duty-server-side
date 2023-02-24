const Tasks = require("../model/tasks")
const asyncWrapper = require("../middleware/async")

//get all tasks
const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Tasks.find();
  res.status(200).json({ numOftasks: tasks.length, tasks });
}
);

//get a single task
const getTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const task = await Tasks.findOne({ _id: taskId })
  if (!task) {
    return res.status(404).json({ msg: `Task with id ${taskId} not found` });
  }
  res.status(200).json({ task })
})


//create task
const createTask = asyncWrapper(async (req, res) => {
  // try{
  const { taskTitle, description, tag } = req.body
  if (!taskTitle || !description || !tag) {
    return res.status(400).json({ msg: 'please provide necessary information' })
  }
  const task = await Tasks.create(req.body);
  res.status(201).json({ msg: 'task created', task })

})


//update task
const updateTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  const task = await Tasks.findByIdAndUpdate({ _id: taskId }, req.body, { new: true, runValidators: true });
  res.status(201).json({ msg: 'task updated', task })
});



//delete task
const deleteTask = asyncWrapper(async (req, res) => {
  const { taskId } = req.params;
  // try{
  const task = await Tasks.findByIdAndDelete({ _id: taskId })
  if (!task) {
    return res.status(404).json({ msg: `Task with id ${taskId} not found` });
  }
  res.status(200).json({ msg: 'deleted' })

});


//export
module.exports = { getAllTasks, getTask, createTask, deleteTask, updateTask };
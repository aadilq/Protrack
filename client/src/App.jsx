import { useState, useEffect } from "react";
import { fetchTasks, createTask, updateTask, deleteTask } from "./api";
import './App.css'



const App = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showform, setShowform] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 3, 
    status: 'To Do', 
    dueDate: '', 
    estimatedTime: ''
  });

  useEffect(() => {
    const getTasks = async () => {
      try {
        setLoading(true);
        const data = await fetchTasks();
        setTasks(data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      } finally {
        setLoading(false);
      }
    };
    
    getTasks();
  }, []);

  const handleChange = (e) =>{
    const{name, value} = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(e) =>{
    e.preventDefault();

  const taskData = {
    ...formData, 
    priority: Number(formData.priority),
    estimatedTime: formData.estimatedTime ? Number(formData.estimatedTime) : undefined
  };

  try{
    //Updating our current task
    if(currentTask){
      const updated = await updateTask(currentTask._id, taskData)
      setTasks(tasks.map(task => task._id === currentTask._id ? updated: task));
    } else{
      const newTask = await createTask(taskData);
      setTasks([newTask, ... tasks])
    }
    resetForm();
  }
  catch(error){
    console.log('Error saving task:', error);
  }
}

const handleDelete = async (id) => {
  if(window.confirm('Are you sure you want to delete this task')){
    try{
      await deleteTask(id) //Call our API to delete
      setTasks(tasks.filter(task => task._id !== id));
    }
    catch(error){
      console.log('Error deleting task:', error)
    }
  }
}

const handleEdit = (task) =>{
  const formattedTask = {...task}
  if(task.dueDate){
    formattedTask.dueDate = new Date(task.dueDate).toISOString().split('T')[0]
  }
  setCurrentTask(task);
  setFormData(formattedTask);
  setShowform(true);
};

const resetForm = () =>{
  setFormData({
    title: '',
    description: '',
    priority: 3,
    status: 'To Do', 
    dueDate: '', 
    estimatedTime: ''
  });
  setCurrentTask(null);
  setShowform(false);
};

const getPriorityClass = (priority) =>{
  return priority == 1 ? 'high-priority': 
  priority == 2 ? 'medium-priority' : 'low-priority'
}

const formatDate = (dateString) =>{
  if(!dateString) return '';
  return new Date(dateString).toLocaleDateString();
};

  return (
    <div className="app">
      <header>
        <h1>Task Master</h1>
        <button onClick={() => setShowform(!showform)}>
          {showform ? 'View Tasks' : 'Add Task'}
        </button>
      </header>

      <main>
        {loading ? (
          <div className="loading">loading tasks...</div>
        ): showform ? (
          <div className="task-form-container">
            <h2>{currentTask ? 'Edit Task' : 'Add Task'}</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="title">Title*</label>
                <input 
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                />
              </div>

              <div className="form-group">
                <label htmlFor="description">Description</label>
                <textarea 
                name="description" 
                id="description"
                value={formData.description || ''}
                onChange={handleChange}
                ></textarea>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="Priority">Priority</label>
                  <select 
                  name="priority" 
                  id="priority"
                  value={formData.priority}
                  onChange={handleChange}
                  >
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="Status"></label>
                  <select 
                  name="select" 
                  id="select"
                  value = {formData.status}
                  onChange = {handleChange}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dueDate">dueDate</label>
                  <input 
                  type="date"
                  id="duedate"
                  name="duedate"
                  value = {formData.dueDate || ''}
                  onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="estimatedTime">Est. Time min</label>
                  <input 
                  type="number"
                  id="estimatedTime"
                  name="estimatedTime"
                  value={formData.estimatedTime || ''}
                  min = "1"
                   />
                </div>
              </div>
              <div className="form-buttons">
                <button type="button" onClick={resetForm}>Cancel</button>
                <button type="submit">{currentTask ? 'Update':'Create'}</button>
              </div>
            </form>
          </div>
        ):(
          <div className="task-list">
            {tasks.length == 0 ? (
              <div className="no-tasks">No tasks found! Create your first task!</div>
            ): (
              tasks.map(task =>{
                <div key={task._id} className={`task-card ${getPriorityClass(task.priority)}`}>
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}

                  <div className="task-details">
                    <span className="status">{task.status}</span>
                    {task.dueDate && <span>Due: {formatDate(task.dueDate)}</span>}
                    {task.estimatedTime && <span>{task.estimatedTime} min</span>}
                  </div>
                  <div className="task-actions">
                    <button onClick={() => handleEdit(task)}>Edit</button>
                    <button onClick={() => handleDelete(task)}>Delete</button>
                  </div>
                </div>
              })
            )}
          </div>
        )}
      </main>
    </div>
  )
}

export default App

// src/App.jsx - With task list updates
import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  // State for form visibility
  const [showForm, setShowForm] = useState(false);
  
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 3,
    status: 'To Do',
    dueDate: '',
    estimatedTime: ''
  });

  const [tasks, setTasks] = useState(() =>{
    const savedTasks = localStorage.getItem('tasks');

    if(savedTasks){
      try {
        return JSON.parse(savedTasks);
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
        return getDefaultTasks();
      }
    }
    else{
      return getDefaultTasks();
    }
  })
  
  const [currentTask, setCurrentTask] = useState(null);

  // State for task list - initialized with sample tasks
  function getDefaultTasks(){
    return[
    { 
      _id: '1', 
      title: 'Sample Task 1',
      description: 'This is a sample task',
      priority: 2,
      status: 'To Do',
      dueDate: '2025-06-01'
    },
    { 
      _id: '2', 
      title: 'Sample Task 2',
      description: 'Another sample task',
      priority: 1,
      status: 'In Progress',
      estimatedTime: 30
    }
  ]
  }

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const toggleView = () => {
    setShowForm(!showForm);

    if (showForm) {
      resetForm();
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      priority: 3,
      status: 'To Do',
      dueDate: '',
      estimatedTime: ''
    });
    setCurrentTask(null);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const taskData = {
      ...formData,
      priority: Number(formData.priority)
    };
    
    if (currentTask) {
      const updatedTask = {
        ...currentTask,
        ...taskData
      };
      
      setTasks(tasks.map(task => 
        task._id === currentTask._id ? updatedTask : task
      ));
      
      console.log("Task updated:", updatedTask);
    } else {
      const newTask = {
        ...taskData,
        _id: Date.now().toString() // Simple ID generation
      };
      
      setTasks([newTask, ...tasks]);
      
      console.log("New task created:", newTask);
    }
    
    resetForm();
    setShowForm(false);
  };

  // Handle task deletion
  const handleDelete = (id) => {
    console.log("Deleting task:", id);
    
    // Confirm before deleting
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task._id !== id));
    }
  };

  const handleEdit = (task) => {
    console.log("Editing task:", task);
    
    setCurrentTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      priority: task.priority,
      status: task.status,
      dueDate: task.dueDate || '',
      estimatedTime: task.estimatedTime || ''
    });
    
    // Show the form
    setShowForm(true);
  };


  const getPriorityClass = (priority) => {
    const numPriority = Number(priority);
    return numPriority === 1 ? 'high-priority' : 
           numPriority === 2 ? 'medium-priority' : 'low-priority';
  };

  // Format date for display
  const formatDate = (dateString) => {
    if (!dateString) return '';
    
    try {
      return new Date(dateString).toLocaleDateString();
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  return (
    <div className="app">
      <header>
        <h1>Task Master</h1>
        <button onClick={toggleView}>
          {showForm ? 'View Tasks' : 'Add Task'}
        </button>
      </header>

      <main>
        {showForm ? (
          <div className="task-form-container">
            <h2>{currentTask ? 'Edit Task' : 'Add New Task'}</h2>
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
                  id="description"
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                ></textarea>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="priority">Priority</label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                  >
                    <option value="1">High</option>
                    <option value="2">Medium</option>
                    <option value="3">Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="status">Status</label>
                  <select
                    id="status"
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                  >
                    <option value="To Do">To Do</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="dueDate">Due Date</label>
                  <input
                    type="date"
                    id="dueDate"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="estimatedTime">Est. Time (min)</label>
                  <input
                    type="number"
                    id="estimatedTime"
                    name="estimatedTime"
                    value={formData.estimatedTime}
                    onChange={handleChange}
                    min="1"
                  />
                </div>
              </div>

              <div className="form-buttons">
                <button type="button" onClick={toggleView}>Cancel</button>
                <button type="submit">
                  {currentTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="task-list">
            {tasks.length === 0 ? (
              <div className="no-tasks">No tasks found. Create your first task!</div>
            ) : (
              tasks.map(task => (
                <div key={task._id} className={`task-card ${getPriorityClass(task.priority)}`}>
                  <h3>{task.title}</h3>
                  {task.description && <p>{task.description}</p>}
                  
                  <div className="task-details">
                    <span className="status">{task.status}</span>
                    {task.dueDate && <span>Due: {formatDate(task.dueDate)}</span>}
                    {task.estimatedTime && <span>{task.estimatedTime} min</span>}
                  </div>
                  
                  <div className="task-actions">
                    <button onClick={() => handleEdit(task)}>
                      Edit
                    </button>
                    <button onClick={() => handleDelete(task._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
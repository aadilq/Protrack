const API_URL = 'http://localhost:5000/api';

export const fetchTasks = async () => {
    const response = await fetch(`${API_URL}/tasks`)
    const data = await response.json();
    return data.data
}

export const fetchPrioritizedTasks = async () => {
    const response = await fetch (`${API_URL}/tasks/prioritized`)
    const data = await response.json();
    return data.data
}

export const fetchTaskRecommendations = async () => {
    const response = await fetch(`${API_URL}/tasks/recommendations`)
    const data = await response.json();
    return data.data
    
}

export const createTask = async (task) => {
    const response = await fetch(`${API_URL}/tasks`, {
        method: 'POST', 
        headers: {'Content-Type': 'applications/json'},
        body: JSON.stringify(task)
    });
    const data = await response.json();
    return data.data
}

export const updateTask = async (id, task) => {
    const response = await fetch(`${API_URL}/tasks/${id}`, {
        method: 'PUT',
        headers: {'Content-Type': 'applications/json'},
        body: JSON.stringify(task)
    })
    const data = await response.json();
    return data.data
}

export const deleteTask = async (id) => {
    await fetch(`${API_URL}/tasks/${id}`, {method: 'DELETE'});
    return true;
}
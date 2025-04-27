const dotenv = require('dotenv');
dotenv.config();
const connectDB = require('./config/db');
connectDB();

const tasks = require('./routes/tasks');

const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;



app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) =>{
    console.log('Test Endpoint hit!')
    res.json({message: 'Backend is working!'});
});

app.use('/api/tasks', tasks);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
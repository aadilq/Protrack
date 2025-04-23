const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.get('/api/test', (req, res) =>{
    res.json({message: 'Backend is working!'});
});

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
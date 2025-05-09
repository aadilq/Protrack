
# ProTrack

ProTrack is my unique take on a Task Management System utilizes React19 and TailwindCSS for the Client side and Node and Express for the Server side with MongoDB for storing the tasks. ProTrack allows users to set and delete tasks as they need. With each task that they are able to create, the user is presented with the following options:

Title: Add a title to their task

Description: Add any information as to what task they must complete 

Priority: Low, Medium, High (Based off how important the task is and how soon
they need to complete it by)

Status: To do, In Progress, Done

Due Date: Adding the date in which they need to complete the task by

Est. Time (min): Duration of the task

----------
----------
----------
----------
Integrating a database like MongoDB had allowed for efficient retrieval of data from the storage. Once I had created and configured my Express server with the required dependencies, I had connected it to a MongoDB Atlas database using Mongoose. 



## Tech Stack

**Client:** React.JS, TailwindCSS

**Server:** Node, Express, MongoDB


## Demo


https://github.com/user-attachments/assets/ea03841b-b9af-4554-beec-2cfbdef18647



## Color Reference

| Color             | Hex                                                                |
| ----------------- | ------------------------------------------------------------------ |
| button background-color| #4a6fa5
| button:hover | #3a5b8c
| Tasks with high-priority | #e53935
| Tasks with medium-priority | #f9a825
| Tasks with low-priority | #43a047




## Environment Variables

To run this project, you will need to add the following environment variables to your .env file. Configure .env file and Add your MongoDB connection string and port number.

`PORT = PORT_NUMBER`


`MONGO_URI= MongoDB_CONNECTION_STRING
`






const Task = require('../models/Task');

/*
Task Priority will be determined by a cumulative score which
will be based off multiple factors

Higher Score = Higher Priority
*/

const calculatePriorityScore = (task) =>{
    let score = 0;
    const todayDate = new Date(); // representing the current date and time

    /*
    First Factor will be based off the priority given by the user
    -------------------------------------------------------------
        - user gives a priority of 3 (Lowest Priority)
            - Score += (4 - 3) * 20
                - Score = 20
        
        - user gives a priority of 2 (Medium Priority)
            - Score += (4 - 2) * 20
                - Score = 40

        - user gives a priority of 1 (High Priority)
            - Score += (4 - 1) * 20
                - Score = 60
    */ 

    //Second Factor will be based off how close the due Date is
    score += (4 - task.priority) * 20;
    if(task.dueDate){
        const dueDate = new Date(task.dueDate)
        const daysUntilDue = Math.max(0, Math.floor(dueDate - todayDate) / (1000 * 60 * 60 * 24)) //Subtracts the dueDate from today's date, resulting in the milliseconds that exists between them

        //Case where the task is due today
        if(daysUntilDue === 0){
            score += 50;
        } 
        //Case where the task is due tomorrow
        else if(daysUntilDue <= 1){
            score += 40;
        }
        //Case where the task is due within 3 days
        else if(daysUntilDue <= 3){
            score += 30;
        }
        //Case where the task is due within a week
        else if(daysUntilDue <= 7){
            score += 15;
        }
        //Case where the task is due within two weeks
        else if(daysUntilDue <= 14){
            score += 5;
        }
        if(dueDate <= todayDate){
            score += 60;
        }
    }

    //Third Factor will be based off of the current status that the user gives
    if(task.status == 'To Do'){
        score += 10
    }
    else if(task.status == 'In Progress'){
        score += 5
    }

    //Fourth Factor will be based off Estimated Time to complete the task(Idea is to do tasks that will lesser time)
    if(task.estimatedTime){
        if(task.estimatedTime < 30){
            score += 10
        }
        else if(task.estimatedTime < 60){
            score += 5
        }
    }
    return score;
}


exports.getPrioritizedTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        const tasksWithScore = tasks.map(task => {
            const taskObj = task.toObject();
            taskObj.priorityScore = calculatePriorityScore(taskObj);
            return taskObj
        });
        const sortedTasks = tasksWithScore.sort((a, b) => b.priorityScore - a.priorityScore);

        res.status(200).json({
            success: true,
            count: sortedTasks.length,
            data: sortedTasks
        });
    } catch (error) {
        res.status(500).json({
            success: false, 
            error: 'Server Error'
        })
    }
}

exports.getTaskRecommendations = async (req, res) => {
    try {
        const tasks = await Task.find();

        const tasksWithScores = tasks.map(task => {
            const taskObj = task.toObject();
            taskObj.priorityScore = calculatePriorityScore(taskObj);
            return taskObj;
        });

        const sortedTasks = tasksWithScores.sort((a, b) => b.priorityScore - a.priorityScore);

        //We want to return the top 3 tasks
        const recommendations = sortedTasks.slice(0, 3);

        res.status(200).json({
            success: true,
            count: recommendations.length,
            data: recommendations
        })
    } catch (error) {
        res.status(500).json({
            success: true, 
            error: 'Server Error'
        })
    }
    
}

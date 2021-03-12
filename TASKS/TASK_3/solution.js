
function calcPercent(toDoList) {
    return function(doneWork) {
        return (100 * doneWork ) / toDoList
    };
}

const toDoList = 50
const doneWork = 25

const toDoListOne = calcPercent(toDoList);

console.log(toDoListOne(doneWork)); 

// The calcPercent() function takes in the total number of tasks.
// It then returns a function that takes in the number of tasks done.
// That function returns the percentage of tasks done compared to the tasks list.
//The ToDoList variable will set the total number of tasks to 50.
// Then when we console.log the results of toDoListOne(doneWork), it will console log 50 which is the percentage of tasks done.
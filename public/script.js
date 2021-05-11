let taskArray = [];

$("#submit-button").on("click", function(){
    let newTask = $("#task").val();
    taskArray.push(newTask);
    console.log(taskArray)
    renderTasks(taskArray);
})

function renderTasks(taskArray) {
    $("#tasks-container").empty();

    taskArray.forEach(element => {
        const newContainer = $("<div>").attr("class", "spell-box");
    
        const taskName = $("<h2>").text(element);
        newContainer.append(taskName);
    
        $("#tasks-container").append(newContainer);
    });
}
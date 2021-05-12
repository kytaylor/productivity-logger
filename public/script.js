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
        const newContainer = $("<div>").attr("class", "task-card");
    
        const taskName = $("<h2>").text(element);
        newContainer.append(taskName);

        const time = $("<h2>").text("00:00:00");
        newContainer.append(time);

        const saveButton = $("<button>").attr("class", "save-button button");
        saveButton.text("Save");
        newContainer.append(saveButton);
    
        $("#tasks-container").append(newContainer);
    });
}

// Timer
const timer = document.getElementById("timer-time");

var hr = 0;
var min = 0;
var sec = 0;
var stoptime = true;

$("#timer-start").on("click", function(){
    if (stoptime === true) {
        stoptime = false;
        timerCycle();
    }
})

$("#timer-stop").on("click", function(){
    if (stoptime === false) {
        stoptime = true;
      }
})

function timerCycle() {
    if (stoptime === false) {
    sec = parseInt(sec);
    min = parseInt(min);
    hr = parseInt(hr);

    sec = sec + 1;

    if (sec === 60) {
      min = min + 1;
      sec = 0;
    }
    if (min === 60) {
      hr = hr + 1;
      min = 0;
      sec = 0;
    }

    if (sec < 10 || sec === 0) {
      sec = "0" + sec;
    }
    if (min < 10 || min === 0) {
      min = "0" + min;
    }
    if (hr < 10 || hr === 0) {
      hr = "0" + hr;
    }

    timer.innerHTML = hr + ":" + min + ":" + sec;

    setTimeout("timerCycle()", 1000);
  }
}

$("#timer-reset").on("click", function(){
    timer.innerHTML = "00:00:00";
    stoptime = true;
    hr = 0;
    sec = 0;
    min = 0;
})
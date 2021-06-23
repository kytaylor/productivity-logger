// Code for finding current date
let today = new Date();
let dd = String(today.getDate()).padStart(2, "0");
let mm = String(today.getMonth() + 1).padStart(2, "0");
let yyyy = today.getFullYear();

today = mm + "/" + dd + "/" + yyyy;
$("#date").append(today)

let taskArray = [];

$("#submit-button").on("click", function(){
    let newTask = $("#task").val();
    taskArray.push(newTask);
    console.log(taskArray)
    renderTask(newTask)
    document.getElementById("task").value = "";
})

function renderTask(newTask) {
  const newContainer = $("<div>").attr("class", "task-card");
  
  const taskName = $("<h2>").text(newTask);
  newContainer.append(taskName);

  const time = $("<h2>").text("00:00:00").attr("class", "saved-time").attr("id", newTask);
  newContainer.append(time);

  const saveButton = $("<button>").attr("class", "save-button button");
  saveButton.text("Save");
  newContainer.append(saveButton);
  
  $("#tasks-container").append(newContainer);
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

// Save button

$(document).on("click", ".save-button", function(e) {
  e.preventDefault();

  const id = $(this).parent().find(".saved-time").attr("id");

  let currentTimer = document.querySelector("#" + id).innerHTML;

  const currentTimerArr = currentTimer.split(":");

  const currentSec = parseInt(currentTimerArr[2]);
  const currentMin = parseInt(currentTimerArr[1]);
  const currentHr = parseInt(currentTimerArr[0]);

  const newTimerArr = timer.innerHTML.split(":");

  const newSec = parseInt(newTimerArr[2]);
  const newMin = parseInt(newTimerArr[1]);
  const newHr = parseInt(newTimerArr[0]);

  let finalSec = currentSec + newSec;
  let finalMin = currentMin + newMin;
  let finalHr = currentHr + newHr;

  if (finalSec >= 60) {
    finalSec = finalSec - 60;
    finalMin = finalMin + 1;
  }

  if (finalMin >= 60) {
    finalMin = finalMin - 60;
    finalHr = finalHr + 1;
  }

  if (finalSec < 10 || finalSec === 0) {
    finalSec = "0" + finalSec;
  }
  if (finalMin < 10 || finalMin === 0) {
    finalMin = "0" + finalMin;
  }
  if (finalHr < 10 || finalHr === 0) {
    finalHr = "0" + finalHr;
  }

  const finalTime = finalHr + ":" + finalMin + ":" + finalSec;

  console.log(finalTime)

  document.querySelector("#" + id).innerHTML = finalTime;
});

// Save all button
$("#save-all").on("click", function(e){
  e.preventDefault();
  console.log("All tasks: " + taskArray);

  for (let i = 0; i < taskArray.length; i++) {
    const element = taskArray[i];
    console.log(element)

    const data = {
      taskName: element,
      time: document.querySelector("#" + element).innerHTML
    }
    console.log(data)

    fetch("/api/tasks", {
      method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => response.json())
        .catch((error) => {
          console.error("Error:", error);
        });
  }

  // const data = {
  //   username: usernameSignUp,
  //   password: passwordSignUp
  // }

  // fetch("/api/tasks", {
  //   method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify(newReservation),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data) {
  //         // If a table is available... tell user they are booked.

  //         alert('Yay! You are officially booked!');
  //       } else {
  //         // Otherwise, tell the  user they are on the wait list

  //         alert('Sorry you are on the wait list');

  //         // Clear the form
  //         document.getElementById('reserve-name').value = '';
  //         document.getElementById('reserve-phone').value = '';
  //         document.getElementById('reserve-email').value = '';
  //         document.getElementById('reserve-unique-id').value = '';
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });
})
// Selectors
var currentDayEl = $("#currentDay");

// Create time block object
var timeBlocks = {
  9: "",
  10: "",
  11: "",
  12: "",
  13: "",
  14: "",
  15: "",
  16: "",
  17: "",
};

const hours = [
  "9am",
  "10am",
  "11am",
  "12am",
  "1pm",
  "2pm",
  "3pm",
  "4pm",
  "5pm",
];
const militaryTimeId = ["9", "10", "11", "12", "13", "14", "15", "16", "17"];
const timeContainer = $(".container-fluid");

// Load elements
var loadElements = function () {
  for (let i = 0; i < hours.length; i++) {
    let createRow = $("<div class='row time-block'>").attr(
      "id",
      militaryTimeId[i]
    );
    let createHour = $("<div class='hour col-1'>");
    let createTextField = $("<textarea class='col-10'>");
    createTextField.attr("id", militaryTimeId[i]);

    let createBtn = $(
      "<button type='button' class='saveBtn col-1 far fa-save'>"
    );

    timeContainer.append(createRow);
    createHour.text(hours[i]);
    createRow.append(createHour);
    createRow.append(createTextField);
    createBtn.text();
    createRow.append(createBtn);
  }
};

// Set the current time in hero
var currentDate = moment();

// Update datetime every second
var updateDate = function () {
  currentDate = moment();
  currentDayEl
    .text(currentDate.format("dddd, MMMM Do"))
    .css({ fontWeight: "bold", fontSize: "1.5rem" });
};

// Run time interval
var setDate = setInterval(() => {
  var timeBlockArray = $(".time-block");
  updateDate();
  timeBlockArray.each(function () {
    determineTimeFormat($(this));
  });
}, 1000);

// Determine past, present, or future
var determineTimeFormat = function (timeBlock) {
  let currentHour = parseInt(currentDate.format("H"));
  let idHrNum = parseInt(timeBlock.attr("id"));

  if (idHrNum === currentHour) {
    // Current block hour
    timeBlock.css("background-color", "red");
  } else if (idHrNum < currentHour) {
    // Before current block hour
    timeBlock.css("background-color", "lightgrey");
  } else {
    // After current block hour
    timeBlock.css("background-color", "green");
  }
};

// Update textarea inputs from localstorage
var updateTextArea = function () {
  let timeBlockTextEl = $(".time-block").children("textarea");

  timeBlockTextEl.each(function () {
    let id = $(this).attr("id");
    $(this).val(timeBlocks[id]);
  });
};

// Get time block text values from local storage
var getLocalStorage = function () {
  var timeBlocksLocal = localStorage.getItem("timeBlocks");
  if (timeBlocksLocal !== null) {
    timeBlocks = JSON.parse(timeBlocksLocal);
  } else {
    return;
  }
};

// Set time blocks in local storage
var setLocalStorage = function (saveBtn) {
  let textArea = saveBtn.parent().children("textarea");
  let textAreaId = textArea.attr("id");
  timeBlocks[textAreaId] = textArea.val();
  localStorage.setItem("timeBlocks", JSON.stringify(timeBlocks));
};

// Run init at start
var init = function () {
  loadElements();
  var timeBlockArray = $(".time-block");
  updateDate();
  getLocalStorage();
  updateTextArea();
  timeBlockArray.each(function () {
    determineTimeFormat($(this));
  });
};

init();

// Event Listeners
timeContainer.on("click", ".saveBtn", function () {
  setLocalStorage($(this));
});

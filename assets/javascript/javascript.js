var config = {
  apiKey: "AIzaSyAd8WgJp-oBtnbIlhjrcBpX2XH9W4gOUdE",
  authDomain: "rps-game-ed451.firebaseapp.com",
  databaseURL: "https://rps-game-ed451.firebaseio.com",
  projectId: "rps-game-ed451",
  storageBucket: "rps-game-ed451.appspot.com",
  messagingSenderId: "93497828950"
};
firebase.initializeApp(config);

var firebase = firebase.database();

var trainName = "";
var destination = "";
var initialArrivalTime = "";
var frequency = 0;
var currentTime = moment();
var trainID = [];
var index = 0;

var datetime = null;
date = null;

var update = function(){
  date = moment(new Date())
  datetime.html(date.format("dddd, MMMM Do YYYY, h:mm:ss a"));
};

$(document).ready(function(){
  datetime = $("#current-status")
  update();
  setInterval(update, 1000);
});

$("#new-train").on("click", function(){

  trainName = $("#nameInput").val().trim();
  destination = $("#destinationInput").val().trim();
  initialArrivalTimeName = $("#timeInput").val().trim();
  frequency = $("#frequencyInput").val().trim();


  var arrivalConverted = moment(initialArrivalTime, "hh:mm").subtract(1, "years");
  console.log("FTC: " + arrivalConverted);

  var timeDifference = moment().diff(moment(arrivalConverted), "minutes");
  console.log("Difference in time: " + timeDifference);

  var timeRemainder = timeDifference % frequency;
  console.log(tRemainder);


  var minutesAway = frequency - timeRemainder;
  console.log("Minutes away: " + minutesAway);


  var nextTrain = moment().add(minutesAway, "minutes");
  console.log("Arrival time: " + moment(nextTrain).format("hh:mm"));


  var nextArrival = moment(nextTrain).format("hh:mm a");

  var nextArrivalUpdate = function() {
    date = moment(new Date())
    datetime.html(date.format('hh:mm a'));
  }

  database.ref().push({
    trainName: trainName,
    destination: destination,
    initialArrivalTime: initalArrivalTime,
    frequency: frequency,
    minutesAway: minutesAway,
    nextArrival: nextArrival,
    dateAdded: firebase.database.ServerValue.TIMESTAMP
  });

  return false;
});

database.ref().orderByChild("dateAdded").limitToLast(25).on("child_added", function(snapshot) {

  console.log("Train name: " + snapshot.val().trainName);
  console.log("Destination: " + snapshot.val().destination);
  console.log("First train: " + snapshot.val().firstTrainTime);
  console.log("Frequency: " + snapshot.val().frequency);
  console.log("Next train: " + snapshot.val().nextArrival);
  console.log("Minutes away: " + snapshot.val().minutesAway);
  console.log("-------------------------------");

  $("#new-train").append("<tr><td>" + snapshot.val().trainName + "</td>" +
    "<td>" + snapshot.val().destination + "</td>" + 
    "<td>" + "Every " + snapshot.val().frequency + " mins" + "</td>" + 
    "<td>" + snapshot.val().nextArrival + "</td>" +
    "<td>" + snapshot.val().minutesAway + " mins until arrival" + "</td>" +
    "</td></tr>");

  index++;

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

database.ref().once('value', function(dataSnapshot){ 
  var trainIndex = 0;
    dataSnapshot.forEach(
      function(childSnapshot) {
        trainIDs[trainIndex++] = childSnapshot.key();
      }
    );
});

console.log(trainIDs);
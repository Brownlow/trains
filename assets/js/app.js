
// Initialize Firebase
var config = {
  apiKey: "AIzaSyCR1W6qzUR8KjhTKGvxaX56wDilKEYp4pQ",
  authDomain: "trains-12ed0.firebaseapp.com",
  databaseURL: "https://trains-12ed0.firebaseio.com",
  projectId: "trains-12ed0",
  storageBucket: "trains-12ed0.appspot.com",
  messagingSenderId: "204796976377"
};

firebase.initializeApp(config);

var database = firebase.database();




// Clock event form -- set vars for input values -- append new info to the page
$('#addTrain').on('click', function(event){

	event.preventDefault();

	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();

	var newTrain = {
		name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency, frequency
	}

	// Change what is saved in firebase
    database.ref().push(newTrain);

    // empty form fields
    $('#trainName').val('');
    $('#destination').val('');
    $('#firstTrain').val('');
    $('#frequency').val('');

});

database.ref().on("child_added", function(childSnapshot, prevChildKey) {

	// Create variables so its easier to use the data
	var trainName = childSnapshot.val().name;
	var trainDest = childSnapshot.val().destination;
	var firstTrain = childSnapshot.val().firstTrain;
	var trainFreq = childSnapshot.val().frequency;


  // First Time (pushed back 1 year to make sure it comes before current time)
  var firstTimeConverted = moment(firstTrain, "hh:mm").subtract(1, "years");
  console.log(firstTimeConverted);

  // Current Time
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

  // Difference between the times
  var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
  console.log("DIFFERENCE IN TIME: " + diffTime);

  // Time apart (remainder)
  var tRemainder = diffTime % trainFreq;
  console.log(tRemainder);

  // Minute Until Train
  var tMinutesTillTrain = trainFreq - tRemainder;
  console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

  // Next Train
  var nextTrain = moment().add(tMinutesTillTrain, "minutes").format("hh:mm");
  console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

  // Change the HTML to add the data from firebase
  $('tbody').append('<tr><td>' + trainName +'</td>' + '<td>' + trainDest +'</td>' + '<td>' + trainFreq +'</td>' + '<td>' + nextTrain +'</td>' + '<td>' + tMinutesTillTrain +'</td></tr>');

    // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });



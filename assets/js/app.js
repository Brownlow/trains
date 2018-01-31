
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

	var newTrain = $('<tr id="train"></tr>');
	$('#row').append(newTrain);



	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = $('#firstTrain').val().trim();
	var frequency = $('#frequency').val().trim();


	// Change what is saved in firebase
      database.ref().push({
        name: trainName,
        destination: destination,
        firstTrain: firstTrain,
        frequency, frequency
      });
    


	// $('#name-display').append(trainName);
	// $('#destination-display').append(destination);
	// $('#first-display').append(firstTrain);
	// $('#next-display').append(frequency);

});

database.ref().on("value", function(snapshot) {

      // Print the initial data to the console.
      console.log(snapshot.val());

      // Log the value of the various properties
      console.log(snapshot.val().name);
      console.log(snapshot.val().destination);
      console.log(snapshot.val().firstTrain);
      console.log(snapshot.val().frequency);

      // Change the HTML
      //$("#row").text(snapshot.val().name + " | " + snapshot.val().destination + " | " + snapshot.val().firstTrain + " | " + snapshot.val().frequency);
      $("#row").append('<td id="name-display">');
      $("#row").append('<td id="destination-display">');
      $("#row").append('<td id="first-display">');
      $("#row").append('<td id="frequency-display">');
      $('#name-display').text(snapshot.val().name);
      $('#destination-display').text(snapshot.val().destination);
      $('#first-display').text(snapshot.val().firstTrain);
      $('#frequency-display').text(snapshot.val().frequency);

      // If any errors are experienced, log them to console.
    }, function(errorObject) {
      console.log("The read failed: " + errorObject.code);
    });


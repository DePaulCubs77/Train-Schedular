$(document).ready(function() {

    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCHOMRnKqpAVau2ObwPQsmjFX-ovxGhMIY",
        authDomain: "train-schedular.firebaseapp.com",
        databaseURL: "https://train-schedular.firebaseio.com",
        storageBucket: "train-schedular.appspot.com",
        messagingSenderId: "825477907056"
    };

    firebase.initializeApp(config);

    var database = firebase.database();

    // Variables
    var trainName = '';
    var destination = '';
    var firstTrain = '';
    var nextTrain = '';
    var frequency = '';
    var minutesAway = '';

    // Input
    $('#form-train').on('submit', function() {
        trainName = $('#name-input').val().trim();
        console.log(trainName);
        destination = $('#destination-input').val().trim();
        console.log(destinaton);
        firstTrain = $('#first-input').val().trim();
        console.log(firstTrain);
        frequency = $('#frequency-input').val().trim();
        console.log(frequency);

        database.ref().push({
            trainName: trainName,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency

        });

        return false;
    });

    // Here I will get my data from the firebase and show on my web page
    database.ref().on('child_added', function(snapshot) {
        var trains = snapshot.val();
        var timeFrequency = snapshot.val().frequency;
        printTrain(trains);

    });


    // Time converted to military time
    var firstTrainConverted = moment(firstTrain, "HH:mm").subtract(1, "year");
    var nextTrainConverted = moment(nextTrain).format("HH:mm");
    console.log(firstTrainConverted);

    // Current Time
    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));

    // Difference between the first train and the time
    var differenceInTime = moment().diff(moment(trainFirstConverted), "minutes");
    console.log("Difference in Time" + differenceInTime);

    // Time apart (remainder)
    var timeTillNextTrain = differenceInTime % timeFrequency;

    // Minutes until the next train
    var minutesTillTrain = timeFrequency - timeTillNextTrain;

    // Next Train
    var upcomingTrain = moment().add(minutesTillTrain, "minutes");

    $('#train-table').append('<tr class="train-row">' +
        '<td class= "train-name">' + trainName + '</td>' +
        '<td class="train-destination">' + destination + '</td>' +
        '<td class="frequency">' + frequency + '</td>' +
        '<td class="next-train>' + nextTrainConverted + '</td>' +
        '<td class="train-minutesaway">' + minutesTillTrain + '</td>' + '</tr>');




});
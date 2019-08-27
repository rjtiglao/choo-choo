const firebaseConfig = {
    // apiKey: "AIzaSyDYwYYfBVHmNXtHEob-BKCVtuhba8kvpvQ",
    // authDomain: "train-schedu-83131.firebaseapp.com",
    // databaseURL: "https://train-schedu-83131.firebaseio.com",
    // projectId: "train-schedu-83131",
    // storageBucket: "https://train-schedu-83131.firebaseio.com/",
    // messagingSenderId: "489327113631",
    // appId: "1:489327113631:web:3663169b7fca74d4"
};
firebase.initializeApp(firebaseConfig);
let database = firebase.database();


$("#add-train-btn").on("click", function () {
    event.preventDefault();
    let trainName = $("#train-name-input").val().trim();
    let destination = $("#destination-input").val().trim();
    let startTime = $("#start-input").val().trim();
    let freq = $("#frequency-input").val().trim();
    console.log(trainName)  


    
  
    console.log(startTime)
    let trainInfo = {
        name: trainName,
        destination: destination,
        start: startTime,
        frequency: freq
    };


    database.ref().push(trainInfo);


    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#start-input").val("");
    $("#frequency-input").val("");

});

database.ref().on("child_added", function(snapshot){
    console.log(snapshot);
    let trainName = snapshot.val().name;
    let destination=snapshot.val().destination;
    let startTime= snapshot.val().start;
    let frequency=snapshot.val().frequency;

    let firstTime= moment(startTime,"HH:mm");
    console.log(firstTime);
    let currentTime = moment();
    let minuteForArrival = currentTime.diff(firstTime, "minutes");
    let remainder = minuteForArrival % frequency;
    let arrivalOfNext= frequency - remainder;

    let nextArrival = currentTime.add(arrivalOfNext, "minutes");
    let ariveTime = nextArrival.format("HH:mm")

    

    let tableInfo = $("<tr>").append(
        $("<td>").text(trainName),
        $("<td>").text(destination),
        $("<td>").text(frequency),
        $("<td>").text(ariveTime),
        $("<td>").text(arrivalOfNext),
    )
    $("#train-table").append(tableInfo);
});

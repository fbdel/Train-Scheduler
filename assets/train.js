
// Initialize Firebase
var config = {
    apiKey: "AIzaSyAzwhgJjil9-kxBJUBqg9zibm8lu4sBjJA",
    authDomain: "trainscheduledata-efc86.firebaseapp.com",
    databaseURL: "https://trainscheduledata-efc86.firebaseio.com",
    projectId: "trainscheduledata-efc86",
    storageBucket: "trainscheduledata-efc86.appspot.com",
    messagingSenderId: "750213120303"
};
firebase.initializeApp(config);


var database = firebase.database();

var name = "";
var destin= "";
var start = "";
var rate = "";
var nextTime = "";
var minsAway = "";


// function findNexTime() {

//     nextTime = moment().add(rate, "minutes").format("h:mm A");
//     console.log(nextTime);
    

    // while ((nextTime.diff(start,"minutes")) <= 0) {
    //     nextTime = nextTime.add(rate,"minites").format("h:mm A");
    // };
    // console.log(nextTime);

// }

$("#submit").on("click", function(event) {
    event.preventDefault();

    // Grabbed values from text boxes
    name = $("#name-input").val().trim();
    destin = $("#destin-input").val().trim();
    start= $("#start-input").val().trim();
    rate = $("#rate-input").val().trim();



    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(start, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % rate;
    console.log(tRemainder);
    
    //Minutes minus remainder  
    var tMinutesTillTrain = rate - tRemainder;

    // Minute Until Train
    minsAway =rate - tRemainder;

    // Next Train
    nextTime = moment().add(tMinutesTillTrain, "minutes");
    nextTime = moment(nextTime).format("hh:mm a");

    // minsAway = nextTime.diff(start, 'minutes').format("h:mm A");
    console.log(minsAway);

    // Code for handling the push
    database.ref().push({
      name: name,
      destin: destin,
      start: start,
      rate: rate,
      nextTime: nextTime,
      minsAway: minsAway,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
});


database.ref().on("child_added", function(childSnapshot) {
    // storing the snapshot.val() in a variable for convenience
    var sv = childSnapshot.val();

    // Console.loging the last user's data
    // console.log(sv.name);
    // console.log(sv.destin);
    // console.log(sv.rate);
    // console.log(sv.nextTime);
    // console.log(sv.minsAway);
    


    $("tbody").append("<tr><td>"+ sv.name +"</td><td>"+ sv.destin+ "</td><td>" + sv.rate+ "</td><td>"+ sv.nextTime+"</td><td>"+ sv.minsAway+ "mins away"+ "</td></tr>");


    // Handle the errors
  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });

  function refreshOutput () {
    $("tbody").append("<tr><td>"+ sv.name +"</td><td>"+ sv.destin+ "</td><td>" + sv.rate+ "</td><td>"+ sv.nextTime+"</td><td>"+ sv.minsAway+ " mins away"+ "</td></tr>");
  }
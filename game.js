var buttonColours = ["red", "blue", "green", "yellow"];
var gamepattern = [];
var userClickedPattern = [];
var level = 0;
var started = false;

//playing sound when button is clicked or when sequence is displayed.

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

//adding and displaying new colour after each level.

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").html("Level " + level);
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamepattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);
}

//start or restart the  game.
$(document).keydown(function(){
  if(!started){
    level = 0;
    gamepattern = [];
    nextSequence();
    started = true;
  }
});

//listening for user clicked button and responding accordingly.

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    // console.log(userChosenColour);
    userClickedPattern.push(userChosenColour);
    $("#" + userChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(userChosenColour);
    checkAnswer(userClickedPattern.length - 1);
  });

//checking for correctness of user pattern and responding accordingly.

function checkAnswer(currentIndex){
  if(userClickedPattern[currentIndex] === gamepattern[currentIndex] ){
    console.log("success");
    if(userClickedPattern.length === gamepattern.length){
      setTimeout(nextSequence, 1000);
    }
  }
  else{
    console.log("failure");
    started = false;
    $("body").addClass("game-over");
    setTimeout(() => $("body").removeClass("game-over"), 200);
    playSound("wrong");
    $("h1").html("Game over.Press any key to restart!")
  }
}

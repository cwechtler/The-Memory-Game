
var startButton = $("#start");

var buttonColors = ["red", "blue", "green", "yellow"];
var gamePatern = [];
var userChosenColor = [];

var level = 0;
var j = 0;
var sNum = 0;

var start = false;
var sequenceComplete = false;
var gameOver = false;

$(".btn").click(function() {
  if(sequenceComplete && !gameOver){
    userChosenColor.push(this.id);
    handleClick(this.id);
    checkAnswer();
  }
});

startButton.click(function(){
  if(!start){
    gameOver = false;
    startButton.removeClass("notpressed").addClass("pressed");
    nextSequence();
    start = true;
  }
});

function checkAnswer(){
  if (userChosenColor[sNum] === gamePatern[sNum]){
    $("#level-title").text("#" + (sNum +1 ) + " Correct! Level: " + level);
    if(userChosenColor.length === gamePatern.length){
      sequenceComplete = false;
      sNum = 0;
      setTimeout(function() {nextSequence();}, 500);
      return;
    }
    sNum++;
    console.log("Correct" + sNum);
  }
  else{
    gameOver = true;
    $("#level-title").text("#" + (sNum + 1) + " Was wrong: GameOver! Highest Level: " + level);
    reset();
    console.log("Wrong" + sNum);
  }
}

function nextSequence(){
  if(userChosenColor.length > 0){
      userChosenColor = [];
  }
  j = 0;
  addToGamePatern();
  theLoop(gamePatern.length +1);
  level++;
  levelCounter();
  sequenceComplete = true;
}

function reset(){
  startButton.removeClass("pressed").addClass("notpressed");
  gamePatern = [];
  start = false;
  level = 0;
}

function addToGamePatern(){
  var randomChosenColor = buttonColors[randomNumber()];
  gamePatern.push(randomChosenColor);
}

function randomNumber(){
  var ranNumber = Math.floor(Math.random() *4);
  return ranNumber;
}

function theLoop (i) {
  setTimeout(function () {
    if (--i) {       // If i > 0, keep going
      handleClick(gamePatern[j]);
      j++;
      theLoop(i);    // Call the loop again, and pass it the current value of i
    }
  }, 500);
}

function levelCounter(){
  $("#level-title").text("Level: " + level);
}

function handleClick(event) {
  var imageElement = $("#" + event + " img");
  var audio = new Audio("sounds/" + event + ".mp3");
  audio.play();

  switch (event) {
    case "green":
      imageElement.attr("src", "images/Green-pressed 2.png");
      setTimeout(function() {imageElement.attr("src", "images/Green.png");}, 300);
      break;
    case "red":
      imageElement.attr("src", "images/Red-pressed 2.png");
      setTimeout(function() {imageElement.attr("src", "images/Red.png");}, 300);
      break;
    case "yellow":
      imageElement.attr("src", "images/Yellow-pressed 2.png");
      setTimeout(function() {imageElement.attr("src", "images/Yellow.png");}, 300);
      break;
    case "blue":
      imageElement.attr("src", "images/Blue-pressed 2.png");
      setTimeout(function() {imageElement.attr("src", "images/Blue.png");}, 300);
      break;
    default:
  }
}

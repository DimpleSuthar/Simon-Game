var userClickedPattern=[];
var gamePattern=[];

var buttonColors=["red","blue","green","yellow"];
var level=0;
var started = false;

$(document).keydown(function(){

if(started == false){
  $("#level-title").text("Level "+level);

nextSequence();
  started=true;
}

});

function nextSequence(){

  userClickedPattern=[];
  level++;
  $("#level-title").text("Level "+level);

  var randomNumber = Math.round(Math.random()*3);
  var randomChosenColor = buttonColors[randomNumber];
  gamePattern.push(randomChosenColor);
  $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
var audio = new Audio("sounds/"+randomChosenColor+".mp3");
audio.play();
}




$(".btn").click(function(){
var userChosenColor = this.id;
userClickedPattern.push(userChosenColor);

console.log(userClickedPattern);
var audio = new Audio("sounds/"+userChosenColor+".mp3");
audio.play();
animatePress(userChosenColor);
checkAnswer(userClickedPattern.length-1);
});



function animatePress(currentColor){
  $("#"+currentColor).addClass("pressed");
  setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");
  },100)
}


function checkAnswer(currentLevel){
  if(gamePattern[currentLevel]===userClickedPattern[currentLevel]){
    console.log("right");
    if(gamePattern.length==userClickedPattern.length){
      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }
  else{
    console.log("wrong");
    var audio = new Audio("sounds/wrong.mp3")
    audio.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200)
    startOver();
  }
}


function startOver(){
  level=0;
  gamePattern=[];
  started = false;
  $("#level-title").text("Game Over, Press any key to restart");
}

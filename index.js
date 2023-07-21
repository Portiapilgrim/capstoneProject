var gamePattern= [];
var userClickedPattern = [];

var started = false;
var level = 0;

var buttonColours = ["red", "blue", "green", "yellow"];
var randomNumber = Math.floor(Math.random()*4)+1;

$(document).keypress(function(){
    if (!started){
        nextSequence(); 
        started = true;        
    }
});  



$(".btn").click(function(){
    var userChosenColour = $(this).attr("id");

    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length-1); 
});

function checkAnswer(currentLevel){
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){
            setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    } else {console.log("wrong");
    var wrongSound = new Audio ("./sounds/wrong.mp3");
    wrongSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
        $("body").removeClass("game-over");
      }, 200);
      $("h1").text("Game Over, Press Any Key to Restart");
      startOver();
     }

}

function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}

function playSound(name){
    var sound = new Audio("./sounds/" + name + ".mp3");
    sound.play();
}

function nextSequence(){
    userClickedPattern = [];
    level++;
    $("h1").text("Level " + level); 
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);
    $("." + randomChosenColour).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);  
  }

 function animatePress(currentColour){
          $("#" + currentColour).addClass("pressed");
    setTimeout(function(){
        $("#" + currentColour).removeClass("pressed");
      }, 100);
 }










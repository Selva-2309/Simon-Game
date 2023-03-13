var buttonColors=["red","green","blue","yellow"];
var gamePattern=[];
var userClickedPattern=[];
var level=0;
var started=false;

$(document).keypress(()=>{
    if(!started){
        $("#level-title").text("level "+level);
        nextsequence();
        started=true;
    }
});

$(".btn").click(function(){
    var select=$(this);
    var userChosenColor = select.attr("id");
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
   checkAnswer(userClickedPattern.length-1);
});
 
function checkAnswer(currentLevel) {
    if (gamePattern[currentLevel]===userClickedPattern[currentLevel]) {
        if(gamePattern.length===userClickedPattern.length){
            setTimeout(()=>{
                nextsequence();
            },1000);
        }
    }else{
        playSound("wrong");
        $("body").addClass("game-over");
        $("#level-title").text("Game Over,Press Any Key to Restrat");
        setTimeout(()=>{
            $("body").removeClass("game-over");
        },1000);
        startOver();
    }
}

function nextsequence(){
    userClickedPattern=[];
    level++;
    $("#level-title").text("level "+level);
    
    var min=0;
    var max=3;
    var randomNumber=Math.floor(Math.random()*(max-min+1))+min;
    var buttonChosenColor=buttonColors[randomNumber];
    gamePattern.push(buttonChosenColor);
    console.log(gamePattern);
   $("#"+buttonChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

   console.log(buttonChosenColor);
   


}

function playSound(name){
    var audio=new Audio("sounds/"+name+".mp3");
    audio.play();
}

function animatePress(name){
    $("#"+name).addClass("pressed");
    setTimeout(()=>{
        $("#"+name).removeClass("pressed");
    },100)
}

function startOver(){
    level=0;
    gamePattern=[];
    started=false;
}




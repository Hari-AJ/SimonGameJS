var gamePattern=[];
var buttonColors=["blue","green","yellow","red"];
var userClickedPattern=[];

function playsound(colorName){
    var audio=new Audio("sounds/"+colorName+".mp3");
    audio.play();
}

function animationpress(colorName){
    $("#"+colorName).addClass("pressed");
    setTimeout(function () {
    $("#" + colorName).removeClass("pressed");
    }, 100);
}

function newsequence(){
    userClickedPattern=[];
    $("#level-title").html("LEVEL "+(++level));
    var randomnumber=Math.random();
    randomnumber=Math.floor(randomnumber*4);
    var randomChosenColour=buttonColors[randomnumber];
    gamePattern.push(randomChosenColour);
    $("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    animationpress(randomChosenColour);
    playsound(randomChosenColour);
}

function checkAns(){
    var len=userClickedPattern.length;
    if(userClickedPattern[len-1]!==gamePattern[len-1]){
        start=1;
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 300);
        $("#level-title").html("Game Over, Press Any Key to Restart");

    }
    else if(len===level)newsequence();
}

$(".btn").click(function(e){
    var userChosenColor=e.target.id;
    userClickedPattern.push(userChosenColor);
    playsound(userChosenColor);
    animationpress(userChosenColor);
    checkAns();
});



var start=1,level=0;
$(document).on('keypress',function(e) {
    if(start){
        userClickedPattern=[];
        gamePattern=[];
        level=0;
        newsequence();
        start=0;
    }
});



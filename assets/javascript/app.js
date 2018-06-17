//Constants
var QUESTION_TIME = 5000;

//Global variables
var questions =[
    {question:"What is 2+2?", answers:[3,4,7,9], correctAnswer:1},
    {question:"What is 4+4?", answers:[45,1,6,8], correctAnswer:3},
]
var numRight;
var numWrong;
var questionTimer;
var questionNum;

//start Game Sequence
startGame();

//startGame function will loop over the array of questions using forEach
//For each question:
//1.Question will be displayed with the possible answers
//2.On click of an answer the checkAnswer function will be invoked


//Events
$("body").on("click", "#restart", function() {
    startGame();
})

$("body").on("click", ".choice", function() {
    checkAnswer($(this).attr("id"));
})


//Functions
function initGame() {
    clearInterval(questionTimer);
    numRight=0;
    numWrong=0;
    questionNum=0;
    $("body").html("");
}

function startGame() {
    initGame();
    questionTimer = setInterval(displayQuestion,QUESTION_TIME);
} 

//This function compares the selectedAnswer argument with the correct Answer of the currentQuestion.
function checkAnswer(answerId) {
    if (answerId===questionNum) {
        $("body").append("<h1>That's Correct!</h1>")
        questionNum++;
        numRight++;
    } else {
        $("body").append("<h1>Incorrect!</h1>"+"<h2>The answer is: "+questions[questionNum].answers[questions[questionNum].correctAnswer]+"</h2>")
        questionNum++;
        numWrong++;
    }
} 

function gameSummary() {}

//This function will check if the game is over 
function checkEndGame() {
    var result = (questionNum===questions.length)? true : false
    return result;
}

function displayQuestion() {
    if(checkEndGame()) {
        $("body").html("<h1>Game Over!</h1><button id='restart'>Restart Game</button>")
    } else {
        var question = $("<h1>"+questions[questionNum].question+"</h1>")
        var answersDiv = $("<ul></ul>")
        $("body").html(question);
        $("body").append(answersDiv);

        questions[questionNum].answers.forEach( function(element,index) {
            answersDiv.append("<li class='choice' id='"+index+"'>"+element+"</li>");
        })
    }
}


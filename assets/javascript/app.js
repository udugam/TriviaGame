//Constants
var QUESTION_TIME = 5000;
var PAUSE_TIME = 3000;

//Global variables
var questions =[
    {question:"What is 2+2?", answers:[3,4,7,9], correctAnswer:1},
    {question:"What is 4+4?", answers:[45,1,6,8], correctAnswer:3},
    {question:"What is 2+4?", answers:[45,1,6,8], correctAnswer:2},
]
var numRight;
var numWrong;
var questionTimer;
var questionNum;

//start Game Sequence
startGame();

//Events
$("body").on("click", "#restart", function() {
    startGame();
})

$("body").on("click", ".choice", function() {
    clearTimeout(questionTimer)
    checkAnswer($(this).attr("id"));
})


//Functions
function initGame() {
    numRight=0;
    numWrong=0;
    questionNum=0;
    $("body").html("");
}

function startGame() {
    initGame();
    displayQuestion();
} 

//This function compares the selectedAnswer argument with the correct Answer of the currentQuestion.
function checkAnswer(answerId) {
    if (answerId==questions[questionNum].correctAnswer) {
        $("body").append("<h1>That's Correct!</h1>")
        questionNum++;
        numRight++;
        setTimeout(displayQuestion,PAUSE_TIME);
    } else {
        $("body").append("<h1>Incorrect!</h1>"+"<h2>The answer is: "+questions[questionNum].answers[questions[questionNum].correctAnswer]+"</h2>")
        questionNum++;
        numWrong++;
        setTimeout(displayQuestion,PAUSE_TIME);
    }
} 

function gameSummary() {
    $("body").append("<h1>Right Anwers: "+numRight+"</h1>");
    $("body").append("<h1>Wrong Answers: "+numWrong+"</h1>");
}

//This function will check if the game is over 
function checkEndGame() {
    var result = (questionNum===questions.length)? true : false
    return result;
}

function displayQuestion() {
    if(checkEndGame()) {
        $("body").html("<h1>Game Over!</h1><button id='restart'>Restart Game</button>")
        gameSummary();
    } else {
        var question = $("<h1>"+questions[questionNum].question+"</h1>")
        var answersDiv = $("<ul></ul>")
        $("body").html(question);
        $("body").append(answersDiv);
        
        questions[questionNum].answers.forEach( function(element,index) {
            answersDiv.append("<li class='choice' id='"+index+"'>"+element+"</li>");
        })
        questionTimer = setTimeout(timeExpired,QUESTION_TIME);
    }
}

//This function is executed whenever the time expires on a question and a choice has not been made
function timeExpired() {
    $("body").append("<h1>Time's Up!</h1>"+"<h2>The answer is: "+questions[questionNum].answers[questions[questionNum].correctAnswer]+"</h2>")
    questionNum++;
    numWrong++;
    setTimeout(displayQuestion,PAUSE_TIME);
}


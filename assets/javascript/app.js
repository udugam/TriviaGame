//Constants
var QUESTION_TIME = 5000;
var PAUSE_TIME = 3000;

//Global variables
var questions =[
    {question:"Toronto is the ________ biggest urban area in North America", answers:["2nd","4th","3rd","6th"], correctAnswer:1},
    {question:"The CN Tower was the tallest freestanding structure for how many years?", answers:["32","100","35","50"], correctAnswer:0},
    {question:"Which one of the following artists is from Toronto?", answers:["Deadmau5","Kalvin Harris","Nelly Furtado","Shania Twain"], correctAnswer:0},
]
var numRight;
var numWrong;
var questionTimer;
var questionNum;

//start Game Sequence
startGame();

//Events
// $("body").on("click", "#restart", function() {
//     startGame();
// })

//Functions
function initGame() {
    numRight=0;
    numWrong=0;
    questionNum=0;
    $(".question").html("");
}

function startGame() {
    initGame();
    displayQuestion();
} 

//This function compares the selectedAnswer argument with the correct Answer of the currentQuestion.
function checkAnswer(answerId) {
    if (answerId==questions[questionNum].correctAnswer) {
        $(".question").append("<h1>That's Correct!</h1>")
        questionNum++;
        numRight++;
        setTimeout(displayQuestion,PAUSE_TIME);
    } else {
        $(".question").append("<h1>Incorrect!</h1>"+"<h2>The answer is: "+questions[questionNum].answers[questions[questionNum].correctAnswer]+"</h2>")
        questionNum++;
        numWrong++;
        setTimeout(displayQuestion,PAUSE_TIME);
    }
} 

//This function displays the number of Right and Wrong answers
function gameSummary() {
    $(".question").append("<h1>Right Anwers: "+numRight+"</h1>");
    $(".question").append("<h1>Wrong Answers: "+numWrong+"</h1>");
}

//This function checks if the game is over 
function checkEndGame() {
    var result = (questionNum===questions.length)? true : false
    return result;
}

//This function diplays the current question ad possible asnwers as a list
function displayQuestion() {
    updateProgressBar();
    if(checkEndGame()) {
        $(".question").html("<h1>Game Over!</h1><button id='restart'>Restart Game</button>")
        gameSummary();

        //Create an event listener for the reset button that is rendered
        $("body").on("click", "#restart", function() {
            startGame();
        })
        
    } else {
        var question = $("<h1>"+questions[questionNum].question+"</h1>")
        var answersDiv = $("<ul></ul>")
        $(".question").html(question);
        $(".question").append(answersDiv);
        
        questions[questionNum].answers.forEach( function(element,index) {
            answersDiv.append("<li class='choice' id='"+index+"'>"+element+"</li>");
        })

        //Creates An Event Listener for click feedback evertime a question is rendered
        $("body").on("click", ".choice", function() {
            $("body").off("click"); //Turns event listener off as soon as a choice is clicked to prevent mutiple click behavior.
            clearTimeout(questionTimer)
            checkAnswer($(this).attr("id"));
        })
        questionTimer = setTimeout(timeExpired,QUESTION_TIME);
    }
}

//This function is executed whenever the time expires on a question and a choice has not been made
function timeExpired() {
    $(".question").append("<h1>Time's Up!</h1>"+"<h2>The answer is: "+questions[questionNum].answers[questions[questionNum].correctAnswer]+"</h2>")
    questionNum++;
    numWrong++;
    setTimeout(displayQuestion,PAUSE_TIME);
}

//This function updates the progress bar
function updateProgressBar() {
    var numQuestions = questions.length;
    var percentage = (questionNum/numQuestions)*100
    var css = "width: "+percentage+"%";
    $(".progress-bar").attr("style",css)
}


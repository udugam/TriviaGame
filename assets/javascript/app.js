//Constants
var QUESTION_TIME = 12000;
var PAUSE_TIME = 5000;

//Global variables
var questions =[
    {question:"Toronto is home to the largest underground pathway in North America called PATH. How long is it?", answers:["54 kms","28 kms","14kms","10kms"], correctAnswer:1},
    {question:"The CN Tower was the tallest freestanding structure for how many years?", answers:["32","100","35","50"], correctAnswer:0},
    {question:"Toronto is the ________ biggest urban area in North America", answers:["2nd","4th","3rd","6th"], correctAnswer:1},
    {question:"Which one of the following artists is from Toronto?", answers:["Deadmau5","Kalvin Harris","Nelly Furtado","Shania Twain"], correctAnswer:0},
    {question:"Which one of the following actors is not from Toronto?", answers:["Jim Carrey","Mike Myers","Rachel McAdams","Ryan Gosling"], correctAnswer:3},
    {question:"The Rogers Center was the first stadium in the world with a retractable roof. How long does it take to fully open?", answers:["34 minutes","20 minutes","40 minutes"], correctAnswer:1},
]
var numRight;
var numWrong;
var questionTimer;
var questionNum;


//Event Listeners
//Creates An Event Listener for click feedback evertime a question is rendered
$("body").on("click", ".choice", function() {
    if($("ul").attr("clicked")==="false") { //Checks clicked attr of selected choice to prevent unwanted multiple clicking behaviour
        $("ul").attr("clicked","true");
        clearTimeout(questionTimer)
        checkAnswer($(this).attr("id"));
    }
})


//Functions
function initGame() {
    numRight=0;
    numWrong=0;
    questionNum=0;
    clearTimeout(questionTimer)
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
        $(".question").html("<h1>Trivia Over!</h1><button class='btn' id='restart'>Restart Trivia</button>")
        gameSummary();
        
        //Create an event listener for the reset button that is rendered
        $("body").on("click", "#restart", function() {
            startGame();
        })
        
    } else {
        var question = $("<h1>"+questions[questionNum].question+"</h1>")
        var answersDiv = $("<ul clicked='false'></ul>") //Adding a clicked attribute to the list
        $(".question").html(question);
        $(".question").append(answersDiv);
        
        questions[questionNum].answers.forEach( function(element,index) {
            answersDiv.append("<li class='choice' id='"+index+"'>"+element+"</li>");
        })
        
        questionTimer = setTimeout(timeExpired,QUESTION_TIME);
    }
}

//This function is executed whenever the time expires on a question and a choice has not been made
function timeExpired() {
    $("ul").attr("clicked","true"); //to prevent unwanted click behavior on the event listener
    $(".question").append("<h1>Time's Up!</h1>"+"<h2>The answer is: "+questions[questionNum].answers[questions[questionNum].correctAnswer]+"</h2>")
    questionNum++;
    numWrong++;
    clearTimeout(questionTimer)
    questionTimer = setTimeout(displayQuestion,PAUSE_TIME);
}

//This function updates the progress bar
function updateProgressBar() {
    var numQuestions = questions.length;
    var percentage = ((questionNum+1)/numQuestions)*100
    var css = "width: "+percentage+"%";
    $(".progress-bar").attr("style",css)
}


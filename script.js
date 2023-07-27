
//DOM Elements
var startBtn = document.getElementById("start-btn");
var quizContainer = document.getElementById("quiz-container");
var questionElement = document.getElementById("question");
var options = document.getElementsByClassName("option");
var timerElement = document.getElementById("timer");
var highscoreContainer = document.getElementById("high-score-container");
var resultElement = document.getElementById("result");

//variables
var currentQuestionIndex = 0; //Initializes the current option index
var score = 0;
var timeLeft = 60;
var timerInterval;

highscoreContainer.style.display = "none"; //Sets the highscores list to not display upon startup

const questions = [ //Initializes an array of questions which contain 3 strings properties: question, options and answers
    {
        question: "Booleans are:",
        options: ["Things that are true or false", "Numbers with decimals", "Fractions", "Greeks"],
        answer: "Things that are true or false"
    },
    {
        question: "Which language is used for web dev?",
        options: ["Java", "Python", "JavaScript", "C++"],
        answer: "JavaScript"
    },
   // Need to add qs
];

function displayQuestion() {

    if (currentQuestionIndex < questions.length) { //Checks if you're at the last question in the questions list array
        var currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question; //Populates the question element with the text content of the question property of the current element in the questions list

        for (let i = 0; i < options.length; i++) {
            options[i].textContent = currentQuestion.options[i]; //Populates the text content of the options list with all the options properties of the current element in the questions list
        }
    } else {
        endQuiz(); //If the question index surpasses the length of the questions array length, than the quiz is over
    }
}

function checkAnswer(button) {
    var selectedOption = button.textContent;
    var currentQuestion = questions[currentQuestionIndex];

    if (selectedOption === currentQuestion.answer) { //Checks if the selected option is the answer of the current question
        score++;
    } else {
        timeLeft -= 5; // Time penalty for wrong answers
    }

    currentQuestionIndex++; //Goes to the next question
    displayQuestion();
}

function startTimer() {
    
    timerInterval = setInterval(function() {
        if (timeLeft > 0) {
            timeLeft--;
            timerElement.textContent = timeLeft;
        } else {
            endQuiz();
        }
    }, 1000);
}

function startQuiz() {
    startBtn.style.display = ""; //Hides the start quiz button
    quizContainer.style.display = "block"; //Reveals the quiz container

    displayQuestion();
    startTimer();
}

function endQuiz() {
    clearInterval(timerInterval);

    quizContainer.style.display = ""; //Hides the quiz container
    highscoreContainer.style.display = "block"; //Dispalys the highscores

    resultElement.textContent = `Your Score: ` + score;

    // STILL NEED TO SAVE
}

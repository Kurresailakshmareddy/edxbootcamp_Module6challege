
// DOM elements
const startButton = document.getElementById("start");
const timeDisplay = document.getElementById("time");
const questionTitle = document.getElementById("question-title");
const choicesContainer = document.getElementById("choices");
const endScreen = document.getElementById("end-screen");
const finalScoreDisplay = document.getElementById("final-score");
const initialsInput = document.getElementById("initials");
const submitButton = document.getElementById("submit");
const feedbackElement = document.getElementById("feedback");

// Quiz state
let currentQuestionIndex = 0;
let score = 0;
let timeLeft = 60;
let timerInterval;


// Quiz questions and answers
const questions = [
    {
        question: "What does 'JS' stand for?",
        choices: ["JavaScript", "Just Saying", "Jumping Snake", "Jazz Saxophone"],
        correctAnswer: 0,
    },
    {
        question: "What is the result of 2 + 2 in JavaScript?",
        choices: ["3", "5", "4", "22"],
        correctAnswer: 2,
    },
    {
        question: "What is a variable in JavaScript used for?",
        choices: ["Storing data", "Playing music", "Drawing shapes", "Sending emails"],
        correctAnswer: 0,
    },
    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        choices: ["let", "print", "var", "function"],
        correctAnswer: 0,
    },
    {
        question: "How do you create a comment in JavaScript?",
        choices: ["//This is a comment", "<!--This is a comment-->", "/*This is a comment*/", "comment('This is a comment')"],
        correctAnswer: 2,
    },
    {
        question: "What is a closure in JavaScript?",
        choices: [
            "A way to lock variables from being modified",
            "A function that has access to the variables in its outer scope even after the outer function has finished executing",
            "An advanced feature only used by expert programmers",
            "A type of loop in JavaScript",
        ],
        correctAnswer: 1,
    },
    {
        question: "What is the 'this' keyword in JavaScript?",
        choices: [
            "A keyword that defines a new variable",
            "A reference to the current function being executed",
            "A reserved word for naming functions",
            "An object that contains all the global variables",
        ],
        correctAnswer: 1,
    },
    {
        question: "What is the difference between 'null' and 'undefined' in JavaScript?",
        choices: [
            "They are interchangeable and can be used in the same way",
            "'Null' represents an intentional absence of any object value, while 'undefined' is used when a variable has been declared but has not been assigned a value",
            "'Null' is used for functions, and 'undefined' is used for variables",
            "There is no difference; they are the same thing",
        ],
        correctAnswer: 1,
    },
];


// Event listener for starting the quiz
startButton.addEventListener("click", startQuiz);

// Event listener for submitting the initials
submitButton.addEventListener("click", saveScore);

function startQuiz() {
    startButton.style.display = "none";
    endScreen.classList.add("hide");
    choicesContainer.innerHTML = "";
    startTimer();
    showQuestion();
}

function startTimer() {
    timerInterval = setInterval(function () {
        timeLeft--;
        timeDisplay.textContent = timeLeft;
        if (timeLeft <= 0) {
            endQuiz();
        }
    }, 1000);
}

function showQuestion() {
    if (currentQuestionIndex < questions.length) {
        const question = questions[currentQuestionIndex];
        questionTitle.textContent = question.question;
        choicesContainer.innerHTML = "";

        question.choices.forEach((choice, index) => {
            const choiceButton = document.createElement("button");
            choiceButton.textContent = choice;
            choiceButton.addEventListener("click", () => checkAnswer(index));
            choicesContainer.appendChild(choiceButton);
        });
    } else {
        endQuiz();
    }
}

function checkAnswer(choiceIndex) {
    const currentQuestion = questions[currentQuestionIndex];

    if (choiceIndex === currentQuestion.correctAnswer) {
        // Correct answer
        score++;
    } else {
        // Incorrect answer
        timeLeft -= 10;
    }

    currentQuestionIndex++;
    showQuestion();
}

function endQuiz() {
    clearInterval(timerInterval);
    timeLeft = Math.max(0, timeLeft); // Ensure timeLeft is not negative
    timeDisplay.textContent = timeLeft;
    endScreen.classList.remove("hide");
    questionTitle.textContent = "All done!";
    finalScoreDisplay.textContent = score;
}

function saveScore() {
    const initials = initialsInput.value.trim();
    if (initials) {
        // Save the score with initials to local storage or perform desired action
        // Example: localStorage.setItem("highScore", JSON.stringify({ initials, score }));
        alert("Score saved: " + score + " with initials " + initials);
        location.reload(); // Refresh the page to start a new quiz
    }
}

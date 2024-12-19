const quizData = {
  html: [
    { question: "What does HTML stand for?", options: ["HyperText Markup Language", "HyperLink and Text Markup Language", "Home Tool Markup Language", "Hyper Transfer Language"], answer: 0 },
    { question: "Which HTML element is used for the largest heading?", options: ["<h6>", "<h1>", "<head>", "<header>"], answer: 1 },
    { question: "What is the purpose of the <title> tag?", options: ["Defines the title of the document", "Defines the heading", "Adds a link", "Adds a paragraph"], answer: 0 },
    { question: "Which attribute is used to specify an image source?", options: ["src", "href", "alt", "img"], answer: 0 },
    { question: "What does the <ol> tag in HTML represent?", options: ["Ordered list", "Object list", "Option list", "Ordinal list"], answer: 0 },
  ],
  css: [
    { question: "Which property is used to change text color?", options: ["font-color", "color", "text-color", "background-color"], answer: 1 },
    { question: "What does CSS stand for?", options: ["Cascading Style Sheets", "Creative Style Sheets", "Colorful Style Sheets", "Computer Style Sheets"], answer: 0 },
    { question: "Which CSS property controls text size?", options: ["font-size", "text-style", "font-style", "text-size"], answer: 0 },
    { question: "How do you select an element with the id 'example'?", options: ["#example", ".example", "example", "*example"], answer: 0 },
    { question: "Which property is used to set a background image?", options: ["background-image", "image-background", "background-img", "img-background"], answer: 0 },
  ],
  javascript: [
    { question: "How do you create a function in JavaScript?", options: ["function myFunction()", "function: myFunction()", "function = myFunction()", "myFunction()"], answer: 0 },
    { question: "Which operator is used for strict equality?", options: ["===", "==", "=", "!=="], answer: 0 },
    { question: "What is the correct syntax for a for loop?", options: ["for (i = 0; i < 5; i++)", "for i = 1 to 5", "for (i <= 5; i++)", "for each i in 5"], answer: 0 },
    { question: "How do you declare a variable in JavaScript?", options: ["var", "let", "const", "All of the above"], answer: 3 },
    { question: "What does JSON stand for?", options: ["JavaScript Object Notation", "JavaScript Only", "Java Standard Output Notation", "Java Syntax Object Node"], answer: 0 },
  ],
  mysql: [
    { question: "What does SQL stand for?", options: ["Structured Query Language", "Standard Query Language", "Simple Query Language", "Statement Query Language"], answer: 0 },
    { question: "Which SQL statement is used to extract data from a database?", options: ["SELECT", "GET", "FETCH", "EXTRACT"], answer: 0 },
    { question: "Which SQL keyword is used to sort results?", options: ["ORDER BY", "SORT BY", "GROUP BY", "SORT"], answer: 0 },
    { question: "Which SQL statement is used to create a table?", options: ["CREATE TABLE", "MAKE TABLE", "NEW TABLE", "ADD TABLE"], answer: 0 },
    { question: "What is the purpose of the WHERE clause?", options: ["Filter records", "Sort records", "Group records", "Join records"], answer: 0 },
  ],
  python: [
    { question: "Which keyword is used to define a function in Python?", options: ["def", "function", "define", "func"], answer: 0 },
    { question: "How do you start a comment in Python?", options: ["#", "//", "/*", "--"], answer: 0 },
    { question: "Which function is used to print output?", options: ["print()", "echo()", "output()", "console.log()"], answer: 0 },
    { question: "What does the len() function do?", options: ["Returns the length of an object", "Adds two values", "Counts objects in memory", "None of the above"], answer: 0 },
    { question: "How do you create a variable in Python?", options: ["x = 10", "int x = 10", "let x = 10", "var x = 10"], answer: 0 },
  ],
};

let selectedTopic = "";
let currentQuestionIndex = 0;
let score = 0;
let userAnswers = [];

const homeContainer = document.getElementById("home-container");
const quizContainer = document.getElementById("quiz-container");
const resultContainer = document.getElementById("result-container");
const topics = document.querySelectorAll(".topic-btn");
const quizTitle = document.getElementById("quiz-title");
const questionElement = document.getElementById("question");
const answersElement = document.getElementById("answers");
const nextButton = document.getElementById("next-btn");
const scoreElement = document.getElementById("score");
const incorrectAnswersElement = document.getElementById("incorrect-answers");
const homeButton = document.getElementById("home-btn");

topics.forEach((btn) =>
  btn.addEventListener("click", () => {
    selectedTopic = btn.getAttribute("data-topic");
    startQuiz();
  })
);

function startQuiz() {
  homeContainer.classList.add("hidden");
  quizContainer.classList.remove("hidden");
  quizTitle.textContent = `${selectedTopic.toUpperCase()} Quiz`;
  currentQuestionIndex = 0;
  score = 0;
  userAnswers = [];
  showQuestion();
}

function showQuestion() {
  const currentQuestion = quizData[selectedTopic][currentQuestionIndex];
  questionElement.textContent = currentQuestion.question;
  answersElement.textContent = "";
  nextButton.classList.add("hidden");

  currentQuestion.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.textContent = option;
    button.addEventListener("click", () => selectAnswer(index, button));
    answersElement.appendChild(button);
  });
}

function selectAnswer(selectedIndex, button) {
  const currentQuestion = quizData[selectedTopic][currentQuestionIndex];
  userAnswers.push({
    question: currentQuestion.question,
    selected: selectedIndex,
    correct: currentQuestion.answer,
    options: currentQuestion.options,
  });

  Array.from(answersElement.children).forEach((btn) => (btn.disabled = true));
  button.style.backgroundColor = selectedIndex === currentQuestion.answer ? "green" : "red";

  if (selectedIndex === currentQuestion.answer) score++;

  nextButton.classList.remove("hidden");
}

function goToNextQuestion() {
  currentQuestionIndex++;
  if (currentQuestionIndex < quizData[selectedTopic].length) {
    showQuestion();
  } else {
    showResult();
  }
}

function showResult() {
  quizContainer.classList.add("hidden");
  resultContainer.classList.remove("hidden");
  scoreElement.textContent = `${score}/${quizData[selectedTopic].length}`;
  incorrectAnswersElement.innerHTML = "<h3>Incorrect Answers:</h3>";

  userAnswers.forEach((answer) => {
    const incorrectItem = document.createElement("div");

    const question = answer.question
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
    const yourAnswer =
      answer.selected !== undefined
        ? answer.options[answer.selected]
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
        : "No Answer";
    const correctAnswer = answer.options[answer.correct]
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    incorrectItem.innerHTML = `
      <p><strong>Question:</strong> ${question}</p>
      <p><strong>Your Answer:</strong> ${yourAnswer}</p>
      <p><strong>Correct Answer:</strong> ${correctAnswer}</p>
    `;
    incorrectItem.classList.add("incorrect-item");

    if (answer.selected !== answer.correct) {
      incorrectAnswersElement.appendChild(incorrectItem);
    }
  });
}

function goHome() {
  resultContainer.classList.add("hidden");
  homeContainer.classList.remove("hidden");
}

nextButton.addEventListener("click", goToNextQuestion);
homeButton.addEventListener("click", goHome);

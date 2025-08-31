const quizData = [
    {
      question: "What is the capital of France?",
      choices: ["Berlin", "Madrid", "Paris", "Rome"],
      correct: 2,
    },
    {
      question: "Which language runs in a web browser?",
      choices: ["Java", "C", "Python", "JavaScript"],
      correct: 3,
    },
    {
      question: "What does CSS stand for?",
      choices: [
        "Central Style Sheets",
        "Cascading Style Sheets",
        "Cascading Simple Sheets",
        "Cars SUVs Sailboats",
      ],
      correct: 1,
    },
    {
      question: "What year was JavaScript launched?",
      choices: ["1996", "1995", "1994", "None of the above"],
      correct: 1,
    },
    {
      question: "Which company developed React?",
      choices: ["Google", "Facebook", "Microsoft", "Amazon"],
      correct: 1,
    },
  ];
  
  let currentQuestion = 0;
  let score = 0;
  let selectedAnswer = null;
  const answersStatus = [];
  
  const questionNumberElem = document.getElementById("question-number");
  const questionElem = document.getElementById("question");
  const answersList = document.getElementById("answers-list");
  const submitBtn = document.getElementById("submit-btn");
  const nextBtn = document.getElementById("next-btn");
  const restartBtn = document.getElementById("restart-btn");
  const resultContainer = document.getElementById("result-container");
  const scoreElem = document.getElementById("score");
  const resultSummary = document.getElementById("result-summary");
  
  function loadQuestion() {
    // Reset UI
    selectedAnswer = null;
    submitBtn.disabled = true;
    nextBtn.disabled = true;
    answersList.innerHTML = "";
    resultContainer.style.display = "none";
    questionElem.style.display = "block";
    answersList.style.display = "block";
    submitBtn.style.display = "inline-block";
    nextBtn.style.display = "inline-block";
    restartBtn.style.display = "none";
  
    const currentData = quizData[currentQuestion];
    questionNumberElem.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
    questionElem.textContent = currentData.question;
  
    currentData.choices.forEach((choice, index) => {
      const li = document.createElement("li");
      li.textContent = choice;
      li.addEventListener("click", () => {
        if (selectedAnswer !== null) return; // Disable changing after select
        selectedAnswer = index;
        updateSelection();
        submitBtn.disabled = false;
      });
      answersList.appendChild(li);
    });
  
    // Hide or show buttons depending on question number
    if (currentQuestion === quizData.length - 1) {
      nextBtn.textContent = "View Results";
    } else {
      nextBtn.textContent = "Next";
    }
  }
  
  function updateSelection() {
    const items = answersList.querySelectorAll("li");
    items.forEach((li, idx) => {
      li.classList.remove("selected");
      if (idx === selectedAnswer) li.classList.add("selected");
    });
  }
  
  function showAnswerFeedback() {
    const items = answersList.querySelectorAll("li");
    items.forEach((li, idx) => {
      li.classList.remove("selected");
      if (idx === quizData[currentQuestion].correct) {
        li.classList.add("correct");
      }
      if (idx === selectedAnswer && selectedAnswer !== quizData[currentQuestion].correct) {
        li.classList.add("incorrect");
      }
    });
  }
  
  submitBtn.addEventListener("click", () => {
    if (selectedAnswer === null) return;
  
    // Disable answer selection after submitting
    showAnswerFeedback();
    submitBtn.disabled = true;
    nextBtn.disabled = false;
  
    // Score update
    if (selectedAnswer === quizData[currentQuestion].correct) {
      score++;
      answersStatus.push({ correct: true, question: quizData[currentQuestion].question });
    } else {
      answersStatus.push({ correct: false, question: quizData[currentQuestion].question });
    }
  });
  
  nextBtn.addEventListener("click", () => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResults();
    }
  });
  
  restartBtn.addEventListener("click", () => {
    currentQuestion = 0;
    score = 0;
    answersStatus.length = 0;
    loadQuestion();
  });
  
  // Show final results
  function showResults() {
    questionElem.style.display = "none";
    answersList.style.display = "none";
    submitBtn.style.display = "none";
    nextBtn.style.display = "none";
  
    resultContainer.style.display = "block";
    scoreElem.textContent = `${score} / ${quizData.length}`;
  
    resultSummary.innerHTML = "";
    answersStatus.forEach((item, idx) => {
      const li = document.createElement("li");
      li.textContent = `${idx + 1}. ${item.question} - ${item.correct ? "Correct" : "Incorrect"}`;
      li.classList.add(item.correct ? "correct" : "incorrect");
      resultSummary.appendChild(li);
    });
  
    restartBtn.style.display = "inline-block";
  }
  
  // Initial load
  loadQuestion();
  
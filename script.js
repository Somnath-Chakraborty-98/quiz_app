let questionDiv = document.querySelector(".quiz")
let questionEle = document.querySelector("#question");
let ansEle = document.querySelector("#answers");
let ansButtons = document.querySelectorAll(".btn");
let nextButton = document.querySelector("#nextBtn");

let quizResDiv = document.querySelector(".quizRes");
let quizRes = document.querySelector("#res");

let startQuiz = document.querySelector(".startQuiz");
startQuiz.addEventListener('click', () => {
    startQuiz.style.display = "none";
    questionDiv.style.display = "block";
    startWithTheQuiz();
});

let quesIndex = 0;
let score = 0;
let ansIndex = 0;

function startWithTheQuiz() {
    quesIndex = 0;
    score = 0;
    quizResDiv.style.display = "none";

    showQuestion();
}

function showQuestion() {
    let currentQuestion = questions[quesIndex];
    let answers = currentQuestion.answers;
    console.log(answers);

    ansButtons[ansIndex].classList.remove("correct");
    ansButtons[ansIndex].classList.remove("wrong");

    questionEle.innerText = (quesIndex + 1) + ". " + currentQuestion.question;
    ansButtons.forEach(b => b.classList.remove("disabled"));

    ansButtons.forEach((btn, index) => {
        console.log(answers[index]);
        btn.innerText = answers[index];
        btn.classList.remove("disabled");
    });
}

ansButtons.forEach((btn, index) => {
    btn.addEventListener("click", () => {
        let currentQuestion = questions[quesIndex];
        ansIndex = index;
        console.log("User clicked:", currentQuestion.answers[index], "at index", index);
        ansButtons.forEach(b => b.classList.add("disabled"));
        if (currentQuestion.correct === index) {
            console.log("Correct!");
            btn.classList.add("correct");
            ++score;
        } else {
            console.log("Wrong!");
            btn.classList.add("wrong");
        }

        quesIndex++;
        nextBtn.style.display = "block";
        nextBtn.innerText = (4 === quesIndex) ? "Submit" : "Next";
    });
});


nextBtn.addEventListener('click', () => {
    if (questions.length === quesIndex) {
        questionDiv.style.display = "none";
        startQuiz.style.display = "block";
        quizResDiv.style.display = "block";
        quizRes.innerText = score + "/" + questions.length;
        if (questions.length === score)
            quizRes.style.color = "green";
        else
            quizRes.style.color = "red";
    }
    else
        showQuestion();
})
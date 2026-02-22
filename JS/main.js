// ====== ELEMENTS ======
let loginPage = document.getElementById("loginPage");
let testPage = document.getElementById("testPage");

let email = document.getElementById("email");
let password = document.getElementById("password");
let loginBtn = document.getElementById("loginBtn");
let loginError = document.getElementById("loginError");

let logoutBtn = document.getElementById("logoutBtn");

let questionCount = document.getElementById("questionCount");
let startBtn = document.getElementById("startBtn");

let questionsBox = document.getElementById("questionsBox");
let submitBtn = document.getElementById("submitBtn");
let resultBox = document.getElementById("resultBox");


// ================= CHECK LOGIN ON LOAD =================
window.onload = function () {

    if (localStorage.getItem("isLogged") === "true") {
        showTestPage();

        if (localStorage.getItem("questions")) {
            renderQuestions();
        }
    }
};


// ================= LOGIN =================
loginBtn.addEventListener("click", function () {

    if (email.value === "aa@" && password.value === "1234") {

        localStorage.setItem("isLogged", "true");
        showTestPage();

    } else {
        loginError.classList.remove("d-none");
    }
});


// ================= SHOW TEST PAGE =================
function showTestPage() {
    loginPage.classList.add("d-none");
    testPage.classList.remove("d-none");
}


// ================= START TEST =================
startBtn.addEventListener("click", function () {

    let count = parseInt(questionCount.value);

    if (!count || count <= 0) {
        alert("Enter valid number");
        return;
    }

    let questions = [];

    for (let i = 1; i <= count; i++) {

        let n1 = Math.floor(Math.random() * 10);
        let n2 = Math.floor(Math.random() * 10);

        questions.push({
            num1: n1,
            num2: n2,
            correct: n1 + n2,
            userAnswer: ""
        });
    }

    localStorage.setItem("questions", JSON.stringify(questions));

    renderQuestions();
});


// ================= RENDER QUESTIONS =================
function renderQuestions() {

    document.getElementById("setupBox").classList.add("d-none");

    let questions = JSON.parse(localStorage.getItem("questions"));

    questionsBox.innerHTML = "";

    questions.forEach((q, index) => {

        questionsBox.innerHTML += `
            <div class="card p-3 mb-3">
                <label>${index + 1}) ${q.num1} + ${q.num2} = ?</label>
                <input type="number" class="form-control mt-2"
                       data-index="${index}"
                       value="${q.userAnswer}">
            </div>
        `;
    });

    submitBtn.classList.remove("d-none");

    // Save answers live
    let inputs = questionsBox.querySelectorAll("input");

    inputs.forEach(input => {
        input.addEventListener("input", function () {

            let index = this.dataset.index;
            let questions = JSON.parse(localStorage.getItem("questions"));

            questions[index].userAnswer = this.value;

            localStorage.setItem("questions", JSON.stringify(questions));
        });
    });
}


// ================= SUBMIT =================
submitBtn.addEventListener("click", function () {

    let questions = JSON.parse(localStorage.getItem("questions"));

    let score = 0;

    questions.forEach(q => {
        if (parseInt(q.userAnswer) === q.correct) {
            score++;
        }
    });

    resultBox.innerHTML =
        `Your Score is ${score} / ${questions.length}`;

    resultBox.classList.remove("d-none");
});


// ================= LOGOUT =================
logoutBtn.addEventListener("click", function () {

    localStorage.clear();
    location.reload();
});
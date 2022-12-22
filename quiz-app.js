function Question(text, choices, answer, userAnswer) {
    this.text = text;
    this.choices = choices;
    this.answer = answer;
    this.userAnswer = userAnswer;
}

var q1 = new Question("Erzurum nerede?", ["DOĞU", "BATI", "KUZEY", "GÜNEY"], "DOĞU", "");
var q2 = new Question("İzmir nerede?", ["DOĞU", "BATI", "KUZEY", "GÜNEY"], "BATI", "");
var q3 = new Question("Sinop nerede?", ["DOĞU", "BATI", "KUZEY", "GÜNEY"], "KUZEY", "");
var q4 = new Question("Diyarbakır nerede?", ["DOĞU", "BATI", "KUZEY", "GÜNEY"], "GÜNEY", "");


Question.prototype.checkAnswer = function (answer) {
    this.userAnswer = answer;
    return this.answer === answer;
}

function Quiz(questions) {
    this.questions = questions;
    this.score = 0;
    this.questionIndex = 0;
}

Quiz.prototype.getQuestion = function () {
    return this.questions[this.questionIndex];
}

Quiz.prototype.isFinished = function () {
    return this.questions.length === this.questionIndex;
}

Quiz.prototype.guess = function (answer) {
    var question = this.getQuestion();
    if (question.checkAnswer(answer)) {
        this.score++;
    }
    this.questionIndex++;
}

function userAnswer(id, answer) {
    var btn = document.getElementById(id);
    btn.onfocus =
        function () {
            btn.style.background = "GREEN";
        }
    btn.onclick = function () {
        quiz.guess(answer);
        loadQuestion();
    }

}

function showScore() {
    var html = `<h2> Score:</h2><h4>${quiz.score}</h4>`;
    html += showUserChoices(quiz.questions);
    document.querySelector(".card-body").innerHTML = html;

}

function showQuestionNumber() {
    var html = `<h4> Question ${quiz.questionIndex + 1} of ${quiz.questions.length} </h4>`;
    document.querySelector(".card-footer").innerHTML = html;
}

function showQuizEnd() {
    var html;
    if (quiz.isFinished()) {
        html = `<h4> Quiz is done! </h4>`;
        document.querySelector(".card-footer").innerHTML = html;
    }
}

function loadQuestion() {
    if (quiz.isFinished()) {
        showScore();
        showQuizEnd();
    } else {
        var question = quiz.getQuestion();
        var choices = question.choices; showQuestionNumber();
        loadQuestionChocies(choices);
        document.querySelector("#question").textContent = question.text;
        for (var i = 0; i < choices.length; i++) {
            userAnswer("btn" + i, choices[i]);
        }
    }
}

function loadQuestionChocies(choices) {
    var element = document.querySelector("#buttons");
    element.innerHTML = ``;
    for (var i = 0; i < choices.length; i++) {
        element.innerHTML += `<button id ="btn${i}" class="btn btn-primary">
                    <span id="choice${i}">${choices[i]}</span>
                </button> &nbsp`;
    }
}

function showUserChoices(questions) {
    var myQuestionChoices = ``;
    for (var i = 0; i < questions.length; i++) {
        var question = questions[i];
        var choices = question.choices;
        myQuestionChoices += `<h5 id="question" class="card-tittle">${question.text}</h5>
<div class="card-body">`;
        for (var j = 0; j < choices.length; j++) {
            if (question.answer == question.userAnswer && question.answer == choices[j]) {
                myQuestionChoices += `<button id ="btn${j}" class="btn btn-success">
                <span id="choice${j}">${choices[j]}</span>
            </button> &nbsp`;
            } else if (question.answer != question.userAnswer && question.userAnswer == choices[j]) {
                myQuestionChoices += `<button id ="btn${j}" class="btn btn-danger">
                    <span id="choice${j}">${choices[j]}</span>
                </button> &nbsp`;
            }
            else {
                myQuestionChoices += `<button id ="btn${j}" class="btn btn-primary">
        <span id="choice${j}">${choices[j]}</span>
    </button> &nbsp`;
            }
        }
        if (question.answer != question.userAnswer)
            myQuestionChoices += `Doğru Cevap:<b>${question.answer}</b>`;

        myQuestionChoices += `</div><br>`;
    }
    return myQuestionChoices;
}

var questions = [q1, q2, q3, q4];
var quiz = new Quiz(questions);
loadQuestion();
<!DOCTYPE html>
<html lang="ar">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>مسابقة رمضان</title>
    <link rel="stylesheet" href="style.css">
</head>
<body>
    <div class="container">
        <h1>مسابقة رمضان 🌙</h1>
        <p id="score">النقاط: 0</p>

        <div id="quiz">
            <h2 id="question"></h2>
            <div id="options"></div>
        </div>

        <button id="nextBtn">التالي</button>
    </div>

    <script src="script.js"></script>
</body>
</html>
body {
    font-family: 'Arial', sans-serif;
    background: #fcefc1;
    text-align: center;
    padding: 20px;
}

.container {
    background: #fff8e1;
    padding: 30px;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    max-width: 500px;
    margin: auto;
}

h1 {
    color: #d68c45;
}

button {
    background: #d68c45;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    margin-top: 15px;
    cursor: pointer;
}

button:hover {
    background: #b36f2d;
}

.option {
    display: block;
    margin: 10px 0;
    padding: 10px;
    background: #ffe0a3;
    border-radius: 5px;
    cursor: pointer;
}

.option:hover {
    background: #ffd27f;
}
const quizData = [
    {
        question: "ما هو الشهر الذي نصوم فيه المسلمون؟",
        options: ["رمضان", "شوال", "ذو الحجة", "محرم"],
        answer: 0
    },
    {
        question: "كم عدد ركعات صلاة الفجر؟",
        options: ["2", "4", "3", "1"],
        answer: 0
    },
    {
        question: "ما هو وجب على المسلمين أثناء رمضان؟",
        options: ["الصيام", "السباحة", "السفر", "الرياضة"],
        answer: 0
    }
];

let currentQuestion = 0;
let score = 0;

const questionEl = document.getElementById('question');
const optionsEl = document.getElementById('options');
const nextBtn = document.getElementById('nextBtn');
const scoreEl = document.getElementById('score');

function loadQuestion() {
    const q = quizData[currentQuestion];
    questionEl.textContent = q.question;
    optionsEl.innerHTML = '';
    q.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.textContent = opt;
        btn.classList.add('option');
        btn.onclick = () => selectAnswer(index);
        optionsEl.appendChild(btn);
    });
}

function selectAnswer(index) {
    const correct = quizData[currentQuestion].answer;
    if (index === correct) {
        score++;
        scoreEl.textContent = "النقاط: " + score;
        alert("إجابة صحيحة! ✅");
    } else {
        alert("إجابة خاطئة ❌");
    }
    nextQuestion();
}

function nextQuestion() {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
        loadQuestion();
    } else {
        alert("انتهت المسابقة! نقاطك: " + score);
        currentQuestion = 0;
        score = 0;
        scoreEl.textContent = "النقاط: 0";
        loadQuestion();
    }
}

// بداية
loadQuestion();

nextBtn.onclick = nextQuestion;

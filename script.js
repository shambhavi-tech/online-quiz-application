document.addEventListener('DOMContentLoaded', () => {
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const timerElement = document.getElementById('timer');
    const scoreElement = document.getElementById('score');
    const finalScoreElement = document.getElementById('final-score');

    let currentQuestionIndex = 0;
    let score = 0;
    let timeLeft = 60;
    let timer;
    let questions = [];

    // Fetch questions from backend
    async function fetchQuestions() {
        try {
            const response = await fetch('http://localhost:8080/api/questions');
            questions = await response.json();
        } catch (error) {
            console.error('Error fetching questions:', error);
            // Fallback questions if API fails
            questions = [
                {
                    id: 1,
                    question: "What is the capital of France?",
                    options: ["London", "Paris", "Berlin", "Madrid"],
                    correctAnswer: 1
                },
                {
                    id: 2,
                    question: "Which language runs in a web browser?",
                    options: ["Java", "C", "Python", "JavaScript"],
                    correctAnswer: 3
                },
                {
                    id: 3,
                    question: "What does HTML stand for?",
                    options: [
                        "Hypertext Markup Language",
                        "Hypertext Markdown Language",
                        "Hyperloop Machine Language",
                        "Helicopters Terminals Motorboats Lamborginis"
                    ],
                    correctAnswer: 0
                }
            ];
        }
    }

    function startQuiz() {
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        startTimer();
        showQuestion();
    }

    function startTimer() {
        timer = setInterval(() => {
            timeLeft--;
            timerElement.textContent = `Time: ${timeLeft}`;
            
            if (timeLeft <= 0) {
                clearInterval(timer);
                endQuiz();
            }
        }, 1000);
    }

    function showQuestion() {
        if (currentQuestionIndex >= questions.length) {
            endQuiz();
            return;
        }

        const question = questions[currentQuestionIndex];
        questionElement.textContent = question.question;
        optionsContainer.innerHTML = '';

        question.options.forEach((option, index) => {
            const button = document.createElement('button');
            button.classList.add('option-btn');
            button.textContent = option;
            button.addEventListener('click', () => selectAnswer(index));
            optionsContainer.appendChild(button);
        });

        nextBtn.classList.add('hidden');
    }

    function selectAnswer(selectedIndex) {
        const question = questions[currentQuestionIndex];
        const optionButtons = document.querySelectorAll('.option-btn');
        
        // Disable all options after selection
        optionButtons.forEach(button => {
            button.disabled = true;
        });

        // Check if answer is correct
        if (selectedIndex === question.correctAnswer) {
            optionButtons[selectedIndex].classList.add('correct');
            score += 10;
            scoreElement.textContent = `Score: ${score}`;
        } else {
            optionButtons[selectedIndex].classList.add('incorrect');
            optionButtons[question.correctAnswer].classList.add('correct');
        }

        nextBtn.classList.remove('hidden');
    }

    function nextQuestion() {
        currentQuestionIndex++;
        showQuestion();
    }

    function endQuiz() {
        clearInterval(timer);
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        finalScoreElement.textContent = score;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        timeLeft = 60;
        scoreElement.textContent = `Score: 0`;
        timerElement.textContent = `Time: 60`;
        resultScreen.classList.add('hidden');
        startQuiz();
    }

    // Initialize the app
    fetchQuestions().then(() => {
        startBtn.addEventListener('click', startQuiz);
        nextBtn.addEventListener('click', nextQuestion);
        restartBtn.addEventListener('click', restartQuiz);
    });
});

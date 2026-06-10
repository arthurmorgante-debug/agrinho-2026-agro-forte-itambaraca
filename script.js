// Quiz Questions - Easy Level
const quizQuestions = [
    {
        question: "O que é sustentabilidade na agricultura?",
        options: [
            "Usar apenas água salgada",
            "Produzir alimentos sem prejudicar o meio ambiente para as futuras gerações",
            "Não plantar nada durante o ano",
            "Usar somente máquinas antigas"
        ],
        correct: 1
    },
    {
        question: "Qual é um exemplo de prática sustentável?",
        options: [
            "Queimar todas as folhas após a colheita",
            "Rotação de culturas para preservar o solo",
            "Usar o máximo de água possível",
            "Eliminar todas as plantas e insetos"
        ],
        correct: 1
    },
    {
        question: "Qual destes é um problema ambiental causado pelo uso excessivo de químicos?",
        options: [
            "Chuva amarela",
            "Contaminação do solo e da água",
            "Aumento de neve",
            "Redução de temperatura global"
        ],
        correct: 1
    },
    {
        question: "Como a biodiversidade ajuda a agricultura?",
        options: [
            "Não ajuda de forma nenhuma",
            "Polinizadores como abelhas ajudam na reprodução das plantas",
            "Apenas deixa o campo colorido",
            "Afasta todos os insetos"
        ],
        correct: 1
    },
    {
        question: "Qual é um dos benefícios da conservação de água na agricultura?",
        options: [
            "Aumenta o calor do solo",
            "Reduz a quantidade de alimentos produzidos",
            "Preserva um recurso natural importante para o futuro",
            "Torna o trabalho mais pesado"
        ],
        correct: 2
    },
    {
        question: "O que é agricultura familiar?",
        options: [
            "Plantações gigantescas",
            "Produção realizada por famílias em pequenas propriedades",
            "Agricultura sem nenhuma tecnologia",
            "Apenas culturas exóticas"
        ],
        correct: 1
    },
    {
        question: "Por que é importante preservar o solo?",
        options: [
            "Para que o solo não desapareça",
            "Porque o solo contém nutrientes essenciais para o crescimento das plantas",
            "Porque torna a agricultura mais cara",
            "Porque o solo é feito de ouro"
        ],
        correct: 1
    },
    {
        question: "Qual prática NÃO é sustentável?",
        options: [
            "Compostagem de resíduos",
            "Irrigação eficiente",
            "Uso descontrolado de agrotóxicos",
            "Rotação de culturas"
        ],
        correct: 2
    }
];

let currentQuestion = 0;
let score = 0;
let userAnswers = [];

// Initialize
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    loadQuiz();
    setupNavigation();
});

// Theme Toggle
function initializeTheme() {
    const themeToggle = document.getElementById('themeToggle');
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    }
    
    themeToggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
    const themeToggle = document.getElementById('themeToggle');
    document.body.classList.toggle('dark-mode');
    
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
        themeToggle.textContent = '☀️';
    } else {
        localStorage.setItem('theme', 'light');
        themeToggle.textContent = '🌙';
    }
}

// Font Size Toggle
function setupFontSizeToggle() {
    const fontSizeToggle = document.getElementById('fontSizeToggle');
    const savedFontSize = localStorage.getItem('fontSize') || 'normal';
    
    if (savedFontSize === 'large') {
        document.body.classList.add('font-large');
    } else if (savedFontSize === 'extra-large') {
        document.body.classList.add('font-extra-large');
    }
    
    let currentSize = savedFontSize;
    
    fontSizeToggle.addEventListener('click', function() {
        document.body.classList.remove('font-large', 'font-extra-large');
        
        if (currentSize === 'normal') {
            document.body.classList.add('font-large');
            currentSize = 'large';
        } else if (currentSize === 'large') {
            document.body.classList.add('font-extra-large');
            currentSize = 'extra-large';
        } else {
            currentSize = 'normal';
        }
        
        localStorage.setItem('fontSize', currentSize);
    });
}

// Initialize Font Size Toggle
setupFontSizeToggle();

// Load Quiz
function loadQuiz() {
    const quizContent = document.getElementById('quizContent');
    quizContent.innerHTML = '';
    
    quizQuestions.forEach((question, index) => {
        const questionDiv = document.createElement('div');
        questionDiv.className = 'question-item';
        
        const questionNumber = index + 1;
        const questionText = document.createElement('h4');
        questionText.textContent = `${questionNumber}. ${question.question}`;
        questionDiv.appendChild(questionText);
        
        const optionsDiv = document.createElement('div');
        optionsDiv.className = 'options';
        
        question.options.forEach((option, optionIndex) => {
            const optionDiv = document.createElement('div');
            optionDiv.className = 'option';
            
            const input = document.createElement('input');
            input.type = 'radio';
            input.name = `question-${index}`;
            input.value = optionIndex;
            input.id = `q${index}-o${optionIndex}`;
            
            const label = document.createElement('label');
            label.htmlFor = `q${index}-o${optionIndex}`;
            label.textContent = option;
            
            optionDiv.appendChild(input);
            optionDiv.appendChild(label);
            optionsDiv.appendChild(optionDiv);
        });
        
        questionDiv.appendChild(optionsDiv);
        quizContent.appendChild(questionDiv);
    });
    
    // Add submit button
    const submitBtn = document.createElement('button');
    submitBtn.className = 'quiz-button';
    submitBtn.textContent = 'Enviar Quiz';
    submitBtn.onclick = submitQuiz;
    quizContent.appendChild(submitBtn);
}

// Submit Quiz
function submitQuiz() {
    const answers = [];
    let allAnswered = true;
    
    quizQuestions.forEach((question, index) => {
        const selected = document.querySelector(`input[name="question-${index}"]:checked`);
        if (!selected) {
            allAnswered = false;
        } else {
            answers.push(parseInt(selected.value));
        }
    });
    
    if (!allAnswered) {
        alert('Por favor, responda todas as perguntas antes de enviar!');
        return;
    }
    
    // Calculate score
    score = 0;
    answers.forEach((answer, index) => {
        if (answer === quizQuestions[index].correct) {
            score++;
        }
    });
    
    // Show result
    showQuizResult();
}

// Show Quiz Result
function showQuizResult() {
    const quizContent = document.getElementById('quizContent');
    const quizResult = document.getElementById('quizResult');
    const scoreNumber = document.getElementById('scoreNumber');
    const totalQuestions = document.getElementById('totalQuestions');
    const scoreMessage = document.getElementById('scoreMessage');
    
    quizContent.classList.add('hidden');
    quizResult.classList.remove('hidden');
    
    scoreNumber.textContent = score;
    totalQuestions.textContent = quizQuestions.length;
    
    const percentage = (score / quizQuestions.length) * 100;
    
    if (percentage === 100) {
        scoreMessage.textContent = '🌟 Parabéns! Você é um especialista em sustentabilidade!';
    } else if (percentage >= 80) {
        scoreMessage.textContent = '🎉 Excelente! Você tem ótimos conhecimentos sobre sustentabilidade!';
    } else if (percentage >= 60) {
        scoreMessage.textContent = '👍 Bom! Você sabe bastante sobre o tema. Continue aprendendo!';
    } else if (percentage >= 40) {
        scoreMessage.textContent = '📚 Você tem alguns conhecimentos. Que tal aprender mais sobre sustentabilidade?';
    } else {
        scoreMessage.textContent = '💪 Continue tentando! Sustentabilidade é um aprendizado contínuo!';
    }
}

// Setup Navigation
function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        const sections = document.querySelectorAll('section');
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    });
}

// Smooth scroll for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.card, .stat-card, .credit-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    observer.observe(el);
});

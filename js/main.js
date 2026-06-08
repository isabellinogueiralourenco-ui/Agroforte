// ============================================
// AGRO FORTE - MAIN JAVASCRIPT
// ============================================

// Dark Mode Toggle
const darkModeToggle = document.getElementById('darkModeToggle');
const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'enabled') {
    document.body.classList.add('dark-mode');
    if (darkModeToggle) darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
}

if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        if (document.body.classList.contains('dark-mode')) {
            localStorage.setItem('darkMode', 'enabled');
            darkModeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        } else {
            localStorage.setItem('darkMode', 'disabled');
            darkModeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
    });
}

// Mobile Menu Toggle
if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuToggle.classList.remove('active');
        });
    });
}

// Scroll to Section
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
    }
}

// Language Selector
const languageSelector = document.getElementById('languageSelector');
if (languageSelector) {
    languageSelector.addEventListener('change', (e) => {
        const lang = e.target.value;
        localStorage.setItem('selectedLanguage', lang);
    });

    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
        languageSelector.value = savedLanguage;
    }
}

// FAQ Accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', () => {
        const answer = question.nextElementSibling;
        const isActive = answer.classList.contains('active');
        
        document.querySelectorAll('.faq-answer').forEach(ans => {
            ans.classList.remove('active');
            const q = ans.previousElementSibling;
            if (q) {
                q.style.background = '';
                q.style.color = '';
            }
        });
        
        if (!isActive) {
            answer.classList.add('active');
            question.style.background = 'var(--color-light-green)';
            question.style.color = 'white';
        }
    });
});

// Calculator Functions
const localProductsInput = document.getElementById('localProducts');
const organicProductsInput = document.getElementById('organicProducts');

if (localProductsInput) {
    localProductsInput.addEventListener('input', (e) => {
        document.getElementById('localProductsValue').textContent = e.target.value + '%';
    });
}

if (organicProductsInput) {
    organicProductsInput.addEventListener('input', (e) => {
        document.getElementById('organicProductsValue').textContent = e.target.value + '%';
    });
}

function calculateImpact() {
    const weeklyConsumptionInput = document.getElementById('weeklyConsumption');
    const localProductsInput = document.getElementById('localProducts');
    const organicProductsInput = document.getElementById('organicProducts');
    const transportationSelect = document.getElementById('transportation');

    if (!weeklyConsumptionInput) return;

    const weeklyConsumption = parseFloat(weeklyConsumptionInput.value) || 0;
    const localProducts = parseFloat(localProductsInput.value) / 100;
    const organicProducts = parseFloat(organicProductsInput.value) / 100;
    const transportation = parseFloat(transportationSelect.value) / 100;
    
    const baseCarbonFootprint = weeklyConsumption * 0.5;
    const adjustedFootprint = baseCarbonFootprint * (1 - localProducts * 0.2) * (1 - organicProducts * 0.15);
    const annualFootprint = (adjustedFootprint * 52 / 1000).toFixed(2);
    
    const waterConserved = ((weeklyConsumption * 100 * localProducts * organicProducts) * 52).toFixed(0);
    
    document.querySelectorAll('.result-card').forEach(card => {
        card.classList.remove('hidden');
    });
    
    document.getElementById('carbonFootprint').textContent = annualFootprint;
    document.getElementById('waterConserved').textContent = waterConserved;
    
    const recommendations = [];
    if (localProducts < 0.5) {
        recommendations.push('Aumente o consumo de produtos locais para reduzir transporte');
    }
    if (organicProducts < 0.3) {
        recommendations.push('Considere escolher mais produtos orgânicos/sustentáveis');
    }
    if (transportation === 0) {
        recommendations.push('Use transporte alternativo para suas compras');
    }
    
    const recommendationsList = document.getElementById('recommendationsList');
    if (recommendationsList) {
        recommendationsList.innerHTML = recommendations.map(rec => `<li>✓ ${rec}</li>`).join('');
    }
    document.getElementById('recommendations').classList.remove('hidden');
}

// Education Tab Switching
function switchEducationTab(tab) {
    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    event.target.classList.add('active');
    loadEducationContent(tab);
}

function loadEducationContent(tab) {
    const content = {
        artigos: [
            { title: 'Impacto da Agricultura Sustentável', author: 'Dr. Silva', type: 'Artigo' },
            { title: 'Tecnologia IoT no Campo', author: 'Eng. Costa', type: 'Artigo' },
            { title: 'Práticas de Conservação do Solo', author: 'Prof. Lima', type: 'Artigo' }
        ],
        ebooks: [
            { title: 'Guia Completo de Sustentabilidade', size: '12MB', type: 'E-book' },
            { title: 'Certificações Ambientais', size: '8MB', type: 'E-book' },
            { title: 'Agricultura Regenerativa', size: '15MB', type: 'E-book' }
        ],
        videos: [
            { title: 'Como Funciona a IA na Agricultura', duration: '15:30', type: 'Vídeo' },
            { title: 'Drones Agrícolas em Ação', duration: '12:45', type: 'Vídeo' },
            { title: 'Sensores IoT Explicados', duration: '18:20', type: 'Vídeo' }
        ],
        podcasts: [
            { title: 'Episódio 1: Futuro do Agronegócio', duration: '45:00', type: 'Podcast' },
            { title: 'Episódio 2: Sustentabilidade em Prática', duration: '38:20', type: 'Podcast' }
        ],
        guias: [
            { title: 'Guia do Consumidor Consciente', pages: '32', type: 'Guia' },
            { title: 'Rastreamento de Produtos', pages: '16', type: 'Guia' },
            { title: 'Como Escolher Alimentos Sustentáveis', pages: '24', type: 'Guia' }
        ]
    };
    
    const contentDiv = document.getElementById('educationContent');
    const items = content[tab] || [];
    
    contentDiv.innerHTML = items.map((item, index) => `
        <div class="education-item" data-aos="fade-up" style="background: white; padding: 20px; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
            <h4 style="margin-bottom: 10px; color: #1B5E20;">${item.title}</h4>
            <p style="font-size: 14px; color: #666; margin-bottom: 15px;">${item.author || item.size || item.duration || item.pages || ''}</p>
            <button onclick="viewItem(${index})" style="background: #66BB6A; color: white; padding: 8px 16px; border: none; border-radius: 4px; cursor: pointer;">Acessar</button>
        </div>
    `).join('');
}

// Search Education
function searchEducation() {
    const searchInput = document.getElementById('educationSearch');
    const searchTerm = searchInput.value.toLowerCase();
    console.log('Buscando:', searchTerm);
    alert('Buscando por: ' + searchTerm);
}

// Chatbot Functions
function toggleChatbot() {
    const chatbot = document.getElementById('chatbot');
    const toggle = document.getElementById('chatbotToggle');
    chatbot.classList.toggle('active');
    toggle.classList.toggle('active');
}

function sendChatMessage() {
    const input = document.getElementById('chatbotInput');
    const message = input.value.trim();
    
    if (!message) return;
    
    const messagesDiv = document.getElementById('chatbotMessages');
    
    const userMsg = document.createElement('div');
    userMsg.textContent = message;
    userMsg.style.alignSelf = 'flex-end';
    userMsg.style.padding = '10px 15px';
    userMsg.style.background = 'var(--color-light-green)';
    userMsg.style.color = 'white';
    userMsg.style.borderRadius = '8px';
    userMsg.style.marginBottom = '10px';
    messagesDiv.appendChild(userMsg);
    
    setTimeout(() => {
        const botMsg = document.createElement('div');
        botMsg.textContent = 'Obrigado pela pergunta! Como posso ajudá-lo com agricultura sustentável?';
        botMsg.style.padding = '10px 15px';
        botMsg.style.background = '#E8E8E8';
        botMsg.style.borderRadius = '8px';
        botMsg.style.marginBottom = '10px';
        messagesDiv.appendChild(botMsg);
        messagesDiv.scrollTop = messagesDiv.scrollHeight;
    }, 500);
    
    input.value = '';
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

function handleChatbotInput(event) {
    if (event.key === 'Enter') {
        sendChatMessage();
    }
}

// Challenge Functions
function acceptChallenge(id) {
    const progress = document.getElementById('userProgress');
    const currentWidth = parseFloat(progress.style.width) || 0;
    const newWidth = Math.min(currentWidth + 15, 100);
    progress.style.width = newWidth + '%';
    
    alert('Desafio aceito! Boa sorte! 🌱');
}

// Newsletter Subscription
function subscribeNewsletter(event) {
    event.preventDefault();
    const email = event.target.querySelector('input[type="email"]').value;
    alert('Obrigado por se inscrever em nossa newsletter! Um email de confirmação foi enviado para: ' + email);
    event.target.reset();
}

// View Item
function viewItem(id) {
    alert('Abrindo conteúdo educativo...');
}

// Initialize on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    loadEducationContent('artigos');
    
    // Scroll event listener for navbar shadow
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (navbar && window.scrollY > 100) {
            navbar.style.boxShadow = '0 8px 32px rgba(0,0,0,0.2)';
        } else if (navbar) {
            navbar.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
        }
    });
});

// Export functions for global scope
window.scrollToSection = scrollToSection;
window.calculateImpact = calculateImpact;
window.switchEducationTab = switchEducationTab;
window.searchEducation = searchEducation;
window.toggleChatbot = toggleChatbot;
window.sendChatMessage = sendChatMessage;
window.handleChatbotInput = handleChatbotInput;
window.acceptChallenge = acceptChallenge;
window.subscribeNewsletter = subscribeNewsletter;
window.viewItem = viewItem;
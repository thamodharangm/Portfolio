/* ==========================================================================
   DEV LINGO MAIN APPLICATION LOGIC (Professional scrolling Portfolio Engine)
   ========================================================================== */

// 1. SOUND EFFECTS SYNTHESIZER (Web Audio API)
class SoundSynth {
  constructor() {
    this.ctx = null;
  }

  init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playClick() {
    this.init();
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(100, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);

    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playCorrect() {
    this.init();
    const now = this.ctx.currentTime;
    this.playTone(523.25, 0.12, 0.15, now);
    this.playTone(659.25, 0.25, 0.15, now + 0.12);
  }

  playWrong() {
    this.init();
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.setValueAtTime(120, now + 0.1);

    gain.gain.setValueAtTime(0.2, now);
    gain.gain.linearRampToValueAtTime(0.01, now + 0.35);

    osc.start(now);
    osc.stop(now + 0.35);
  }

  playComplete() {
    this.init();
    const now = this.ctx.currentTime;
    this.playTone(523.25, 0.1, 0.1, now);
    this.playTone(659.25, 0.1, 0.1, now + 0.1);
    this.playTone(783.99, 0.1, 0.1, now + 0.2);
    this.playTone(1046.50, 0.3, 0.15, now + 0.3);
  }

  playTone(freq, duration, volume, time) {
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.type = 'sine';
    osc.frequency.setValueAtTime(freq, time);

    gain.gain.setValueAtTime(volume, time);
    gain.gain.exponentialRampToValueAtTime(0.01, time + duration);

    osc.start(time);
    osc.stop(time + duration);
  }
}

const sounds = new SoundSynth();

// 2. STATE DATABASE
const DEFAULT_STATE = {
  highScore: 0,
  completedChallenge: false
};
let state = { ...DEFAULT_STATE };

function loadState() {
  const saved = localStorage.getItem('devlingo_prof_state');
  if (saved) {
    try { state = JSON.parse(saved); } catch (e) { state = { ...DEFAULT_STATE }; }
  }
}
function saveState() {
  localStorage.setItem('devlingo_prof_state', JSON.stringify(state));
}

// 3. DEVELOPER PROJECTS DATABASE
const PROJECTS = [
  {
    id: 'proj_gloriavinmart',
    title: 'Gloriavinmart E-Commerce',
    iconId: 'icon-cart',
    image: 'images/gloriavinmart.png',
    desc: 'Developed a responsive e-commerce web platform featuring dynamic item catalogs and search controls. Integrated Firebase configurations for database handlers and Context API for efficient state management.',
    tags: ['React.js', 'Context API', 'Firebase', 'MERN Stack'],
    demoUrl: 'https://thamodharangm.github.io/Portfolio/',
    repoUrl: 'https://github.com/Thamodharangm'
  },
  {
    id: 'proj_textmate_ai',
    title: 'Textmate AI Writing Assistant',
    iconId: 'icon-pen',
    image: 'images/textmate_ai.png',
    desc: 'Engineered an AI-powered writing assistant that processes, refines, and generates high-quality text contents on demand. Integrated with Node.js/Express.js backend services and Groq API pipelines.',
    tags: ['React.js', 'Node.js', 'Groq API', 'Express.js'],
    demoUrl: 'https://thamodharangm.github.io/Portfolio/',
    repoUrl: 'https://github.com/Thamodharangm'
  },
  {
    id: 'proj_sangatamizh',
    title: 'Sangatamizh Music Platform',
    iconId: 'icon-music',
    image: 'images/sangatamizh.png',
    desc: 'Built a localized Tamil music streaming application focusing on easy track selection. Integrated YouTube APIs to fetch content and stream audios in standard web browsers.',
    tags: ['React.js', 'YouTube API', 'CSS3'],
    demoUrl: 'https://thamodharangm.github.io/Portfolio/',
    repoUrl: 'https://github.com/Thamodharangm'
  },
  {
    id: 'proj_bookstore',
    title: 'Bookstore CRUD System',
    iconId: 'icon-book',
    image: 'images/bookstore.png',
    desc: 'Constructed a bookstore CRUD records system with integrated databases. Coded back-end controllers inside Spring Boot and mapped responsive UI views with Bootstrap.',
    tags: ['Spring Boot', 'SQL', 'Bootstrap', 'Java'],
    demoUrl: 'https://thamodharangm.github.io/Portfolio/',
    repoUrl: 'https://github.com/Thamodharangm'
  },
  {
    id: 'proj_todolist',
    title: 'Task management ToDo List',
    iconId: 'icon-checklist',
    image: 'images/todolist.png',
    desc: 'Programmed a tasks dashboard enabling quick add, update, delete, and checkoff configurations. Designed clean user interactions using dynamic JavaScript.',
    tags: ['JavaScript', 'HTML5', 'CSS3'],
    demoUrl: 'https://thamodharangm.github.io/Portfolio/',
    repoUrl: 'https://github.com/Thamodharangm'
  }
];

// 4. DUO'S CODING CHALLENGE TRIVIA QUESTIONS
const CHALLENGE_QUESTIONS = [
  {
    prompt: "Java entry point signature:",
    question: "Which of the following is the correct signature for the main entry point in Java?",
    options: [
      "public void main(String args)",
      "public static void main(String[] args)",
      "static void main(String[] args)",
      "public static int main(String[] args)"
    ],
    correctIndex: 1
  },
  {
    prompt: "Java inheritance check:",
    question: "Which Java keyword is used to establish inheritance from a parent class?",
    options: ["implements", "inherits", "extends", "super"],
    correctIndex: 2
  },
  {
    prompt: "Spring controller annotation:",
    question: "Which annotation registers a Java class as a RESTful web controller in Spring Boot?",
    options: ["@Controller", "@RestController", "@Service", "@WebEndpoint"],
    correctIndex: 1
  },
  {
    prompt: "React hooks:",
    question: "Which React hook stores and updates dynamic data values inside functional components?",
    options: ["useEffect", "useState", "useContext", "useRef"],
    correctIndex: 1
  },
  {
    prompt: "MERN Stack check:",
    question: "What does the 'M' stand for in the MERN Full Stack development standard?",
    options: ["MySQL", "MongoDB", "MariaDB", "Mongoose"],
    correctIndex: 1
  }
];

// 5. STICKY HEADER NAVIGATION & SCROLLSPY
function initNavigation() {
  const sections = document.querySelectorAll('.section');
  const navLinks = document.querySelectorAll('.nav-link');
  const header = document.querySelector('.app-header');

  // Scrollspy logic
  window.addEventListener('scroll', () => {
    let current = '';
    const scrollPos = window.scrollY + 100; // Offset for header height

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href').substring(1) === current) {
        link.classList.add('active');
      }
    });
  });

  // Mobile Drawer Toggle
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-link');

  toggleBtn.addEventListener('click', () => {
    sounds.playClick();
    const isOpen = toggleBtn.classList.contains('open');
    if (isOpen) {
      closeDrawer();
    } else {
      openDrawer();
    }
  });

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      sounds.playClick();
      closeDrawer();
    });
  });

  function openDrawer() {
    toggleBtn.classList.add('open');
    drawer.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }

  function closeDrawer() {
    toggleBtn.classList.remove('open');
    drawer.classList.add('hidden');
    document.body.style.overflow = 'auto';
  }
}

// 6. RENDER PROJECTS GRID
function renderProjects() {
  const grid = document.getElementById('projects-grid');
  if (!grid) return;
  grid.innerHTML = '';

  PROJECTS.forEach(proj => {
    const col = document.createElement('div');
    col.className = 'col d-flex';
    
    const tagsHtml = proj.tags.map(t => {
      const sanitizedTag = t.toLowerCase().replace(/[.\s]/g, '-');
      return `<span class="tech-tag tag-${sanitizedTag}">${t}</span>`;
    }).join('');

    col.innerHTML = `
      <div class="project-card card h-100 w-100">
        <div class="project-img-container">
          <img class="project-image" src="${proj.image}" alt="${proj.title}" loading="lazy">
          <div class="project-icon-badge">
            <svg class="project-badge-svg" viewBox="0 0 24 24"><use href="#${proj.iconId}"></use></svg>
          </div>
        </div>
        <div class="project-card-content d-flex flex-column justify-content-between">
          <div>
            <h3>${proj.title}</h3>
            <p>${proj.desc}</p>
            <div class="tech-tags">${tagsHtml}</div>
          </div>
          <button class="btn btn-secondary btn-3d btn-full mt-auto" onclick="openProjectDetails('${proj.id}')">Explore Details</button>
        </div>
      </div>
    `;
    grid.appendChild(col);
  });
}

window.openProjectDetails = function(projectId) {
  sounds.playClick();
  const proj = PROJECTS.find(p => p.id === projectId);
  if (!proj) return;

  const modal = document.getElementById('project-modal');
  modal.querySelector('#project-modal-title').textContent = proj.title;
  modal.querySelector('#project-modal-desc').textContent = proj.desc;
  
  // Set modal image to preview image instead of just icon
  modal.querySelector('#project-modal-img').innerHTML = `
    <img class="modal-project-img" src="${proj.image}" alt="${proj.title}">
    <div class="modal-project-icon-badge">
      <svg class="modal-badge-svg" viewBox="0 0 24 24"><use href="#${proj.iconId}"></use></svg>
    </div>
  `;
  
  const tagsContainer = modal.querySelector('#project-modal-tags');
  tagsContainer.innerHTML = proj.tags.map(t => `<span class="tech-tag">${t}</span>`).join('');

  modal.querySelector('#project-modal-demo').setAttribute('href', proj.demoUrl);
  modal.querySelector('#project-modal-repo').setAttribute('href', proj.repoUrl);

  modal.classList.remove('hidden');
};

document.getElementById('project-modal-close').addEventListener('click', () => {
  sounds.playClick();
  document.getElementById('project-modal').classList.add('hidden');
});

document.getElementById('project-modal').addEventListener('click', (e) => {
  if (e.target === document.getElementById('project-modal')) {
    sounds.playClick();
    document.getElementById('project-modal').classList.add('hidden');
  }
});

// 7. DUO'S INTERACTIVE CODING CHALLENGE ENGINE
let currentQuestionIndex = 0;
let lessonHearts = 5;
let selectedOptionIndex = null;

function initChallenge() {
  const startBtn = document.getElementById('start-challenge-btn');
  if (startBtn) {
    startBtn.addEventListener('click', () => {
      sounds.playClick();
      startChallenge();
    });
  }
}

function startChallenge() {
  currentQuestionIndex = 0;
  lessonHearts = 5;
  selectedOptionIndex = null;

  // Open modal
  const modal = document.getElementById('lesson-modal');
  modal.classList.remove('hidden');
  document.getElementById('finish-panel').classList.add('hidden');
  document.getElementById('question-panel').classList.remove('hidden');

  updateHeartsUI();
  renderQuestion();
}

function renderQuestion() {
  const q = CHALLENGE_QUESTIONS[currentQuestionIndex];
  
  // Progress Bar
  const percent = (currentQuestionIndex / CHALLENGE_QUESTIONS.length) * 100;
  document.getElementById('lesson-progress-fill').style.width = `${percent}%`;

  document.getElementById('question-prompt').textContent = q.prompt;
  
  const qText = document.getElementById('question-text');
  qText.textContent = q.question;

  // Render options
  const grid = document.getElementById('options-grid');
  grid.innerHTML = '';
  selectedOptionIndex = null;

  const verifyBtn = document.getElementById('verify-btn');
  verifyBtn.textContent = 'CHECK';
  verifyBtn.className = 'btn btn-gray btn-3d';
  verifyBtn.disabled = true;
  
  const footer = document.getElementById('lesson-footer');
  footer.className = 'lesson-footer default';
  document.getElementById('msg-correct').classList.add('hidden');
  document.getElementById('msg-incorrect').classList.add('hidden');

  q.options.forEach((opt, idx) => {
    const btn = document.createElement('button');
    btn.className = 'option-btn';
    btn.innerHTML = `
      <span class="option-number">${idx + 1}</span>
      <span class="option-val">${opt}</span>
    `;

    btn.addEventListener('click', () => {
      if (footer.classList.contains('correct') || footer.classList.contains('incorrect')) return;
      sounds.playClick();
      
      document.querySelectorAll('.option-btn').forEach(o => o.classList.remove('selected'));
      btn.classList.add('selected');
      selectedOptionIndex = idx;

      verifyBtn.disabled = false;
      verifyBtn.className = 'btn btn-primary btn-3d';
    });

    grid.appendChild(btn);
  });

  verifyBtn.onclick = () => {
    if (verifyBtn.textContent === 'CONTINUE') {
      sounds.playClick();
      advanceQuestion();
    } else {
      checkAnswer();
    }
  };
}

function checkAnswer() {
  const q = CHALLENGE_QUESTIONS[currentQuestionIndex];
  const footer = document.getElementById('lesson-footer');
  const verifyBtn = document.getElementById('verify-btn');
  
  document.querySelectorAll('.option-btn').forEach(o => {
    o.style.pointerEvents = 'none';
  });

  const isCorrect = (selectedOptionIndex === q.correctIndex);
  
  if (isCorrect) {
    sounds.playCorrect();
    footer.className = 'lesson-footer correct';
    document.getElementById('msg-correct').classList.remove('hidden');
    document.getElementById('msg-correct-desc').textContent = "Excellent job!";
  } else {
    sounds.playWrong();
    footer.className = 'lesson-footer incorrect';
    document.getElementById('msg-incorrect').classList.remove('hidden');
    document.getElementById('msg-incorrect-desc').textContent = `Correct: ${q.options[q.correctIndex]}`;
    
    lessonHearts -= 1;
    updateHeartsUI();

    if (lessonHearts <= 0) {
      verifyBtn.textContent = 'CONTINUE';
      return;
    }
  }

  verifyBtn.textContent = 'CONTINUE';
}

function advanceQuestion() {
  document.querySelectorAll('.option-btn').forEach(o => {
    o.style.pointerEvents = 'auto';
  });

  if (lessonHearts <= 0) {
    closeChallengeModal();
    showDuoAlert("Challenge Failed", "You ran out of hearts! Take a breath, review core concepts, and try again.");
    return;
  }

  currentQuestionIndex += 1;

  if (currentQuestionIndex < CHALLENGE_QUESTIONS.length) {
    renderQuestion();
  } else {
    completeChallenge();
  }
}

function completeChallenge() {
  document.getElementById('lesson-progress-fill').style.width = '100%';
  document.getElementById('question-panel').classList.add('hidden');
  document.getElementById('finish-panel').classList.remove('hidden');
  
  sounds.playComplete();

  // Save Challenge state
  state.completedChallenge = true;
  state.highScore = 100;
  saveState();

  const footer = document.getElementById('lesson-footer');
  footer.className = 'lesson-footer default';
  document.getElementById('msg-correct').classList.add('hidden');
  document.getElementById('msg-incorrect').classList.add('hidden');
  
  const verifyBtn = document.getElementById('verify-btn');
  verifyBtn.textContent = 'FINISH';
  verifyBtn.disabled = false;
  verifyBtn.className = 'btn btn-primary btn-3d';
  verifyBtn.onclick = () => {
    sounds.playClick();
    closeChallengeModal();
    // Confetti effect on completion!
    triggerConfetti();
  };
}

function closeChallengeModal() {
  document.getElementById('lesson-modal').classList.add('hidden');
}

document.getElementById('close-lesson-btn').addEventListener('click', () => {
  sounds.playClick();
  showConfirmDialog(
    "Exit Quiz?",
    "Are you sure you want to exit? Your answers for this round will not be saved.",
    () => {
      closeChallengeModal();
    }
  );
});

function updateHeartsUI() {
  document.getElementById('lesson-hearts-val').textContent = lessonHearts;
}

// Simple Particle Confetti Effect
function triggerConfetti() {
  const duration = 2.5 * 1000;
  const end = Date.now() + duration;

  // Render colorful dots on screen
  const container = document.createElement('div');
  container.style.position = 'fixed';
  container.style.top = 0;
  container.style.left = 0;
  container.style.width = '100vw';
  container.style.height = '100vh';
  container.style.pointerEvents = 'none';
  container.style.zIndex = 2000;
  document.body.appendChild(container);

  const colors = ['#58cc02', '#1cb0f6', '#ff9600', '#ffc800', '#a560e8'];

  function frame() {
    for (let i = 0; i < 5; i++) {
      const p = document.createElement('div');
      p.style.position = 'absolute';
      p.style.width = '10px';
      p.style.height = '10px';
      p.style.borderRadius = '50%';
      p.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      
      const x = Math.random() * 100;
      p.style.left = `${x}vw`;
      p.style.top = `-20px`;

      container.appendChild(p);

      // Simple drop animation
      let topVal = -20;
      let angle = Math.random() * 2 - 1;
      const speed = Math.random() * 5 + 3;

      const anim = setInterval(() => {
        topVal += speed;
        p.style.top = `${topVal}px`;
        p.style.transform = `translateX(${angle * 10}px)`;
        if (topVal > window.innerHeight) {
          clearInterval(anim);
          p.remove();
        }
      }, 20);
    }

    if (Date.now() < end) {
      requestAnimationFrame(frame);
    } else {
      setTimeout(() => container.remove(), 4000);
    }
  }
  
  frame();
}

// 8. GENERAL ALERT & DIALOGS
function showDuoAlert(title, message) {
  const dialog = document.getElementById('alert-dialog');
  dialog.querySelector('#alert-title').textContent = title;
  dialog.querySelector('#alert-message').textContent = message;

  const cancelBtn = document.getElementById('alert-cancel-btn');
  cancelBtn.classList.add('hidden');
  
  const confirmBtn = document.getElementById('alert-confirm-btn');
  confirmBtn.onclick = () => {
    sounds.playClick();
    dialog.classList.add('hidden');
  };

  dialog.classList.remove('hidden');
}

function showConfirmDialog(title, message, onConfirm) {
  const dialog = document.getElementById('alert-dialog');
  dialog.querySelector('#alert-title').textContent = title;
  dialog.querySelector('#alert-message').textContent = message;

  const cancelBtn = document.getElementById('alert-cancel-btn');
  cancelBtn.classList.remove('hidden');
  cancelBtn.onclick = () => {
    sounds.playClick();
    dialog.classList.add('hidden');
  };

  const confirmBtn = document.getElementById('alert-confirm-btn');
  confirmBtn.onclick = () => {
    sounds.playClick();
    dialog.classList.add('hidden');
    onConfirm();
  };

  dialog.classList.remove('hidden');
}

// 9. CONTACT FORM
function initContactForm() {
  const form = document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    sounds.playClick();

    const name = document.getElementById('contact-name').value;
    const submitBtn = document.getElementById('contact-submit-btn');
    
    submitBtn.textContent = 'SENDING...';
    submitBtn.disabled = true;

    setTimeout(() => {
      sounds.playComplete();
      submitBtn.textContent = 'SEND MESSAGE';
      submitBtn.disabled = false;
      
      showDuoAlert(
        "Message Sent!",
        `Thanks ${name}! I have delivered your email details directly to my developer. Duo has flown it over! 🦉`
      );

      form.reset();
    }, 1200);
  });
}

// 10. APP INITIALIZATION
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  initNavigation();
  renderProjects();
  initChallenge();
  initContactForm();
});

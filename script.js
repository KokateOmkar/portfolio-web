// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', () => {
  // Wait for DOM and data to be ready
  if (typeof portfolioData === 'undefined') {
    console.error('data.js not loaded!');
    return;
  }

  populateProfile();
  populateAbout();
  populateSkills();
  populateProjects();
  populateExperience();
  populateEducation();

  // Initialize all interactive features
  initializeBrowserChrome();
  initializeProjectNavigation();
  initializeThemeToggle();
});

// ===== Theme Toggle =====
const THEME_KEY = 'portfolio-theme';

function applyTheme(theme) {
  document.body.classList.toggle('theme-dark', theme === 'dark');

  const themeToggle = document.getElementById('themeToggle');
  if (themeToggle) {
    themeToggle.classList.toggle('active', theme === 'dark');
    const icon = themeToggle.querySelector('.theme-icon');
    if (icon) {
      icon.textContent = theme === 'dark' ? '🌙' : '☀';
    }
  }
}

function initializeThemeToggle() {
  const themeToggle = document.getElementById('themeToggle');
  if (!themeToggle) return;

  const storedTheme = localStorage.getItem(THEME_KEY);
  const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');
  applyTheme(initialTheme);

  themeToggle.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    const nextTheme = document.body.classList.contains('theme-dark') ? 'light' : 'dark';
    applyTheme(nextTheme);
    localStorage.setItem(THEME_KEY, nextTheme);
  });
}

// ===== Browser Chrome Interactions =====
function initializeBrowserChrome() {
  // Red button - Close/Reload
  const redBtn = document.getElementById('redBtn');
  const closingOverlay = document.getElementById('closingOverlay');

  if (redBtn && closingOverlay) {
    redBtn.addEventListener('click', () => {
      closingOverlay.classList.add('active');
      setTimeout(() => {
        window.location.reload();
      }, 2800);
    });
  }

  // Yellow button - Toggle sidebar
  const yellowBtn = document.getElementById('yellowBtn');
  const sidebar = document.getElementById('sidebar');

  if (yellowBtn && sidebar) {
    yellowBtn.addEventListener('click', () => {
      sidebar.classList.toggle('collapsed');
      // Toggle expanded class on mac-window for better height handling
      const macWindow = document.querySelector('.mac-window');
      if (macWindow) {
        macWindow.classList.toggle('expanded');
      }
    });
  }

  // Green button - Fullscreen
  const greenBtn = document.getElementById('greenBtn');
  let isFullscreen = false;

  if (greenBtn) {
    greenBtn.addEventListener('click', () => {
      try {
        if (!isFullscreen) {
          document.documentElement.requestFullscreen().catch(() => {});
        } else {
          document.exitFullscreen().catch(() => {});
        }
      } catch (e) {
        // Fullscreen not supported
      }
    });
  }

  if (document.fullscreenElement !== undefined) {
    document.addEventListener('fullscreenchange', () => {
      isFullscreen = !!document.fullscreenElement;
    });
  }

  // Address bar - Live filter
  const addressBar = document.getElementById('addressBar');
  const clearBtn = document.getElementById('clearBtn');

  if (addressBar) {
    addressBar.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase().trim();
      const projectCards = document.querySelectorAll('.project-card');

      // Show/hide clear button
      if (clearBtn) {
        if (query.length > 0) {
          clearBtn.classList.add('visible');
        } else {
          clearBtn.classList.remove('visible');
        }
      }

      // Filter cards
      projectCards.forEach(card => {
        const tags = Array.from(card.querySelectorAll('.project-tag')).map(tag =>
          tag.textContent.toLowerCase()
        );

        const matches = query.length === 0 || tags.some(tag => tag.includes(query));

        if (query.length > 0) {
          if (matches) {
            card.classList.remove('filtered-out');
            card.classList.add('highlight');
          } else {
            card.classList.add('filtered-out');
            card.classList.remove('highlight');
          }
        } else {
          card.classList.remove('filtered-out', 'highlight');
        }
      });
    });

    addressBar.addEventListener('blur', () => {
      if (!addressBar.value && clearBtn) {
        clearBtn.classList.remove('visible');
      }
    });
  }

  // Clear button
  if (clearBtn && addressBar) {
    clearBtn.addEventListener('click', () => {
      addressBar.value = '';
      clearBtn.classList.remove('visible');
      addressBar.focus();

      const projectCards = document.querySelectorAll('.project-card');
      projectCards.forEach(card => {
        card.classList.remove('filtered-out', 'highlight');
      });
    });
  }

  // Medium button in chrome bar
  const mediumBtn = document.getElementById('mediumBtn');
  const terminalPanel = document.getElementById('terminalPanel');

  if (mediumBtn && terminalPanel) {
    mediumBtn.addEventListener('click', () => {
      terminalPanel.classList.add('active');
      typeTerminalContent();
    });
  }

  // Terminal panel close handlers
  const terminalOverlay = document.getElementById('terminalOverlay');
  const terminalClose = document.getElementById('terminalClose');

  if (terminalOverlay && terminalPanel) {
    terminalOverlay.addEventListener('click', () => {
      terminalPanel.classList.remove('active');
    });
  }

  if (terminalClose && terminalPanel) {
    terminalClose.addEventListener('click', () => {
      terminalPanel.classList.remove('active');
    });
  }
}

// ===== Project Navigation =====
let currentProjectIndex = -1; // -1 means no project is active

function initializeProjectNavigation() {
  const backBtn = document.getElementById('backBtn');
  const forwardBtn = document.getElementById('forwardBtn');

  if (!backBtn || !forwardBtn) {
    console.warn('Navigation buttons not found');
    return;
  }

  backBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigateProject(-1);
  });
  forwardBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    navigateProject(1);
  });
}

function navigateProject(direction) {
  const projectCards = document.querySelectorAll('.project-card');

  if (projectCards.length === 0) return;

  // If no project is currently active, activate the first one
  if (currentProjectIndex === -1) {
    updateProjectStates(0);
    currentProjectIndex = 0;
    return;
  }

  // Calculate new index with wrapping
  let newIndex = currentProjectIndex + direction;

  if (newIndex < 0) {
    newIndex = projectCards.length - 1;
  } else if (newIndex >= projectCards.length) {
    newIndex = 0;
  }

  updateProjectStates(newIndex);
  currentProjectIndex = newIndex;
}

function updateProjectStates(activeIndex) {
  const projectCards = document.querySelectorAll('.project-card');

  projectCards.forEach((card, index) => {
    card.classList.remove('active', 'inactive');

    if (index === activeIndex) {
      card.classList.add('active');
    } else {
      card.classList.add('inactive');
    }
  });
}

// ===== Terminal Panel =====
let terminalTyped = false;

function typeTerminalContent() {
  if (terminalTyped) return;
  terminalTyped = true;

  const terminalBody = document.getElementById('terminalBody');
  if (!terminalBody) return;

  // Clear any existing content
  terminalBody.innerHTML = '';

  const lines = [
    { text: '$ fetching articles from medium...', type: 'command', delay: 100 },
    { text: 'Connecting to medium.com/@omkarkokate', type: 'connecting', delay: 800 },
    { text: '████████████ 100%', type: 'progress', delay: 400 },
    { text: '', type: 'blank', delay: 200 },
    { text: '[1] Getting Started with RAG Systems', type: 'article-title', link: 'https://medium.com/@omkarkokate', delay: 600 },
    { text: '→ medium.com/@omkar · 5 min read', type: 'article-meta', delay: 100 },
    { text: '', type: 'blank', delay: 100 },
    { text: '[2] MHT-CET Data Analysis with Pandas', type: 'article-title', link: 'https://medium.com/@omkarkokate', delay: 300 },
    { text: '→ medium.com/@omkar · 8 min read', type: 'article-meta', delay: 100 },
    { text: '', type: 'blank', delay: 100 },
    { text: '[3] Building Hybrid Search Pipelines', type: 'article-title', link: 'https://medium.com/@omkarkokate', delay: 300 },
    { text: '→ medium.com/@omkar · 6 min read', type: 'article-meta', delay: 100 },
    { text: '', type: 'blank', delay: 200 },
    { text: '$ _', type: 'cursor', delay: 300 }
  ];

  let currentLine = 0;

  function typeLine() {
    if (currentLine >= lines.length) return;

    const lineData = lines[currentLine];
    const lineEl = document.createElement('div');
    lineEl.className = `terminal-line ${lineData.type}`;

    if (lineData.type === 'article-title') {
      lineEl.textContent = lineData.text;
      lineEl.style.cursor = 'pointer';
      lineEl.addEventListener('click', (e) => {
        e.stopPropagation();
        if (lineData.link) window.open(lineData.link, '_blank');
      });
    } else if (lineData.type === 'cursor') {
      lineEl.innerHTML = '$ <span class="cursor">_</span>';
    } else if (lineData.type !== 'blank') {
      lineEl.textContent = lineData.text;
    }

    if (lineData.type !== 'blank') {
      terminalBody.appendChild(lineEl);
    }
    terminalBody.scrollTop = terminalBody.scrollHeight;

    currentLine++;
    setTimeout(typeLine, lineData.delay);
  }

  setTimeout(typeLine, 500);
}

// Initialize terminal panel (empty function now, logic moved to browser chrome)
function initializeTerminalPanel() {
  // Terminal is now initialized via browser chrome
}

// ===== Profile Section =====
function populateProfile() {
  // Profile photo - use placeholder
  const photoUrl = 'https://placehold.co/200x200/2563EB/white?text=OK';
  const profilePhoto = document.getElementById('profilePhoto');
  if (profilePhoto) profilePhoto.src = photoUrl;

  const profileName = document.getElementById('profileName');
  const profileTitle = document.getElementById('profileTitle');
  const profileLocation = document.getElementById('profileLocation');

  if (profileName) profileName.textContent = portfolioData.hero.name;
  if (profileTitle) profileTitle.textContent = portfolioData.hero.title;
  if (profileLocation) profileLocation.textContent = portfolioData.about.location;

  // Social links
  const linkedinLink = document.getElementById('linkedinIcon');
  const githubLink = document.getElementById('githubIcon');
  const mediumIcon = document.getElementById('mediumIcon');
  const emailBtn = document.getElementById('emailBtn');
  const terminalPanel = document.getElementById('terminalPanel');

  if (linkedinLink) linkedinLink.href = portfolioData.social.linkedin || '#';
  if (githubLink) githubLink.href = portfolioData.social.github || '#';

  // Medium icon in sidebar triggers terminal - prevent default and stop propagation
  if (mediumIcon) {
    mediumIcon.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (terminalPanel) {
        terminalPanel.classList.add('active');
        typeTerminalContent();
      }
    });
  }

  // Show/hide social icons based on data
  if (linkedinLink && !portfolioData.social.linkedin) linkedinLink.style.display = 'none';
  if (githubLink && !portfolioData.social.github) githubLink.style.display = 'none';

  // Email button
  if (emailBtn) {
    if (portfolioData.about.email) {
      emailBtn.href = `mailto:${portfolioData.about.email}`;
    } else {
      emailBtn.style.display = 'none';
    }
  }
}

// ===== About Section =====
function populateAbout() {
  const aboutBio = document.getElementById('aboutBio');
  if (aboutBio) aboutBio.textContent = portfolioData.about.bio;
}

// ===== Skills Section =====
function populateSkills() {
  const skillsList = document.getElementById('skillsList');
  if (skillsList) {
    skillsList.innerHTML = portfolioData.skills.map(skill =>
      `<span class="skill-pill">${skill.name}</span>`
    ).join('');
  }
}

// ===== Projects Section =====
function populateProjects() {
  const projectsGrid = document.getElementById('projectsGrid');
  if (!projectsGrid) return;

  const projectImages = [
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1655720828018-edd2daec9349?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80'
  ];

  projectsGrid.innerHTML = portfolioData.projects.map((project, index) => {
    const imageUrl = projectImages[index] || `https://placehold.co/600x300/e8f0fe/1a56db?text=${encodeURIComponent(project.title)}`;

    return `
      <div class="project-card" data-index="${index}">
        <img src="${imageUrl}" alt="${project.title}" class="project-cover">
        <div class="project-body">
          <h3 class="project-title">${project.title}</h3>
          <div class="project-tags">
            ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
          </div>
          <p class="project-description">${project.description}</p>
          <a href="${project.link}" class="project-link" target="_blank">Read more →</a>
        </div>
      </div>
    `;
  }).join('');

  // Add click handlers to make cards clickable to set as active
  setTimeout(() => {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach((card, index) => {
      card.addEventListener('click', () => {
        currentProjectIndex = index;
        updateProjectStates(index);
      });
    });
  }, 100);
}

// ===== Experience Section =====
function populateExperience() {
  const experienceList = document.getElementById('experienceList');
  const experienceSection = document.querySelector('.experience-section');

  if (!portfolioData.experience || portfolioData.experience.length === 0) {
    if (experienceSection) experienceSection.style.display = 'none';
    return;
  }

  if (experienceList) {
    experienceList.innerHTML = portfolioData.experience.map(exp => `
      <div class="experience-item">
        <p class="exp-date">${exp.period}</p>
        <h3 class="exp-role">${exp.role} at ${exp.company}</h3>
        <p class="exp-description">${exp.description}</p>
      </div>
    `).join('');
  }
}

// ===== Education Section =====
function populateEducation() {
  const educationList = document.getElementById('educationList');
  const educationSection = document.querySelector('.education-section');

  if (!portfolioData.education || portfolioData.education.length === 0) {
    if (educationSection) educationSection.style.display = 'none';
    return;
  }

  if (educationList) {
    educationList.innerHTML = portfolioData.education.map(edu => `
      <div class="education-item">
        <p class="edu-date">${edu.period}</p>
        <h3 class="edu-degree">${edu.degree}</h3>
        <p class="edu-institution">${edu.institution}</p>
        ${edu.pointer ? `<p class="edu-pointer">${edu.pointer}</p>` : ''}
      </div>
    `).join('');
  }
}

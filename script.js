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
  populateCertifications();
  populateAchievements();

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

// ===== Profile Section =====
// Emoji avatar helpers
function isEmoji(str) {
  return typeof str === 'string' && /\p{Extended_Pictographic}/u.test(str);
}

function emojiToDataUrl(emoji, size = 200, bg = '#2563EB', fg = '#FFFFFF') {
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${size}' height='${size}' viewBox='0 0 ${size} ${size}'>` +
    `<rect width='100%' height='100%' rx='${size/2}' fill='${bg}'/>` +
    `<text x='50%' y='50%' dominant-baseline='central' text-anchor='middle' font-size='${Math.floor(size*0.5)}' font-family='Segoe UI Emoji, Apple Color Emoji, "Noto Color Emoji", sans-serif' fill='${fg}'>${emoji}</text>` +
    `</svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

function populateProfile() {
  // Profile photo - support emoji or image paths
  const profilePhoto = document.getElementById('profilePhoto');
  const photoVal = portfolioData.hero.photo || '🐼';
  if (profilePhoto) {
    try {
      if (isEmoji(photoVal)) {
        profilePhoto.src = emojiToDataUrl(photoVal);
      } else {
        profilePhoto.src = photoVal;
      }
    } catch (e) {
      // Fallback to raw value in case of any issue
      profilePhoto.src = photoVal;
    }
  }

  const profileName = document.getElementById('profileName');
  const profileTitle = document.getElementById('profileTitle');
  const profileLocation = document.getElementById('profileLocation');

  if (profileName) profileName.textContent = portfolioData.hero.name;
  if (profileTitle) profileTitle.textContent = portfolioData.hero.title;
  if (profileLocation) profileLocation.textContent = portfolioData.about.location;

  // Social links
  const linkedinLink = document.getElementById('linkedinIcon');
  const githubLink = document.getElementById('githubIcon');
  const resumeLink = document.getElementById('resumeIcon');
  const emailLink = document.getElementById('emailIcon');

  if (linkedinLink) linkedinLink.href = portfolioData.social.linkedin || '#';
  if (githubLink) githubLink.href = portfolioData.social.github || '#';
  if (resumeLink) resumeLink.href = portfolioData.social.resume || '#';
  if (emailLink) emailLink.href = portfolioData.about.email ? `mailto:${portfolioData.about.email}` : '#';

  // Show/hide social icons based on data
  if (linkedinLink && !portfolioData.social.linkedin) linkedinLink.style.display = 'none';
  if (githubLink && !portfolioData.social.github) githubLink.style.display = 'none';
  if (resumeLink && !portfolioData.social.resume) resumeLink.style.display = 'none';
  if (emailLink && !portfolioData.about.email) emailLink.style.display = 'none';
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
    'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&w=800&q=80',
    'images/agrogen-farmer.png'
  ];

  projectsGrid.innerHTML = portfolioData.projects.map((project, index) => {
    const imageUrl = project.image || projectImages[index] || `https://placehold.co/600x300/e8f0fe/1a56db?text=${encodeURIComponent(project.title)}`;

    const coverClass = project.title && project.title.toLowerCase().includes('agrogen') ? 'project-cover agrogen-cover' : 'project-cover';

    return `
      <div class="project-card" data-index="${index}">
        <img src="${imageUrl}" alt="${project.title}" class="${coverClass}">
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
    experienceList.innerHTML = portfolioData.experience.map(exp => {
      // Render description as a list if it's an array or contains bullet markers (•, -, *)
      let descriptionHtml = '';
      if (Array.isArray(exp.description)) {
        descriptionHtml = '<ul class="exp-bullets">' + exp.description.map(d => `<li>${d}</li>`).join('') + '</ul>';
      } else if (typeof exp.description === 'string') {
        const lines = exp.description.split('\n').map(l => l.trim()).filter(l => l.length);
        const allBullets = lines.length > 0 && lines.every(l => /^[\u2022\-\*]/.test(l));
        if (allBullets) {
          descriptionHtml = '<ul class="exp-bullets">' + lines.map(l => `<li>${l.replace(/^[\u2022\-\*]\s?/, '')}</li>`).join('') + '</ul>';
        } else if (lines.length > 1) {
          // Multiple lines but not explicitly bulleted: render each on its own line
          descriptionHtml = lines.map(l => `<p class="exp-description">${l}</p>`).join('');
        } else {
          descriptionHtml = `<p class="exp-description">${exp.description}</p>`;
        }
      }

      return `
        <div class="experience-item">
          <div class="exp-header">
            <h3 class="exp-role">${exp.role}</h3>
            <span class="exp-date">${exp.period}</span>
          </div>
          <p class="exp-company">${exp.company}</p>
          ${descriptionHtml}
        </div>
      `;
    }).join('');
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
        <div class="edu-header">
          <h3 class="edu-degree">${edu.degree}</h3>
          <span class="edu-date">${edu.period}</span>
        </div>
        <p class="edu-institution">${edu.institution}</p>
        ${edu.pointer ? `<p class="edu-pointer">${edu.pointer}</p>` : ''}
      </div>
    `).join('');
  }
}

// ===== Certifications Section =====
function populateCertifications() {
  const certsList = document.getElementById('certificationsList');
  const certSection = document.querySelector('.certifications-section');

  if (!portfolioData.certifications || portfolioData.certifications.length === 0) {
    if (certSection) certSection.style.display = 'none';
    return;
  }

  if (certsList) {
    // Render certifications with same typography as education; show provider in brackets next to title and omit timing
    certsList.innerHTML = portfolioData.certifications.map(c => `
      <div class="education-item cert-item">
        <h3 class="edu-degree">${c.title} <span class="cert-issuer">(${c.issuer})</span></h3>
      </div>
    `).join('');
  }
}

// ===== Achievements Section =====
function populateAchievements() {
  const achList = document.getElementById('achievementsList');
  const achSection = document.querySelector('.achievements-section');

  if (!portfolioData.achievements || portfolioData.achievements.length === 0) {
    if (achSection) achSection.style.display = 'none';
    return;
  }

  if (achList) {
    // Render achievements without list markers
    achList.innerHTML = `<ul class="ach-list">` + portfolioData.achievements.map(a => `<li>${a}</li>`).join('') + `</ul>`;
  }
}

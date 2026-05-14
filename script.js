// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', () => {
  populateHero();
  populateAbout();
  populateSkills();
  populateProjects();
  populateExperience();
  populateContact();
  initScrollAnimations();
  initSmoothScroll();
});

// ===== Populate Hero =====
function populateHero() {
  document.querySelector('.hero-name').textContent = portfolioData.hero.name;
  document.querySelector('.hero-title').textContent = portfolioData.hero.title;
  document.querySelector('.hero-tagline').textContent = portfolioData.hero.tagline;

  const cta = document.querySelector('.hero-cta');
  cta.textContent = portfolioData.hero.cta;
  cta.href = portfolioData.hero.ctaLink;

  // Update nav logo with initials
  const initials = portfolioData.hero.name.split(' ').map(n => n[0]).join('').toUpperCase();
  document.querySelector('.nav-logo').textContent = initials;
}

// ===== Populate About =====
function populateAbout() {
  document.querySelector('.about-bio').textContent = portfolioData.about.bio;

  const items = document.querySelectorAll('.about-item .about-label');
  items[0].textContent = portfolioData.about.location;
  items[1].textContent = portfolioData.about.email;

  // Update footer name
  document.querySelector('.footer-name').textContent = portfolioData.hero.name;
}

// ===== Populate Skills =====
function populateSkills() {
  const grid = document.querySelector('.skills-grid');
  grid.innerHTML = portfolioData.skills.map(skill => `
    <div class="skill-badge animate-on-scroll">
      <span class="skill-icon">${skill.icon}</span>
      <span>${skill.name}</span>
    </div>
  `).join('');
}

// ===== Populate Projects =====
function populateProjects() {
  const grid = document.querySelector('.projects-grid');
  grid.innerHTML = portfolioData.projects.map(project => `
    <div class="project-card animate-on-scroll">
      <h3 class="project-title">${project.title}</h3>
      <p class="project-description">${project.description}</p>
      <div class="project-tags">
        ${project.tags.map(tag => `<span class="project-tag">${tag}</span>`).join('')}
      </div>
      <a href="${project.link}" class="project-link" target="_blank">
        View Project →
      </a>
    </div>
  `).join('');
}

// ===== Populate Experience =====
function populateExperience() {
  const timeline = document.querySelector('.timeline');
  timeline.innerHTML = portfolioData.experience.map(exp => `
    <div class="timeline-item animate-on-scroll">
      <h3 class="timeline-role">${exp.role}</h3>
      <p class="timeline-company">${exp.company}</p>
      <p class="timeline-period">${exp.period}</p>
      <p class="timeline-description">${exp.description}</p>
    </div>
  `).join('');
}

// ===== Populate Contact =====
function populateContact() {
  const githubLink = document.querySelector('.social-link.github');
  const linkedinLink = document.querySelector('.social-link.linkedin');

  githubLink.href = portfolioData.social.github || '#';
  linkedinLink.href = portfolioData.social.linkedin || '#';

  // Hide if not provided
  if (!portfolioData.social.github) githubLink.style.display = 'none';
  if (!portfolioData.social.linkedin) linkedinLink.style.display = 'none';
}

// ===== Scroll Animations =====
function initScrollAnimations() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
  });
}

// ===== Smooth Scroll =====
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}
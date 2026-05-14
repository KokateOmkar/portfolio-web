// ===== DOM Content Loaded =====
document.addEventListener('DOMContentLoaded', () => {
  populateProfile();
  populateAbout();
  populateSkills();
  populateProjects();
  populateExperience();
  populateEducation();
});

// ===== Profile Section =====
function populateProfile() {
  // Profile photo - use placeholder if no image
  const photoUrl = 'https://placehold.co/200x200?text=Photo';
  document.querySelector('.profile-photo').src = photoUrl;

  document.querySelector('.profile-name').textContent = portfolioData.hero.name;
  document.querySelector('.profile-title').textContent = portfolioData.hero.title;
  document.querySelector('.profile-location').textContent = portfolioData.about.location;

  // Social links
  const linkedinLink = document.querySelector('.social-icon.linkedin');
  const githubLink = document.querySelector('.social-icon.github');
  const kaggleLink = document.querySelector('.social-icon.kaggle');
  const mediumLink = document.querySelector('.social-icon.medium');
  const emailBtn = document.querySelector('.email-btn');

  linkedinLink.href = portfolioData.social.linkedin || '#';
  githubLink.href = portfolioData.social.github || '#';
  kaggleLink.href = portfolioData.social.kaggle || '#';
  mediumLink.href = portfolioData.social.medium || '#';

  // Show/hide social icons based on data
  if (!portfolioData.social.linkedin) linkedinLink.style.display = 'none';
  if (!portfolioData.social.github) githubLink.style.display = 'none';
  if (!portfolioData.social.kaggle) kaggleLink.style.display = 'none';
  if (!portfolioData.social.medium) mediumLink.style.display = 'none';

  // Email button
  if (portfolioData.about.email) {
    emailBtn.href = `mailto:${portfolioData.about.email}`;
  } else {
    emailBtn.style.display = 'none';
  }
}

// ===== About Section =====
function populateAbout() {
  document.querySelector('.about-bio').textContent = portfolioData.about.bio;
}

// ===== Skills Section =====
function populateSkills() {
  const skillsList = document.querySelector('.skills-list');
  skillsList.innerHTML = portfolioData.skills.map(skill =>
    `<span class="skill-pill">${skill.name}</span>`
  ).join('');
}

// ===== Projects Section =====
function populateProjects() {
  const projectsGrid = document.querySelector('.projects-grid');
  projectsGrid.innerHTML = portfolioData.projects.map(project => {
    // Generate placeholder image URL
    const encodedName = project.title.replace(/ /g, '+');
    const placeholderUrl = `https://placehold.co/600x300/e8f0fe/1a56db?text=${encodedName}`;

    return `
      <div class="project-card">
        <img src="${placeholderUrl}" alt="${project.title}" class="project-cover">
        <!-- TODO: Replace this src with your real image path e.g. ./images/project1.jpg -->
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
}

// ===== Experience Section =====
function populateExperience() {
  const experienceList = document.querySelector('.experience-list');
  experienceList.innerHTML = portfolioData.experience.map(exp => `
    <div class="experience-item">
      <p class="exp-date">${exp.period}</p>
      <h3 class="exp-role">${exp.role}</h3>
      <p class="exp-company">${exp.company}</p>
      <p class="exp-description">${exp.description}</p>
    </div>
  `).join('');
}

// ===== Education Section =====
function populateEducation() {
  const educationList = document.querySelector('.education-list');
  // Use education data from portfolio if available, otherwise show placeholder
  const educationData = portfolioData.education || [];

  if (educationData.length === 0) {
    // Hide education section if no data
    document.querySelector('.education-section').style.display = 'none';
    return;
  }

  educationList.innerHTML = educationData.map(edu => `
    <div class="education-item">
      <p class="edu-date">${edu.period}</p>
      <h3 class="edu-degree">${edu.degree}</h3>
      <p class="edu-institution">${edu.institution}</p>
      ${edu.notes ? `<p class="edu-notes">${edu.notes}</p>` : ''}
    </div>
  `).join('');
}
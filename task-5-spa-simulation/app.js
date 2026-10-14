// CourseHub SPA Application Controller
// Candidate: Sakshi (ID: 466235)

(function() {
  'use strict';

  // --- SPA Global State Store ---
  const state = {
    candidate: {
      name: 'Sakshi',
      enrollmentId: '466235',
      internship: 'Frontend Web Developer',
      organization: 'YuvaIntern',
      status: 'In Progress (5 Tasks Completed)'
    },
    bookmarks: JSON.parse(localStorage.getItem('spa_bookmarks_sakshi')) || [1],
    courses: [
      { id: 1, title: 'Modern HTML5 Semantic Engineering', category: 'HTML & CSS', level: 'Beginner', duration: '4 Hours', desc: 'Mastering document architecture, landmark elements, and accessibility best practices.', thumbClass: 'thumb-1', icon: '📐' },
      { id: 2, title: 'Responsive CSS Grid & Flexbox Mastery', category: 'Styling', level: 'Intermediate', duration: '6 Hours', desc: 'Developing fluid, multi-device layouts without third-party CSS dependencies.', thumbClass: 'thumb-2', icon: '📱' },
      { id: 3, title: 'Vanilla JavaScript DOM & Event Architecture', category: 'JavaScript', level: 'Intermediate', duration: '8 Hours', desc: 'Deep dive into event delegation, form validation, dynamic nodes, and localStorage.', thumbClass: 'thumb-3', icon: '⚡' },
      { id: 4, title: 'Single Page Application Routing & Architecture', category: 'Advanced Architecture', level: 'Advanced', duration: '10 Hours', desc: 'Simulating full client-side routers, view rendering engines, and modular states.', thumbClass: 'thumb-4', icon: '🚀' }
    ]
  };

  // --- Synchronize Bookmarks Badge ---
  function updateBookmarkBadge() {
    const badge = document.getElementById('bookmarkCountBadge');
    if (badge) {
      badge.textContent = state.bookmarks.length;
    }
  }

  function toggleBookmark(courseId) {
    if (state.bookmarks.includes(courseId)) {
      state.bookmarks = state.bookmarks.filter(id => id !== courseId);
    } else {
      state.bookmarks.push(courseId);
    }
    localStorage.setItem('spa_bookmarks_sakshi', JSON.stringify(state.bookmarks));
    updateBookmarkBadge();
  }

  // --- View Definitions ---
  const Views = {
    // 1. Dashboard View
    dashboard: async function() {
      return `
        <div class="hero-banner">
          <h1>Welcome back, ${state.candidate.name}!</h1>
          <p>This Single Page Application dynamically renders multiple views, updates browser history, and preserves client state with zero page reloads.</p>
          <div style="display:flex;gap:12px;">
            <a href="#/courses" class="btn" style="background:#ffffff;color:#4f46e5;">Browse Catalog</a>
            <a href="#/bookmarks" class="btn" style="background:rgba(255,255,255,0.2);color:#ffffff;">View Saved (${state.bookmarks.length})</a>
          </div>
        </div>

        <div class="quick-stats-grid">
          <div class="stat-box">
            <span class="title">Available Courses</span>
            <span class="num">${state.courses.length}</span>
          </div>
          <div class="stat-box">
            <span class="title">Bookmarked Modules</span>
            <span class="num">${state.bookmarks.length}</span>
          </div>
          <div class="stat-box">
            <span class="title">Active Internship Tasks</span>
            <span class="num">5 / 5 Done</span>
          </div>
          <div class="stat-box">
            <span class="title">Client-Side Router</span>
            <span class="num" style="color:#10b981;font-size:1.6rem;">Active (Hash API)</span>
          </div>
        </div>

        <h2 style="margin-bottom:20px;">Curated Modules</h2>
        <div class="courses-grid">
          ${renderCourseCards(state.courses.slice(0, 2))}
        </div>
      `;
    },

    // 2. Courses Catalog View
    courses: async function() {
      return `
        <div class="courses-toolbar">
          <div>
            <h2>Explore Curriculum</h2>
            <p style="color:var(--text-muted);font-size:0.95rem;">Interactive course catalog with client-side reactive filters.</p>
          </div>
          <input type="text" id="courseSearch" class="search-input" placeholder="Search courses by keyword...">
        </div>

        <div id="catalogGrid" class="courses-grid">
          ${renderCourseCards(state.courses)}
        </div>
      `;
    },

    // 3. Bookmarks View
    bookmarks: async function() {
      const bookmarkedCourses = state.courses.filter(c => state.bookmarks.includes(c.id));
      return `
        <div style="margin-bottom:28px;">
          <h2>Your Saved Modules (${bookmarkedCourses.length})</h2>
          <p style="color:var(--text-muted);font-size:0.95rem;">Modules you have pinned for offline study and rapid review.</p>
        </div>

        ${bookmarkedCourses.length > 0 ? `
          <div class="courses-grid">
            ${renderCourseCards(bookmarkedCourses)}
          </div>
        ` : `
          <div style="text-align:center;padding:80px 20px;background:#ffffff;border-radius:12px;border:1px solid var(--border);">
            <div style="font-size:3rem;margin-bottom:12px;">📑</div>
            <h3>No Bookmarked Courses</h3>
            <p style="color:var(--text-muted);margin-bottom:20px;">Explore the catalog and bookmark courses to review them here.</p>
            <a href="#/courses" class="btn btn-primary">Browse All Courses</a>
          </div>
        `}
      `;
    },

    // 4. Candidate Profile View
    profile: async function() {
      return `
        <div class="profile-card">
          <div class="profile-header">
            <div class="profile-avatar">${state.candidate.name.charAt(0)}</div>
            <div>
              <h2>${state.candidate.name}</h2>
              <p style="color:var(--primary);font-weight:700;">${state.candidate.internship} Intern</p>
            </div>
          </div>
          
          <div class="profile-info-row">
            <strong>Candidate ID</strong>
            <span>${state.candidate.enrollmentId}</span>
          </div>
          <div class="profile-info-row">
            <strong>Portal Organization</strong>
            <span>${state.candidate.organization}</span>
          </div>
          <div class="profile-info-row">
            <strong>Internship Progress</strong>
            <span style="color:#10b981;font-weight:700;">5 / 5 Modules Ready</span>
          </div>
          <div class="profile-info-row">
            <strong>Architecture</strong>
            <span>Single Page Application (SPA)</span>
          </div>

          <div style="margin-top:30px;text-align:center;">
            <a href="#/courses" class="btn btn-primary" style="width:100%;">Return to Learning Path</a>
          </div>
        </div>
      `;
    }
  };

  // Attach post-render hooks
  Views.dashboard.afterRender = attachCourseCardEvents;
  Views.courses.afterRender = () => {
    attachCourseCardEvents();
    const searchInput = document.getElementById('courseSearch');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase().trim();
        const filtered = state.courses.filter(c => c.title.toLowerCase().includes(query) || c.category.toLowerCase().includes(query));
        const grid = document.getElementById('catalogGrid');
        if (grid) {
          grid.innerHTML = renderCourseCards(filtered);
          attachCourseCardEvents();
        }
      });
    }
  };
  Views.bookmarks.afterRender = attachCourseCardEvents;

  function renderCourseCards(list) {
    return list.map(course => {
      const isBookmarked = state.bookmarks.includes(course.id);
      return `
        <article class="course-card" data-id="${course.id}">
          <div class="course-thumb ${course.thumbClass}">
            <span>${course.icon}</span>
          </div>
          <div class="course-body">
            <div class="course-meta">
              <span>${course.category}</span>
              <span>⏱ ${course.duration}</span>
            </div>
            <h3>${course.title}</h3>
            <p>${course.desc}</p>
            <div class="course-footer">
              <span style="font-size:0.85rem;color:var(--text-muted);font-weight:600;">Level: ${course.level}</span>
              <button class="bookmark-toggle ${isBookmarked ? 'bookmarked' : ''}" data-id="${course.id}">
                ${isBookmarked ? '★ Saved' : '☆ Save'}
              </button>
            </div>
          </div>
        </article>
      `;
    }).join('');
  }

  function attachCourseCardEvents() {
    document.querySelectorAll('.bookmark-toggle').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const courseId = Number(btn.getAttribute('data-id'));
        toggleBookmark(courseId);
        // re-render current view to reflect state cleanly
        window.router.handleRoute();
      });
    });
  }

  // --- Initialize Router & Application ---
  document.addEventListener('DOMContentLoaded', () => {
    updateBookmarkBadge();

    const routes = {
      '/': Views.dashboard,
      '/courses': Views.courses,
      '/bookmarks': Views.bookmarks,
      '/profile': Views.profile,
      '*': Views.dashboard
    };

    window.router = new Router(routes, 'app-root');
  });
})();

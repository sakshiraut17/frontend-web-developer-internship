// TaskPulse - Interactive Task Management Engine
// Candidate: Sakshi (ID: 466235)

(function() {
  'use strict';

  // --- State Management ---
  const STORAGE_KEY = 'taskpulse_tasks_sakshi';
  const THEME_KEY = 'taskpulse_theme_sakshi';

  let tasks = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
    { id: 1, title: 'Inspect wireframe design specifications', category: 'Design', priority: 'high', dueDate: '2026-10-18', completed: true },
    { id: 2, title: 'Implement CSS Flexbox & Grid layouts', category: 'Development', priority: 'high', dueDate: '2026-10-20', completed: true },
    { id: 3, title: 'Develop responsive media queries for mobile', category: 'Development', priority: 'medium', dueDate: '2026-10-25', completed: false },
    { id: 4, title: 'Integrate dynamic DOM event listeners', category: 'Testing', priority: 'high', dueDate: '2026-10-30', completed: false }
  ];

  let currentFilter = 'all';
  let searchQuery = '';

  // --- DOM Elements ---
  const taskListEl = document.getElementById('taskList');
  const emptyStateEl = document.getElementById('emptyState');
  const totalCountEl = document.getElementById('totalCount');
  const completedCountEl = document.getElementById('completedCount');
  const pendingCountEl = document.getElementById('pendingCount');
  const completionRateEl = document.getElementById('completionRate');

  const openModalBtn = document.getElementById('openModalBtn');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const cancelBtn = document.getElementById('cancelBtn');
  const taskModal = document.getElementById('taskModal');
  const taskForm = document.getElementById('taskForm');
  const taskTitleInput = document.getElementById('taskTitle');
  const titleError = document.getElementById('titleError');
  const taskCategorySelect = document.getElementById('taskCategory');
  const taskPrioritySelect = document.getElementById('taskPriority');
  const taskDueDateInput = document.getElementById('taskDueDate');

  const searchInput = document.getElementById('searchInput');
  const filterTabs = document.querySelectorAll('.filter-tab');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');

  // --- Initializer ---
  function init() {
    initTheme();
    bindEvents();
    renderTasks();
  }

  // --- Theme Toggle Logic ---
  function initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
    document.body.setAttribute('data-theme', savedTheme);
    themeIcon.textContent = savedTheme === 'dark' ? '☀️' : '🌙';
  }

  function toggleTheme() {
    const active = document.body.getAttribute('data-theme');
    const newTheme = active === 'dark' ? 'light' : 'dark';
    document.body.setAttribute('data-theme', newTheme);
    localStorage.setItem(THEME_KEY, newTheme);
    themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  }

  // --- Modal Management ---
  function openModal() {
    taskModal.classList.add('active');
    taskModal.setAttribute('aria-hidden', 'false');
    taskTitleInput.focus();
  }

  function closeModal() {
    taskModal.classList.remove('active');
    taskModal.setAttribute('aria-hidden', 'true');
    taskForm.reset();
    titleError.classList.remove('visible');
  }

  // --- Event Bindings ---
  function bindEvents() {
    themeToggleBtn.addEventListener('click', toggleTheme);
    openModalBtn.addEventListener('click', openModal);
    closeModalBtn.addEventListener('click', closeModal);
    cancelBtn.addEventListener('click', closeModal);

    // Close modal on outside click
    taskModal.addEventListener('click', (e) => {
      if (e.target === taskModal) closeModal();
    });

    // Close modal on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && taskModal.classList.contains('active')) {
        closeModal();
      }
    });

    // Form Submission with Validation
    taskForm.addEventListener('submit', handleTaskSubmit);

    // Search input event
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderTasks();
    });

    // Filter tab switching
    filterTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        filterTabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        currentFilter = tab.getAttribute('data-filter');
        renderTasks();
      });
    });

    // Event delegation on task list (toggle & delete)
    taskListEl.addEventListener('click', handleTaskListClicks);
  }

  // --- Form Validation & Submission ---
  function handleTaskSubmit(e) {
    e.preventDefault();
    const titleVal = taskTitleInput.value.trim();

    if (titleVal.length < 3) {
      titleError.classList.add('visible');
      taskTitleInput.focus();
      return;
    }
    titleError.classList.remove('visible');

    const newTask = {
      id: Date.now(),
      title: titleVal,
      category: taskCategorySelect.value,
      priority: taskPrioritySelect.value,
      dueDate: taskDueDateInput.value || 'No date',
      completed: false
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    closeModal();
  }

  // --- Task Item Actions ---
  function handleTaskListClicks(e) {
    const target = e.target;
    const taskItem = target.closest('.task-item');
    if (!taskItem) return;

    const taskId = Number(taskItem.getAttribute('data-id'));

    // Checkbox toggle
    if (target.classList.contains('task-checkbox')) {
      const task = tasks.find(t => t.id === taskId);
      if (task) {
        task.completed = target.checked;
        saveTasks();
        renderTasks();
      }
    }

    // Delete button
    if (target.closest('.delete-btn')) {
      tasks = tasks.filter(t => t.id !== taskId);
      saveTasks();
      renderTasks();
    }
  }

  // --- LocalStorage Sync ---
  function saveTasks() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  // --- Rendering & Filtering ---
  function renderTasks() {
    // Filter tasks
    let filtered = tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchQuery);
      if (!matchesSearch) return false;

      if (currentFilter === 'pending') return !task.completed;
      if (currentFilter === 'completed') return task.completed;
      if (currentFilter === 'high') return task.priority === 'high';
      return true;
    });

    // Update list UI
    taskListEl.innerHTML = '';

    if (filtered.length === 0) {
      emptyStateEl.style.display = 'flex';
    } else {
      emptyStateEl.style.display = 'none';
      filtered.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.setAttribute('data-id', task.id);

        const categoryClass = getCategoryBadgeClass(task.category);

        li.innerHTML = `
          <div class="task-left">
            <input type="checkbox" class="task-checkbox" ${task.completed ? 'checked' : ''} aria-label="Mark task complete">
            <div>
              <span class="task-text">${escapeHtml(task.title)}</span>
              <div class="task-badges">
                <span class="task-badge ${categoryClass}">${task.category}</span>
                <span class="priority-${task.priority}">● ${task.priority.toUpperCase()}</span>
                ${task.dueDate !== 'No date' ? `<span class="task-badge" style="background:#f1f5f9;color:#64748b;">📅 ${task.dueDate}</span>` : ''}
              </div>
            </div>
          </div>
          <button class="delete-btn" title="Delete task" aria-label="Delete task">&times;</button>
        `;
        taskListEl.appendChild(li);
      });
    }

    // Update Summary Statistics
    updateStats();
  }

  function getCategoryBadgeClass(category) {
    switch (category) {
      case 'Development': return 'badge-dev';
      case 'Design': return 'badge-design';
      case 'Testing': return 'badge-test';
      case 'Research': return 'badge-research';
      default: return 'badge-dev';
    }
  }

  function updateStats() {
    const total = tasks.length;
    const completed = tasks.filter(t => t.completed).length;
    const pending = total - completed;
    const rate = total > 0 ? Math.round((completed / total) * 100) : 0;

    totalCountEl.textContent = total;
    completedCountEl.textContent = completed;
    pendingCountEl.textContent = pending;
    completionRateEl.textContent = `${rate}%`;
  }

  function escapeHtml(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  // Run on DOM ready
  document.addEventListener('DOMContentLoaded', init);
})();

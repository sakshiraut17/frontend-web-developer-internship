// Client-Side Router for SPA Simulation
// Implements client-side hash routing, history handling, and dynamic template rendering

class Router {
  constructor(routes, rootElementId) {
    this.routes = routes;
    this.root = document.getElementById(rootElementId);
    this.currentRoute = null;

    // Listen to hash change and window load
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('load', () => this.handleRoute());
  }

  handleRoute() {
    let hash = window.location.hash.slice(1) || '/';
    
    // Clean hash path
    if (!hash.startsWith('/')) {
      hash = '/' + hash;
    }

    const route = this.routes[hash] || this.routes['*'];

    // Update active nav indicators
    this.updateActiveNav(hash);

    // Render view
    this.render(route, hash);
  }

  updateActiveNav(path) {
    const navLinks = document.querySelectorAll('.shell-nav .nav-link');
    navLinks.forEach(link => {
      const targetRoute = link.getAttribute('data-route');
      if (targetRoute === path) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });
  }

  async render(routeHandler, path) {
    if (!routeHandler) {
      this.root.innerHTML = `<div class="view-container"><h2>404 - Page Not Found</h2><p>The route <code>${path}</code> does not exist.</p><a href="#/" class="btn btn-primary" style="margin-top:20px;">Return to Dashboard</a></div>`;
      return;
    }

    // Show smooth loading state
    this.root.innerHTML = `
      <div class="loading-spinner-wrap">
        <div class="spinner"></div>
        <p>Loading view...</p>
      </div>
    `;

    // Simulate async network/rendering tick
    setTimeout(async () => {
      const htmlContent = await routeHandler();
      this.root.innerHTML = `<div class="view-container">${htmlContent}</div>`;
      if (typeof routeHandler.afterRender === 'function') {
        routeHandler.afterRender();
      }
    }, 150);
  }
}

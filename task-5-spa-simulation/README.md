# Task 5: Developing a Single Page Application (SPA) Simulation
**Candidate:** Sakshi (ID: 466235)  
**Internship:** Frontend Web Developer Internship - YuvaIntern  

## Overview
This project simulates a fully functional Single Page Application ("CourseHub SPA") implemented without monolithic client frameworks (like React or Angular). It demonstrates client-side hash routing, dynamic template rendering without page refreshes, browser history synchronization, and centralized application state.

## Key Features
- **Client-Side Hash Router (`router.js`):** Intercepts navigation transitions (`#/`, `#/courses`, `#/bookmarks`, `#/profile`), supporting seamless browser Back and Forward button interactions.
- **Dynamic View Outlet:** Dynamically mounts and unmounts views within the `#app-root` DOM shell.
- **Centralized Application State:** Retains live course catalogs, active user profile details, and user course bookmark toggles in browser `localStorage`.
- **CSS View Transitions:** Smooth fade-and-slide entry animations for a native application feel.
- **Zero Third-Party Bundlers:** 100% lightweight vanilla JavaScript.

## File Structure
- `index.html`: Main SPA application shell.
- `style.css`: Clean styling with view transition animations.
- `router.js`: Core client-side hash router class.
- `app.js`: State manager and view rendering controllers.
- `Task_5_Report.docx`: Detailed project report document.


// Function to apply dark mode styles
function applyDarkModeStyles() {
    const style = document.createElement('style');
    style.textContent = `
    body {
        background-color: #090c12;
        color: #E8EAED;
    }
    .task-incomplete,
    .task-complete,
    .card-body {
        background-color: #292a2d;
    }

    .card,
    .task-header,
    #taskContent .card .card-header:first-child {
        border-radius: 7px!important;
    }
    `;
    document.head.appendChild(style);
}

// Apply styles immediately in case the script runs after initial page load
applyDarkModeStyles();

// Apply styles again when the window has fully loaded
window.addEventListener('load', applyDarkModeStyles);


// Function to apply dark mode styles
function applyDarkModeStyles() {
    const style = document.createElement('style');
    style.textContent = `

    html {
        background-color: #1c2538;
    }

    #wrapper {
        background-color: #1c2538;
    }

    .path-header {
        background-color: #161e2d;
        color: #c7c7c7;
    }


    #accordion > .card > .card-header{
        border-radius: 7px;
    }
    `;
    document.head.appendChild(style);
}

// Apply styles immediately in case the script runs after initial page load
applyDarkModeStyles();

// Apply styles again when the window has fully loaded
window.addEventListener('load', applyDarkModeStyles);
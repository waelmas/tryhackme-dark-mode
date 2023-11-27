// inject with override styles to be applied depending on page and preferences
const darkModeStyles = {
    global: `
        span:not(.apexcharts-tooltip-marker):not(.badge):not(.mb-0):not(token):not([data-notify="message"]),
        table,
        table td,
        table th,
        .category-header-0 {
            background-color: transparent!important;
            color: #ffffff!important;
        }

        a.nav-link:not(.active) {
            color: #7a94c9;
        }

        div.popover {
            background-color: #090c12;
            color: #E8EAED;
        }
        div.faded {
            color: #8497a9;
        }

        .apexcharts-tooltip,
        .apexcharts-tooltip-title {
            background-color: #292a2d!important;
            color: #ffffff!important;
        }
        
        `,
    paths: `
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

        .popover-body > p.mb-2 {
            color: #c7c7c7;
        }
        `,
    room: `
        body,
        .modal-body {
            background-color: #090c12;
            color: #E8EAED;
        }

        p {
            background-color: transparent!important;
            color: #ffffff!important;
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


        .introjs-tooltip,
        div[data=notify-container] {
            color: #000000;
        }

        `
}


function getPreferences(callback){
    // get user preferences
    chrome.runtime.sendMessage(
        { action: "retrieveData", key: "preferences"},
        (response) => {
            const userPreferences = response.data;
            if (callback) callback(userPreferences);
        }
    );
};

function applyMods(userPreferences) {
    const styleId = "tryhackme-dark-mode-styles";
    let style = document.getElementById(styleId);

    const path = window.location.pathname;
    const match = path.match(/^\/([^\/]+)/);
    const page = match ? match[1] : undefined;
    var isModEnabled = page ? userPreferences[page] : false;

    if (isModEnabled) {
        if (!style) {
            // create style element if it doesn't exist
            style = document.createElement('style');
            style.id = styleId;
            document.head.appendChild(style);
            // apply global styles + page styles
            style.textContent = darkModeStyles.global;
            style.textContent += darkModeStyles[page];

            // also force set apexcharts theme to dark
            changeApexChartsTheme();

        }

    } else {
        // remove styles if previously added and now turned off
        if (style) {
            style.remove();
        }
    }
}


// check for preferences and apply styles after page load
window.addEventListener('load', getPreferences(applyMods));


// listen for changes to storage to apply changes to already loaded page
chrome.storage.onChanged.addListener(function(changes, namespace) {
    console.log(changes, namespace)
    if (namespace === "local" && changes.preferences) {
      getPreferences(applyMods);
    }
  });
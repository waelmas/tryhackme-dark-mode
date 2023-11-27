function showNotification(message, type) {
    const notification = document.getElementById("notification");
    notification.textContent = message;
    notification.classList.add(type);
    notification.style.display = "block";
    setTimeout(() => {
        notification.style.display = "none";
        notification.classList.remove(type);
    }, 3000);
}

function toggleButtonStatus(button) {
    if (button.textContent === 'ON') {
        button.textContent = 'OFF';
        button.classList.remove('active');
        return false;
    } else {
        button.textContent = 'ON';
        button.classList.add('active');
        return true;
    }
}

document.getElementById("room").addEventListener('click', function() {
    toggleButtonStatus(this);
});

document.getElementById("paths").addEventListener('click', function() {
    toggleButtonStatus(this);
});

function populateUserPreferences() {
    chrome.runtime.sendMessage(
        { action: "retrieveData", key: "preferences"},
        (response) => {
            if(chrome.runtime.lastError) {
                showNotification("Error retrieving preferences.", "error");
                return;
            }

            document.getElementById("room").classList.toggle('active', response.data.room);
            document.getElementById("room").textContent = response.data.room ? 'ON' : 'OFF';

            document.getElementById("paths").classList.toggle('active', response.data.paths);
            document.getElementById("paths").textContent = response.data.paths ? 'ON' : 'OFF';
        }
    );
}


document.getElementById('save-preferences').addEventListener('click', () => {
    let room = document.getElementById("room").textContent === 'ON';
    let paths = document.getElementById("paths").textContent === 'ON';

    const request = {
        action: 'storeData',
        key: 'preferences',
        value: { room: room, paths: paths }
    };

    chrome.runtime.sendMessage(request, (response) => {
        if(chrome.runtime.lastError) {
            showNotification("Error saving preferences.", "error");
        } else {
            showNotification("Preferences saved successfully!", "success");
        }
    });
});

function populateVersion() {
    
}


document.addEventListener("DOMContentLoaded", function () {
    populateUserPreferences();
});


chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {

        if (request.action === "storeData") {
            storeData(request.key, request.value, sendResponse);
            return true;
        }

        else if (request.action === "retrieveData") {
            retrieveData(request.key, sendResponse);
            return true;
        }

    }
);

// function to store data in Chrome storage
function storeData(key, value, sendResponse) {
    const structuredData = structureData(key, value);
    chrome.storage.local.set(structuredData, function() {
        if (chrome.runtime.lastError) {
            sendResponse({ error: chrome.runtime.lastError.message });
        } else {
            sendResponse({ success: true });
        }
    });
}

// function to retrieve data from Chrome storage
function retrieveData(key, sendResponse) {
    chrome.storage.local.get([key], function(result) {
        if (chrome.runtime.lastError) {
            sendResponse({ error: chrome.runtime.lastError.message });
        } else {
            if (result[key] === undefined) {
                // handle case when key does not exist in storage
                // use structureData to get the default value
                const defaultValue = structureData(key, {})[key];
                if (defaultValue !== undefined) {
                    sendResponse({ success: true, data: defaultValue });
                } else {
                    sendResponse({ success: false, error: "Key does not exist in storage" });
                }
            } else {
                sendResponse({ success: true, data: result[key] });
            }
        }
    });
}

// function to structure data before storing
function structureData(key, value) {
    // use exact names seen in url path
    if (key === "preferences") {
        // default values and structure
        const defaultPreferences = {
            room: true,
            paths: true
        };
        
        // merge default values with provided values
        const structuredPreferences = {
            ...defaultPreferences,
            ...value
        };
        
        return { [key]: structuredPreferences };
    }

    // default to storing value as-is
    return { [key]: value };
}



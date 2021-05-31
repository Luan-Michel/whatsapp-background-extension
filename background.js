if (chrome.browserAction){
    chrome.browserAction.onClicked.addListener(buttonClicked);
    function buttonClicked(tab) {
        chrome.tabs.sendMessage(tab.id, { message: "getInputImage" });
    }
}
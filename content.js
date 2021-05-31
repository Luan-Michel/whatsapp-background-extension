chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.addEventListener("change", function (e) {
        var reader = new FileReader();
        reader.readAsDataURL(this.files[0]);
        reader.onload = function () {
            url = reader.result;
        };
    }, false);

    fileInput.click();
    return true;
});

// Select the node that will be observed for mutations
const targetNode = document.getElementsByTagName('body')[0];

// Options for the observer (which mutations to observe)
const config = { childList: true, subtree: true };
if (typeof url === 'undefined') {
    // your code here
    const file = 'images/image.jpg';
    var url = chrome.extension.getURL(file);
}


// Callback function to execute when mutations are observed
const callback = function (mutationsList, observer) {
    // Use traditional 'for loops' for IE 11
    for (const mutation of mutationsList) {
        if (mutation.type === 'childList') {
            let img = document.getElementsByClassName('IeYBo')[0];
            if (img && img.url != url) {
                img.style.backgroundImage = "url('" + url + "')";
                img.style.backgroundSize = "100% 100%";
                img.style.opacity = "1.00";
            }
        }
    }
};

// Create an observer instance linked to the callback function
const observer = new MutationObserver(callback);

// Start observing the target node for configured mutations
observer.observe(targetNode, config);
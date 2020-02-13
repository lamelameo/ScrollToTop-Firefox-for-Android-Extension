
console.log("background running");
// allow user to turn off button for any site
// use a simple txt file to save sites?
let text = browser.runtime.getURL("blocked_sites.txt");

var dict = {};
// check if current url is blocked before injecting content script
browser.runtime.onMessage.addListener(
    function(message, callBack) {
        if (message == "runContentScript") {
            browser.tabs.executeScript({
                file: "/scroll_to_top/scroll_button.js",
                allFrames: true
            });
            console.log("sent script")
        }
    }
);

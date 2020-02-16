
console.log("background running");
// allow user to turn off button for any site
// can use storage.local to store simple url data
// let blocked = browser.storage.local.get();

var dict = {};
var currentUrl;
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

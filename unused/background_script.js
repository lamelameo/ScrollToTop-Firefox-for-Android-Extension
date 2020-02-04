
console.log("background running");
// hide scroll button after 1 second of scrolling stopping
var isScrolling;
window.addEventListener("scroll", function (event) {
    console.log("is scrolling");
    console.log("scrolling stopped");
    let msg = {
        txt: "gogogo"
    }
    // Need to get tab id from content script...
    id = 0
    browser.tabs.sendMessage(id, msg);
}, false);

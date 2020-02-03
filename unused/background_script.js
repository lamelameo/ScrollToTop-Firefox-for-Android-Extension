
console.log("background running");
// hide scroll button after 1 second of scrolling stopping
var isScrolling;
window.addEventListener("scroll", function (event) {
    console.log("is scrolling");
    // clear any previous delayed function calls if we scroll before they have gone off yet
    window.clearTimeout(isScrolling);
    // set delayed function call to hide button after 1 second
    isScrolling = this.setTimeout(function() {
        console.log("scrolling stopped");
        let msg = {
            txt: "gogogo"
        }
        // Need to get tab id from content script...
        id = 0
        browser.tabs.sendMessage(id, msg);
    }, 1000);
}, false);



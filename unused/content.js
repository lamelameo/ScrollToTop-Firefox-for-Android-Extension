
console.log("script sent");
// must inject script to page so we can detect scrolls even if page changes
var script = document.createElement("script");
script.src = browser.runtime.getURL("scroll_button.js");
(document.head || document.documentElement).appendChild(script);
script.parentNode.removeChild(script);

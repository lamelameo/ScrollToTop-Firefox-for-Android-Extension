
// SETUP
console.log("setup started");
scrollButton = document.createElement("BUTTON");
scrollButton.id = "scrollTopButton";
scrollButton.style.display = "none";
scrollButton.onclick = function() {scrollFunction()};

// get browser inner dimensions so we can position the button appropriately at centre of the window
// NOTE: will be positioned wrong if window is not maximised, shouldnt be a problem for mobile?
var intFrameWidth = window.innerWidth;
var intFrameHeight = window.innerHeight;
// console.log("browser height: " + toString(intFrameHeight));
var intButtonWidth = scrollButton.style.width;
var alignLeft = (intFrameWidth - intButtonWidth)/2;
scrollButton.style.position = "fixed";
scrollButton.style.zIndex = "999";  // keep above other elements apparently
scrollButton.style.bottom = "10px";
scrollButton.style.left = alignLeft.toString(10)+"px";
// div.appendChild(scrollButton);
document.body.appendChild(scrollButton);

// PROBLEM: sites such as reddit and google images open a new overlays when you click a links,
// which then stops our content script from recieving scroll events - HOW to fix?

// show scroll to top button if user scrolls then hide scroll button after 1 second of scrolling stopping
var isScrolling;
buttonShown = false;
window.addEventListener("scroll", function (event) {
    // console.log("is scrolling");
    showButton();
    // clear any previous delayed function calls if we scroll before they have gone off yet
    window.clearTimeout(isScrolling);
    // set delayed function call to hide button after ~1 second
    isScrolling = this.setTimeout(function() {
        buttonShown = false;
        scrollButton.style.display = "none";
    }, 1000);
}, false);

// shows button if hidden
function showButton() {
    if (buttonShown) {
            return;
    }
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        scrollButton.style.display = "block";
        buttonShown = true;
    } else {
        scrollButton.style.display = "none";
    }
}

// scrolls to top of page and hides button
function scrollFunction() {
    // console.log("scrolled to top");
    // document.documentElement.scrollTop = 0;
    window.scrollTo({
        top: 0,
        left: 0,
        behaviour: "smooth"
    });
    scrollButton.style.display = "none";
    buttonShown = false;
}

// use a div to cover the whole browser to ensure no popup elements catch scrolls before we do
// var scrollInterceptor = document.createElement("div");
// scrollInterceptor.id = "scrollInterceptor";
// scrollInterceptor.style.width = intFrameWidth;
// scrollInterceptor.style.height = intFrameHeight;
// scrollInterceptor.addEventListener("scroll", (e) => {
//     console.log("scroll intercepted");
// })
// document.body.appendChild(scrollInterceptor);

// listen for message from background script
// browser.runtime.onMessage.addListener(gotMessage);
// function gotMessage(message) {
//     console.log("got scroll"+ message.txt);
//     buttonShown = false;
//     scrollButton.style.display = "none";
// }

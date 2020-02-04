
// SETUP
console.log("setup started");
scrollButton = document.createElement("BUTTON");
scrollButton.id = "scrollTopButton";
scrollButton.onclick = function() {scrollFunction()};
document.body.appendChild(scrollButton);

// TODO: insert <div> <style> <button> ??

// get browser inner dimensions so we can position the button appropriately at centre of the window
// NOTE: will be positioned wrong if window is not maximised, shouldnt be a problem for mobile?
var intFrameWidth = window.innerWidth;
var intFrameHeight = window.innerHeight;
var intButtonWidth = scrollButton.offsetWidth;
var alignLeft = (intFrameWidth - intButtonWidth)/2;
scrollButton.style.left = alignLeft.toString(10)+"px";

// PROBLEM: sites such as reddit and google images make hidden content visible when you click links
// which then stops our content script from recieving scroll events - presumably since they consume
// the events before they bubble back to our button appended directly to body of document.
// Think you can catch the event on its way down first, but we would want to make the button appear
// over the new content and scroll inside that container not the original one. Example: reddit makes
// a hidden scroll container visible over the main page which is itself scrollable, which we would want 
// to catch the events make our button appear higher than it, (it should since that element is not fixed)
// and then when clicked it should scroll in this container not the now background reddit homepage

// show scroll to top button if user scrolls then hide scroll button after 1 second of scrolling stopping
var isScrolling;
buttonShown = false;
window.addEventListener("scroll", function (event) {
    showButton();
    // use delayed calls and clear any existing calls if scroll occurs
    window.clearTimeout(isScrolling);
    isScrolling = this.setTimeout(function() {
        buttonShown = false;
        scrollButton.style.visibility = "hidden";
    }, 1000);
}, false);

// shows button if hidden
function showButton() {
    if (buttonShown) {
            return;
    }
    if (document.body.scrollTop > 10 || document.documentElement.scrollTop > 10) {
        scrollButton.style.visibility = "visible";
        buttonShown = true;
    } else {
        scrollButton.style.visibility = "hidden";
    }
}

// scrolls to top of page and hides button
function scrollFunction() {
    window.scroll({
        left: 0,
        top: 0,
        behavior: "smooth"
    });
    scrollButton.style.visibility = "hidden";
    buttonShown = false;
}

// use a div to cover the whole browser to ensure no popup elements catch scrolls before we do
var scrollInterceptor = document.createElement("div");
scrollInterceptor.id = "scrollInterceptor";
scrollInterceptor.style.position = "fixed";
scrollInterceptor.style.zIndex = "999";
scrollInterceptor.style.width = intFrameWidth;
scrollInterceptor.style.height = intFrameHeight;
scrollInterceptor.addEventListener("scroll", (e) => {
    console.log("scroll intercepted");
})
document.body.appendChild(scrollInterceptor);

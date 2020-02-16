// Setup
console.log("scrollToTop setup.");
var scrollDiv = document.createElement("div");
scrollDiv.id = "scrollButtonDiv";
scrollButton = document.createElement("BUTTON");
scrollButton.id = "scrollTopButton";
scrollButton.addEventListener("click", scrollFunction, false);
scrollDiv.appendChild(scrollButton);
document.body.appendChild(scrollDiv);
window.addEventListener("scroll", scrollListener, true);

// set global variables so scroll button can target elements which are being scrolled
var isScrolling;
var buttonShown = false;
var scrolledElement;
var scrollTarget;
// listen for scroll events, determine and store the target, and show the scroll button
// hide scroll button after 1 second of scrolling stopping
function scrollListener(event) {
    // only update variables if the scrolled element has changed since last scroll event
    if (scrolledElement != event.target) {
        scrolledElement = event.target;
        scrollTarget = event.target;
        // if scrolled element is HTMLDocument, we need to change variables so operations work
        if (event.target instanceof HTMLDocument) {
            scrollTarget = window;
        }
    }
    
    // get current scroll position of scrolled element, should be cross browser compatible using scrollY
    if (event.target instanceof HTMLDocument) {
        scrolledY = window.scrollY
    } else {
        scrolledY = event.target.scrollTop;
    }

    // if button is below threshold and not already shown, then make it visible
    if (scrolledY > 50) {
        if (!buttonShown) {
            scrollButton.style.visibility = "visible";
            buttonShown = true;
        }
    // if button is above threshold and shown, make it hidden
    } else {
        if (buttonShown) {
            scrollButton.style.visibility = "hidden";
            buttonShown = false;
        }
    }

    // use delayed call to hide button after 1s, clear any existing calls as we have resumed scrolling
    window.clearTimeout(isScrolling);
    isScrolling = this.setTimeout(function() {
        buttonShown = false;
        scrollButton.style.visibility = "hidden";
    }, 1000);
}

// scrolls to top of page, tried to accommodate browsers which dont allow options with .scroll method
function scrollFunction() {
    // console.log('scroll to top')
    try {
        scrollTarget.scroll({
        left: 0,
        top: 0,
        behavior: "smooth"
        });
    } catch (error) {
        // console.log(error);
        scrollTarget.scroll(0,0);
    }
    // remove focus of the button or we get annoying dotted outline on mobile
    document.getElementById("scrollTopButton").blur();
}

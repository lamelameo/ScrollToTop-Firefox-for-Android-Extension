// SETUP
console.log("setup started");
scrollButton = document.createElement("BUTTON");
scrollButton.id = "scrollTopButton";
scrollButton.addEventListener("click", scrollFunction, false);
document.body.appendChild(scrollButton);
window.addEventListener("scroll", scrollListener, true);

// get browser inner dimensions so we can position the button appropriately at centre of the window
// NOTE: will be positioned wrong if window is not maximised, shouldnt be a problem for mobile?
var scrollButtonalignLeft = (window.innerWidth - scrollButton.offsetWidth)/2;
scrollButton.style.left = scrollButtonalignLeft.toString(10)+"px";

// set global variables so scroll button can target elements which are being scrolled
var isScrolling;
var buttonShown = false;
var scrolledElement;
var scrollTarget;
// listen for scroll events, determine and store the target, and show the scroll button
// hide scroll button after 1 second of scrolling stopping
function scrollListener(event) {
    console.log(event);
    // only update variables if the scrolled element has changed since last scroll event
    if (scrolledElement != event.target) {
        scrolledElement = event.target;
        scrollTarget = event.target;
        // if scrolled element is HTMLDocument, we need to change variables so operations work
        if (event.target instanceof HTMLDocument) {
            scrollTarget = window;
        }
    }
    
    // get current scroll position of scrolled element - should be cross browser compatible
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

    // use delayed calls and clear any existing calls if scroll occurs
    window.clearTimeout(isScrolling);
    isScrolling = this.setTimeout(function() {
        buttonShown = false;
        scrollButton.style.visibility = "hidden";
    }, 1000);
}

// scrolls to top of page, tried to accomodate browsers which dont allow options
function scrollFunction() {
    // console.log('scroll to top')
    try {
        scrollTarget.scroll({
        left: 0,
        top: 0,
        behavior: "smooth"
        });
    } catch (error) {
        scrollTarget.scroll(0,0);
    }
    // remove focus of the button
    document.getElementById("scrollTopButton").blur();
}

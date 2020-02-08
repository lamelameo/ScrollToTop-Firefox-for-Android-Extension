
// SETUP
console.log("setup started");
scrollButton = document.createElement("BUTTON");
scrollButton.id = "scrollTopButton";
scrollButton.onclick = function() {scrollFunction()};
document.body.appendChild(scrollButton);

// get browser inner dimensions so we can position the button appropriately at centre of the window
// NOTE: will be positioned wrong if window is not maximised, shouldnt be a problem for mobile?
var intFrameWidth = window.innerWidth;
var intFrameHeight = window.innerHeight;
var intButtonWidth = scrollButton.offsetWidth;
var alignLeft = (intFrameWidth - intButtonWidth)/2;
scrollButton.style.left = alignLeft.toString(10)+"px";

// show scroll to top button if user scrolls then hide scroll button after 1 second of scrolling stopping
var isScrolling;
var buttonShown = false;
var scrollTarget;
var scrollDoc;
// var bubbles;
window.addEventListener("scroll", function (event) {
    scrollDoc = event.target;
    console.log(event);
    if (scrollTarget != event.target) {
        scrollTarget = event.target;
        // bubbles = true;
        if (event.target instanceof HTMLDocument) {
            console.log('bad');
            scrollTarget = window;
            scrollDoc = document.documentElement;
            // bubbles = false
        }
    }
    
    // ignore scroll to top induced scroll calls
    // if (event.detail == "scroll to top") {
    //     console.log('ahhh');
    //     return;
    // }
    showButton();
    // use delayed calls and clear any existing calls if scroll occurs
    window.clearTimeout(isScrolling);
    isScrolling = this.setTimeout(function() {
        buttonShown = false;
        scrollButton.style.visibility = "hidden";
    }, 1000);
}, true);

// BUG: reddit - keep at top of page and click thread, then when we scroll in overlay, button doesnt 
// appear as document.scrolltop is at 0 for the main page

// show or hide button
function showButton() {
    // if button is below threshold and not already shown, then make it visible
    if (scrollDoc.scrollTop > 50 || document.body.scrollTop > 50) {
        // console.log('show button?');
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
}

// scrolls to top of page
function scrollFunction() {
    // scrollTarget.dispatchEvent(new CustomEvent("scroll", {
    //     // isTrusted: true,
    //     left: 0,
    //     top: 0,
    //     behavior: "smooth",
    //     detail: "scroll to top",
    //     bubbles: true,
    //     cancelable: true
    // }));

    scrollTarget.scroll({
        left: 0,
        top: 0,
        behavior: "smooth"
    });
    scrollButton.blur();
    // scrollButton.visibility = "hidden";
    // buttonShown = false;
}

// let scrollableElement = document.querySelector("[overflow-y]");
// console.log("scroll element: " + scrollableElement);

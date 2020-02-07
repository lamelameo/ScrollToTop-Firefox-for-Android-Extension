
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
var buttonShown = false;
var scrollTarget;
window.addEventListener("scroll", function (event) {
    scrolledElement = event.target;
    if (scrollTarget != scrolledElement) {
        scrollTarget = scrolledElement;
    }
    console.log(event.target);
    // console.log(window.top);
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
    if (scrollTarget.scrollTop > 50 || document.body.scrollTop > 50) {
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
    scrollTarget.scroll({
        left: 0,
        top: 0,
        behavior: "smooth"
    });
    // scrollButton.blur();
}

let scrollableElement = document.querySelector("[overflow-y]");
console.log("scroll element: " + scrollableElement);

// var iframe = document.querySelector("iframe");
// iframe.addEventListener("mozbrowserscrollviewchanged", function(event) {
//     console.log("new scroll area: "+ event.details.width);
// });

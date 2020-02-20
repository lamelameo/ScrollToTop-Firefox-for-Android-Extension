# ScrollToTop Firefox for Android Extension
A browser extension intended for the ***Firefox for Android*** browser for mobile devices. 
- Should be cross-browser compatible (works for Mozilla on desktop), however, may not work for some.
- Injects a content script to add a simple dynamic scroll to top button when the user scrolls on a page.
- Button appears at the bottom/middle of the screen during scrolling if the element is scrolled below a threshold. 
- Button will hide itself after 1 second if no more scrolling occurs or the page is scrolled above the threshold again.
- The scrolling will apply to whichever element was last scrolled, see below for an example with Google Images.

Download the extension at: https://addons.mozilla.org/en-US/android/addon/scroll-to-top-android/
Or download and install manually by following these [instructions](https://extensionworkshop.com/documentation/develop/developing-extensions-for-firefox-for-android/) using the following: icons, images, manifest.json, scroll_button.css, scroll-button.js.

Screenshot of extension on Firefox for Android:  
![alt_text](screenshots/android_screenshot.jpg)

Gif of the functionality of the button on Mozilla on desktop:  
![alt_text](screenshots/screencapture.gif)

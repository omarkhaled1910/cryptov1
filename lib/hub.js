// Website header variables
var tabber = document.querySelectorAll(".vertical_animation_slides");

const targetElement = document.querySelector(".vertical_animation_slides");

var currentIndex = 0;
const intervalTimeout = 3000;
const breakPoint = 750;

const viewportWidth = window.innerWidth;
const imageSelector =
  viewportWidth < breakPoint
    ? ".vertical_slide_image_mobile"
    : ".vertical_slide_image";
const tobeAnimatedItems = targetElement.querySelectorAll(
  ".vertical_line_to_be_animated"
);
const tobeAnimatedImages = targetElement.querySelectorAll(imageSelector);
const imagesContent = document.querySelectorAll(
  ".vertical_slide_image_container"
);

const tabsContent = document.querySelectorAll(
  ".vertical_animation_slides_content_wrapper"
);
const tabsContentArray = Array.from(tabsContent);

let currentSelectedId;
// Desktop menu
// Options for the IntersectionObserver

////////////////////////

const options = {
  threshold: 0.2, // Trigger when at least 50% of the element is in view
};

// Callback function to handle intersection changes
function handleIntersection(entries, observer) {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // Start auto slide when component is in view

      startAutoSlide();
    } else {
      // Stop auto slide when component is not in view
      stopAutoSlide();
    }
  });
}

const observer = new IntersectionObserver(handleIntersection, options);

// Target element to observe

// Observe the target element
if (targetElement) {
  observer.observe(targetElement);
}

const autoSlide = () => {
  console.log(
    "Timeout executed every 3 seconds",
    tobeAnimatedItems,
    tobeAnimatedImages,
    currentIndex,
    currentIndex === tobeAnimatedItems.length - 1
  );
  let selectedTabContent;
  tabsContent.forEach((tab) => {
    if (tab.id !== currentSelectedId) {
      selectedTabContent = tab;
      return; // Stop iteration once the desired element is found
    }
  });

  if (currentIndex === selectedTabContent.children.length - 1) {
    stopAutoSlide();
    return;
  }
  ++currentIndex;
  tobeAnimatedItems[currentIndex].classList.add("animate");
  tobeAnimatedImages.forEach((img) => {
    img.classList.remove("show_img");
  });

  tobeAnimatedImages[currentIndex].classList.add("show_img");
};
function startAutoSlide() {
  // Set interval to run auto slide function every X milliseconds
  // Replace 3000 with your desired interval in milliseconds

  const intervalID = setInterval(autoSlide, intervalTimeout);
  tabsContent.forEach((tab) => {
    if (tab.id !== currentSelectedId) {
      selectedTabContent = tab;
      return; // Stop iteration once the desired element is found
    }
  });

  if (currentIndex < selectedTabContent.children.length - 1) {
    tobeAnimatedItems[0].classList.add("animate");
    tobeAnimatedImages[0].classList.add("show_img");
  }

  // Store the interval ID for later use
  if (targetElement.dataset.intervalID) {
    stopAutoSlide();
  }
  targetElement.dataset.intervalID = intervalID;
}
function stopAutoSlide() {
  // Clear the interval when component is not in view
  clearInterval(targetElement.dataset.intervalID);
}

handleIntersection([
  {
    target: targetElement,
    isIntersecting:
      targetElement.getBoundingClientRect().top < window.innerHeight,
  },
]);

const buttonsTabs = document.querySelectorAll(
  ".vertical_animation_slides_button_container"
);

tabsContent[0].style.display = "block";
imagesContent[0].style.display = "block";
currentSelectedId = tabsContent[0].id;
buttonsTabs.forEach((tab) => {
  tab.addEventListener("click", (event) => {
    const id = event.target.id;
    console.log("tab with id clicked", id, tabsContent);
    tab.classList.add("pri_button");
    buttonsTabs.forEach((button) => {
      if (button.id === id) {
        button.classList.add("pri_button");
        button.classList.remove("sec_button");
      } else {
        button.classList.remove("pri_button");
        button.classList.add("sec_button");
      }
    });

    tabsContent.forEach((ele) => {
      currentIndex = 0;
      startAutoSlide();
      ele.id === id
        ? (ele.style.display = "block")
        : (ele.style.display = "none");
    });
  });
});

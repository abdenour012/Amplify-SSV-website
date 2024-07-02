window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// header fade in
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};
window.addEventListener("load", () => {
  const header = document.querySelector("header");

  setTimeout(() => {
    header.classList.add("fade-in");
  }, 1200); // 2000 milliseconds (2 seconds) delay
});

const parallax_el = document.querySelectorAll(".parallax");
const main = document.querySelector("main");
let xValue = 0;
let yValue = 0;
let zParam = 0;
let rotateDegree = 0;

// Function to apply transformations
function applyTransformations() {
  parallax_el.forEach((el) => {
    let speedx = el.dataset.speedx;
    let speedy = el.dataset.speedy;
    let speedz = el.dataset.speedz;
    rotateDegree = (xValue / (window.innerWidth / 2)) * 20;
    let rotationSpeed = el.dataset.rotation;
    let speed = 0.35;
    let isInLeft = parseFloat(getComputedStyle(el).left) < window.innerWidth / 2 ? 1 : -1;
    let zValue = (zParam - parseFloat(getComputedStyle(el).left)) * isInLeft * 0.15;
    let transform = `translateX(calc(-50% + ${-xValue * speedx * speed}px)) translateY(calc(-50% + ${-yValue * speedy * speed}px)) perspective(2300px) rotateY(${
      rotateDegree * rotationSpeed
    }deg) translateZ(${zValue * speedz}px)`;

    if (el.dataset.rotateon === "rotate") {
      let rotation = xValue * 0.04;
      transform += ` rotate(${rotation}deg)`;
    }

    el.style.transform = transform;
  });
}

// Event listener for mouse movement
window.addEventListener("mousemove", (e) => {
  xValue = e.clientX - window.innerWidth / 2;
  yValue = e.clientY - window.innerHeight / 2;
  zParam = e.clientX;
  isPaused = true;
  setTimeout(() => (isPaused = false), 500);

  applyTransformations(); // Use xValue here
});

// Automatic horizontal animation
let isPaused = false;
let direction = 1;
const maxX = window.innerWidth / 2.1;
const minX = -window.innerWidth / 2.1;
const pauseTime = 1000;
const updateInterval = 10;
const animationSpeed = 1;

function animateX() {
  if (!isPaused) {
    zParam += direction * animationSpeed;
    xValue += direction * animationSpeed;

    if (xValue >= maxX || xValue <= minX) {
      direction *= -1;
      isPaused = true;
      setTimeout(() => (isPaused = false), pauseTime);
    }

    applyTransformations(); // Pass xValue directly
    console.log(xValue);
    console.log(zParam + "lol");
  }
  setTimeout(() => requestAnimationFrame(animateX), updateInterval);
}

animateX();
// Gsap animation
let timeline = gsap.timeline();
parallax_el.forEach((el) => {
  timeline.from(
    el,
    {
      top: `${el.offsetHeight / 2 + el.dataset.distance * 1.3}px`,
      duration: 3,
      ease: "power3.out",
    },
    "1s"
  );
});

if (window.innerWidth >= 725) {
  main.style.maxHeight = `${window.innerWidth * 0.5}px`;
}

let darkIcon = document.getElementById("darkmode__toggle");

darkIcon.onclick = function () {
  document.body.classList.toggle("light__theme");
  if (document.body.classList.contains("light__theme")) {
    document.getElementById("logo").src = "imgs/amplify__logo--black.png";
    document.getElementById("bg-img").src = "imgs/light-bg l.jpg";
  } else {
    document.getElementById("logo").src = "imgs/amplify__logo--white.png";
    document.getElementById("bg-img").src = "imgs/dark-bg s.jpg";
  }
};

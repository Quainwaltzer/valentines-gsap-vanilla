const text = document.querySelector(".love-text");
text.innerHTML = text.textContent.replace(/\S/g, "<span>$&</span>");

gsap.from(".love-text span", {
  y: 10,         // start 50px below
  opacity: 0,    // start invisible
  duration: 0.5,
  stagger: .1,  // each letter starts 0.1s after the previous
  ease: "back.out(1.7)"
});

gsap.to(text, {
  scale: 1.1,
  repeat: -1,
  yoyo: true,
  duration: 1,
  ease: "power2.inOut"
});
const cursor = document.querySelector('.custom-cursor');

document.addEventListener('mousemove', e => {
  gsap.to(cursor, {
    duration: 1.5,        // smoothness / lag time
    x: e.clientX,
    y: e.clientY,
    ease: "elastic.out(1, 0.4)"
  });
});

const buttons = document.querySelectorAll('.btn');

buttons.forEach(btn => {
  btn.addEventListener('mouseenter', () => {
    gsap.to('.custom-cursor', { scale: 1.2, duration: 0.3, rotation: -30, ease: "power2.inOut"});
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to('.custom-cursor', { scale: 1, duration: 0.3, rotation: 0, ease: "power2.inOut"});
  });
});

const layers = gsap.utils.toArray('.bg-layer');

document.addEventListener('mousemove', e => {
  const x = (e.clientX / window.innerWidth - 0.5) * 5; // -1 to 1
  const y = (e.clientY / window.innerHeight - 0.5) * 5; // -1 to 1

  layers.forEach((layer, i) => {
    const speed = (i + 1) * 10; // layer speed multiplier
    gsap.to(layer, {
      x: x * speed,
      y: y * speed,
      duration: 2,
      ease: "power2.out"
    });
  });
});

const noButton = document.querySelector(".no");
const noWrapper = document.querySelector(".no-wrapper");
let click = 0;

const originalRect = noButton.getBoundingClientRect();
const originX = originalRect.left;
const originY = originalRect.top;

noButton.addEventListener("click", (e) => {
    e.preventDefault();

    const words = ["Why?", "Sure ka na ba dyan?", "Hays bat ayaw mo :((", "dali na pls", "daya", "wew", "Manok ng House of Oppa", "hahahhahahah", "toasted habhab"];
    noButton.innerHTML = words[click];

    const endWidth = noButton.scrollWidth;

    // 4. Animate the wrapper to that specific pixel value
    // This makes the 'Yes' button slide over gracefully
    noWrapper.style.width = `${endWidth}px`;

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const margin = 20;
    const targetX = Math.random() * (window.innerWidth - buttonWidth - margin * 2) + margin;
    const targetY = Math.random() * (window.innerHeight - buttonHeight - margin * 2) + margin;

    const moveX = targetX - originX;
    const moveY = targetY - originY;

    noButton.style.transform = `translate(${moveX}px, ${moveY}px)`;

    if (click < words.length - 1) click++;
});

// const noButton = document.querySelector(".no");
// let click = 0;

// noButton.addEventListener("click", (e) => {
//     e.preventDefault();
    
//     if (noButton.style.position !== 'absolute') {
//         noButton.style.position = 'absolute';
//     }

//     const words = ["Why?", "Sure ka na ba dyan?", "Hays bat ayaw mo :(("];
//     noButton.innerHTML = words[click];

  
//     const buttonWidth = noButton.offsetWidth;
//     const buttonHeight = noButton.offsetHeight;

   
//     const margin = 20;
//     const targetX = Math.random() * (window.innerWidth - buttonWidth - margin * 2) + margin;
//     const targetY = Math.random() * (window.innerHeight - buttonHeight - margin * 2) + margin;

//     noButton.style.left = `${targetX}px`;
//     noButton.style.top = `${targetY}px`;
//     noButton.style.transform = "none"; 

//     if (click < words.length - 1) click++;
// });
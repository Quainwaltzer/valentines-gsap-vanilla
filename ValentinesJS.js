const loveTexts = document.querySelectorAll(".love-text");

loveTexts.forEach((el) => {
    let newHTML = "";

    el.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {

            newHTML += node.textContent.replace(/\S/g, "<span>$&</span>");
        } else if (node.nodeType === Node.ELEMENT_NODE) {

            const innerText = node.textContent.replace(/\S/g, "<span>$&</span>");

            newHTML += `<span class="${node.className}">${innerText}</span>`;
        }
    });

    el.innerHTML = newHTML;
});

const tl = gsap.timeline();

tl.from(".love-text span", {
    y: 10,
    opacity: 0,
    duration: 0.5,
    stagger: 0.05,
    ease: "back.out(1.7)"
});


tl.to(".red", {
    "--bg-width": "100%", 
    duration: 0.8,
    ease: "expo.out"
}, "-=0.2");
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
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);

    layers.forEach((layer) => {
        const speed = parseFloat(layer.getAttribute('data-speed')) || 1;

        gsap.to(layer, {
            x: x * speed * 50, 
            y: y * speed * 50,
            duration: 1.5,
            ease: "power2.out",
            overwrite: "auto"
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
    noWrapper.style.width = `${endWidth}px`;

    const buttonWidth = noButton.offsetWidth;
    const buttonHeight = noButton.offsetHeight;

    const footerHeight = window.innerHeight * 0.1; 
    const availableHeight = window.innerHeight - footerHeight;

    const margin = 20;

    const targetX = Math.random() * (window.innerWidth - buttonWidth - margin * 2) + margin;
    const targetY = Math.random() * (availableHeight - buttonHeight - margin * 2) + margin;

    const moveX = targetX - originX;
    const moveY = targetY - originY;

    noButton.style.transform = `translate(${moveX}px, ${moveY}px)`;

    if (click < words.length - 1) click++;
});

const model = document.querySelector(".heart");


gsap.to(model, {
  scale: 1.1,
  repeat: -1,
  yoyo: true,
  duration: 1,
  ease: "power2.inOut"
});

// We create a proxy object to hold the raw numbers
const rotationProxy = { x: 0, y: 0, z: 0 };

document.addEventListener("mousemove", (e) => {
    const normX = (e.clientX / window.innerWidth) - 0.5; // -0.5 to 0.5
    const normY = (e.clientY / window.innerHeight) - 0.5; // -0.5 to 0.5

    gsap.to(rotationProxy, {
        // Mapping based on your manual coordinates:
        // Horizontal (normX) drives the LAST value (X)
        // Vertical (normY) drives the MIDDLE value (Y)
        x: normX * 60,   // 0.5 * 60 = 30
        y: normY * 60,   // -0.5 * 60 = -30
        z: 0,            // You requested 0deg for Z
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
            // String format: "Zdeg Ydeg Xdeg"
            model.setAttribute("orientation", 
                `${rotationProxy.z}deg ${rotationProxy.y}deg ${rotationProxy.x}deg`
            );
        }
    });
});
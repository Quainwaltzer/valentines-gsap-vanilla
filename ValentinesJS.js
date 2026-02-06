gsap.registerPlugin(ScrollTrigger);

window.addEventListener('load', () => {
    const tl = gsap.timeline();

    // 1. Simulate progress bar filling (Visual polish)
    tl.to(".progress-fill", {
        width: "100%",
        duration: 8,
        ease: "power2.inOut"
    })
    // 2. Fade out the loader
    .to("#loader", {
        opacity: 0,
        duration: 1,
        onComplete: () => {
            document.getElementById("loader").style.display = "none";
            // Optional: Start your initial heart tilt/float animation here
        }
    })
    // 3. Reveal the main content with a slight zoom
    .from(".center-elements", {
        scale: 0.9,
        opacity: 0,
        duration: 1.5,
        ease: "expo.out",
        onStart: () => {
            // FIRE THE TEXT ANIMATION NOW
            revealAskingText(); 
        }
    }, "-=0.5");
});

const revealAskingText = () => {
    // 1. Prepare ALL text first (Split both h1 tags into spans)
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

    // 2. Create one master timeline for the reveal
    const askTl = gsap.timeline();

    // Animate "Do you want" first
    askTl.from(".first-ask span", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)"
    })
    // Then animate "to be my valentines date?"
    .from(".second-ask span", {
        y: 15,
        opacity: 0,
        duration: 0.6,
        stagger: 0.05,
        ease: "back.out(1.7)"
    }, "-=0.2") // Slight overlap for smoothness
    // Finally, fill the red background
    .to(".red", {
        "--bg-width": "100%", 
        duration: 0.8,
        ease: "expo.out"
    }, "-=0.4");
};
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

    const words = ["Why?", "Sure ka na ba dyan?", "Hays bat ayaw mo :((", "dali na pls", "daya", "wew", "Manok ng House of Oppa", "hahahhahahah", "toasted habhab", "sinigang na hotdog", "buti di tayo tricycle", "cheeze enjoyer", "bawal ka talagang mag no kahit anong gawin mo hahahahha"];
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

const rotationProxy = { x: 0, y: 0, z: 0 };

const handleHeartTilt = (e) => {
    const normX = (e.clientX / window.innerWidth) - 0.5;
    const normY = (e.clientY / window.innerHeight) - 0.5;

    gsap.to(rotationProxy, {
        x: normX * 60,
        y: normY * 60,
        z: 0,
        duration: 0.8,
        ease: "power2.out",
        overwrite: "auto",
        onUpdate: () => {
            model.setAttribute("orientation", 
                `${rotationProxy.z}deg ${rotationProxy.y}deg ${rotationProxy.x}deg`
            );
        }
    });
};

document.addEventListener("mousemove", handleHeartTilt);

const yesButton = document.querySelector('.yes');
const parallaxContainer = document.querySelector('.parallax-container');
const centerContainer = document.querySelector('.center-elements');
const finalMessage = document.querySelector('.final-message');

yesButton.addEventListener("click", () => {
    document.removeEventListener("mousemove", handleHeartTilt);
    gsap.killTweensOf([model, rotationProxy]);

    const heartTimeline = gsap.timeline();

    heartTimeline.to(model, {
        attr: { orientation: '0deg 0deg 0deg' },
        duration: 0.1
    }).to(model, {
        x: "+=15",          // Shake 15px to the right
        duration: 0.05,     // Shake speed (very fast)
        repeat: 20,         // Do it 10 times
        yoyo: true,         // Go back and forth
        ease: "rough({ template: none, strength: 2, points: 20, taper: 'none', randomize: true, clamp: false })"
    }).to(model, {
        force3d: true,
        overwrite: "auto",
        scale: 0.6,
        duration: 0.5,
        onStart: () => {
            model.style.transformOrigin = "center center";
        },
        onComplete: () => {
            model.style.transform = "scale(0.6)";
        }
    })
    .to(model, {
        force3d: true,
        overwrite: "auto",
        scale: 20,
        y: 500,
        duration: 3,
        onStart: () => {
            model.style.transformOrigin = "center center";
        },
        onComplete: () => {
            model.style.transform = "scale(20)";
        }
    })
    .to(parallaxContainer, {
        display: "none",
        duration: 0
    },"-=1")
    .set(finalMessage, { 
        display: "flex" 
    })
    .to(finalMessage, {
        opacity: 1,
        duration: 1.5,
        ease: "power2.out",
        onStart: () => {
        startCarousel(); // This starts the image sliding logic
        popupSig();
        // Quick background ambient hearts
        for (let i = 0; i < 15; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.className = 'ambient-heart';
            document.querySelector('.final-message').appendChild(heart);
            
            gsap.set(heart, {
                position: "absolute",
                left: Math.random() * 100 + "vw",
                top: Math.random() * 100 + "vh",
                opacity: 0.5,
                fontSize: Math.random() * 20 + 10 + "px",
                zIndex: 2000, // Higher than .final-message and its background
                pointerEvents: "none" // Ensures they don't block clicks
            });

            gsap.to(heart, {
                y: "-=100",
                x: "+=" + (Math.random() * 50 - 25),
                duration: 5 + Math.random() * 5,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut"
            });
        }
        }
    }).to(centerContainer,{
        display: "none"
    });
});


const popupSig = () => {
    
    const sigTexts = document.querySelectorAll(".sig-text");

    sigTexts.forEach((el) => {
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

    gsap.from(".sig-text span", {
        y: 20,              // Slide up from 20px
        opacity: 0,         // Start invisible
        duration: 1,
        ease: "back.out",   // Give it that "pop" bounce
        stagger: 0.05,      // The "Wave" effect (one letter at a time)
        delay: 0.5          // Wait for the red screen to settle
    });

   gsap.fromTo(".signatures img", 
    { opacity: 0, scale: 0.8 }, // Start state
    { 
        opacity: 1, 
        scale: 1, 
        duration: 1.5, 
        delay: 1, // Give the red background time to fade in first
        ease: "power2.out" 
    });
};
const startCarousel = () => {
    const track = document.querySelector('.carousel-track');
    
    // 1. Get the height of one full set of images
    // This assumes you have duplicated your images in the HTML
    const totalHeight = track.offsetHeight / 2;

    // 2. Create a linear, infinite loop
    gsap.to(track, {
        y: -totalHeight, 
        duration: 15, // Increase for slower, "chill" film speed
        ease: "none", // MUST be none for seamless looping
        repeat: -1,   // Infinite loop
        modifiers: {
            y: gsap.utils.unitize(y => parseFloat(y) % totalHeight) // Force reset
        }
    });
};
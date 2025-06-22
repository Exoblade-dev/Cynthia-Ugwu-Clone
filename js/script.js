const scroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true,
});

function circleMouseFollower() {
    window.addEventListener("mousemove", function (dets) {
        // console.log(dets.clientX , dets.clientY);

        document.querySelector("#followingCircle").style.transform = `translate(${dets.clientX}px ,${dets.clientY}px )`
    })
}
circleMouseFollower();

// function circleMouseFollower() {
//   const circle = document.getElementById("followingCircle");

//   window.addEventListener("mousemove", function (e) {
//     circle.style.transform = `translate(${e.clientX}px, ${e.clientY}px)`;
//   });
// }

// circleMouseFollower();


const circle = document.querySelector("#followingCircle");

let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
let circlePos = { x: mouse.x, y: mouse.y };

// Track cursor movement (even if scrolling interrupts it)
window.addEventListener("pointermove", (e) => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
});

// Use RAF instead of GSAP ticker for better control
function animateCircle() {
    const dx = mouse.x - circlePos.x;
    const dy = mouse.y - circlePos.y;

    // Faster speed
    const speed = 0.75;
    circlePos.x += dx * speed;
    circlePos.y += dy * speed;

    const distance = Math.sqrt(dx * dx + dy * dy);
    const stretchAmount = Math.min(distance / 100, 0.45);
    const angle = Math.atan2(dy, dx);

    gsap.set(circle, {
        x: circlePos.x,
        y: circlePos.y,
        scaleX: 1 + stretchAmount,
        scaleY: 1 - stretchAmount / 1.5,
        rotation: (angle * 180) / Math.PI,
        transformOrigin: "center center"
    });

    requestAnimationFrame(animateCircle);
}

animateCircle(); // Start the loop


function firstPageAnimation(){
    let tl = gsap.timeline();

    tl.from("#nav", {
        y : '20',
        opacity : 0,
        duration : 1,
        ease : Expo.easeInOut,
    })

    tl.to('.boundingelem1', {
        y : 0,
        opacity:0.7,
        duration : 1,
        ease: "power4.out",
        // stagger: .2
    })

    tl.to('.boundingelem2', {
        y : 0,
        opacity:1,
        duration :0.5,
        ease: "power4.out",
        delay:-0.5,
        stagger: .2
    })
    tl.from("#mainFooter", {
        // y : '20',
        opacity : 0,
        duration : 1,
        delay:-0.5,
        ease: "power2.out"
    })
}

firstPageAnimation();


document.querySelectorAll(".element1").forEach(function(element1) {

    var rotate = 0;
    var diffrot = 0;

    element1.addEventListener("mouseleave", function(dets){
        gsap.to(element1.querySelector("img"),{
            opacity: 0,
        })
    })

    element1.addEventListener("mousemove", function(dets){

        var diff = (dets.clientY - element1.getBoundingClientRect().top) ;
        diffrot = dets.clientX - rotate;
        rotate = dets.clientX;
        
        gsap.to(element1.querySelector("img"),{
            opacity: 1,
            ease: "power1.out",
            top: diff,
            left: dets.clientX,
            rotate: gsap.utils.clamp(-20,20,diffrot),
        })
    })
})





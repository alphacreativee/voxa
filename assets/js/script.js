// A $( document ).ready() block.
$(document).ready(function () {
  console.log("ready!");
  pinLogoHeader();
});

function pinLogoHeader() {
  gsap.registerPlugin(ScrollTrigger);
  const logo = document.querySelector("#logo");
  const originalHeight = logo.offsetHeight;
  const scaleFactor = 2.56;

  const scaledHeight = originalHeight * scaleFactor;
  console.log(scaledHeight);

  const animate = () => {
    gsap.fromTo(
      "#logo",
      { scale: 1, autoAlpha: 0 }, // Bắt đầu với scale nhỏ và ẩn
      {
        scale: scaleFactor,
        autoAlpha: 1,

        duration: 1.5,
        ease: "power2.out", // Sau khi scale xong thì gọi animation scroll
      }
    );
    gsap.from("#logo", {
      duration: 3,
      scale: scaleFactor,
      y: window.innerHeight * 0.5 - scaledHeight * 0.5 + 48,
      x: "0%",
      // transformOrigin: "left center",

      scrollTrigger: {
        trigger: ".hero__img",
        start: "top top",
        end: "bottom 50%",
        // pin: true,
        // markers: true,
        scrub: true,
      },
    });
  };
  animate();
}

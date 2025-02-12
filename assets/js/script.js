"use strict";
$ = jQuery;

$(document).ready(function () {
  gsap.config({ trialWarn: false });
  console.clear();
  gsap.registerPlugin(ScrollTrigger, SplitType);

  const split = new SplitType(".quote-wrapper .text span", { type: "chars" });

  split.lines.forEach((target) => {
    gsap.to(target, {
      backgroundPositionX: 0,
      ease: "none",
      scrollTrigger: {
        trigger: target,
        markers: false,
        scrub: 1,
        start: "top center",
        end: "bottom center",
      },
    });
  });

  pinLogoHeader();
});

function pinLogoHeader() {
  gsap.registerPlugin(ScrollTrigger);
  const headerLogo = document.querySelector(".header__logo");
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
    ScrollTrigger.create({
      trigger: ".our-mission",
      start: "top top+=40", // Khi section xuất hiện giữa màn hình
      end: "bottom top",
      markers: true,
      onEnter: () => logo.classList.add("in-section"), // Khi vào section
      onLeave: () => logo.classList.remove("in-section"), // Khi cuộn qua section
      onEnterBack: () => logo.classList.add("in-section"), // Khi cuộn từ dưới lên vào .our-mission
      onLeaveBack: () => logo.classList.remove("in-section"),
    });
  };
  animate();
}

"use strict";
$ = jQuery;

window.onload = function () {
  window.scrollTo(0, 0);
  ScrollTrigger.refresh();
};

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
  scaleSectionImage();
  ourFamily();
  ourFamilyMobile();
  ScrollTrigger.refresh();
});

function pinLogoHeader() {
  gsap.registerPlugin(ScrollTrigger);
  const headerLogo = document.querySelector(".header__logo");
  const logo = document.querySelector("#logo");
  const originalHeight = logo.offsetHeight;
  const scaleFactor = window.innerWidth < 991 ? 1.8 : 2.56;

  const scaledHeight = originalHeight * scaleFactor;
  console.log(scaledHeight);

  const yPos =
    window.innerWidth < 991
      ? window.innerHeight * 0.5 - scaledHeight * 0.5
      : window.innerHeight * 0.5 - scaledHeight * 0.5 + 48;
  const animate = () => {
    gsap.from("#logo", {
      duration: 1.5,
      scale: scaleFactor,
      y: yPos,
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
    document.querySelectorAll(".logo-white").forEach((section) => {
      ScrollTrigger.create({
        trigger: section,
        start: "top top+=40",
        end: "bottom top+=40",
        toggleActions: "play none none reverse",
        // markers: true,
        onEnter: () =>
          document.querySelector("#logo").classList.add("in-section"),
        onLeave: () =>
          document.querySelector("#logo").classList.remove("in-section"),
        onEnterBack: () =>
          document.querySelector("#logo").classList.add("in-section"),
        onLeaveBack: () =>
          document.querySelector("#logo").classList.remove("in-section"),
      });
    });
  };
  animate();
  ScrollTrigger.refresh();
}
function customAnimation() {
  gsap.registerPlugin(ScrollTrigger);

  gsap.utils.toArray(".data-fade-in").forEach((element, i) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: "top 59%",
          end: "bottom 59%",
          // markers: true,
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "sine.out",
        stagger: 0.1,
      }
    );
  });
  const dataPosV2 = '80%';
  gsap.utils.toArray(".data-fade-in-v2").forEach((element, i) => {
    gsap.fromTo(
      element,
      {
        opacity: 0,
        y: 20,
      },
      {
        scrollTrigger: {
          trigger: element,
          start: `top ${dataPosV2}`,
          end: `bottom ${dataPosV2}`,
          // markers: true,
        },
        opacity: 1,
        y: 0,
        duration: 1,
        ease: "sine.out",
        stagger: 0.1,
      }
    );
  });
}
customAnimation();

function scaleSectionImage() {
  gsap.registerPlugin(ScrollTrigger);
  gsap.fromTo(
    ".section-image__container",
    {
      scale: "1.2",
    },
    {
      scrollTrigger: {
        trigger: ".section-image",
        start: "top 60%",
        end: "bottom 60%",
        scrub: true,
        // markers: true,
      },
      scale: "1",
      duration: 1,
      ease: "sine.out",
      stagger: 0.1,
    }
  );
}

function ourFamily() {
  if (!$("section.our-family").length) return;

  const itemFamily = $("section.our-family .list-item");

  itemFamily.mousemove(function (e) {
    let offset = $(this).offset();
    let x = e.pageX - offset.left;
    let y = e.pageY - offset.top;

    $(this).css("--x", x + "px");
    $(this).css("--y", y + "px");
  });
}

function ourFamilyMobile(){
  if($(window).width > 992) return;

  const fadeIn = document.querySelectorAll(".our-family__list .list-item");
  if (fadeIn) {
      fadeIn.forEach(value => {
        const $delay = value.getAttribute("data-delay") ? value.getAttribute("data-delay") : 0

        gsap.to(value, {
          scrollTrigger: {
              trigger      : value,
              start        : "top 50%",
              toggleActions: "play none none none",
              onEnter      : () => value.classList.add("active"),
          }
        });
      })
  }
}

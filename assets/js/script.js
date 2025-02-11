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
});

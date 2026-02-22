import React, { useEffect, useRef } from "react";
import gsap from "gsap";

// Desktop
import hero1 from "../../../assets/Hero/Desktop/Men_65.webp";
import hero2 from "../../../assets/Hero/Desktop/Women_66.webp";
import hero3 from "../../../assets/Hero/Desktop/Boy_56.webp";
import hero4 from "../../../assets/Hero/Desktop/Girl_56.webp";

// Tablet
import hero01 from "../../../assets/Hero/Tablet/Men_65.webp";
import hero02 from "../../../assets/Hero/Tablet/Women_66.webp";
import hero03 from "../../../assets/Hero/Tablet/Boy_56.webp";
import hero04 from "../../../assets/Hero/Tablet/Girl_56.webp";

// Mobile
import hero001 from "../../../assets/Hero/Mobile/Men_Mobile.webp";
import hero002 from "../../../assets/Hero/Mobile/Women_Mobile.webp";
import hero003 from "../../../assets/Hero/Mobile/Boy_Mobile.webp";
import hero004 from "../../../assets/Hero/Mobile/Girl_Mobile.webp";

const Hero = () => {
  const slides = [
    { id: 1, images: { desktop: hero1, tablet: hero01, mobile: hero001 }, title: "Men Collection" },
    { id: 2, images: { desktop: hero2, tablet: hero02, mobile: hero002 }, title: "Women Collection" },
    { id: 3, images: { desktop: hero3, tablet: hero03, mobile: hero003 }, title: "Boys Collection" },
    { id: 4, images: { desktop: hero4, tablet: hero04, mobile: hero004 }, title: "Girls Collection" },
  ];

  const slidesRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ repeat: -1 });

      slidesRef.current.forEach((slide) => {
        const duration = 3.5;
        tl.to(slide, { opacity: 1, duration: 1.5, ease: "power2.inOut" })
          .to(slide, { opacity: 1, duration }) // stay visible
          .to(slide, { opacity: 0, duration: 1.5, ease: "power2.inOut" });
      });
    }, slidesRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="relative w-full h-screen -mt-2 overflow-hidden">
      <div className="relative w-full h-full">
        {slides.map((slide, i) => (
          <div
            key={slide.id}
            ref={(el) => (slidesRef.current[i] = el)}
            className={`absolute inset-0 opacity-0`}
          >
            <picture>
              <source media="(max-width: 600px)" srcSet={slide.images.mobile} />
              <source media="(max-width: 1024px)" srcSet={slide.images.tablet} />
              <img
                src={slide.images.desktop}
                alt={slide.title}
                className="w-full h-full object-cover"
                draggable="false"
              />
            </picture>

            
          </div>
        ))}
      </div>
    </section>
  );
};

export default Hero;

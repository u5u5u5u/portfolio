import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { career } from "../../data/profile";
import Title from "../ui/Title";
import "./styles.css";

gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const slides = gsap.utils.toArray<HTMLDivElement>(".scroll-item");

      if (!slides.length) return;

      const wrapperWidth = wrapperRef.current!.offsetWidth;

      gsap.to(slides, {
        xPercent: -100 * (slides.length - 2),
        ease: "none",
        scrollTrigger: {
          trigger: wrapperRef.current,
          pin: true,
          scrub: 1,
          end: `+=${wrapperWidth}`,
        },
      });
    },
    { scope: wrapperRef }
  );

  return (
    <div id="career">
      <div className="title">
        <Title text="Career" />
      </div>
      <div
        className="career-wrapper"
        ref={wrapperRef}
        style={{ width: `calc(${career.length} * 600px)` }}
      >
        {career.map((item, index) => (
          <div
            key={index}
            className={`scroll-item-${String(index + 1).padStart(
              2,
              "0"
            )} scroll-item`}
          >
            <div className="career">
              <p className="career-content">{item.content}</p>
              <p className="career-date">{item.date}</p>
            </div>
            <div className="line"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Career;

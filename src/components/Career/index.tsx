import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import React, { useRef } from "react";
import { career } from "../../data/profile";
import "./styles.css";

// GSAPプラグインを登録
gsap.registerPlugin(ScrollTrigger);

const Career = () => {
  // ラッパー要素への参照を作成
  const wrapperRef = useRef<HTMLDivElement>(null);

  // useGSAPフックでアニメーションを設定
  useGSAP(
    () => {
      // .scroll-itemクラスを持つ要素を配列として取得
      const slides = gsap.utils.toArray<HTMLDivElement>(".scroll-item");

      if (!slides.length) return;

      // ラッパーの幅を取得 (元のscript.jsのロジックを再現)
      const wrapperWidth = wrapperRef.current!.offsetWidth;

      // 横スクロールアニメーションの設定
      gsap.to(slides, {
        xPercent: -100 * (slides.length - 1), // -X軸方向に移動
        ease: "none", // アニメーションのイージング(noneは定速)
        scrollTrigger: {
          trigger: wrapperRef.current, // アニメーション開始のトリガー要素
          pin: true, // 要素を固定
          scrub: 1, // スクロール量に合わせてアニメーション
          end: `+=${wrapperWidth}`, // アニメーションが終わる位置
          // 備考: 一般的な設定として以下もよく使われます
          // end: () => "+=" + (wrapperRef.current!.offsetWidth - window.innerWidth),
        },
      });
    },
    { scope: wrapperRef } // scopeをwrapperRefに限定し、セレクタの競合を防ぐ
  );

  return (
    // refをラッパー要素にアタッチ
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
  );
};

export default Career;

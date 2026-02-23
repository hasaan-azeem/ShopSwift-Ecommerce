import { ReactLenis } from "lenis/react";

export default function SmoothScrolling({ children }) {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.05,
        duration: 1.2,
        wheelMultiplier: 1,
        touchMultiplier: 1,
        infinite: false,
        autoResize: true,
        syncTouch: false,
      }}
    >
      {children}
    </ReactLenis>
  );
}
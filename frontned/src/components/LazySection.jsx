import React from "react";
import { useInView } from "react-intersection-observer";

const LazySection = ({ children, height = "250px" }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    rootMargin: "250px 0px", // Pre-load 250px before entering viewport
  });

  return (
    <div
      ref={ref}
      style={{
        minHeight: inView ? "auto" : height,
        width: "100%",
        display: "block",
      }}
    >
      {inView ? children : null}
    </div>
  );
};

export default LazySection;

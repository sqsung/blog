import { useEffect, useState } from "react";

export default function useHeader() {
  const [onTop, setOnTop] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const onMainPageScroll = () => {
      setOnTop(!!(window.scrollY < 100));
      setScrollProgress(
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
          100,
      );
    };

    window.addEventListener("scroll", onMainPageScroll);

    return () => {
      window.removeEventListener("scroll", onMainPageScroll);
    };
  }, []);

  return {
    models: { onTop, scrollProgress },
  };
}

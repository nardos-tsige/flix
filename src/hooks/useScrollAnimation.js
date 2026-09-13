import { useEffect, useRef, useState } from 'react';

export const useScrollAnimation = (options = {}) => {
  const {
    threshold = 0.1,
    once = true,
    rootMargin = '0px 0px -50px 0px',
  } = options;

  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) {
            observer.disconnect();
          }
        } else if (!once) {
          setIsVisible(false);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [threshold, once, rootMargin]);

  return [ref, isVisible];
};
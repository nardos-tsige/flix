import { useEffect, useRef } from 'react';

export const useInfiniteScroll = (callback, hasMore, isLoading) => {
  const triggerRef = useRef(null);

  useEffect(() => {
    const trigger = triggerRef.current;
    if (!trigger || !hasMore || isLoading) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          callback();
        }
      },
      { threshold: 0.1, rootMargin: '100px' }
    );

    observer.observe(trigger);

    return () => {
      if (trigger) observer.unobserve(trigger);
    };
  }, [callback, hasMore, isLoading]);

  return triggerRef;
};
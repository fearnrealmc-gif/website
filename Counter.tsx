
import React, { useState, useEffect, useRef } from 'react';

interface CounterProps {
  target: number;
  duration?: number;
}

const Counter: React.FC<CounterProps> = ({ target, duration = 2000 }) => {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIntersecting(true);
          observer.disconnect(); // Animate only once
        }
      },
      {
        rootMargin: '0px',
        threshold: 0.1,
      }
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, []);

  useEffect(() => {
    if (!isIntersecting) return;

    const startTime = Date.now();
    const endTime = startTime + duration;

    const animateCount = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      const currentNum = Math.floor(progress * target);
      setCount(currentNum);

      if (now < endTime) {
        requestAnimationFrame(animateCount);
      } else {
        setCount(target); // Ensure it ends on the exact target
      }
    };

    requestAnimationFrame(animateCount);
  }, [isIntersecting, target, duration]);

  return <span ref={ref}>{count}</span>;
};

export default Counter;

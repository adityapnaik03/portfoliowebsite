import { useEffect, useState, useRef } from 'react';

export default function AnimatedCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [trail, setTrail] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef(null);

  useEffect(() => {
    // Disable on mobile/touch screens
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    // Show custom cursor and add global cursor hide class
    setIsVisible(true);
    document.body.classList.add('custom-cursor-active');

    const handleMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    // Track hoverable items to expand cursor size
    const addHoverListeners = () => {
      const hoverables = document.querySelectorAll('a, button, input, textarea, select, [role="button"], .hover-glow');
      hoverables.forEach((el) => {
        el.addEventListener('mouseenter', () => setIsHovering(true));
        el.addEventListener('mouseleave', () => setIsHovering(false));
      });
    };

    addHoverListeners();

    // Since React might re-render/mount elements dynamically, we also periodically re-apply
    const interval = setInterval(addHoverListeners, 1500);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.body.classList.remove('custom-cursor-active');
      clearInterval(interval);
    };
  }, []);

  // Spring physics for trailing circle
  useEffect(() => {
    const animateTrail = () => {
      setTrail((prev) => {
        const dx = position.x - prev.x;
        const dy = position.y - prev.y;
        // Dampening factor
        const ease = 0.15;
        return {
          x: prev.x + dx * ease,
          y: prev.y + dy * ease,
        };
      });
      requestRef.current = requestAnimationFrame(animateTrail);
    };
    
    requestRef.current = requestAnimationFrame(animateTrail);
    return () => cancelAnimationFrame(requestRef.current);
  }, [position]);

  if (!isVisible) return null;

  return (
    <>
      {/* Inner Dot */}
      <div
        className="fixed w-2 h-2 bg-cyan-400 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 mix-blend-difference transition-transform duration-100 ease-out"
        style={{
          left: `${position.x}px`,
          top: `${position.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 2.5 : 1})`,
        }}
      />
      {/* Outer Ring */}
      <div
        className="fixed w-8 h-8 border border-indigo-400/80 rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 transition-transform duration-200 ease-out"
        style={{
          left: `${trail.x}px`,
          top: `${trail.y}px`,
          transform: `translate(-50%, -50%) scale(${isHovering ? 1.8 : 1})`,
          borderColor: isHovering ? 'rgb(168, 85, 247)' : 'rgba(99, 102, 241, 0.8)',
          backgroundColor: isHovering ? 'rgba(168, 85, 247, 0.1)' : 'transparent',
        }}
      />
    </>
  );
}

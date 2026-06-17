import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export default function CursorEffect() {
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(true);

  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  const springConfig = { damping: 45, stiffness: 400, mass: 0.6 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    setMounted(true);
    // Detect mobile touch devices safely
    const checkDevice = () => {
      setIsMobile(window.matchMedia('(max-width: 1024px)').matches || ('ontouchstart' in window));
    };
    
    checkDevice();
    window.addEventListener('resize', checkDevice);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };

    if (!isMobile) {
      window.addEventListener('mousemove', moveCursor);
    }

    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('mousemove', moveCursor);
    };
  }, [cursorX, cursorY, isMobile]);

  if (!mounted || isMobile) return null;

  return (
    <>
      {/* Primary Golden Ring */}
      <motion.div
        id="luxury-cursor"
        className="fixed top-0 left-0 w-8 h-8 border border-amber-500 rounded-full pointer-events-none z-50 mix-blend-difference hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
      {/* Soft Ocean Ambient Glow Dot */}
      <motion.div
        className="fixed top-2 left-2 w-4 h-4 bg-amber-500/30 blur-xs rounded-full pointer-events-none z-50 hidden lg:block"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
        }}
      />
    </>
  );
}

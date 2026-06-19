import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function BackgroundGrid() {
  const mouseX = useMotionValue(-1000);
  const mouseY = useMotionValue(-1000);

  // Springs for smooth movement of the spotlight mask
  const xSpring = useSpring(mouseX, { stiffness: 85, damping: 28 });
  const ySpring = useSpring(mouseY, { stiffness: 85, damping: 28 });

  // Map coordinates to a CSS radial gradient mask
  const maskImage = useTransform(
    [xSpring, ySpring],
    ([x, y]) => `radial-gradient(350px circle at ${x}px ${y}px, black 20%, transparent 100%)`
  );

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [mouseX, mouseY]);

  return (
    <div className="absolute inset-0 -z-15 pointer-events-none w-full h-full bg-[#FAFAFA]">
      {/* Base subtle grid lines (constant minimal opacity) */}
      <div
        className="absolute inset-0 opacity-[0.03] w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(99, 102, 241, 0.3) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(99, 102, 241, 0.3) 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
        }}
      />

      {/* Lit-up grid lines (bright indigo lines revealed only near the cursor position) */}
      <motion.div
        className="absolute inset-0 opacity-[0.22] w-full h-full"
        style={{
          backgroundImage: `
            linear-gradient(to right, #4f46e5 1px, transparent 1px),
            linear-gradient(to bottom, #4f46e5 1px, transparent 1px)
          `,
          backgroundSize: "40px 40px",
          maskImage: maskImage,
          WebkitMaskImage: maskImage,
        }}
      />
    </div>
  );
}

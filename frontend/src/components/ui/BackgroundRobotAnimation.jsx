import { useEffect, useRef, useState } from "react";
import { useScroll, useMotionValueEvent, useTransform, motion } from "framer-motion";

export default function BackgroundRobotAnimation() {
  const canvasRef = useRef(null);
  const { scrollYProgress } = useScroll();
  const [images, setImages] = useState([]);
  const [loadedCount, setLoadedCount] = useState(0);

  const totalFrames = 240;

  // Spatial Parallax Transforms mapping scroll progress to screen position and scale
  const yVal = useTransform(scrollYProgress, [0, 1], ["0px", "-120px"]);
  const xVal = useTransform(scrollYProgress, [0, 0.5, 1], ["30px", "0px", "-30px"]);
  const scaleVal = useTransform(scrollYProgress, [0, 0.5, 1], [0.98, 1.05, 0.98]);
  
  // Dynamic opacity curve (bright and highly visible in background)
  const opacityVal = useTransform(scrollYProgress, [0, 0.25, 0.75, 1], [0.6, 0.85, 0.85, 0.4]);

  // Preload all 240 robot frames
  useEffect(() => {
    const loadedImages = [];
    let count = 0;

    for (let i = 1; i <= totalFrames; i++) {
      const img = new Image();
      const paddedIndex = String(i).padStart(3, "0");
      
      // Resolve path relative to component file in Vite dev/build
      img.src = new URL(
        `../../assets/animations/ezgif-frame-${paddedIndex}.jpg`,
        import.meta.url
      ).href;

      img.onload = () => {
        count++;
        setLoadedCount(count);
      };

      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Drawing method drawing the image onto canvas
  const drawFrame = (index) => {
    const canvas = canvasRef.current;
    if (!canvas || images.length === 0) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const img = images[index - 1];
    if (!img || !img.complete) return;

    // Clear previous drawing
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const canvasRatio = canvas.width / canvas.height;
    const imgRatio = img.width / img.height;

    let drawWidth, drawHeight, x, y;

    // Centered 'cover' calculations to span full screen width and height
    if (canvasRatio > imgRatio) {
      drawWidth = canvas.width;
      drawHeight = canvas.width / imgRatio;
      x = 0;
      y = (canvas.height - drawHeight) / 2;
    } else {
      drawHeight = canvas.height;
      drawWidth = canvas.height * imgRatio;
      x = (canvas.width - drawWidth) / 2;
      y = 0;
    }

    ctx.drawImage(img, x, y, drawWidth, drawHeight);
  };

  // Resize listener
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const currentProgress = scrollYProgress.get();
      const frameIndex = Math.min(
        totalFrames,
        Math.max(1, Math.floor(currentProgress * totalFrames))
      );
      drawFrame(frameIndex);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, [images]);

  // Update canvas frames as the user scrolls
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    const frameIndex = Math.min(
      totalFrames,
      Math.max(1, Math.floor(latest * totalFrames))
    );
    requestAnimationFrame(() => drawFrame(frameIndex));
  });

  // Render initial frame once images start loading
  useEffect(() => {
    if (images.length > 0) {
      drawFrame(1);
    }
  }, [images, loadedCount]);

  return (
    <motion.canvas
      ref={canvasRef}
      style={{
        y: yVal,
        x: xVal,
        scale: scaleVal,
        opacity: opacityVal,
        mixBlendMode: "multiply",
      }}
      className="fixed inset-0 -z-10 h-full w-full pointer-events-none"
    />
  );
}

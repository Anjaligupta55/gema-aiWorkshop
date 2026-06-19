import { motion } from "framer-motion";

export default function BackgroundBlur() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none -z-20">
      {/* Purple Blob */}
      <motion.div
        animate={{
          x: [0, 40, -20, 0],
          y: [0, -30, 50, 0],
          scale: [1, 1.15, 0.9, 1],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="
        absolute
        -left-40
        top-20
        h-[450px]
        w-[450px]
        rounded-full
        bg-indigo-300/25
        blur-[120px]
        "
      />

      {/* Cyan Blob */}
      <motion.div
        animate={{
          x: [0, -50, 30, 0],
          y: [0, 40, -30, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="
        absolute
        right-0
        top-80
        h-[400px]
        w-[400px]
        rounded-full
        bg-cyan-300/20
        blur-[120px]
        "
      />

      {/* Pink Blob */}
      <motion.div
        animate={{
          x: [0, 30, -40, 0],
          y: [0, 50, -20, 0],
          scale: [1, 1.1, 0.85, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 4,
        }}
        className="
        absolute
        bottom-20
        left-1/3
        h-[350px]
        w-[350px]
        rounded-full
        bg-pink-300/15
        blur-[120px]
        "
      />
    </div>
  );
}
import { motion, useTransform } from "framer-motion";

function FloatingCard({
  icon,
  title,
  delay,
  className = "",
  mouseX,
  mouseY,
  factor = 1,
}) {
  // Parallax displacement based on cursor position relative to section center
  const xVal = useTransform(mouseX, (x) => x * factor);
  const yVal = useTransform(mouseY, (y) => y * factor);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: delay * 0.15 }}
      style={{ x: xVal, y: yVal }}
      className={`absolute rounded-2xl border border-slate-100 bg-white p-5 shadow-[0_8px_30px_rgb(0,0,0,0.04)] backdrop-blur-md transition-all duration-300 hover:shadow-[0_20px_50px_rgba(79,70,229,0.08)] hover:border-slate-200/80 ${className}`}
    >
      <motion.div
        animate={{
          y: [0, -8, 0],
        }}
        transition={{
          duration: 3 + Math.abs(factor) * 1.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        }}
        className="flex items-center gap-3.5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-2xl shadow-sm">
          {icon}
        </div>
        <div>
          <h3 className="font-bold text-slate-800 text-sm tracking-tight">
            {title}
          </h3>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default FloatingCard;
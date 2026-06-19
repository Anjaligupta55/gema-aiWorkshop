import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function SnapshotCard({
  icon: Icon,
  label,
  value,
  colorClass = "text-indigo-600 bg-indigo-50 border-indigo-100",
  delay = 0,
}) {
  // Motion values to track local hover coordinates relative to the card center
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Map coordinates to small degrees of 3D tilt
  const rotateX = useTransform(y, [-0.5, 0.5], [10, -10]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-10, 10]);

  // Smooth springs to prevent jitter and damp transition
  const springX = useSpring(rotateX, { stiffness: 150, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
    // Normalized coordinates ranging from -0.5 to 0.5
    const mouseX = e.clientX - rect.left - width / 2;
    const mouseY = e.clientY - rect.top - height / 2;
    
    x.set(mouseX / width);
    y.set(mouseY / height);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay }}
        style={{
          rotateX: springX,
          rotateY: springY,
          transformStyle: "preserve-3d",
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className="group relative h-full rounded-3xl border border-slate-200/60 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-shadow duration-300 hover:shadow-[0_20px_50px_rgba(79,70,229,0.06)] hover:border-indigo-500/20 cursor-pointer"
      >
        {/* Hover background radial sweep glow */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:from-indigo-500/5 group-hover:to-cyan-500/5 group-hover:opacity-100 pointer-events-none" />

        {/* 3D Depth Layer */}
        <div
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          className="relative z-10 flex flex-col items-start gap-4"
        >
          {/* Icon Badge */}
          <div 
            style={{ transform: "translateZ(10px)" }} 
            className={`flex h-12 w-12 items-center justify-center rounded-2xl border text-xl shadow-sm ${colorClass}`}
          >
            <Icon size={22} />
          </div>

          <div style={{ transform: "translateZ(15px)" }}>
            <p className="text-[10px] font-bold tracking-widest text-slate-400 uppercase">
              {label}
            </p>
            <p className="mt-2 text-2xl font-black text-slate-800 tracking-tight">
              {value}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function BenefitCard({
  icon: Icon,
  title,
  description,
  delay = 0,
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useTransform(y, [-0.5, 0.5], [8, -8]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-8, 8]);

  const springX = useSpring(rotateX, { stiffness: 150, damping: 22 });
  const springY = useSpring(rotateY, { stiffness: 150, damping: 22 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    
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
        className="group relative h-full rounded-3xl border border-slate-200/50 bg-white p-8 shadow-[0_8px_30px_rgb(0,0,0,0.015)] transition-shadow duration-300 hover:shadow-[0_25px_60px_rgba(79,70,229,0.05)] hover:border-indigo-600/15 cursor-pointer"
      >
        {/* Subtle hover glow overlay */}
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-indigo-500/0 to-cyan-500/0 opacity-0 transition-opacity duration-300 group-hover:from-indigo-500/5 group-hover:to-cyan-500/5 group-hover:opacity-100 pointer-events-none" />

        {/* 3D Depth Content Layer */}
        <div
          style={{ transform: "translateZ(30px)", transformStyle: "preserve-3d" }}
          className="relative z-10 flex flex-col items-start"
        >
          {/* Icon Box */}
          <div 
            style={{ transform: "translateZ(10px)" }}
            className="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-50 border border-indigo-100/50 text-indigo-600 shadow-sm transition-colors duration-300 group-hover:bg-indigo-600 group-hover:text-white group-hover:border-indigo-600"
          >
            <Icon size={22} className="transition-transform duration-300 group-hover:scale-110" />
          </div>

          <div style={{ transform: "translateZ(15px)" }} className="mt-6">
            <h3 className="text-xl font-bold tracking-tight text-slate-800">
              {title}
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-slate-500">
              {description}
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

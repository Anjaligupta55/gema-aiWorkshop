import { motion } from "framer-motion";

export default function TimelineItem({
  week,
  title,
  description,
  topics,
  index,
}) {
  return (
    <div className="relative pl-10 pb-12 last:pb-0">
      {/* Vertical Connecting Line segment */}
      <div className="absolute top-2 left-[9px] bottom-0 w-[2px] bg-slate-200 group-last:hidden" />

      {/* Pulsing Node Pin */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        whileInView={{ scale: 1, opacity: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="absolute top-1 left-0 flex h-5 w-5 items-center justify-center rounded-full bg-white border-2 border-indigo-600 z-10"
      >
        <motion.div
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ repeat: Infinity, duration: 2, delay: index * 0.5 }}
          className="h-1.5 w-1.5 rounded-full bg-indigo-600"
        />
      </motion.div>

      {/* Syllabus Card Box */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5, delay: index * 0.15 }}
        className="rounded-3xl border border-slate-200/50 bg-white p-6 md:p-8 shadow-[0_8px_30px_rgb(0,0,0,0.01)] transition-all duration-300 hover:shadow-[0_15px_40px_rgba(0,0,0,0.03)]"
      >
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          {week}
        </span>
        <h3 className="mt-4 text-2xl font-black tracking-tight text-slate-800">
          {title}
        </h3>
        <p className="mt-2 text-sm text-slate-500 leading-relaxed">
          {description}
        </p>

        {/* Syllabus Bullet Tags */}
        <div className="mt-6 flex flex-wrap gap-2">
          {topics.map((topic) => (
            <span
              key={topic}
              className="inline-flex items-center rounded-lg bg-slate-50 border border-slate-100 px-3 py-1 text-xs font-medium text-slate-600"
            >
              ⚡ {topic}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

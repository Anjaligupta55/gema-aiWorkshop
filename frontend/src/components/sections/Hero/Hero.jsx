import { motion, useMotionValue, useSpring } from "framer-motion";
import Container from "../../ui/Container";
import Button from "../../ui/Button";
import Badge from "../../ui/Badge";
import FloatingCard from "./FloatingCard";

function Hero() {
  // Parallax mouse position hooks
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 100 };
  const xSpring = useSpring(mouseX, springConfig);
  const ySpring = useSpring(mouseY, springConfig);

  const handleMouseMove = (e) => {
    const { currentTarget, clientX, clientY } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    
    // Normalized displacement relative to center: range [-30, 30]
    const x = ((clientX - left) / width - 0.5) * 60;
    const y = ((clientY - top) / height - 0.5) * 60;
    
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  const handleScrollTo = (id) => {
    const element = document.querySelector(id);
    if (element) {
      const offset = 80;
      const bodyRect = document.body.getBoundingClientRect().top;
      const elementRect = element.getBoundingClientRect().top;
      const elementPosition = elementRect - bodyRect;
      const offsetPosition = elementPosition - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative overflow-hidden pt-36 pb-24 lg:pt-44 lg:pb-36"
    >
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-12">
          {/* Left Text Column */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="lg:col-span-6 flex flex-col items-start text-left"
          >
            <Badge>🚀 Summer Workshop 2026</Badge>

            <h1 className="mt-6 text-5xl font-black leading-[1.05] tracking-tight text-slate-900 sm:text-6xl lg:text-[70px]">
              Become the
              <span className="block mt-1 text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-cyan-500">
                Creator
              </span>
              of Artificial Intelligence
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-lg">
              Learn AI, Robotics, Coding, and construct real-world smart projects through live, highly engaging online sessions tailored specifically for young minds.
            </p>

            <div className="mt-8 flex flex-wrap gap-4 w-full sm:w-auto">
              <Button
                variant="primary"
                onClick={() => handleScrollTo("#registration")}
              >
                Reserve Your Seat
              </Button>

              <Button
                variant="secondary"
                showArrow={false}
                onClick={() => handleScrollTo("#roadmap")}
              >
                View Curriculum
              </Button>
            </div>

            {/* Feature stats / Badges details */}
            <div className="mt-12 flex flex-wrap gap-2.5">
              <span className="inline-flex items-center rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm">
                👶 8–14 Years
              </span>
              <span className="inline-flex items-center rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm">
                ⏳ 4 Weeks
              </span>
              <span className="inline-flex items-center rounded-xl bg-slate-50 border border-slate-100 px-3.5 py-2 text-xs font-bold text-slate-600 shadow-sm">
                🌐 Live Online
              </span>
              <span className="inline-flex items-center rounded-xl bg-indigo-50/50 border border-indigo-100/50 px-3.5 py-2 text-xs font-bold text-indigo-700 shadow-sm">
                💳 ₹2,999 Total
              </span>
            </div>
          </motion.div>

          {/* Right Floating Cards Interactive Area */}
          <div className="relative lg:col-span-6 h-[450px] sm:h-[500px] w-full mt-8 lg:mt-0 select-none">
            {/* Ambient Background Radial Glows specifically inside right pane for layout depth */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] bg-indigo-200/20 rounded-full blur-[80px]" />
            <div className="absolute top-1/3 left-1/3 w-[250px] h-[250px] bg-cyan-200/20 rounded-full blur-[60px]" />

            <FloatingCard
              icon="🤖"
              title="Artificial Intelligence"
              delay={0}
              factor={0.4}
              className="top-[10%] left-[5%] md:left-[15%]"
              mouseX={xSpring}
              mouseY={ySpring}
            />

            <FloatingCard
              icon="⚙️"
              title="Robotics"
              delay={0.3}
              factor={-0.6}
              className="top-[18%] right-[5%] md:right-[15%]"
              mouseX={xSpring}
              mouseY={ySpring}
            />

            <FloatingCard
              icon="🧠"
              title="Creative Projects"
              delay={0.6}
              factor={0.8}
              className="top-[45%] left-[22%] z-10 shadow-lg border-indigo-100/80 bg-white/95"
              mouseX={xSpring}
              mouseY={ySpring}
            />

            <FloatingCard
              icon="💻"
              title="Coding"
              delay={0.9}
              factor={-0.5}
              className="bottom-[18%] left-[8%] md:left-[18%]"
              mouseX={xSpring}
              mouseY={ySpring}
            />

            <FloatingCard
              icon="🏆"
              title="Certificate"
              delay={1.2}
              factor={0.7}
              className="bottom-[12%] right-[8%] md:right-[18%]"
              mouseX={xSpring}
              mouseY={ySpring}
            />
          </div>
        </div>
      </Container>
    </section>
  );
}

export default Hero;
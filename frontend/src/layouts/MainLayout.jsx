import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackgroundGrid from "../components/ui/BackgroundGrid";
import BackgroundBlur from "../components/ui/BackgroundBlur";
import BackgroundParticles from "../components/ui/BackgroundParticles";
import BackgroundRobotAnimation from "../components/ui/BackgroundRobotAnimation";

function MainLayout({ children }) {
  return (
    <div className="relative min-h-screen overflow-x-hidden">
      <BackgroundGrid />
      <BackgroundBlur />
      <BackgroundParticles />
      <BackgroundRobotAnimation />
      <Navbar />
      <main className="relative z-10">{children}</main>
      <Footer />
    </div>
  );
}

export default MainLayout;
import MainLayout from "../layouts/MainLayout";

import Hero from "../components/sections/Hero/Hero";
import WorkshopSnapshot from "../components/sections/WorkshopSnapshot/WorkshopSnapshot";
import Benefits from "../components/sections/Benefits/Benefits";
import Roadmap from "../components/sections/Roadmap/Roadmap";
import FAQ from "../components/sections/FAQ/FAQ";
import Registration from "../components/sections/Registration/Registration";

function Home() {
  return (
    <MainLayout>
      <Hero />

      <WorkshopSnapshot />

      <Benefits />

      <Roadmap />

      <FAQ />

      <Registration />
    </MainLayout>
  );
}

export default Home;
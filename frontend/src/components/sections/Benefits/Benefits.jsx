import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import BenefitCard from "./BenefitCard";
import { Cpu, GraduationCap, Award, Laptop, Puzzle, Lightbulb } from "lucide-react";

export default function Benefits() {
  const benefits = [
    {
      icon: Cpu,
      title: "Project-Based Learning",
      description: "Build interactive robots, smart AI applications, and code real software instead of reading plain theory.",
    },
    {
      icon: GraduationCap,
      title: "Expert Mentors",
      description: "Learn directly from tech-industry veterans and expert educators passionate about mentoring young minds.",
    },
    {
      icon: Award,
      title: "Official Certification",
      description: "Earn a verified completion certificate demonstrating mastery in foundational AI and Robotics principles.",
    },
    {
      icon: Laptop,
      title: "Interactive Live Classes",
      description: "Real-time, interactive coding & robotics sessions with direct screen-sharing assistance and instant Q&As.",
    },
    {
      icon: Puzzle,
      title: "Hands-on Activities",
      description: "Workshops include offline challenges, puzzles, and tinkering tasks that turn learning into a playful journey.",
    },
    {
      icon: Lightbulb,
      title: "Creative Thinking",
      description: "Foster a robust problem-solving mindset, logical debugging logic, and cognitive computational thinking.",
    },
  ];

  return (
    <section id="why-join" className="relative py-20 lg:py-28 overflow-hidden">
      <Container>
        <SectionTitle
          eyebrow="Why Choose Us"
          title="Why Join RoboSpark?"
          description="We combine interactive play with structured engineering curricula to create an unmatched educational experience."
        />

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 mt-12">
          {benefits.map((item, index) => (
            <BenefitCard
              key={item.title}
              icon={item.icon}
              title={item.title}
              description={item.description}
              delay={(index % 3) * 0.15}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

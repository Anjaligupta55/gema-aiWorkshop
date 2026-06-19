import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import TimelineItem from "./TimelineItem";

export default function Roadmap() {
  const syllabus = [
    {
      week: "Week 01",
      title: "AI Fundamentals",
      description: "Dive into the basics of AI and Machine Learning. Young developers learn how systems train from data and build interactive image/sound classification models.",
      topics: ["Intro to ML", "Model Training", "Data Classification", "Visual ML Projects"],
    },
    {
      week: "Week 02",
      title: "Programming Basics",
      description: "Establish foundational logic using algorithmic flows. Kids write clean structures, create logical branches, and develop interactive games.",
      topics: ["Control Loops", "Logical Statements", "Variable States", "Game Architecture"],
    },
    {
      week: "Week 03",
      title: "Robotics",
      description: "Step into physical computing and automation. Understand how microcontrollers, motors, and sensors function. Program simulated robots to solve mazes.",
      topics: ["Sensors & Motors", "Pathfinding Logic", "Tinkering Simulators", "Obstacle Avoidance"],
    },
    {
      week: "Week 04",
      title: "Final AI Project",
      description: "Combine coding, AI models, and robotics simulators. Build a customized smart system as a capstone project and present it to peers.",
      topics: ["Full Project Design", "Debugging & Polish", "Capstone Showcase", "Official Certificate"],
    },
  ];

  return (
    <section id="roadmap" className="relative py-20 lg:py-28 overflow-hidden bg-slate-50/50">
      <Container>
        <SectionTitle
          eyebrow="Syllabus"
          title="Learning Roadmap"
          description="A structured, step-by-step curriculum that takes kids from absolute beginners to building smart AI systems in 4 weeks."
        />

        <div className="mx-auto max-w-3xl mt-12">
          {/* Vertical Timeline container wrapper */}
          <div className="relative">
            {/* The absolute vertical line for connecting everything */}
            <div className="absolute left-[9px] top-4 bottom-4 w-[2px] bg-slate-200" />
            
            {syllabus.map((item, index) => (
              <TimelineItem
                key={item.week}
                week={item.week}
                title={item.title}
                description={item.description}
                topics={item.topics}
                index={index}
              />
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}

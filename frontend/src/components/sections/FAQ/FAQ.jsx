import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import FAQItem from "./FAQItem";

export default function FAQ() {
  const faqs = [
    {
      question: "Do we need any physical robotics kits or hardware?",
      answer: "No physical kits are required! We use advanced virtual robotics simulators that let kids program and view their custom robot designs and actions directly inside their web browsers.",
    },
    {
      question: "What is the schedule and mode of classes?",
      answer: "The workshop is 100% live online. Sessions are held twice a week for 90 minutes each. Detailed timing schedules will be shared via email prior to the start date on 15 July 2026.",
    },
    {
      question: "What are the computer/system prerequisites?",
      answer: "A modern laptop or desktop computer (Windows, macOS, or ChromeOS) with a stable internet connection, a webcam, a microphone, and the Google Chrome browser installed is all that is required.",
    },
    {
      question: "Will students receive a certificate at the end?",
      answer: "Yes, definitely! All students who complete the weekly coding challenges and present their final capstone project in Week 4 will be awarded a verified RoboSpark AI & Robotics Completion Certificate.",
    },
  ];

  return (
    <section id="faq" className="relative py-20 lg:py-28 overflow-hidden bg-white/40">
      <Container>
        <SectionTitle
          eyebrow="Questions"
          title="Frequently Asked Questions"
          description="Find answers to common queries about RoboSpark's syllabus, format, and hardware requirements."
        />

        <div className="mx-auto max-w-3xl mt-12 flex flex-col gap-4">
          {faqs.map((item, index) => (
            <FAQItem
              key={item.question}
              question={item.question}
              answer={item.answer}
              index={index}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

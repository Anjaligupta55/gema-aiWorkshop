import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import SnapshotCard from "./SnapshotCard";
import { Users, Calendar, Video, IndianRupee, Clock } from "lucide-react";

export default function WorkshopSnapshot() {
  const snapshots = [
    {
      icon: Users,
      label: "Age Group",
      value: "8–14 Years",
      colorClass: "text-indigo-600 bg-indigo-50 border-indigo-100",
    },
    {
      icon: Calendar,
      label: "Duration",
      value: "4 Weeks",
      colorClass: "text-cyan-600 bg-cyan-50 border-cyan-100",
    },
    {
      icon: Video,
      label: "Mode",
      value: "Live Online",
      colorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
    },
    {
      icon: IndianRupee,
      label: "Fee",
      value: "₹2,999",
      colorClass: "text-violet-600 bg-violet-50 border-violet-100",
    },
    {
      icon: Clock,
      label: "Start Date",
      value: "15 July 2026",
      colorClass: "text-pink-600 bg-pink-50 border-pink-100",
    },
  ];

  return (
    <section id="overview" className="relative py-20 lg:py-28 overflow-hidden bg-white/40">
      <Container>
        <SectionTitle
          eyebrow="At a Glance"
          title="Workshop Snapshot"
          description="Everything you need to know about the upcoming RoboSpark AI & Robotics cohort."
        />

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5 mt-12">
          {snapshots.map((item, index) => (
            <SnapshotCard
              key={item.label}
              icon={item.icon}
              label={item.label}
              value={item.value}
              colorClass={item.colorClass}
              delay={index * 0.1}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}

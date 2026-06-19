import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { submitEnquiry } from "../../../services/enquiryApi";
import Container from "../../ui/Container";
import SectionTitle from "../../ui/SectionTitle";
import Button from "../../ui/Button";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Mail, Phone, Calendar, Star } from "lucide-react";

// Form validation schema matching backend rules
const enquirySchema = z.object({
  name: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name must be under 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^\d{10}$/, "Phone number must be exactly 10 digits"),
});

export default function Registration() {
  // Motion values to track local hover coordinates on the form card
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Gentle 3D tilt limits (max 4 degrees to keep text inputs highly usable)
  const rotateX = useTransform(y, [-0.5, 0.5], [4, -4]);
  const rotateY = useTransform(x, [-0.5, 0.5], [-4, 4]);

  const springX = useSpring(rotateX, { stiffness: 120, damping: 25 });
  const springY = useSpring(rotateY, { stiffness: 120, damping: 25 });

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

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
    },
  });

  const onSubmit = async (data) => {
    try {
      const response = await submitEnquiry(data);
      if (response.success) {
        toast.success(response.message || "Registration Successful!");
        reset();
      } else {
        toast.error(response.message || "Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      const serverMessage = error.response?.data?.message || error.response?.data?.errors?.[0]?.msg;
      toast.error(serverMessage || "Connection failed. Please check if backend is running.");
    }
  };

  return (
    <section id="registration" className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background accents */}
      <div className="absolute right-[-100px] bottom-[50px] h-[300px] w-[300px] rounded-full bg-cyan-200/20 blur-[90px]" />
      <div className="absolute left-[-100px] top-[100px] h-[300px] w-[300px] rounded-full bg-indigo-200/20 blur-[90px]" />

      <Container>
        <SectionTitle
          eyebrow="Registration"
          title="Reserve Your Seat"
          description="Embark on an exciting journey into the future of technology. Fill out the application form below to register your spot today."
        />

        <div className="grid gap-12 lg:grid-cols-12 max-w-5xl mx-auto mt-12 items-center">
          {/* Left info box */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 flex flex-col gap-6"
          >
            <div className="flex flex-col gap-4">
              <span className="inline-flex items-center self-start rounded-full bg-indigo-50 border border-indigo-100/50 px-3 py-1 text-xs font-semibold text-indigo-700">
                ✨ Cohort enrolling now
              </span>
              <h3 className="text-3xl font-black tracking-tight text-slate-800">
                Limited Seats Available
              </h3>
              <p className="text-sm leading-relaxed text-slate-500">
                To guarantee high mentor-to-student interaction, each class cohort is capped at 15 participants. Secure your registration early to ensure access to our online labs.
              </p>
            </div>

            {/* Quick specifications */}
            <div className="flex flex-col gap-4 border-t border-slate-100 pt-6">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-indigo-600 border border-slate-100 shadow-sm">
                  <Calendar size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Starts On</p>
                  <p className="text-sm font-bold text-slate-700">15 July 2026</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-50 text-indigo-600 border border-slate-100 shadow-sm">
                  <Star size={18} />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-400 uppercase">Interactive Scope</p>
                  <p className="text-sm font-bold text-slate-700">Live Virtual Labs & Capstones</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Form Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ perspective: 1000 }}
            className="lg:col-span-7"
          >
            <motion.div
              style={{
                rotateX: springX,
                rotateY: springY,
                transformStyle: "preserve-3d",
              }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
              className="rounded-3xl border border-slate-200/50 bg-white/70 backdrop-blur-xl p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.04)]"
            >
              <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6" noValidate>
                {/* Name Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="name" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                      <User size={18} />
                    </div>
                    <input
                      id="name"
                      type="text"
                      placeholder="Jane Doe"
                      disabled={isSubmitting}
                      className={`w-full rounded-2xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 transition duration-300 focus:outline-none focus:ring-2 ${
                        errors.name
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                      {...register("name")}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-xs font-semibold text-red-500 mt-1">{errors.name.message}</p>
                  )}
                </div>

                {/* Email Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="email" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                      <Mail size={18} />
                    </div>
                    <input
                      id="email"
                      type="email"
                      placeholder="jane@example.com"
                      disabled={isSubmitting}
                      className={`w-full rounded-2xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 transition duration-300 focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                      {...register("email")}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-xs font-semibold text-red-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Phone Field */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="phone" className="text-xs font-bold uppercase tracking-wider text-slate-600">
                    Phone Number (10 Digits)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-4 pointer-events-none text-slate-400">
                      <Phone size={18} />
                    </div>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="9876543210"
                      disabled={isSubmitting}
                      className={`w-full rounded-2xl border bg-white py-3.5 pl-11 pr-4 text-sm text-slate-800 transition duration-300 focus:outline-none focus:ring-2 ${
                        errors.phone
                          ? "border-red-300 focus:border-red-500 focus:ring-red-100"
                          : "border-slate-200 focus:border-indigo-500 focus:ring-indigo-100"
                      }`}
                      {...register("phone")}
                    />
                  </div>
                  {errors.phone && (
                    <p className="text-xs font-semibold text-red-500 mt-1">{errors.phone.message}</p>
                  )}
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  variant="primary"
                  loading={isSubmitting}
                  className="mt-2 w-full py-4 text-sm tracking-wide"
                >
                  Submit Registration
                </Button>

                <p className="text-[11px] text-center text-slate-400 mt-1">
                  By submitting, you agree to our privacy policy and consent to receive updates.
                </p>
              </form>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  );
}

import Container from "../ui/Container";
import { Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaTwitter, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-slate-200/50 bg-white py-16 text-slate-600">
      <Container>
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand Info */}
          <div className="flex flex-col gap-4">
            <div>
              <h2 className="text-xl font-black tracking-tight text-slate-900 leading-none">
                Robo<span className="text-indigo-600">Spark</span>
              </h2>
              <p className="mt-1.5 text-[9px] font-bold tracking-wider uppercase text-slate-400">
                Future Starts Here
              </p>
            </div>
            <p className="text-sm leading-relaxed text-slate-500">
              An intensive summer coding & robotics workshop designed to transform children aged 8–14 into tomorrow's AI creators.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-5">
              Workshop
            </h3>
            <ul className="flex flex-col gap-3 text-sm">
              <li>
                <a href="#overview" className="transition hover:text-indigo-600">Overview</a>
              </li>
              <li>
                <a href="#why-join" className="transition hover:text-indigo-600">Why Join</a>
              </li>
              <li>
                <a href="#roadmap" className="transition hover:text-indigo-600">Curriculum</a>
              </li>
              <li>
                <a href="#faq" className="transition hover:text-indigo-600">FAQ</a>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-5">
              Get in Touch
            </h3>
            <ul className="flex flex-col gap-3 text-sm text-slate-500">
              <li className="flex items-center gap-2.5">
                <Mail size={16} className="text-indigo-600" />
                <a href="mailto:hello@robospark.edu" className="transition hover:text-indigo-600">hello@robospark.edu</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone size={16} className="text-indigo-600" />
                <a href="tel:+919876543210" className="transition hover:text-indigo-600">+91 98765 43210</a>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin size={16} className="text-indigo-600 mt-0.5" />
                <span>Live Online Sessions (IST)</span>
              </li>
            </ul>
          </div>

          {/* Social Links & Newsletter Info */}
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-900 mb-5">
              Connect With Us
            </h3>
            <div className="flex gap-4">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                aria-label="Twitter"
              >
                <FaTwitter size={18} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                aria-label="LinkedIn"
              >
                <FaLinkedinIn size={18} />
              </a>
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-50 text-slate-600 transition hover:bg-indigo-50 hover:text-indigo-600"
                aria-label="GitHub"
              >
                <FaGithub size={18} />
              </a>
            </div>
            <p className="mt-4 text-xs text-slate-400">
              Join live interactive online classes from the comfort of your home.
            </p>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="mt-12 border-t border-slate-100 pt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between text-xs text-slate-400">
          <p>© {currentYear} RoboSpark. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-indigo-600">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600">Terms of Service</a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

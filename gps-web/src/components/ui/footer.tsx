"use client";

import Link from "next/link";
import { navigationLinks } from "@/lib/data/navigation";
import { MapPin, Phone, Mail, FileText } from "lucide-react";

export function Footer() {
  const triggerInquiry = () => {
    window.dispatchEvent(new CustomEvent("open-inquiry-drawer"));
  };

  return (
    <footer className="bg-navy-card/60 border-t border-white/10 text-white py-12 sm:py-20 relative z-20">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 sm:gap-16 mb-12 sm:mb-16">
          {/* Brand & Description */}
          <div className="md:col-span-1 flex flex-col gap-6">
            <h3 className="text-heading-sm font-black uppercase text-white tracking-widest text-gold-gradient leading-tight">
              GREETS PUBLIC<br/>SCHOOL
            </h3>
            <p className="text-body-sm font-medium text-white/70 tracking-tight">
              Educational Efficacy & Holistic Development in the Heart of Kochi. Nurturing excellence and integrity since 1985.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-6">QUICK LINKS</h4>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-body-sm font-medium text-white/60 hover:text-white transition-colors uppercase tracking-wider">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="md:col-span-2 space-y-6">
            <h4 className="text-xs font-bold text-accent uppercase tracking-widest mb-6">CONTACT INFORMATION</h4>
            <div className="space-y-4">
              <div className="flex items-start gap-4 text-white/70">
                <MapPin className="w-5 h-5 text-accent shrink-0" />
                <span className="text-body-sm font-medium tracking-wide uppercase">ASHOKA ROAD, KALOOR, KOCHI, KERALA, INDIA - 682017</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <Phone className="w-5 h-5 text-accent shrink-0" />
                <span className="text-body-sm font-medium tracking-wide">+91 (484) 2533744, 2535400</span>
              </div>
              <div className="flex items-center gap-4 text-white/70">
                <Mail className="w-5 h-5 text-accent shrink-0" />
                <span className="text-body-sm font-medium tracking-wide uppercase">INFO@GPS.AC.IN</span>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col gap-4 sm:gap-6">
          <div className="flex flex-col gap-1 text-center">
            <p className="text-xs font-medium text-white/40 tracking-wider uppercase">
              &copy; {new Date().getFullYear()} GREETS PUBLIC SCHOOL. ALL RIGHTS RESERVED.
            </p>
            <p className="text-[10px] font-medium text-white/30 tracking-widest uppercase flex items-center justify-center lg:justify-start gap-1">
              made by{" "}
              <span 
                className="font-black text-white/60 lowercase tracking-normal text-xs hover:text-white transition-colors cursor-pointer relative -top-[1.5px]" 
                style={{ fontFamily: "ui-rounded, Comfortaa, 'Quicksand', sans-serif" }}
              >
                webbes
              </span>
            </p>
            <p className="text-[10px] font-medium text-white/30 tracking-widest uppercase flex items-center justify-center lg:justify-start gap-1.5">
              <span className="inline-block w-1 h-1 rounded-full bg-accent/50" />
              Designed by{" "}
              <span className="font-black text-accent/70 hover:text-accent transition-colors cursor-default tracking-normal lowercase text-xs">
                students
              </span>
              of Greets Public School
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 sm:gap-8">
            <Link href="/governance" className="text-xs font-semibold text-white/40 hover:text-white transition-colors uppercase tracking-wider flex items-center gap-1.5">
              <FileText className="w-3.5 h-3.5 text-accent" /> MANDATORY DISCLOSURE
            </Link>
            <button 
              onClick={triggerInquiry}
              className="text-xs font-semibold text-accent hover:text-white transition-colors uppercase tracking-wider cursor-pointer"
            >
              ADMISSIONS INQUIRY
            </button>
          </div>

          <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
            {[
              { name: "Instagram", href: "https://www.instagram.com/greetspublicschool" },
              { name: "Facebook", href: "https://www.facebook.com/greetspublicschool" },
              { name: "YouTube", href: "https://www.youtube.com/@greetspublicschool" },
              { name: "LinkedIn", href: "https://www.linkedin.com/company/greets-public-school" }
            ].map((social) => (
              <a 
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[10px] font-bold text-white/40 hover:text-accent transition-colors uppercase tracking-wider"
              >
                {social.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

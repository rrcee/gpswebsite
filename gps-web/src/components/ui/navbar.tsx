"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { navigationLinks } from "@/lib/data/navigation";
import { useLiquidGlass } from "@/lib/hooks/useLiquidGlass";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const glassRef = useLiquidGlass({
    scale: -45, // subtle refraction for thin navbar to keep menu items legible
    blur: 6,
    saturate: 1.3,
  });

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const triggerInquiry = () => {
    window.dispatchEvent(new CustomEvent("open-inquiry-drawer"));
  };

  return (
    <header
      ref={glassRef}
      className={cn(
        "fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-7xl z-50 transition-all duration-500 h-[64px] flex items-center px-6 sm:px-8 border border-white/10 rounded-full shadow-2xl",
        scrolled ? "bg-white/5! top-2 border-white/20! h-[58px]" : "bg-white/[0.02]!"
      )}
    >
      <div className="w-full flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center group gap-2">
          <span className="font-black text-2xl tracking-tighter text-white uppercase text-gold-gradient transition-all">
            GPS
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navigationLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className="relative text-xs font-bold text-white/80 hover:text-white transition-colors uppercase tracking-widest py-1 group/nav"
            >
              {link.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-white transition-all duration-300 group-hover/nav:w-full" />
            </Link>
          ))}
        </nav>
        
        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-4">
          <Button variant="outline" className="border-white/20 text-white hover:bg-white/5 font-semibold text-xs uppercase px-5 rounded-full cursor-pointer">
            <Link href="/admissions#fees">Fees</Link>
          </Button>
          <Button 
            onClick={triggerInquiry}
            className="bg-accent border-accent text-navy-deep hover:bg-accent/90 font-bold text-xs uppercase px-5 rounded-full cursor-pointer shadow-lg"
          >
            Apply Now
          </Button>
        </div>

        {/* Mobile Nav */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger
              render={<Button variant="ghost" size="icon" className="text-white hover:bg-white/10 border-transparent rounded-full cursor-pointer" />}
            >
              <Menu className="w-5 h-5" />
              <span className="sr-only">Toggle Menu</span>
            </SheetTrigger>
            <SheetContent side="right" className="bg-navy-deep border-l border-white/15 text-white p-8">
              <SheetTitle className="text-white font-extrabold uppercase text-lg tracking-wider mb-6">Menu</SheetTitle>
              <div className="flex flex-col gap-5 mt-4">
                {navigationLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-semibold text-white/80 hover:text-accent transition-colors uppercase tracking-wider border-b border-white/5 pb-3"
                  >
                    {link.name}
                  </Link>
                ))}
                <div className="flex flex-col gap-3 mt-6">
                  <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/5 font-semibold uppercase rounded-full cursor-pointer">
                    <Link href="/admissions#fees" className="w-full">Fee Structure</Link>
                  </Button>
                  <Button 
                    onClick={triggerInquiry}
                    className="w-full bg-accent border-accent text-navy-deep hover:bg-accent/90 font-bold uppercase rounded-full cursor-pointer"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

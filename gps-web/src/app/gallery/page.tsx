"use client";

import React, { useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import { ZoomParallax } from "@/components/ui/zoom-parallax";
import { ScrollReveal } from "@/components/ui/ScrollReveal";
import { MediaGallery } from "@/components/sections/MediaGallery";

export default function GalleryPage() {
  useEffect(() => {
    const lenis = new Lenis();
    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const images = [
    {
      src: "https://gps.ac.in/wp-content/uploads/2026/02/607341392_18067517510616919_9169206320588648456_n.jpg",
      alt: "Aureate Gala 2025 Chief Guests",
    },
    {
      src: "https://gps.ac.in/wp-content/uploads/2026/02/608817709_18067517453616919_5977498655935591030_n.jpg",
      alt: "Aureate Gala Annual Celebration",
    },
    {
      src: "https://gps.ac.in/wp-content/uploads/2026/02/607642519_18067517519616919_927162746986317000_n.jpg",
      alt: "Annual Day Dance Festivities",
    },
    {
      src: "https://gps.ac.in/wp-content/uploads/2026/02/623476502_18070724981616919_7674705113917907909_n.jpg",
      alt: "Pet Show Celebration 2025",
    },
    {
      src: "https://gps.ac.in/wp-content/uploads/2026/02/557656146_18057658631616919_968335446199210846_n.jpg",
      alt: "Gandhi Jayanti Festivities",
    },
    {
      src: "https://gps.ac.in/wp-content/uploads/2026/02/573124707_18061636238616919_3512383167335893922_n.jpg",
      alt: "Halloween Celebration",
    },
    {
      src: "https://gps.ac.in/wp-content/uploads/2026/02/633984860_1195438206084498_7364909835016892451_n.jpg",
      alt: "Ding Dong Kindergarten Study Tour",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent pt-36 pb-24 relative z-10">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="mb-12 text-center">
          <span className="text-xs font-bold text-accent tracking-widest uppercase block mb-1">
            Media Gallery
          </span>
          <h1 className="text-heading-lg text-white font-black">
            Life at <span className="text-gold-gradient">Greets</span>
          </h1>
        </ScrollReveal>
      </div>

      {/* Zoom Parallax Component */}
      <ZoomParallax images={images} />

      {/* Bento Grid Media Showcase Component */}
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 lg:px-8 mt-24">
        <MediaGallery />
      </div>
    </div>
  );
}

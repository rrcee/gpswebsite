"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Image as ImageIcon, X, ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { gallery as photoAlbums } from "@/lib/data/gallery";

// Register ScrollTrigger client-side
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

// 7 YouTube videos with covers from YouTube's hqdefault thumbnail API
const youtubeVideos = [
  {
    id: "yt-1",
    title: "CBSE Compliance Video - Greets Public School",
    type: "video",
    category: "Events",
    videoId: "8klgBxBj8eQ",
    cover: "https://img.youtube.com/vi/8klgBxBj8eQ/hqdefault.jpg",
  },
  {
    id: "yt-2",
    title: "Greets Public School - Pet Show 2025",
    type: "video",
    category: "Campus",
    videoId: "6wY5g0OsDAw",
    cover: "https://img.youtube.com/vi/6wY5g0OsDAw/hqdefault.jpg",
  },
  {
    id: "yt-3",
    title: "Greets Public School - Halloween Day Celebration 2025",
    type: "video",
    category: "Sports",
    videoId: "qUQo_nYgyyg",
    cover: "https://img.youtube.com/vi/qUQo_nYgyyg/hqdefault.jpg",
  },
  {
    id: "yt-4",
    title: "Greets Public School - Onam Celebration 2025",
    type: "video",
    category: "Events",
    videoId: "dc84E1H9GFc",
    cover: "https://img.youtube.com/vi/dc84E1H9GFc/hqdefault.jpg",
  },
  {
    id: "yt-5",
    title: "Greets Public School - Farewell Ceremony 2023-'24",
    type: "video",
    category: "Academics",
    videoId: "xMNxrwEPFrA",
    cover: "https://img.youtube.com/vi/xMNxrwEPFrA/hqdefault.jpg",
  },
  {
    id: "yt-6",
    title: "Greets Public School - Fiesta Fantasia 2023 Showcase",
    type: "video",
    category: "Academics",
    videoId: "3Aqg72EysvE",
    cover: "https://img.youtube.com/vi/3Aqg72EysvE/hqdefault.jpg",
  },
  {
    id: "yt-7",
    title: "Greets Public School - Fiesta Fantasia 2023 Highlights",
    type: "video",
    category: "Kindergarten",
    videoId: "Fm27YyJ_6Ng",
    cover: "https://img.youtube.com/vi/Fm27YyJ_6Ng/hqdefault.jpg",
  },
];

export function MediaGallery() {
  const [filter, setFilter] = useState("all"); // "all" | "photos" | "videos"
  const [lightboxItem, setLightboxItem] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  
  const gridRef = useRef<HTMLDivElement>(null);

  // Format Photo albums to gallery items
  const photoItems = photoAlbums.slice(0, 8).map((album, idx) => ({
    id: `photo-${idx}`,
    title: album.title,
    type: "photo",
    category: "Photos",
    cover: album.cover,
    images: album.images
  }));

  // Combine items
  const allItems = [...photoItems, ...youtubeVideos];

  // Filter items
  const filteredItems = allItems.filter((item) => {
    if (filter === "all") return true;
    if (filter === "photos") return item.type === "photo";
    if (filter === "videos") return item.type === "video";
    return false;
  });

  // Stagger GSAP Animation on scroll
  useEffect(() => {
    if (!gridRef.current) return;

    // Reset previous triggers
    ScrollTrigger.getAll().forEach((trigger) => {
      if (trigger.vars.trigger === gridRef.current) trigger.kill();
    });

    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".bento-card-trigger",
        { opacity: 0, y: 50, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "power2.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none none"
          }
        }
      );
    }, gridRef);

    return () => ctx.revert();
  }, [filter]);

  // Lightbox controllers
  const openLightbox = (item: any) => {
    setLightboxItem(item);
    setActiveImageIndex(0);
  };

  const closeLightbox = () => {
    setLightboxItem(null);
  };

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxItem || !lightboxItem.images) return;
    setActiveImageIndex((prev) => (prev + 1) % lightboxItem.images.length);
  };

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!lightboxItem || !lightboxItem.images) return;
    setActiveImageIndex((prev) => (prev - 1 + lightboxItem.images.length) % lightboxItem.images.length);
  };

  // Determine Bento sizes for items with dynamic column filling to ensure no gaps
  const getBentoSize = (index: number, total: number) => {
    const remainder = total % 10;
    
    // Adjust spacing of items on the last row to fill the 3-column grid perfectly
    if (index >= total - remainder) {
      const remainderIndex = index - (total - remainder);
      
      if (remainder === 1) {
        return "md:col-span-3 md:row-span-1";
      }
      if (remainder === 2) {
        if (remainderIndex === 0) return "md:col-span-2 md:row-span-1";
        if (remainderIndex === 1) return "md:col-span-1 md:row-span-1";
      }
      if (remainder === 3) {
        if (remainderIndex === 0) return "md:col-span-2 md:row-span-1";
        if (remainderIndex === 1) return "md:col-span-1 md:row-span-2";
        if (remainderIndex === 2) return "md:col-span-2 md:row-span-1";
      }
      if (remainder === 4) {
        if (remainderIndex === 0) return "md:col-span-1 md:row-span-1";
        if (remainderIndex === 1) return "md:col-span-1 md:row-span-1";
        if (remainderIndex === 2) return "md:col-span-1 md:row-span-2";
        if (remainderIndex === 3) return "md:col-span-2 md:row-span-1";
      }
      if (remainder === 5) {
        if (remainderIndex === 0) return "md:col-span-2 md:row-span-1";
        if (remainderIndex === 1) return "md:col-span-1 md:row-span-2";
        if (remainderIndex === 2) return "md:col-span-2 md:row-span-1";
        if (remainderIndex === 3) return "md:col-span-2 md:row-span-1";
        if (remainderIndex === 4) return "md:col-span-1 md:row-span-1";
      }
      if (remainder === 7) {
        if (remainderIndex === 6) return "md:col-span-3 md:row-span-1";
      }
      if (remainder === 8) {
        if (remainderIndex === 6) return "md:col-span-1 md:row-span-1";
        if (remainderIndex === 7) return "md:col-span-2 md:row-span-1";
      }
      if (remainder === 9) {
        if (remainderIndex === 6) return "md:col-span-1 md:row-span-1";
        if (remainderIndex === 7) return "md:col-span-1 md:row-span-1";
        if (remainderIndex === 8) return "md:col-span-1 md:row-span-1";
      }
    }

    const layout = [
      "md:col-span-2 md:row-span-1",
      "md:col-span-1 md:row-span-2",
      "md:col-span-2 md:row-span-1",
      "md:col-span-1 md:row-span-2",
      "md:col-span-2 md:row-span-1",
      "md:col-span-2 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-1",
      "md:col-span-1 md:row-span-2",
      "md:col-span-2 md:row-span-1",
    ];
    return layout[index % layout.length];
  };

  return (
    <div className="space-y-12">
      {/* Category Tabs */}
      <div className="flex justify-center gap-4 z-20 relative">
        {["all", "photos", "videos"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest border transition-all cursor-pointer ${
              filter === tab
                ? "bg-accent border-accent text-navy-deep shadow-lg"
                : "border-white/10 text-white/70 hover:text-white hover:border-white/20 bg-white/5"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Bento Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[240px] grid-flow-row-dense max-w-[1280px] mx-auto px-4"
      >
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item: any, index: number) => (
            <motion.div
              layout
              key={item.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4 }}
              className={`bento-card-trigger ${getBentoSize(index, filteredItems.length)} relative cursor-pointer`}
              onClick={() => openLightbox(item)}
            >
              <div className="w-full h-full p-0 flex flex-col group/card relative rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md transition-all duration-500 shadow-2xl hover:border-white/25 hover:shadow-[0_20px_50px_rgba(255,255,255,0.05)] hover:-translate-y-1 hover:scale-101 overflow-hidden">
                {/* Media Wrapper */}
                <div className="absolute inset-0 z-0 overflow-hidden w-full h-full">
                  <img
                    src={item.cover}
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />
                  <div className="absolute top-4 right-4 z-10 w-9 h-9 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white">
                    {item.type === "video" ? (
                      <Play className="w-4 h-4 fill-white text-white ml-0.5" />
                    ) : (
                      <ImageIcon className="w-4 h-4 text-white" />
                    )}
                  </div>
                  {/* Backdrop overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 transition-opacity duration-300 group-hover/card:from-black/90" />
                </div>

                {/* Content Overlay */}
                <div className="relative z-10 mt-auto p-6 flex flex-col justify-end h-full">
                  <span className="text-[10px] font-bold text-accent tracking-widest uppercase mb-1.5">
                    {item.category}
                  </span>
                  <h4 className="text-base font-extrabold uppercase text-white tracking-wide group-hover/card:text-accent transition-colors">
                    {item.title}
                  </h4>
                  {item.type === "photo" && item.images && (
                    <span className="text-xs text-white/50 font-bold mt-1.5 uppercase">
                      {item.images.length} Photos
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {lightboxItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy-deep/90 backdrop-blur-md">
            {/* Modal Overlay Close trigger */}
            <div className="absolute inset-0 cursor-zoom-out" onClick={closeLightbox} />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
              className="border border-white/20 w-full max-w-[960px] max-h-[90vh] flex flex-col p-6 sm:p-8 z-10 rounded-2xl relative shadow-2xl overflow-hidden bg-[#080E21]"
            >
              {/* Close Button */}
              <button
                onClick={closeLightbox}
                className="absolute top-6 right-6 z-30 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Title Header */}
              <div className="mb-6 pr-12 z-20">
                <span className="text-xs font-bold text-accent tracking-widest uppercase mb-1 block">
                  {lightboxItem.category} Showcase
                </span>
                <h3 className="text-lg font-black uppercase text-white tracking-wide">
                  {lightboxItem.title}
                </h3>
              </div>

              {/* Media Body */}
              <div className="flex-1 flex items-center justify-center min-h-[300px] md:min-h-[480px] w-full relative overflow-hidden bg-black/40 rounded-xl border border-white/5 z-20">
                {lightboxItem.type === "video" ? (
                  <iframe
                    src={`https://www.youtube.com/embed/${lightboxItem.videoId}?autoplay=1`}
                    title={lightboxItem.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full min-h-[300px] md:min-h-[480px] rounded-xl border-0"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center relative p-4">
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={activeImageIndex}
                        src={lightboxItem.images[activeImageIndex]}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        className="max-w-full max-h-[450px] object-contain rounded-lg"
                      />
                    </AnimatePresence>

                    {/* Navigation Buttons for Photos */}
                    {lightboxItem.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/10 hover:bg-black/85 text-white transition-colors cursor-pointer"
                        >
                          <ChevronLeft className="w-6 h-6" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center rounded-full bg-black/60 border border-white/10 hover:bg-black/85 text-white transition-colors cursor-pointer"
                        >
                          <ChevronRight className="w-6 h-6" />
                        </button>

                        {/* Slide Indicator */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 border border-white/10 px-4 py-1.5 rounded-full text-xs font-bold tracking-wider text-white">
                          {activeImageIndex + 1} / {lightboxItem.images.length}
                        </div>
                      </>
                    )}
                  </div>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

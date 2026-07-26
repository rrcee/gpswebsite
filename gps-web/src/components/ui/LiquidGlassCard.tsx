"use client";

import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from "framer-motion";
import React, { useEffect, useRef } from "react";
import { useLiquidGlass } from "@/lib/hooks/useLiquidGlass";

interface LiquidGlassCardProps extends Omit<HTMLMotionProps<"div">, "style"> {
  children: React.ReactNode;
  className?: string;
  options?: any;
}

export function LiquidGlassCard({
  children,
  className = "",
  options = {},
  ...props
}: LiquidGlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  
  // Merge and smooth options to make the glass extremely soft and premium
  const smoothedOptions = {
    scale: options.scale ? Math.max(options.scale * 0.45, -45) : -45,
    blur: options.blur ? Math.min(options.blur * 4.0, 20) : 16,
    chroma: options.chroma !== undefined ? options.chroma : 2,
    border: options.border !== undefined ? options.border : 0.04,
    mapBlur: options.mapBlur !== undefined ? options.mapBlur : 32,
    saturate: options.saturate !== undefined ? options.saturate : 1.2,
  };
  const glassRef = useLiquidGlass(smoothedOptions);

  // Combine ref callbacks
  const setRefs = (node: HTMLDivElement | null) => {
    if (node) {
      (cardRef as any).current = node;
      (glassRef as any).current = node;
    }
  };

  // Setup motion values for mouse hover tracking
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Smooth springs for 3D rotations
  const springConfig = { damping: 25, stiffness: 150, mass: 0.5 };
  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [10, -10]), springConfig);
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-10, 10]), springConfig);

  // Spot light glare offsets and opacity
  const glareX = useSpring(useTransform(x, [-0.5, 0.5], ["0%", "100%"]), springConfig);
  const glareY = useSpring(useTransform(y, [-0.5, 0.5], ["0%", "100%"]), springConfig);
  const glareOpacity = useSpring(0, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const w = rect.width;
    const h = rect.height;

    // Normalizing X and Y coordinates to [-0.5, 0.5] range
    const mouseX = (e.clientX - rect.left) / w - 0.5;
    const mouseY = (e.clientY - rect.top) / h - 0.5;

    x.set(mouseX);
    y.set(mouseY);
    glareOpacity.set(0.15); // subtle glare
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    glareOpacity.set(0);
  };

  // Gyroscopic tilt setup for mobile
  useEffect(() => {
    if (typeof window === 'undefined') return;

    // Check if user is on mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isMobile) return;

    const handleOrientation = (e: DeviceOrientationEvent) => {
      const beta = e.beta || 0;   // range [-180, 180] (pitch)
      const gamma = e.gamma || 0; // range [-90, 90] (roll)

      // Assuming standard device posture (tilted at 45 degrees for comfortable holding)
      const normX = Math.max(-1, Math.min(1, gamma / 30));
      const normY = Math.max(-1, Math.min(1, (beta - 45) / 30));

      x.set(normX * 0.4);
      y.set(normY * 0.4);
      glareOpacity.set(0.08); // constant subtle glare on mobile
    };

    let permissionRequested = false;
    const requestGyroPermission = async () => {
      const DeviceOrientationEventAny = DeviceOrientationEvent as any;
      if (typeof DeviceOrientationEventAny.requestPermission === 'function') {
        try {
          const status = await DeviceOrientationEventAny.requestPermission();
          if (status === 'granted') {
            window.addEventListener('deviceorientation', handleOrientation);
          }
        } catch (err) {
          console.warn("DeviceOrientation permission rejected:", err);
        }
      } else {
        window.addEventListener('deviceorientation', handleOrientation);
      }
    };

    const handleFirstTouch = () => {
      if (!permissionRequested) {
        permissionRequested = true;
        requestGyroPermission();
      }
    };

    window.addEventListener('touchstart', handleFirstTouch, { passive: true });

    return () => {
      window.removeEventListener('deviceorientation', handleOrientation);
      window.removeEventListener('touchstart', handleFirstTouch);
    };
  }, [x, y, glareOpacity]);

  return (
    <motion.div
      ref={setRefs}
      style={{
        rotateX,
        rotateY,
        transformStyle: "preserve-3d",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`liquid-glass-card group relative transition-all duration-300 ease-out hover:-translate-y-1.5 hover:scale-[1.01] hover:!border-white/35 hover:!shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.45),inset_0_-1px_2px_0_rgba(0,0,0,0.4),0_25px_50px_-12px_rgba(0,0,0,0.65)] select-none ${className}`}
      {...props}
    >
      {/* Glare spotlight overlay */}
      <motion.div
        style={{
          background: `radial-gradient(circle 150px at ${glareX} ${glareY}, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0) 80%)`,
          opacity: glareOpacity,
        }}
        className="pointer-events-none absolute inset-0 z-10"
      />
      {/* Dynamic specular inner borders */}
      <div className="absolute inset-0 rounded-[20px] border border-white/[0.08] pointer-events-none z-20" />
      {/* Floating children wrapper */}
      <div style={{ transform: "translateZ(24px)", transformStyle: "preserve-3d" }} className="relative z-30 h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

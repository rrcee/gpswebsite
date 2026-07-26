"use client";

import React from "react";

const SHARE_URL = "https://www.colorsandfonts.com/shaders-builder/embed?preset=noise-mesh&c0=%2300315e&c1=%230e80aa&c2=%23a8bfc2&c3=%23f5f5f5&speed=0.15&scale=0.2&intensity=0.5&grain=0.33&freq=1.87&amp=2.33&bri=1.45&sg=interstella&engine=3d" as const;

export function ShaderMakerEmbed() {
  return (
    <iframe
      src={SHARE_URL}
      width={1024}
      height={1024}
      title="Shader Maker"
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      style={{ border: 0, borderRadius: 12, maxWidth: "100%" }}
    />
  );
}

export function ShaderNavyBackground() {
  return (
    <div className="fixed inset-0 -z-50 w-full h-full overflow-hidden bg-[#080E21] pointer-events-none">
      <iframe
        src={SHARE_URL}
        title="Shader Maker"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full h-full border-0 pointer-events-none scale-105"
        style={{ border: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}

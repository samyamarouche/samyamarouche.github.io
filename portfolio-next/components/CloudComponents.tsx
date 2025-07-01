import React from "react";

// CloudWaveSVG: a keynote-style cloud wave for light mode
export function CloudWaveSVG({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      viewBox="0 0 3200 1000"
      width="3200"
      height="1000"
      style={style}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cloudInnerPink" x1="0" y1="200" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
          <stop offset="-10%" stopColor="var(--light-cloud-inner-1)" stopOpacity="0.05" />
          <stop offset="0%" stopColor="var(--light-cloud-inner-1)" stopOpacity="0.05" />
          <stop offset="30%" stopColor="var(--light-cloud-inner-2)" stopOpacity="0.08" />
          <stop offset="60%" stopColor="var(--light-cloud-inner-3)" stopOpacity="0.10" />
          <stop offset="100%" stopColor="var(--light-cloud-inner-4)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Main white cloud */}
      <path
        d="M0,200
          C400,400 400,0 800,200
          S1200,400 1600,200
          S2000,0 2400,200
          S2800,400 3200,200
          V1000 H0 Z"
        fill="var(--light-cloud-main)"
        stroke="var(--light-cloud-stroke)"
        strokeWidth="12"
        opacity="0.98"
        style={{ filter: `drop-shadow(0 -24px 64px var(--light-cloud-shadow))` }}
      />
      {/* More visible pink highlight inside the cloud */}
      <path
        d="M0,200
          C400,400 400,0 800,200
          S1200,400 1600,200
          S2000,0 2400,200
          S2800,400 3200,200
          V1000 H0 Z"
        fill="url(#cloudInnerPink)"
        opacity="0.85"
      />
    </svg>
  );
}

// DarkCloudWaveSVG: a keynote-style cloud wave for dark mode
export function DarkCloudWaveSVG({ style, className }: { style?: React.CSSProperties; className?: string }) {
  return (
    <svg
      viewBox="0 0 3200 1000"
      width="3200"
      height="1000"
      style={style}
      className={className}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="cloudInnerDark" x1="0" y1="200" x2="0" y2="1000" gradientUnits="userSpaceOnUse">
          <stop offset="-10%" stopColor="var(--dark-cloud-inner-1)" stopOpacity="0.15" />
          <stop offset="0%" stopColor="var(--dark-cloud-inner-1)" stopOpacity="0.15" />
          <stop offset="30%" stopColor="var(--dark-cloud-inner-2)" stopOpacity="0.20" />
          <stop offset="60%" stopColor="var(--dark-cloud-inner-3)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="var(--dark-cloud-inner-4)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* Main dark cloud */}
      <path
        d="M0,200
          C400,400 400,0 800,200
          S1200,400 1600,200
          S2000,0 2400,200
          S2800,400 3200,200
          V1000 H0 Z"
        fill="var(--dark-cloud-main)"
        stroke="var(--dark-cloud-stroke)"
        strokeWidth="12"
        opacity="0.85"
        style={{ filter: `drop-shadow(0 -24px 64px var(--dark-cloud-shadow))` }}
      />
      {/* Dark highlight inside the cloud */}
      <path
        d="M0,200
          C400,400 400,0 800,200
          S1200,400 1600,200
          S2000,0 2400,200
          S2800,400 3200,200
          V1000 H0 Z"
        fill="url(#cloudInnerDark)"
        opacity="0.90"
      />
    </svg>
  );
}

// Clouds component for light mode
export function Clouds() {
  return (
    <CloudWaveSVG 
      className="cloud-wave-svg animate-cloud-wave" 
      style={{ 
        position: 'fixed', 
        bottom: '0', 
        left: '-400px', 
        width: '3200px', 
        height: '1000px', 
        zIndex: 0, 
        opacity: 0.98, 
        pointerEvents: 'none' 
      }} 
    />
  );
}

// DarkClouds component for dark mode
export function DarkClouds() {
  return (
    <DarkCloudWaveSVG 
      className="dark-cloud-wave-svg animate-cloud-wave" 
      style={{ 
        position: 'fixed', 
        bottom: '0', 
        left: '-400px', 
        width: '3200px', 
        height: '1000px', 
        zIndex: 0, 
        opacity: 0.75, 
        pointerEvents: 'none' 
      }} 
    />
  );
} 
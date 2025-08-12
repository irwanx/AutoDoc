export const GeometricGrid = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Radial Light Gradient */}
      <div
        className="absolute inset-0 opacity-30"
        style={{
          background:
            'radial-gradient(circle at center, rgba(99, 102, 241, 0.08) 0%, rgba(255,255,255,0) 80%)',
        }}
      />

      {/* Light Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0,0,0,0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0,0,0,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '40px 40px',
          maskImage:
            'radial-gradient(circle at center, black 60%, transparent 100%)',
          WebkitMaskImage:
            'radial-gradient(circle at center, black 60%, transparent 100%)',
        }}
      />

      {/* Subtle Diagonal Lines */}
      <div
        className="absolute inset-0 opacity-5"
        style={{
          backgroundImage: `
            linear-gradient(45deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(-45deg, rgba(0, 0, 0, 0.04) 1px, transparent 1px)
          `,
          backgroundSize: '80px 80px',
        }}
      />

      {/* Soft Geometric Shapes */}
      <div className="absolute top-[20%] left-[10%] w-24 h-24 rounded-full bg-blue-400/10 blur-xl" />
      <div className="absolute top-[60%] left-[25%] w-32 h-32 bg-purple-300/10 rotate-12 rounded-lg blur-lg" />
      <div className="absolute bottom-[10%] right-[15%] w-40 h-40 bg-indigo-300/10 rounded-full blur-2xl" />

      {/* Gentle Center Pulse */}
      <div
        className="absolute top-1/2 left-1/2 w-[300px] h-[300px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-blue-300/10 animate-pulse blur-2xl"
        style={{ animationDuration: '10s' }}
      />
    </div>
  );
};

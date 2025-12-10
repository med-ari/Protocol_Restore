import React, { useEffect, useState } from 'react';

// A simple CSS-based particle system
export const ParticleBurst: React.FC = () => {
  const [particles, setParticles] = useState<{id: number, x: number, y: number, color: string}[]>([]);

  useEffect(() => {
    // Generate particles
    const colors = ['#00f2ff', '#9d00ff', '#00ff9d', '#ffffff'];
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: (Math.random() - 0.5) * 300, // wider spread
      y: (Math.random() - 0.5) * 300,
      color: colors[Math.floor(Math.random() * colors.length)]
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute top-1/2 left-1/2 w-0 h-0 pointer-events-none z-50">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute w-2 h-2 rounded-sm animate-particle"
          style={{
            backgroundColor: p.color,
            '--tx': `${p.x}px`,
            '--ty': `${p.y}px`,
            boxShadow: `0 0 6px ${p.color}`
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
};
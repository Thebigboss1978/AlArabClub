import React, { useRef, useEffect, useState, useCallback } from 'react';

interface Particle {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  char: string;
  glow: number;
  vx: number;
  vy: number;
}

const DottedSphereBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const introSoundRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);

  const [particles, setParticles] = useState<Particle[]>([]);
  const mouse = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const isExploded = useRef(false);

  const symbols = [".", "·", "7", "•", "𓁹"];
  const spacing = 7;
  const fontSize = 10;
  const radius = 150;

  const glyphsChars = "𓂀𓏏𓆣𓋹𓉐𓄿𓇳𓎛𓈖𓃭𓍯𓊃𓊪𓃾𓈎𓅱𓅓𓃀𓇋𓍿𓐍𓊽𓌳𓋴𓇯𓏠𓉔𓁷ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|\\/~?><!-=:,.αβγδεζηθικλμνξοπρστυφχψωАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯشعرابشيخفجثجظرزسضطىةءؤإأآ✓∞≠±∑∂∆µπ⊕⊗⊙⊥∩∪∈∉∀∃√∛☥☯☸♁⚛🔥✨🌌💫S⋄A⋄L⋄S⋄";

  const getRandomDelay = useCallback(() => {
    return (Math.floor(Math.random() * 70) + 7) * 1000;
  }, []);

  const nextCycle = useRef(Date.now() + getRandomDelay()); // Moved after getRandomDelay definition

  const explodeParticles = useCallback(() => {
    setParticles(prevParticles =>
      prevParticles.map(p => ({
        ...p,
        vx: (Math.random() - 0.5) * 20,
        vy: (Math.random() - 0.5) * 20,
      }))
    );
    isExploded.current = true;
    nextCycle.current = Date.now() + getRandomDelay();
  }, [getRandomDelay]);

  const regroupParticles = useCallback(() => {
    isExploded.current = false;
    nextCycle.current = Date.now() + getRandomDelay();
  }, [getRandomDelay]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      const offCanvas = document.createElement("canvas");
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      const offCtx = offCanvas.getContext("2d");
      if (!offCtx) return;

      offCtx.fillStyle = "white";
      offCtx.beginPath();
      offCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      offCtx.fill();
      const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);

      const newParticles: Particle[] = [];
      for (let y = 0; y < canvas.height; y += spacing) {
        for (let x = 0; x < canvas.width; x += spacing) {
          const i = (y * canvas.width + x) * 4;
          if (imageData.data[i + 3] > 128) {
            newParticles.push({
              x,
              y,
              baseX: x,
              baseY: y,
              char: symbols[Math.floor(Math.random() * symbols.length)],
              glow: Math.random(),
              vx: 0,
              vy: 0
            });
          }
        }
      }
      setParticles(newParticles);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const handleClick = (e: MouseEvent) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      if (Math.sqrt(dx * dx + dy * dy) < radius) {
        explodeParticles();
        clickSoundRef.current?.play().catch(err => console.warn("🎧 Click sound failed to play:", err));
        if (eyeRef.current) {
          eyeRef.current.style.left = "55%";
          setTimeout(() => {
            if (eyeRef.current) eyeRef.current.style.left = "50%";
          }, 1000);
        }
      }
    };
    canvas.addEventListener("click", handleClick);

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (Date.now() > nextCycle.current) {
        if (!isExploded.current) explodeParticles();
        else regroupParticles();
      }

      setParticles(prevParticles =>
        prevParticles.map(p => {
          const newP = { ...p };
          if (isExploded.current) {
            newP.x += newP.vx;
            newP.y += newP.vy;
            newP.vx *= 0.98;
            newP.vy *= 0.98;
          } else {
            newP.x -= (newP.x - newP.baseX) * 0.05;
            newP.y -= (newP.y - newP.baseY) * 0.05;
          }

          const dx = mouse.current.x - newP.x;
          const dy = mouse.current.y - newP.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const force = Math.max(0, 150 - dist) / 150;
          const moveX = (dx / dist) * force * 10 || 0;
          const moveY = (dy / dist) * force * 10 || 0;
          newP.x -= (newP.x - newP.baseX - moveX) * 0.1;
          newP.y -= (newP.y - newP.baseY - moveY) * 0.1;

          const flicker = Math.sin(Date.now() * 0.005 + newP.x * 0.01) * 0.3 + 0.7;
          ctx.fillStyle = `rgba(255, 215, 0, ${flicker})`;
          ctx.fillText(newP.char, newP.x, newP.y);
          return newP;
        })
      );
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, [explodeParticles, regroupParticles, getRandomDelay, symbols, spacing, fontSize]);

  useEffect(() => {
    const playIntroSound = () => {
      introSoundRef.current?.play().catch(err => {
        console.warn("🎧 Intro sound failed to play:", err);
      });
    };
    window.addEventListener('click', playIntroSound, { once: true });
    return () => {
      window.removeEventListener('click', playIntroSound);
    };
  }, []);

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black font-mono">
      <div className="matrix-background"></div>
      <div className="glyphs" id="glyphs">
        {Array.from({ length: 200 }).map((_, i) => (
          <div
            key={i}
            className="glyph"
            style={{
              left: `${Math.random() * 100}%`,
              top: `-${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          >
            {glyphsChars[Math.floor(Math.random() * glyphsChars.length)]}
          </div>
        ))}
      </div>
      <div className="eye-container" ref={eyeRef}>𓁹</div>
      <canvas ref={canvasRef} className="absolute top-0 left-0 block"></canvas>

      <audio id="introSound" src="https://alarabclub777.vercel.app/sounds/intro.mp3" preload="auto" ref={introSoundRef}></audio>
      <audio id="clickSound" src="https://alarabclub777.vercel.app/sounds/click.mp3" preload="auto" ref={clickSoundRef}></audio>
    </div>
  );
};

export default DottedSphereBackground;
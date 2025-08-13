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

interface Mouse {
  x: number;
  y: number;
}

const symbols = [".", "·", "7", "•", "𓁹"];
const spacing = 7;
const fontSize = 10;
const radius = 150; // Radius for the initial circle
const glyphsChars = "𓂀𓏏𓆣𓋹𓉐𓄿𓇳𓎛𓈖𓃭𓍯𓊃𓊪𓃾𓈎𓅱𓅓𓃀𓇋𓍿𓐍𓊽𓌳𓋴𓇯𓏠𓉔𓁷ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|\\/~?><!-=:,.αβγδεζηθικλμνξοπρστυφχψωАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯабвгдеёжзийклмнопрстuфхцчшщьюяشعرابشيخفجثجظرزسضطىةءؤإأآ✓∞≠±∑∂∆µπ⊕⊗⊙⊥∩∪∈∉∀∃√∛☥☯☸♁⚛🔥✨🌌💫S⋄A⋄L⋄S⋄";

const HeroBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introSoundRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const animationFrameId = useRef<number | null>(null);

  // Mutable refs for animation performance
  const particlesRef = useRef<Particle[]>([]);
  const mouseRef = useRef<Mouse>({ x: 0, y: 0 });
  const isExplodedRef = useRef(false);
  const nextCycleRef = useRef(Date.now());

  // State for elements that need React re-renders (like glyphs and eye position)
  const [glyphElements, setGlyphElements] = useState<JSX.Element[]>([]);
  const [eyeLeft, setEyeLeft] = useState('50%');

  const getRandomDelay = useCallback(() => {
    return (Math.floor(Math.random() * 70) + 7) * 1000;
  }, []);

  const explodeParticles = useCallback(() => {
    if (particlesRef.current) {
      particlesRef.current.forEach(p => {
        p.vx = (Math.random() - 0.5) * 20;
        p.vy = (Math.random() - 0.5) * 20;
      });
    }
    isExplodedRef.current = true;
    nextCycleRef.current = Date.now() + getRandomDelay();
  }, [getRandomDelay]);

  const regroupParticles = useCallback(() => {
    isExplodedRef.current = false;
    nextCycleRef.current = Date.now() + getRandomDelay();
  }, [getRandomDelay]);

  // Initial setup, event listeners, and glyph generation
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
      mouseRef.current = { x: centerX, y: centerY };

      const newParticles: Particle[] = [];
      const offCanvas = document.createElement("canvas");
      offCanvas.width = canvas.width;
      offCanvas.height = canvas.height;
      const offCtx = offCanvas.getContext("2d");
      if (offCtx) {
        offCtx.fillStyle = "white";
        offCtx.beginPath();
        offCtx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        offCtx.fill();
        const imageData = offCtx.getImageData(0, 0, canvas.width, canvas.height);
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
      }
      particlesRef.current = newParticles;
    };

    resizeCanvas(); // Initial resize and particle generation

    window.addEventListener("resize", resizeCanvas);

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const handleClick = (e: MouseEvent) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      if (Math.sqrt(dx * dx + dy * dy) < radius) {
        explodeParticles();
        clickSoundRef.current?.play();
        setEyeLeft('55%');
        setTimeout(() => {
          setEyeLeft('50%');
        }, 1000);
      }
    };
    canvas.addEventListener("click", handleClick);

    const handleIntroSoundPlay = () => {
      introSoundRef.current?.play().catch(err => {
        console.warn("🎧 Failed to play intro sound: ", err);
      });
    };
    window.addEventListener('click', handleIntroSoundPlay, { once: true });

    // Glyphs generation
    const generatedGlyphs: JSX.Element[] = [];
    for (let i = 0; i < 200; i++) {
      const char = glyphsChars[Math.floor(Math.random() * glyphsChars.length)];
      const left = `${Math.random() * 100}%`;
      const top = `-${Math.random() * 100}%`;
      const animationDelay = `${Math.random() * 2}s`;
      generatedGlyphs.push(
        <div
          key={i}
          className="glyph absolute text-[#39ff14] text-[calc(14px+0.4vw)] opacity-[0.06] animate-drift"
          style={{ left, top, animationDelay }}
        >
          {char}
        </div>
      );
    }
    setGlyphElements(generatedGlyphs);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener('click', handleIntroSoundPlay);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [explodeParticles]); // Dependencies for initial setup

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const currentParticles = particlesRef.current;
      const currentMouse = mouseRef.current;
      const currentIsExploded = isExplodedRef.current;

      for (let p of currentParticles) {
        if (currentIsExploded) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.98;
          p.vy *= 0.98;
        } else {
          p.x -= (p.x - p.baseX) * 0.05;
          p.y -= (p.y - p.baseY) * 0.05;
        }

        const dx = currentMouse.x - p.x;
        const dy = currentMouse.y - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const force = Math.max(0, 150 - dist) / 150;
        const moveX = (dx / dist) * force * 10 || 0;
        const moveY = (dy / dist) * force * 10 || 0;
        p.x -= (p.x - p.baseX - moveX) * 0.1;
        p.y -= (p.y - p.baseY - moveY) * 0.1;

        const flicker = Math.sin(Date.now() * 0.005 + p.x * 0.01) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255, 215, 0, ${flicker})`;
        ctx.fillText(p.char, p.x, p.y);
      }

      if (Date.now() > nextCycleRef.current) {
        if (!isExplodedRef.current) explodeParticles();
        else regroupParticles();
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animationFrameId.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [explodeParticles, regroupParticles]); // Dependencies for animation loop

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black font-mono">
      <div className="matrix-background fixed w-full h-full animate-scrollMatrix z-0"></div>
      <div id="glyphs" className="glyphs fixed w-full h-full z-10 pointer-events-none">
        {glyphElements}
      </div>
      <div
        id="eye"
        className="eye-container fixed top-1/2 -translate-y-1/2 text-[calc(6vw+12px)] text-[#00ffcc] animate-pulse z-20 pointer-events-none"
        style={{ left: eyeLeft, textShadow: '0 0 10px #00ffee, 0 0 20px #00ffee, 0 0 40px #00ffee' }}
      >
        𓁹
      </div>
      <canvas ref={canvasRef} className="block absolute top-0 left-0"></canvas>

      <audio ref={introSoundRef} src="https://alarabclub777.vercel.app/sounds/intro.mp3" preload="auto"></audio>
      <audio ref={clickSoundRef} src="https://alarabclub777.vercel.app/sounds/click.mp3" preload="auto"></audio>
    </div>
  );
};

export default HeroBackground;
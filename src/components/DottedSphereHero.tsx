"use client";

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

const symbols = [".", "·", "7", "•", "𓁹"];
const spacing = 7;
const fontSize = 10;
const radius = 150; // Radius for the initial circle shape

function getRandomDelay() {
  return (Math.floor(Math.random() * 70) + 7) * 1000;
}

const glyphsChars = "𓂀𓏏𓆣𓋹𓉐𓄿𓇳𓎛𓈖𓃭𓍯𓊃𓊪𓃾𓈎𓅱𓅓𓃀𓇋𓍿𓐍𓊽𓌳𓋴𓇯𓏠𓉔𓁷ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|\\/~?><!-=:,.αβγδεζηθικλμνξοπρστυφχψωАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯشعرابشيخفجثجظرزسضطىةءؤإأآ✓∞≠±∑∂∆µπ⊕⊗⊙⊥∩∪∈∉∀∃√∛☥☯☸♁⚛🔥✨🌌💫S⋄A⋄L⋄S⋄";

const DottedSphereHero: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const introSoundRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);
  const particlesRef = useRef<Particle[]>([]); // Use ref for particles
  const mouseRef = useRef({ x: 0, y: 0 }); // Use ref for mouse position

  const [isExploded, setIsExploded] = useState(false);
  const [nextCycle, setNextCycle] = useState(Date.now() + getRandomDelay());
  const [eyePosition, setEyePosition] = useState('50%');

  // Initialize particles based on a circle shape
  const initializeParticles = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

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
        if (imageData.data[i + 3] > 128) { // Check alpha channel
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
    particlesRef.current = newParticles;
    mouseRef.current = { x: centerX, y: centerY }; // Initialize mouse to center
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      initializeParticles();
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [initializeParticles]);

  // Mouse move handler
  const handleMouseMove = useCallback((e: MouseEvent) => {
    mouseRef.current = { x: e.clientX, y: e.clientY };
  }, []);

  // Click handler for explosion/regroup
  const handleClick = useCallback((e: MouseEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const dx = e.clientX - centerX;
    const dy = e.clientY - centerY;

    if (Math.sqrt(dx * dx + dy * dy) < radius) {
      if (clickSoundRef.current) {
        clickSoundRef.current.play();
      }
      setIsExploded(true);
      setNextCycle(Date.now() + getRandomDelay());
      setEyePosition('55%');
      setTimeout(() => {
        setEyePosition('50%');
      }, 1000);
    }
  }, []);

  // Initial setup and event listeners
  useEffect(() => {
    initializeParticles();

    const canvas = canvasRef.current;
    if (canvas) {
      canvas.addEventListener("mousemove", handleMouseMove);
      canvas.addEventListener("click", handleClick);
    }

    // Play intro sound on first user interaction (e.g., any click on the window)
    const playIntroSound = () => {
      if (introSoundRef.current) {
        introSoundRef.current.play().catch(err => {
          console.warn("🎧 Failed to play intro sound: ", err);
        });
      }
      window.removeEventListener('click', playIntroSound); // Play only once
    };
    window.addEventListener('click', playIntroSound, { once: true });


    return () => {
      if (canvas) {
        canvas.removeEventListener("mousemove", handleMouseMove);
        canvas.removeEventListener("click", handleClick);
      }
      window.removeEventListener('click', playIntroSound);
    };
  }, [initializeParticles, handleMouseMove, handleClick]);

  // Animation loop
  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (Date.now() > nextCycle) {
        setIsExploded(prev => !prev); // Toggle explosion state
        setNextCycle(Date.now() + getRandomDelay());
      }

      const currentParticles = particlesRef.current;
      const currentMouse = mouseRef.current;
      const currentIsExploded = isExploded; // Capture current state for this frame

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

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [isExploded, nextCycle]); // Dependencies for animation loop: only state that changes the animation logic

  // Generate glyphs
  useEffect(() => {
    const container = document.getElementById("glyphs");
    if (container) {
      container.innerHTML = ''; // Clear existing glyphs
      for (let i = 0; i < 200; i++) {
        const glyph = document.createElement("div");
        glyph.className = "glyph";
        glyph.style.left = `${Math.random() * 100}%`;
        glyph.style.top = `-${Math.random() * 100}%`;
        glyph.style.animationDelay = `${Math.random() * 2}s`;
        glyph.textContent = glyphsChars[Math.floor(Math.random() * glyphsChars.length)];
        container.appendChild(glyph);
      }
    }
  }, []); // Run once on mount

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <div className="matrix-background"></div>
      <div className="glyphs" id="glyphs"></div>
      <div
        className="eye-container"
        style={{ left: eyePosition }}
      >
        𓁹
      </div>
      <canvas ref={canvasRef} className="absolute top-0 left-0 block"></canvas>

      <audio ref={introSoundRef} src="https://alarabclub777.vercel.app/sounds/intro.mp3" preload="auto"></audio>
      <audio ref={clickSoundRef} src="https://alarabclub777.vercel.app/sounds/click.mp3" preload="auto"></audio>
    </div>
  );
};

export default DottedSphereHero;
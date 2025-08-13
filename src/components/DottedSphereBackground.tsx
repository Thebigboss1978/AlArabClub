"use client";

import React, { useRef, useEffect, useState, useCallback } from 'react';

const DottedSphereBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glyphsContainerRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const introSoundRef = useRef<HTMLAudioElement>(null);
  const clickSoundRef = useRef<HTMLAudioElement>(null);

  const [isExploded, setIsExploded] = useState(false);
  const [nextCycle, setNextCycle] = useState(Date.now() + getRandomDelay());

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

  const getRandomDelay = useCallback(() => {
    return (Math.floor(Math.random() * 70) + 7) * 1000;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];
    let mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const initializeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 150;
      const symbols = [".", "·", "7", "•", "𓁹"];
      const spacing = 7;
      const fontSize = 10;

      particles = []; // Clear existing particles on resize/re-init

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
              particles.push({
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
    };

    initializeCanvas(); // Initial setup

    const handleResize = () => {
      initializeCanvas();
    };
    window.addEventListener('resize', handleResize);

    const explodeParticles = () => {
      particles.forEach(p => {
        p.vx = (Math.random() - 0.5) * 20;
        p.vy = (Math.random() - 0.5) * 20;
      });
      setIsExploded(true);
      setNextCycle(Date.now() + getRandomDelay());
    };

    const regroupParticles = () => {
      setIsExploded(false);
      setNextCycle(Date.now() + getRandomDelay());
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    canvas.addEventListener("mousemove", handleMouseMove);

    const handleClick = (e: MouseEvent) => {
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      const radius = 150;
      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;
      if (Math.sqrt(dx * dx + dy * dy) < radius) {
        explodeParticles();
        clickSoundRef.current?.play();
        if (eyeRef.current) {
          eyeRef.current.style.left = "55%";
          setTimeout(() => {
            if (eyeRef.current) eyeRef.current.style.left = "50%";
          }, 1000);
        }
      }
    };
    canvas.addEventListener("click", handleClick);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = fontSize + "px Arial";
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      if (Date.now() > nextCycle) {
        if (!isExploded) explodeParticles();
        else regroupParticles();
      }

      for (let p of particles) {
        if (isExploded) {
          p.x += p.vx;
          p.y += p.vy;
          p.vx *= 0.98;
          p.vy *= 0.98;
        } else {
          p.x -= (p.x - p.baseX) * 0.05;
          p.y -= (p.y - p.baseY) * 0.05;
        }

        const dx = mouse.x - p.x;
        const dy = mouse.y - p.y;
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

    // Glyphs generation
    const glyphs = "𓂀𓏏𓆣𓋹𓉐𓄿𓇳𓎛𓈖𓃭𓍯𓊃𓊪𓃾𓈎𓅱𓅓𓃀𓇋𓍿𓐍𓊽𓌳𓋴𓇯𓏠𓉔𓁷ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()_+{}[]|\\/~?><!-=:,.αβγδεζηθικλμνξοπρστυφχψωАБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЬЮЯشعرابشيخفجثجظرزسضطىةءؤإأآ✓∞≠±∑∂∆µπ⊕⊗⊙⊥∩∪∈∉∀∃√∛☥☯☸♁⚛🔥✨🌌💫S⋄A⋄L⋄S⋄";
    const container = glyphsContainerRef.current;
    if (container) {
      // Clear existing glyphs to prevent duplicates on re-render
      container.innerHTML = ''; 
      for (let i = 0; i < 200; i++) {
        const glyph = document.createElement("div");
        glyph.className = "glyph";
        glyph.style.left = `${Math.random() * 100}%`;
        glyph.style.top = `-${Math.random() * 100}%`;
        glyph.style.animationDelay = `${Math.random() * 2}s`;
        glyph.textContent = glyphs[Math.floor(Math.random() * glyphs.length)];
        container.appendChild(glyph);
      }
    }

    const handleFirstClick = () => {
      introSoundRef.current?.play().catch(err => {
        console.warn("🎧 Audio playback failed: ", err);
      });
      window.removeEventListener('click', handleFirstClick);
    };
    window.addEventListener('click', handleFirstClick, { once: true });

    return () => {
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener("mousemove", handleMouseMove);
      canvas.removeEventListener("click", handleClick);
      window.removeEventListener('click', handleFirstClick); // Ensure cleanup if not triggered
      cancelAnimationFrame(animationFrameId);
    };
  }, [isExploded, nextCycle, getRandomDelay]);

  return (
    <>
      <div className="matrix-background"></div>
      <div className="glyphs" ref={glyphsContainerRef}></div>
      <div className="eye-container" ref={eyeRef}>𓁹</div>
      <canvas id="canvas" ref={canvasRef} className="absolute top-0 left-0 block"></canvas>

      <audio id="introSound" src="https://alarabclub777.vercel.app/sounds/intro.mp3" preload="auto" ref={introSoundRef}></audio>
      <audio id="clickSound" src="https://alarabclub777.vercel.app/sounds/click.mp3" preload="auto" ref={clickSoundRef}></audio>
    </>
  );
};

export default DottedSphereBackground;
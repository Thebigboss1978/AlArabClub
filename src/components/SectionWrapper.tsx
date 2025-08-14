"use client";

import React, { useRef, useEffect, useState } from 'react';

interface SectionWrapperProps {
  id: string;
  title: string;
  slug: string;
  kicker: string;
  children: React.ReactNode;
  ctaText?: string;
  ctaHref?: string;
}

const SectionWrapper: React.FC<SectionWrapperProps> = ({
  id,
  title,
  slug,
  kicker,
  children,
  ctaText,
  ctaHref,
}) => {
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // Observe once
          }
        });
      },
      { threshold: 0.12 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section
      id={id}
      ref={sectionRef}
      className={`py-12 px-4 max-w-5xl mx-auto border-t border-green-400/10 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
      } transition-all duration-600 ease-out`}
    >
      <h2 className="flex items-center gap-2 font-extrabold text-gold-color text-2xl md:text-3xl mb-2">
        {title} <span className="text-muted-text text-sm md:text-base">{slug}</span>
      </h2>
      <p className="text-blue-300/90 mb-4">{kicker}</p>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {children}
      </div>
      {ctaText && ctaHref && (
        <a href={ctaHref} className="inline-block mt-4 px-4 py-2 rounded-lg bg-green-400/10 border border-green-400/20 hover:bg-green-400/20 transition-colors text-ink">
          {ctaText} →
        </a>
      )}
    </section>
  );
};

export default SectionWrapper;
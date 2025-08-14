"use client";

import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-black bg-opacity-60 backdrop-blur-md border-b border-green-400/30">
      <nav className="flex items-center gap-3 p-3 md:p-4 overflow-x-auto whitespace-nowrap scrollbar-hide">
        <div className="font-extrabold tracking-wide text-gold-color text-lg md:text-xl flex-shrink-0">𓁹 AlArab 5D</div>
        <a href="#safari" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Safari</a>
        <a href="#temples" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Temples</a>
        <a href="#nile" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Nile</a>
        <a href="#spirit" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Spirit Portal</a>
        <a href="#archives" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Archives</a>
        <a href="#workshops" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Workshops</a>
        <a href="#merch" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Merch</a>
        <a href="#matrix777" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Matrix777</a>
        <a href="#meta" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Meta</a>
        <a href="#contact" className="px-3 py-2 border border-green-400/20 rounded-xl hover:bg-green-400/10 transition-colors text-sm md:text-base flex-shrink-0">Contact</a>
      </nav>
    </header>
  );
};

export default Header;
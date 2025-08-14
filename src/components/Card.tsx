"use client";

import React from 'react';

interface CardProps {
  title: string;
  description: string;
  pillText?: string;
}

const Card: React.FC<CardProps> = ({ title, description, pillText }) => {
  return (
    <article className="bg-gradient-to-b from-card-bg to-card-bg2 border border-green-400/20 rounded-2xl p-4 shadow-lg">
      <h4 className="m-0 text-blue-200 text-lg font-semibold">{title}</h4>
      <p className="text-muted-text text-sm mt-1">{description}</p>
      {pillText && (
        <span className="inline-flex items-center gap-1 border border-gold-color/30 rounded-full px-2 py-1 text-gold-color text-xs mt-2">
          {pillText}
        </span>
      )}
    </article>
  );
};

export default Card;
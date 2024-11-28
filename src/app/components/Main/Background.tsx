'use client';

import React, { useRef } from 'react';
import dynamic from 'next/dynamic';

// Carrega o componente p5 de forma dinâmica
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), { ssr: false });

const StarBackground = () => {
  const stars = useRef<{ x: number; y: number; z: number }[]>([]);

  const setup = (p5, canvasParentRef) => {
    // Configura o canvas
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);

    // Adiciona classes do Tailwind ao canvas para o fade-in
    canvas.addClass('opacity-0 transition-opacity duration-1000');
    setTimeout(() => {
      canvas.addClass('opacity-100'); // Ativa a animação
    }, 0);

    // Adiciona estilo para garantir que o canvas fique no fundo
    canvas.style('position', 'absolute');
    canvas.style('top', '0');
    canvas.style('left', '0');
    canvas.style('z-index', '1'); // Garante que o canvas fique atrás de outros elementos
    canvas.style('pointer-events', 'none'); // Não interfere nas interações com outros elementos

    // Inicializa as estrelas apenas uma vez
    if (stars.current.length === 0) {
      for (let i = 0; i < 500; i++) {
        stars.current.push({
          x: p5.random(-window.innerWidth, window.innerWidth), // Coordenadas centradas
          y: p5.random(-window.innerHeight, window.innerHeight),
          z: p5.random(window.innerWidth),
        });
      }
    }
  };

  const draw = (p5) => {
    p5.clear();
    p5.translate(window.innerWidth / 2, window.innerHeight / 2); // Centraliza as estrelas

    for (const star of stars.current) {
      // Desenha o brilho das estrelas
      const sx = (star.x / star.z) * window.innerWidth;
      const sy = (star.y / star.z) * window.innerHeight;
      const r = p5.map(star.z, 0, window.innerWidth, 8, 0);

      // Glow da estrela
      const glow = p5.map(star.z, 0, window.innerWidth, 15, 0);
      p5.noFill();
      p5.stroke(255, 255, 255, glow); // Glow com opacidade
      p5.strokeWeight(3);
      p5.ellipse(sx, sy, r + glow, r + glow);

      // Corpo da estrela
      p5.noStroke();
      p5.fill(255);
      p5.ellipse(sx, sy, r, r);

      // Atualiza a posição
      star.z -= 10;
      if (star.z < 1) {
        star.z = window.innerWidth;
        star.x = p5.random(-window.innerWidth, window.innerWidth);
        star.y = p5.random(-window.innerHeight, window.innerHeight);
      }
    }
  };

  const windowResized = (p5) => {
    p5.resizeCanvas(window.innerWidth, window.innerHeight);
    // Ajusta as estrelas ao novo tamanho
    stars.current = stars.current.map((star) => ({
      ...star,
      x: p5.random(-window.innerWidth, window.innerWidth),
      y: p5.random(-window.innerHeight, window.innerHeight),
    }));
  };

  return <Sketch setup={setup} draw={draw} windowResized={windowResized} />;
};

export default StarBackground;

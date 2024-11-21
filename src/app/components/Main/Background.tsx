'use client'

import React from 'react';
import dynamic from 'next/dynamic';

// Carrega o componente p5 de forma dinâmica
const Sketch = dynamic(() => import('react-p5').then((mod) => mod.default), { ssr: false });

const StarBackground = () => {
  const stars: { x: number; y: number; z: number }[] = [];

  const setup = (p5, canvasParentRef) => {
    // Cria o canvas e o insere no parent, com o fundo transparente
    const canvas = p5.createCanvas(window.innerWidth, window.innerHeight).parent(canvasParentRef);

    // Ajustes no estilo do canvas
    canvas.style('position', 'absolute'); // Ajuste para ocupar a área do componente
    canvas.style('top', '0'); // Fixa no topo
    canvas.style('left', '0'); // Fixa à esquerda
    canvas.style('z-index', '0'); // Coloca atrás de todos os outros elementos
    canvas.style('pointer-events', 'none'); // Impede que o canvas interfira com a interação com outros elementos

    // Criar estrelas
    for (let i = 0; i < 500; i++) {
      stars.push({
        x: p5.random(-window.innerWidth, window.innerWidth),
        y: p5.random(-window.innerHeight, window.innerHeight),
        z: p5.random(window.innerWidth),
      });
    }
  };

  const draw = (p5) => {
    // Limpa o fundo sem definir uma cor
    p5.clear();

    p5.translate(window.innerWidth / 2, window.innerHeight / 2);

    for (const star of stars) {
      // Brilho da estrela
      p5.noFill(); // Remover preenchimento para o brilho
      const glow = p5.map(star.z, 0, window.innerWidth, 15, 0); // Brilho maior para estrelas mais próximas

      // Adicionando o "glow" com um stroke suave
      p5.stroke(255, 255, 255, glow); // Definindo a cor do glow (branco com opacidade)
      p5.strokeWeight(3); // Aumenta a espessura da borda do brilho

      const sx = (star.x / star.z) * window.innerWidth;
      const sy = (star.y / star.z) * window.innerHeight;
      const r = p5.map(star.z, 0, window.innerWidth, 8, 0); // A estrela vai diminuir de tamanho conforme z aumenta

      // Desenhando o brilho (stroke) ao redor da estrela
      p5.ellipse(sx, sy, r + glow, r + glow); // O tamanho do glow é maior que a estrela

      // Estrela sólida (sem glow)
      p5.noStroke(); // Remove o brilho da estrela
      p5.fill(255); // A cor da estrela
      p5.ellipse(sx, sy, r, r); // A estrela no centro

      // Atualizar a posição da estrela
      star.z -= 10;
      if (star.z < 1) {
        star.z = window.innerWidth;
        star.x = p5.random(-window.innerWidth, window.innerWidth);
        star.y = p5.random(-window.innerHeight, window.innerHeight);
      }
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default StarBackground;

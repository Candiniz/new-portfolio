/* eslint-disable @next/next/no-img-element */
'use client';  // Marca este componente como "Client Component"

import Image from 'next/image';
import logo from '../app/favicon.ico';

export default function Loading() {
  return (
    <div className="loading-screen">
      <div className="spinner"></div>
      <img
        src="/favicon.png"
        alt="Logo"
        width={100}
        height={100}
        className="spinnerLogo"
      />

      <style jsx>{`
        .spinnerLogo {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          z-index: 10;
          opacity: 0;  /* Inicialmente invisível */
          animation: revealLogo 2s ease-out forwards; /* Animação para revelar o logo */
        }

        @keyframes revealLogo {
          0% {
            /* scale: 0.8; */
            opacity: 0;
            box-shadow: 0 0 20px rgba(0, 0, 0, 1);
          }
          100% {
            /* scale: 1; */
            opacity: 1;
            box-shadow: 0 0 40px rgba(0, 0, 0, 0); /* Cor de sombra verde neon */
          }
        }

        .loading-screen {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
        }

        .spinner {
          position: fixed;
          border-top: 8px solid #aadd49;
          border-radius: 50%;
          max-width: 200px;
          max-height: 200px;
          width: 90vw;
          height: 90vw;
          animation: spin 1s linear infinite, neonGlow 1.5s ease-in-out infinite alternate;
          box-shadow: 0 0 10px rgba(170, 221, 73, 0.5); /* Brilho suave em volta da borda */
        }

        /* Animação para o spinner girar */
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* Brilho neon apenas na borda do spinner */
        @keyframes neonGlow {
          0% {
            box-shadow: 0 0 40px rgba(170, 221, 73, 0);
          }
          100% {
            box-shadow: 0 0 40px rgba(170, 221, 73, 0.0)
          }
        }
      `}</style>
    </div>
  );
}

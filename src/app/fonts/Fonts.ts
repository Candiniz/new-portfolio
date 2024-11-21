import { Oswald } from 'next/font/google';
import { IBM_Plex_Mono } from 'next/font/google';
import { Roboto_Mono } from 'next/font/google';

export const oswald = Oswald({
  subsets: ['latin'], // Escolha os subconjuntos desejados (ex.: 'latin', 'cyrillic')
  weight: ['400', '700'], // Pesos desejados
  style: 'normal', // Ou 'italic' se for o caso
})

export const ibmPlexMono = IBM_Plex_Mono({
  subsets: ['latin'], // Adicione outros subsets se necessário
  weight: ['400', '700'], // Adicione os pesos que você quer usar, se necessário
  style: 'normal', // Ou 'italic' se for o caso
});

export const roboto = Roboto_Mono({
  subsets: ['latin'], // Escolha os subconjuntos desejados (ex.: 'latin', 'cyrillic')
  weight: ['400', '700'], // Pesos desejados
  style: 'normal', // Ou 'italic' se for o caso
})


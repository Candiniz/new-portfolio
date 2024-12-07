'use client'

import { useState } from 'react';

const translateText = async (text: string, targetLanguage = 'pt') => {
  const response = await fetch('/api/translate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ text, targetLanguage }),
  });

  if (!response.ok) {
    throw new Error(`Erro ao chamar o backend: ${response.statusText}`);
  }

  const data = await response.json();
  return data.translatedText;
};

export default function TranslateButton() {
  const [isTranslated, setIsTranslated] = useState(false);

  const handleTranslate = async () => {
    const elements = document.querySelectorAll('body *');
    for (const element of elements) {
      if (element instanceof HTMLElement && element.innerText.trim() !== '' && element.tagName !== 'SCRIPT' && element.tagName !== 'STYLE') {
        const originalText = element.innerText;
        try {
          const translatedText = await translateText(originalText, 'pt');
          element.innerText = translatedText;
        } catch (error) {
          console.error('Erro na tradução:', error);
        }
      }
    }

    setIsTranslated(true);
  };

  return (
    <button onClick={handleTranslate} className='fixed top-0 right-0 z-50'>
      {isTranslated ? 'Traduzido' : 'Traduzir'}
    </button>
  );
}

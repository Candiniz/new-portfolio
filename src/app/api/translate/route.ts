import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { text, targetLanguage } = await request.json();

  try {
    const response = await fetch('https://libretranslate.de/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        q: text,
        source: 'auto',
        target: targetLanguage,
        format: 'text',
      }),
    });

    // Verifique se a resposta foi bem-sucedida
    if (!response.ok) {
      throw new Error(`Erro na tradução: ${response.statusText}`);
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Erro ao fazer a tradução:', error);
    return NextResponse.json({ status: 500 });
  }
}

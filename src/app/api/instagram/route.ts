/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/instagram/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Token de acesso não encontrado");
    }

    const url = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,children&access_token=${accessToken}`
    
    // Chama a API do Instagram
    const response = await fetch(url);
    

    // Verifique se a resposta foi ok
    if (!response.ok) {
      const errorData = await response.json(); // Capture qualquer erro retornado pela API do Instagram
      throw new Error(errorData.error?.message || 'Erro desconhecido ao carregar os posts.');
    }

    const data = await response.json(); // Obter os dados em formato JSON
    // console.log("Dados dos posts do Instagram:", data);
    

    // Agora vamos pegar as imagens dos itens do carrossel
    const postsWithCarousels = await Promise.all(data.data.map(async (post: any) => {
      if (post.media_type === "CAROUSEL_ALBUM" && post.children) {
        // Fazendo requisição para pegar detalhes dos itens do carrossel
        const carouselItems = await Promise.all(post.children.data.map(async (child: any) => {
          const childUrl = `https://graph.instagram.com/${child.id}?fields=id,media_url&access_token=${accessToken}`
          const childResponse = await fetch(childUrl);
          const childData = await childResponse.json();
          return childData;
        }));
        
        // Adiciona as URLs dos itens do carrossel no post
        post.children = carouselItems;
      }
      return post;
    }));

    // console.log("Posts com carrosséis:", postsWithCarousels);

    // Retorne os dados corretamente em formato JSON
    return NextResponse.json(postsWithCarousels); // Retorne os dados em formato JSON
  } catch (error) {
    console.error("Erro ao carregar os posts do Instagram:", error);

    // Se houver um erro, retorne a mensagem de erro com status 500
    return NextResponse.json("Erro desconhecido", { status: 500 });
  }
}

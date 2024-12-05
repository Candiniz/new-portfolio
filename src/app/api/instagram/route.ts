/* eslint-disable @typescript-eslint/no-explicit-any */
// src/app/api/instagram/route.ts
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Token de acesso não encontrado");
    }

    const baseUrl = `https://graph.instagram.com/me/media?fields=id,caption,media_type,media_url,thumbnail_url,permalink,children&access_token=${accessToken}`;
    let allPosts: any[] = [];
    let url = baseUrl;

    // Lista de IDs de posts a serem ignorados (blacklist)
    const blacklist = [
      "18055954579703872",
      "18095827462454450",
      "17987717375586659",
      "18009972238942892",
    ];

    // Loop para buscar todos os posts paginados
    while (url) {
      const response = await fetch(url);
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Erro ao carregar os posts.');
      }

      const data = await response.json();

      // Filtra posts que não estão na blacklist
      const filteredPosts = data.data.filter((post: any) => !blacklist.includes(post.id));

      // Adiciona os posts filtrados ao array principal
      allPosts = allPosts.concat(filteredPosts);

      // Atualiza a URL para a próxima página (se houver)
      url = data.paging?.next || null;
    }

    // Agora, trate os carrosséis, como já fazia antes
    const postsWithCarousels = await Promise.all(allPosts.map(async (post: any) => {
      if (post.media_type === "CAROUSEL_ALBUM" && post.children) {
        const carouselItems = await Promise.all(post.children.data.map(async (child: any) => {
          const childUrl = `https://graph.instagram.com/${child.id}?fields=id,media_url&access_token=${accessToken}`;
          const childResponse = await fetch(childUrl);
          const childData = await childResponse.json();
          return childData;
        }));

        post.children = carouselItems;
      }
      return post;
    }));

    return NextResponse.json(postsWithCarousels);
  } catch (error) {
    console.error("Erro ao carregar os posts do Instagram:", error);
    return NextResponse.json("Erro desconhecido", { status: 500 });
  }
}

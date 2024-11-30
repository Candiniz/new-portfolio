// src/services/instagramApi.ts


export const fetchInstagramProfileData = async () => {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN || ''; // Aqui você passa o token corretamente
    const url = `https://graph.instagram.com/me?fields=id,username,followers_count,follows_count,media_count&access_token=${accessToken}`;
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Erro ao carregar os dados do perfil do Instagram.");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter os dados do perfil.");
    }
  };
  
  
  // Função para pegar os detalhes de cada post (curtidas, comentários, etc)
  export const fetchPostDetails = async (postId: string) => {
    const accessToken = process.env.NEXT_PUBLIC_INSTAGRAM_ACCESS_TOKEN;
    
    if (!accessToken) {
      throw new Error("Token de acesso do Instagram não encontrado.");
    }
  
    const url = `https://graph.instagram.com/${postId}?fields=id,caption,like_count,comments_count,media_type,media_url,thumbnail_url,permalink&access_token=${accessToken}`;
   
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error("Erro ao carregar os detalhes do post.");
      }
      const data = await res.json();
      return data;
    } catch (error) {
      console.error(error);
      throw new Error("Erro ao obter detalhes do post.");
    }
  };
  
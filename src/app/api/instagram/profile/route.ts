import { NextResponse } from "next/server";

export async function GET() {
  try {
    const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
    if (!accessToken) {
      throw new Error("Token de acesso não encontrado");
    }

    const url = `https://graph.instagram.com/me?fields=id,username,followers_count,follows_count,media_count,profile_picture_url&access_token=${accessToken}`;

    // Faz a requisição à API do Instagram
    const response = await fetch(url);

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.error?.message || "Erro desconhecido ao carregar os dados do perfil"
      );
    }

    const data = await response.json();
    console.log("Dados do perfil do Instagram:", data);

    // Retorna os dados como JSON
    return NextResponse.json(data);
  } catch (error) {
    console.error("Erro ao carregar os dados do perfil do Instagram:", error);

    // Retorna erro com status 500
    return NextResponse.json(

      { status: 500 }
    );
  }
}

// src/app/api/instagram/refresh/route.ts

import { NextResponse } from "next/server";
import { getAccessToken, saveAccessToken } from "@/app/api/utils/InstagramToken";

const INSTAGRAM_APP_SECRET = process.env.INSTAGRAM_APP_SECRET!;

export async function GET() {
  try {
    const currentToken = await getAccessToken();
    if (!currentToken) {
      throw new Error("Token atual não encontrado.");
    }

    const url = `https://graph.instagram.com/refresh_access_token?grant_type=ig_refresh_token&access_token=${currentToken}`;
    const res = await fetch(url);

    if (!res.ok) {
      const error = await res.json();
      throw new Error(error.error?.message || "Erro ao renovar o token.");
    }

    const data = await res.json();
    const newToken = data.access_token;

    await saveAccessToken(newToken);

    return NextResponse.json({ message: "Token renovado com sucesso!" });
  } catch (error) {
    console.error("Erro ao renovar o token:", error);
    return NextResponse.json({ error: "Erro ao renovar o token" }, { status: 500 });
  }
}

/* eslint-disable @next/next/no-img-element */
"use client";

import "../../globals.css";
import { useState, useEffect } from "react";

interface ProfileData {
  id: string;
  username: string;
  followers_count: number;
  follows_count: number;
  media_count: number;
  profile_picture_url: string; // Para o círculo da foto de perfil
}

export default function InstagramHeader({ isInModal }: { isInModal: boolean }) {
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch("/api/instagram/profile");
        if (!res.ok) {
          throw new Error("Erro ao carregar os dados do perfil.");
        }
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
      }
    };

    fetchProfile();
  }, []);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if (!profile) {
    return <div>Carregando perfil...</div>;
  }

  return (
    <div className={`
      ${isInModal ? "modal-header" : "default-header"}
      flex flex-col items-center py-5 bg-[#414141] shadow-md rounded-none rounded-t-lg`}
    >

      {/* Linha 1: Foto e Nome */}
      <div className="flex items-center space-x-4">
        <div className="relative w-[96px] h-[96px] flex items-center justify-center">
          {/* Círculo ao redor da foto (simulando Stories) */}
          <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-yellow-500 rounded-full p-[2px] z-10"></div>

          {/* Foto de perfil */}
          <img
            src={profile.profile_picture_url}
            alt={`${profile.username} profile`}
            className="w-[87px] h-[87px] rounded-full object-cover border-2 border-white z-20"
          />
        </div>

        <div>
          <p className="text-2xl font-semibold">Anderson Diniz</p>
          <p className="text-gray-400">@{profile.username}</p>
        </div>
      </div>

      {/* Linha 2: Seguindo, Seguidores, Publicações */}
      <div className="flex justify-around w-full mt-5">
        <div className="flex flex-col items-center">
          <p className="font-bold text-lg">{profile.follows_count}</p>
          <p className="text-sm text-gray-400">Seguindo</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-lg">{profile.followers_count}</p>
          <p className="text-sm text-gray-400">Seguidores</p>
        </div>
        <div className="flex flex-col items-center">
          <p className="font-bold text-lg">{profile.media_count}</p>
          <p className="text-sm text-gray-400">Publicações</p>
        </div>
      </div>

      {/* Linha 3: Botão Seguir */}
      <div className="mt-5">
        <button className="flex items-center space-x-2 bg-[#aadd49] text-white px-16 py-2 rounded-lg hover:bg-[#91b253] transition-all duration-300">
          <span>Seguir</span>
        </button>
      </div>
    </div>

  );
}

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { motion } from 'framer-motion';
import { InstagramPost, Post } from '../../types/Home';

// Tipos dos posts do Instagram


interface InstagramFeedProps {
  openPostModal: (post: Post) => void;
  posts: Post[];
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ openPostModal, posts }) => {

  if (!posts || posts.length === 0) {
    return <div>Carregando...</div>; // Exibe uma mensagem se os posts não estiverem carregados
  }

  return (
    <div className="w-full">


      {/* Exibindo os posts */}
      <div className="grid grid-cols-3 gap-[0.1rem]">
        {posts.map((post) => (
          <div
            key={post.id}
            className="relative group aspect-square cursor-pointer"
            onClick={() => openPostModal(post)} // Abre o modal do post
          >
            {post.media_type === "IMAGE" && (
              <img src={post.media_url} alt={post.caption} className="w-full h-full object-cover" />
            )}
            {post.media_type === "VIDEO" && (
              <div className="relative w-full h-full flex items-center justify-center">
                <img
                  src={post.thumbnail_url || post.media_url}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {post.media_type === "CAROUSEL_ALBUM" && "children" in post && (
              <img
                src={post.children[0].media_url}
                alt={`Carrossel ${post.id}`}
                className="w-full h-full object-cover"
              />
            )}
          </div>
        ))}
      </div>



      

    </div>
  );
}

export default InstagramFeed
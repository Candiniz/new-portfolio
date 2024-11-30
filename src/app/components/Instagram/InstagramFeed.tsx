/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
import { useState, useEffect } from "react";
import InstagramHeader from "./InstaHeader";

// Definindo tipos para os dados do post
interface InstagramPost {
  id: string;
  caption: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
}

interface CarouselPost extends InstagramPost {
  media_type: "CAROUSEL_ALBUM";  // Garantindo que seja um tipo de carrossel
  children: { media_url: string }[];  // Propriedade 'children' para as imagens do carrossel
}


type Post = InstagramPost | CarouselPost; // Union type para acomodar qualquer tipo de post

export default function InstagramFeed() {
  const [posts, setPosts] = useState<Post[]>([]);  // Usar 'Post' como o tipo
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null); // Estado para armazenar o post selecionado
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false); // Estado para controlar a visibilidade do modal

  // Blacklist de IDs de posts que não queremos exibir
  const blacklist = [
    '18055954579703872', '18095827462454450', '17987717375586659', '18009972238942892'
  ];

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const res = await fetch("/api/instagram");

        // Verifique se a resposta da API foi bem-sucedida
        if (!res.ok) {
          const errorData = await res.json();
          console.error('Erro ao carregar os posts do Instagram. Resposta do servidor:', errorData);
          throw new Error(`Erro ao carregar os posts do Instagram. Status: ${res.status}, Mensagem: ${errorData.message}`);
        }

        // Parse da resposta JSON
        const data = await res.json();
        console.log('Dados recebidos:', data);  // Verifique a estrutura dos dados

        // Aqui ajustamos para tratar diretamente o array de posts
        if (Array.isArray(data)) {
          const filteredPosts = data.filter((post: InstagramPost) =>
            (post.media_type === "IMAGE" || post.media_type === "VIDEO" || post.media_type === "CAROUSEL_ALBUM") &&
            !blacklist.includes(post.id)
          );
          setPosts(filteredPosts);
        } else {
          // Se a resposta não for um array, lance um erro
          console.error('Estrutura de dados inesperada:', data);
          throw new Error("Dados do Instagram não encontrados. Estrutura de dados inesperada.");
        }

        setLoading(false);

      } catch (err) {
        // Log detalhado para o erro
        console.error('Erro durante a requisição:', err);
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setLoading(false);
      }
    };


    fetchInstagramPosts();
  }, [blacklist]);

  // Exibir mensagem de carregamento
  if (loading) {
    return <div>Carregando...</div>;
  }

  // Exibir mensagem de erro se ocorrer algum problema
  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Função para abrir o modal com o post selecionado
  const openModal = (post: Post) => {
    setSelectedPost(post);
    setIsModalOpen(true);
  };

  // Função para fechar o modal
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedPost(null);
  };


  return (
    <div className="mx-auto md:ml-5 mt-5 w-[90vw] md:w-[450px]">
      <InstagramHeader />
      {/* Grid de Posts */}
      <div className="grid grid-cols-3 gap-[0.1rem]">
        {posts.length === 0 ? (
          <div className="col-span-full text-center text-xl">Nenhum post disponível.</div>
        ) : (
          posts.map((post) => (
            <div
              key={post.id}
              className="relative group aspect-square cursor-pointer" // Garantindo quadrado perfeito
              onClick={() => openModal(post)} // Ao clicar, abre o modal
            >
              {post.media_type === "IMAGE" ? (
                <img
                  src={post.media_url}
                  alt={post.caption}
                  className="w-full h-full object-cover"
                />
              ) : post.media_type === "VIDEO" ? (
                <div className="relative w-full h-full flex items-center justify-center">
                  <img
                    src={post.thumbnail_url || post.media_url}
                    alt={post.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : post.media_type === "CAROUSEL_ALBUM" && 'children' in post && post.children.length > 0 ? (
                <div className="w-full h-full">
                  <img
                    src={post.children[0].media_url}
                    alt={`Carrossel ${post.id} - 1`}
                    className="w-full h-full object-cover"
                  />
                </div>
              ) : null}
            </div>
          ))
        )}
      </div>

      {/* Modal de exibição do post */}
      {isModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-[#3f3f3f] max-w-4xl w-full p-5 rounded-lg h-[90vh] overflow-y-auto">
            <button
              onClick={closeModal}
              className="absolute top-2 right-2 text-xl text-gray-700"
            >
              X
            </button>

            <div className="flex flex-col items-center">
              {selectedPost.media_type === "IMAGE" ? (
                <img
                  src={selectedPost.media_url}
                  alt={selectedPost.caption}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />
              ) : selectedPost.media_type === "VIDEO" ? (
                <video
                  controls
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                  src={selectedPost.media_url}
                  preload="metadata"
                />
              ) : selectedPost.media_type === "CAROUSEL_ALBUM" && (selectedPost as CarouselPost).children.length > 0 ? (
                <div className="w-full h-full">
                  {(selectedPost as CarouselPost).children.map((child, index) => (
                    <img
                      key={index}
                      src={child.media_url}
                      alt={`Carrossel ${selectedPost.id} - ${index + 1}`}
                      className="w-full max-h-[80vh] object-contain rounded-lg"
                    />
                  ))}
                </div>
              ) : null}
              <div className="mt-4 max-h-[300px] overflow-y-auto p-2">
                <p className="text-lg font-semibold">{selectedPost.caption}</p>
                <div className="text-sm text-gray-600 mt-2">
                  {selectedPost.caption.match(/#\w+/g)?.map((hashtag, index) => (
                    <span key={index} className="text-blue-600 mr-2">{hashtag}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>

  );
}

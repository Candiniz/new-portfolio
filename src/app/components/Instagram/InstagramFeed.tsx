/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import InstagramHeader from "./InstaHeader";


// Tipos dos posts do Instagram
export interface InstagramPost {
  id: string;
  caption: string;
  media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
  media_url: string;
  thumbnail_url?: string;
  permalink: string;
}

export interface CarouselPost extends InstagramPost {
  media_type: "CAROUSEL_ALBUM";
  children: { media_url: string }[];
}

export type Post = InstagramPost | CarouselPost;

interface InstagramFeedProps {
  openFeedModal: () => void;
  onPosts: (postsFromChild: Post[]) => void; // Tipo dos posts passados para o pai
}

const InstagramFeed: React.FC<InstagramFeedProps> = ({ onPosts }) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [isPostModalOpen, setIsPostModalOpen] = useState<boolean>(false);
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);


  // Fetch dos posts do Instagram
  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        const res = await fetch("/api/instagram");
        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(
            `Erro ao carregar os posts do Instagram. Status: ${res.status}, Mensagem: ${errorData.message}`
          );
        }

        const data = await res.json();

        if (Array.isArray(data)) {

          const filteredPosts = data.filter(
            (post: InstagramPost) =>
              (post.media_type === "IMAGE" ||
                post.media_type === "VIDEO" ||
                post.media_type === "CAROUSEL_ALBUM")
          );
          setPosts(filteredPosts);
          onPosts(filteredPosts);
        } else {
          throw new Error("Estrutura de dados inesperada.");
        }
        setLoading(false);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Erro desconhecido");
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, []);

  const closePostModal = () => {
    setSelectedPost(null);
    setIsPostModalOpen(false);
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>Erro: {error}</div>;
  }

  // Função para abrir o modal de post específico
  const openPostModal = (post: Post) => {
    setSelectedPost(post);
    setIsPostModalOpen(true);
  };

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

      {/* Modal para post específico */}
      {isPostModalOpen && selectedPost && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="relative bg-[#3f3f3f] max-w-4xl w-full p-5 rounded-lg h-[90vh] overflow-y-auto">
            <button onClick={closePostModal} className="absolute top-2 right-2 text-xl text-gray-700">
              X
            </button>
            <div className="flex flex-col items-center">
              {selectedPost.media_type === "IMAGE" && (
                <img
                  src={selectedPost.media_url}
                  alt={selectedPost.caption}
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                />
              )}
              {selectedPost.media_type === "VIDEO" && (
                <video
                  controls
                  className="w-full max-h-[80vh] object-contain rounded-lg"
                  src={selectedPost.media_url}
                  preload="metadata"
                />
              )}
              {selectedPost.media_type === "CAROUSEL_ALBUM" &&
                (selectedPost as CarouselPost).children.length > 0 && (
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
                )}
              <div className="mt-4 max-h-[300px] overflow-y-auto p-2">
                <p className="text-lg font-semibold">{selectedPost.caption}</p>
                <div className="text-sm text-gray-600 mt-2">
                  {selectedPost.caption.match(/#\w+/g)?.map((tag, idx) => (
                    <span key={idx}>{tag}</span>
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

export default InstagramFeed
export interface Images {
    url: string
    alt: string
    date: string
}

export interface Project {
    slug: string,
    name: string,

    projectLink?: string;
    repositoryLink?: string;
    linkedIn?: string;

    role?: string;
    status?: string;
    impactBadge?: string;
    
    image: Images,
    icons: JSX.Element
    description?: string;
}

export interface Course {
    image: string;
    degree: string;
    institution: string;
    year: string;
    description: string;
}

export interface Experience {
    image: string;
    degree: string;
    institution: string;
    year: string;
    sections: Array;
}

export interface CarouselPost extends InstagramPost {
    media_type: "CAROUSEL_ALBUM";
    children: { media_url: string }[];
}

export interface InstagramPost {
    id: string;
    caption: string;
    media_type: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM";
    media_url: string;
    thumbnail_url?: string;
    permalink: string;
}

export type Post = InstagramPost | CarouselPost;
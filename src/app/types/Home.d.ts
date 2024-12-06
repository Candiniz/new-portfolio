export interface Images {
    url: string
    alt: string
    date: string
}

export interface Project {
    slug: string,
    name: string,

    projectLink: string,
    repositoryLink: string,
    linkedIn: string,

    image: Images,
    icons: JSX.Element
    description?: string;
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
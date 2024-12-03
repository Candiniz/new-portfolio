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
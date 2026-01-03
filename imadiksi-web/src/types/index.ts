export interface Program {
    id: string;
    title: string;
    summary: string;
    tags: string[];
    date: string;
    status: 'ongoing' | 'upcoming' | 'done';
}

export interface Event {
    id: string;
    title: string;
    date: string;
    location: string;
    description: string;
}

export interface Post {
    id: string;
    title: string;
    slug: string;
    date: string;
    category: string;
    excerpt: string;
    content: string;
    cover?: string;
    author?: string;
}

export interface Member {
    name: string;
    role: string;
    photo?: string;
}

export interface Division {
    id: string;
    name: string;
    slug: string;
    description: string;
    workPrograms: string[]; // List of program titles
    members: Member[];
}

export interface GalleryItem {
    id: string;
    title: string;
    image: string;
    category: string;
}

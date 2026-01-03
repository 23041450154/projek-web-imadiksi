import { createContext, useContext, useState, useEffect, useCallback } from "react";
import type { ReactNode } from "react";
import { supabase } from "../lib/supabase";

// Generic types for our data
export interface Program {
    id?: string;
    title: string;
    summary?: string;
    status?: "ongoing" | "upcoming" | "completed";
    date?: string;
    tags?: string[];
    created_at?: string;
}

export interface Post {
    id?: string;
    title: string;
    slug: string;
    excerpt?: string;
    content?: string;
    category?: string;
    image_url?: string;
    file_url?: string;
    date?: string;
    created_at?: string;
}

export interface Division {
    id?: string;
    name: string;
    slug?: string;
    description?: string;
    work_programs?: string[];
    members?: { name: string; role: string }[];
    created_at?: string;
}

export interface GalleryItem {
    id?: string;
    title?: string;
    category?: string;
    image_url: string;
    created_at?: string;
}

export interface Event {
    id?: string;
    title: string;
    date: string;
    location?: string;
    created_at?: string;
}

export interface HeroSlide {
    id?: string;
    image_url: string;
    title?: string;
    subtitle?: string;
    order_index?: number;
    is_active?: boolean;
    created_at?: string;
}

export interface OrganizationMember {
    id?: string;
    name: string;
    position: string;
    division_id?: string | null;
    photo_url?: string;
    order_index?: number;
    is_active?: boolean;
    created_at?: string;
}

interface DataContextType {
    programs: Program[];
    posts: Post[];
    divisions: Division[];
    gallery: GalleryItem[];
    events: Event[];
    heroSlides: HeroSlide[];
    organizationMembers: OrganizationMember[];
    loading: boolean;
    error: string | null;
    // CRUD Operations
    fetchAll: () => Promise<void>;
    addProgram: (item: Program) => Promise<void>;
    updateProgram: (id: string, item: Partial<Program>) => Promise<void>;
    deleteProgram: (id: string) => Promise<void>;
    addPost: (item: Post) => Promise<void>;
    updatePost: (id: string, item: Partial<Post>) => Promise<void>;
    deletePost: (id: string) => Promise<void>;
    addDivision: (item: Division) => Promise<void>;
    updateDivision: (id: string, item: Partial<Division>) => Promise<void>;
    deleteDivision: (id: string) => Promise<void>;
    addGalleryItem: (item: GalleryItem) => Promise<void>;
    updateGalleryItem: (id: string, item: Partial<GalleryItem>) => Promise<void>;
    deleteGalleryItem: (id: string) => Promise<void>;
    addEvent: (item: Event) => Promise<void>;
    updateEvent: (id: string, item: Partial<Event>) => Promise<void>;
    deleteEvent: (id: string) => Promise<void>;
    addHeroSlide: (item: HeroSlide) => Promise<void>;
    updateHeroSlide: (id: string, item: Partial<HeroSlide>) => Promise<void>;
    deleteHeroSlide: (id: string) => Promise<void>;
    addOrganizationMember: (item: OrganizationMember) => Promise<void>;
    updateOrganizationMember: (id: string, item: Partial<OrganizationMember>) => Promise<void>;
    deleteOrganizationMember: (id: string) => Promise<void>;
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
    const [programs, setPrograms] = useState<Program[]>([]);
    const [posts, setPosts] = useState<Post[]>([]);
    const [divisions, setDivisions] = useState<Division[]>([]);
    const [gallery, setGallery] = useState<GalleryItem[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [heroSlides, setHeroSlides] = useState<HeroSlide[]>([]);
    const [organizationMembers, setOrganizationMembers] = useState<OrganizationMember[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchAll = useCallback(async () => {
        setLoading(true);
        setError(null);
        try {
            const [programsRes, postsRes, divisionsRes, galleryRes, eventsRes, heroSlidesRes, orgMembersRes] = await Promise.all([
                supabase.from("programs").select("*").order("created_at", { ascending: false }),
                supabase.from("posts").select("*").order("created_at", { ascending: false }),
                supabase.from("divisions").select("*").order("created_at", { ascending: false }),
                supabase.from("gallery").select("*").order("created_at", { ascending: false }),
                supabase.from("events").select("*").order("date", { ascending: true }),
                supabase.from("hero_slides").select("*").eq("is_active", true).order("order_index", { ascending: true }),
                supabase.from("organization_members").select("*").order("order_index", { ascending: true }),
            ]);

            if (programsRes.error) throw programsRes.error;
            if (postsRes.error) throw postsRes.error;
            if (divisionsRes.error) throw divisionsRes.error;
            if (galleryRes.error) throw galleryRes.error;
            if (eventsRes.error) throw eventsRes.error;
            if (heroSlidesRes.error) throw heroSlidesRes.error;
            if (orgMembersRes.error) throw orgMembersRes.error;

            setPrograms(programsRes.data || []);
            setPosts(postsRes.data || []);
            setDivisions(divisionsRes.data || []);
            setGallery(galleryRes.data || []);
            setEvents(eventsRes.data || []);
            setHeroSlides(heroSlidesRes.data || []);
            setOrganizationMembers(orgMembersRes.data || []);
        } catch (err: any) {
            setError(err.message || "Failed to fetch data");
            console.error("Fetch error:", err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchAll();
    }, [fetchAll]);

    // --- Programs CRUD ---
    const addProgram = async (item: Program) => {
        const { error } = await supabase.from("programs").insert([item]);
        if (error) throw error;
        await fetchAll();
    };
    const updateProgram = async (id: string, item: Partial<Program>) => {
        const { error } = await supabase.from("programs").update(item).eq("id", id);
        if (error) throw error;
        await fetchAll();
    };
    const deleteProgram = async (id: string) => {
        const { error } = await supabase.from("programs").delete().eq("id", id);
        if (error) throw error;
        await fetchAll();
    };

    // --- Posts CRUD ---
    const addPost = async (item: Post) => {
        const { error } = await supabase.from("posts").insert([item]);
        if (error) throw error;
        await fetchAll();
    };
    const updatePost = async (id: string, item: Partial<Post>) => {
        const { error } = await supabase.from("posts").update(item).eq("id", id);
        if (error) throw error;
        await fetchAll();
    };
    const deletePost = async (id: string) => {
        const { error } = await supabase.from("posts").delete().eq("id", id);
        if (error) throw error;
        await fetchAll();
    };

    // --- Divisions CRUD ---
    const addDivision = async (item: Division) => {
        const { error } = await supabase.from("divisions").insert([item]);
        if (error) throw error;
        await fetchAll();
    };
    const updateDivision = async (id: string, item: Partial<Division>) => {
        const { error } = await supabase.from("divisions").update(item).eq("id", id);
        if (error) throw error;
        await fetchAll();
    };
    const deleteDivision = async (id: string) => {
        const { error } = await supabase.from("divisions").delete().eq("id", id);
        if (error) throw error;
        await fetchAll();
    };

    // --- Gallery CRUD ---
    const addGalleryItem = async (item: GalleryItem) => {
        const { error } = await supabase.from("gallery").insert([item]);
        if (error) throw error;
        await fetchAll();
    };
    const updateGalleryItem = async (id: string, item: Partial<GalleryItem>) => {
        const { error } = await supabase.from("gallery").update(item).eq("id", id);
        if (error) throw error;
        await fetchAll();
    };
    const deleteGalleryItem = async (id: string) => {
        const { error } = await supabase.from("gallery").delete().eq("id", id);
        if (error) throw error;
        await fetchAll();
    };

    // --- Events CRUD ---
    const addEvent = async (item: Event) => {
        const { error } = await supabase.from("events").insert([item]);
        if (error) throw error;
        await fetchAll();
    };
    const updateEvent = async (id: string, item: Partial<Event>) => {
        const { error } = await supabase.from("events").update(item).eq("id", id);
        if (error) throw error;
        await fetchAll();
    };
    const deleteEvent = async (id: string) => {
        const { error } = await supabase.from("events").delete().eq("id", id);
        if (error) throw error;
        await fetchAll();
    };

    // --- Hero Slides CRUD ---
    const addHeroSlide = async (item: HeroSlide) => {
        const { error } = await supabase.from("hero_slides").insert([item]);
        if (error) throw error;
        await fetchAll();
    };
    const updateHeroSlide = async (id: string, item: Partial<HeroSlide>) => {
        const { error } = await supabase.from("hero_slides").update(item).eq("id", id);
        if (error) throw error;
        await fetchAll();
    };
    const deleteHeroSlide = async (id: string) => {
        const { error } = await supabase.from("hero_slides").delete().eq("id", id);
        if (error) throw error;
        await fetchAll();
    };

    // --- Organization Members CRUD ---
    const addOrganizationMember = async (item: OrganizationMember) => {
        const { error } = await supabase.from("organization_members").insert([item]);
        if (error) throw error;
        await fetchAll();
    };
    const updateOrganizationMember = async (id: string, item: Partial<OrganizationMember>) => {
        const { error } = await supabase.from("organization_members").update(item).eq("id", id);
        if (error) throw error;
        await fetchAll();
    };
    const deleteOrganizationMember = async (id: string) => {
        const { error } = await supabase.from("organization_members").delete().eq("id", id);
        if (error) throw error;
        await fetchAll();
    };

    const value: DataContextType = {
        programs,
        posts,
        divisions,
        gallery,
        events,
        heroSlides,
        organizationMembers,
        loading,
        error,
        fetchAll,
        addProgram,
        updateProgram,
        deleteProgram,
        addPost,
        updatePost,
        deletePost,
        addDivision,
        updateDivision,
        deleteDivision,
        addGalleryItem,
        updateGalleryItem,
        deleteGalleryItem,
        addEvent,
        updateEvent,
        deleteEvent,
        addHeroSlide,
        updateHeroSlide,
        deleteHeroSlide,
        addOrganizationMember,
        updateOrganizationMember,
        deleteOrganizationMember,
    };

    return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export const useData = () => {
    const context = useContext(DataContext);
    if (context === undefined) {
        throw new Error("useData must be used within a DataProvider");
    }
    return context;
};

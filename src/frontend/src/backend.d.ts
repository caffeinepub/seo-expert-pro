import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface FAQEntry {
    question: string;
    answer: string;
}
export interface BlogPost {
    id: bigint;
    title: string;
    content: string;
    date: Time;
    slug: string;
    tags: Array<string>;
    readTime: bigint;
    excerpt: string;
}
export type Time = bigint;
export interface ContactFormEntry {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export interface backendInterface {
    createBlogPost(title: string, excerpt: string, content: string, tags: Array<string>, slug: string, readTime: bigint): Promise<bigint>;
    getBlogPostById(id: bigint): Promise<BlogPost>;
    getContactSubmissions(): Promise<Array<ContactFormEntry>>;
    getFAQs(): Promise<Array<FAQEntry>>;
    listBlogPosts(): Promise<Array<BlogPost>>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
}

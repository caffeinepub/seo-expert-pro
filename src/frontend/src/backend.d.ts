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
export interface ChatbotLog {
    id: bigint;
    question: string;
    answer: string;
    timestamp: Time;
}
export interface UserProfile {
    name: string;
}
export interface ContactFormEntry {
    name: string;
    email: string;
    message: string;
    timestamp: Time;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    changeAdminPassword(email: string, oldPassword: string, newPassword: string): Promise<boolean>;
    createBlogPost(title: string, excerpt: string, content: string, tags: Array<string>, slug: string, readTime: bigint): Promise<bigint>;
    getBlogPostById(id: bigint): Promise<BlogPost>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getChatbotLogs(): Promise<Array<ChatbotLog>>;
    getChatbotLogsWithToken(token: string): Promise<Array<ChatbotLog>>;
    getContactSubmissions(): Promise<Array<ContactFormEntry>>;
    getContactSubmissionsWithToken(token: string): Promise<Array<ContactFormEntry>>;
    getFAQs(): Promise<Array<FAQEntry>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    hasAdminSetup(): Promise<boolean>;
    isCallerAdmin(): Promise<boolean>;
    listBlogPosts(): Promise<Array<BlogPost>>;
    logChatbotMessage(question: string, answer: string): Promise<void>;
    loginAdmin(email: string, password: string): Promise<string | null>;
    logoutAdmin(token: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    setupAdminCredentials(email: string, password: string): Promise<boolean>;
    submitContactForm(name: string, email: string, phone: string, message: string): Promise<void>;
    verifyAdminToken(token: string): Promise<boolean>;
}

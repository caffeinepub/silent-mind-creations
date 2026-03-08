import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface ContactForm {
    name: string;
    submittedAt: bigint;
    email: string;
    message: string;
}
export interface MovieDetails {
    title: string;
    synopsis: string;
    genre: string;
    castList: Array<string>;
    releaseDate: string;
}
export interface backendInterface {
    getAllMovieDetails(): Promise<Array<MovieDetails>>;
    getContactForms(): Promise<Array<ContactForm>>;
    getMovieDetails(identifier: string): Promise<MovieDetails>;
    getNewsletterEmails(): Promise<Array<string>>;
    setMovieDetails(identifier: string, title: string, synopsis: string, genre: string, releaseDate: string, castList: Array<string>): Promise<void>;
    submitContactForm(name: string, email: string, message: string): Promise<void>;
    subscribe(email: string): Promise<void>;
}

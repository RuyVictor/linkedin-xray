export interface IAbout {
    name: string;
    title: string;
    location?: {
        city: string;
        state: string;
        country: string;
    };
    description?: string;
}

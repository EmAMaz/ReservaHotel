import { SessionData } from 'express-session';

export interface UserSessionData {
    id: string;
    name: string;
    lastname: string;
    email: string;
    role: string;
}

// Extiende la interfaz SessionData
declare module 'express-session' {
    interface SessionData {
        user: UserSessionData | null; 
    }
}
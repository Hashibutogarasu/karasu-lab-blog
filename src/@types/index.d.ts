//override Session type to add custom fields
import { Session } from 'next-auth'

declare module 'next-auth' {
    interface Session {
        id : number;
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        }
    }
}

//override Session type to add custom fields
import { Application, Post } from '@prisma/client';
import { Session } from 'next-auth'
import { CamelToSnake } from 'snake-camel-types';

declare module 'next-auth' {
    interface Session {
        id: number;
        user: {
            id: string;
            name: string;
            email: string;
            image: string;
        }
    }
}

declare module '@prisma/client' {
    export interface Post {
        id: number;
        user_id: number;
        title: string;
        content: string;
        created_at: Date;
        updated_at: Date;
        tags: string[];
    }
}

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';


const supabase = createClientComponentClient();

export type User = {
    id: number;
    image: string | undefined;
    name: string | undefined;
    isAdmin: boolean;
    email: string | undefined;
    emailVerified: Date | undefined;
    createdAt: Date;
    updatedAt: Date;
    api_token: string | undefined;
}

const getUser = async <T extends User>(id: any): Promise<T | undefined> => {
    const { data } = await supabase.from("users").select().eq("id", id).single();
    if (data) {
        return data as T;
    }
}

export function useSocialUser<T extends User>(): T | undefined {

    const session = useSession();
    const [user, setUser] = useState<T | undefined>();

    useEffect(() => {
        if (session?.data?.id) {
            getUser(session.data.id).then((data) => {
                if (data) {
                    setUser(data as T);
                }
            })
        }
    }, [session]);
    return user;
}
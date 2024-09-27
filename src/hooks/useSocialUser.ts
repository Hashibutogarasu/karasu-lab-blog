/* eslint-disable @typescript-eslint/no-explicit-any */
import { User } from '@prisma/client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';


const supabase = createClientComponentClient();

export const getUser = async <T extends User>(id: any): Promise<T | undefined> => {
    const { data } = await supabase.from("users").select().eq("id", id).single();
    if (data) {
        return data as T;
    }
}

export function useSocialUsersById<T extends User>(id: number): Promise<T | undefined> {
    const [user, setUser] = useState<T | undefined>();

    useEffect(() => {
        if (id) {
            getUser(id).then((data) => {
                if (data) {
                    setUser(data as T);
                }
            }
            )
        }
    }, [id]);

    return Promise.resolve(user);
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
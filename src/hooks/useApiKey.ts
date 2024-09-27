"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from 'next-auth/react';
import { useState, useEffect } from 'react';
import { useSocialUser } from './useSocialUser';
import { User } from '@prisma/client';

const supabase = createClientComponentClient();

const getUser = async <T extends User>(id: any): Promise<T | undefined> => {
    const { data } = await supabase.from("users").select().eq("id", id).single();
    if (data) {
        return data as T;
    }
}

function generateToken(): string {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

export async function resetToken(id: any): Promise<string> {
    const apiToken = generateToken();
    await supabase.from("users").update({ api_token: apiToken })
        .eq("id", id);

    return Promise.resolve(apiToken);
}

export function useApiToken(): string | undefined {
    const user = useSocialUser();
    const [apiToken, setApiToken] = useState<string | undefined>();

    useEffect(() => {

        return () => {
            setApiToken(user?.api_token ?? undefined);
        }
    }, [user]);

    return apiToken;
}
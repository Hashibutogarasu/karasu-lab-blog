import { Post } from "@prisma/client";
import { useEffect, useState } from "react";
import { getUser } from "./useSocialUser";
import { supabase } from "@/utils/supabaseClient";
import { SnakeToCamelCase } from "snake-camel-types"

export function useUserPosts() {
    const [posts, setPosts] = useState<Post[]>([]);

    useEffect(() => {
        supabase
            .from("posts")
            .select()
            .returns<Post[]>()
            .then(({ data, error }) => {
                if (error) {
                    console.error(error);
                } else {
                    setPosts(data || []);
                }
            });
    }, []);


    return posts;
}
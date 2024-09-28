"use client";

import { supabase } from "@/utils/supabaseClient";
import { Box, Typography } from "@mui/material";
import { Post } from "@prisma/client";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { UserIcon } from "./UserIcon";
import Markdown from "react-markdown";

export function BlogView() {
    const [post, setPost] = useState<Post | undefined>();
    const [error, setError] = useState<string | null>(null);
    const params = useParams();
    const id = params.id as string;

    useEffect(() => {
        async function fetchPost() {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("path", id)
                .eq("state", "published")
                .returns<Post>()
                .single();
            if (error) {
                setError("An error occurred while fetching the post.");
            } else {
                setPost(data);
            }
        }
        fetchPost();
    }, [id]);


    return <Box sx={{ my: 4 }}>
        <Typography variant="h3" gutterBottom>
            {post == null ? "Loading..." : post.title}
        </Typography>
        {
            error != null ? <Typography variant="body1" color="error">{error}</Typography> :
                post != null ?
                    <Box>
                        <Typography variant="body2" color="text.secondary" gutterBottom>
                            <UserIcon user_id={post.user_id} />
                        </Typography>
                        <Markdown>{post.content}</Markdown>
                    </Box>
                    : null
        }
    </Box>
}
"use client";

import { useSocialUser } from "@/hooks/useSocialUser";
import { supabase } from "@/utils/supabaseClient";
import { Box, Button, Card, Typography } from "@mui/material";
import { Post } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function ManageBlogPage() {
    const [posts, setPosts] = useState<Post[]>([]);
    const user = useSocialUser();

    useEffect(() => {
        supabase.from('posts').select('*').eq('user_id', user?.id).then(({ data, error }) => {
            if (error) {
                console.error('An error occurred while fetching the posts.');
            } else {
                setPosts(data);
            }
        });
    }, [user]);

    const router = useRouter();
    return <>
        {
            posts.map((post) => {
                return <Box key={post.id} my={2}>
                    <Card style={{
                        backgroundColor: post.state === 'published' ? 'white' : post.state === 'draft' ? 'lightgray' : 'lightcoral',
                    }}>
                        <Box m={2}>
                            <Typography variant="h5">{post.title}</Typography>
                            <Typography variant="body1">{post.content.slice(0, 100)}</Typography>
                            <Typography variant="subtitle1">State: {post.state}</Typography>
                            <Button onClick={() => router.push(`/blog/edit/${post.id}`)}>Edit</Button>
                        </Box>
                    </Card>
                </Box>
            })
        }
    </>
}
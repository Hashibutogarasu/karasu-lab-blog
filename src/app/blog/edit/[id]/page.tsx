"use client";

import { AdminGuard } from "@/components/AdminGuard";
import { PostEditor } from "@/components/PostEditor";
import { useSocialUser } from "@/hooks/useSocialUser";
import { supabase } from "@/utils/supabaseClient";
import { Box, Button } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function EditPostPage() {
    const [title, setTitle] = useState('New Post');
    const [path, setPath] = useState('');
    const [value, setValue] = useState("**Hello world!!!**");
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const user = useSocialUser();
    const router = useRouter();
    const [pathError, setPathError] = useState(false);
    const [userId, setUserId] = useState<number>();

    const { id } = useParams();

    useEffect(() => {
        setUserId(user?.id);
        async function fetchPost() {
            const { data, error } = await supabase
                .from("posts")
                .select("*")
                .eq("id", id)
                .eq("user_id", userId)
                .single();

            if (error) {
                console.error('An error occurred while fetching the post.');
            } else {
                if (data) {
                    console.log(data);
                    setTitle(data.title);
                    setPath(data.path);
                    setValue(data.content);
                }
            }
        }
        fetchPost();
    }, [id, user?.id, userId]);

    async function savePost(state: 'draft' | 'published' | 'deleted' = 'draft') {
        setDisabled(true);
        console.log({
            "path": path,
            "title": title,
            "content": value,
            "user_id": userId,
            "updated_at": new Date(),
            "state": state
        })
        await supabase.from('posts').update({
            path: path,
            title: title,
            content: value,
            user_id: userId,
            updated_at: new Date(),
            state: state as string,
        })
            .eq('id', id)
            .eq('user_id', userId);

        setOpen(true);
        setDisabled(false);
    }

    async function validatePath(): Promise<boolean> {
        if (path.length === 0) {
            return false;
        }

        const { data } = await supabase.from('posts').select('path').eq('path', path);

        if (data) {
            if (data.length > 0) {
                return true;
            }
        }

        return false;
    }

    return (
        <AdminGuard>
            <PostEditor
                path={path}
                setPath={setPath}
                value={value}
                setValue={setValue}
                savePost={() => { savePost("draft") }}
                disabled={disabled}
                pathError={pathError}
                setPathError={setPathError}
                open={open}
                setOpen={setOpen}
                router={router}
                title={title}
                setTitle={setTitle}
                onKeyDown={async (e) => {
                    if (e.key === 'Enter') {
                        if (await validatePath()) {
                            setPathError(true);
                        } else {
                            setPathError(false);
                            savePost();
                        }
                    }
                }
                }
            >
                <Box sx={{ my: 1 }} />
                <Button variant="contained" color="secondary" onClick={() => { savePost("published") }} disabled={(disabled || pathError) && title.length > 0 && value.length > 0}>Save and Publish</Button>
                <Box sx={{ my: 1 }} />
                <Button variant="contained" color="warning" onClick={() => { savePost("deleted") }} disabled={(disabled || pathError) && title.length > 0 && value.length > 0}>Delete this post</Button>
            </PostEditor>
        </AdminGuard>
    );
}
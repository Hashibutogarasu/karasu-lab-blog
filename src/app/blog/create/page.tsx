"use client";

import { AdminGuard } from '@/components/AdminGuard';
import { PostEditor } from '@/components/PostEditor';
import { useSocialUser } from '@/hooks/useSocialUser';
import { supabase } from '@/utils/supabaseClient';
import { Box, Button, Divider, FormLabel, Snackbar, Stack, TextField } from '@mui/material';
import { Post } from '@prisma/client';
import MDEditor from '@uiw/react-md-editor';
import { useParams, useRouter } from 'next/navigation';
import path from 'path';
import { useEffect, useState } from 'react';


export default function BlogPostPage() {
    const [title, setTitle] = useState('New Post');
    const [path, setPath] = useState('');
    const [value, setValue] = useState("**Hello world!!!**");
    const [open, setOpen] = useState(false);
    const [disabled, setDisabled] = useState(false);
    const user = useSocialUser();
    const router = useRouter();
    const [pathError, setPathError] = useState(false);

    async function savePost() {
        setDisabled(true);
        await supabase.from('posts').insert({
            path: path,
            title: title,
            content: value,
            user_id: user?.id,
            updated_at: new Date(),
        }).then(() => {
            setOpen(true);
        });

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
                savePost={savePost}
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
            />
        </AdminGuard>
    );
}
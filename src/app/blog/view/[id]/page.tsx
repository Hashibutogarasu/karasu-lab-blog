"use server";

import { BlogView } from "@/components/BlogView";
import { getPostById } from "@/utils/post_utils";
import { getUserById } from "@/utils/user_utils";
import { Metadata } from "next";


export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
    const post = await getPostById(params.id);
    const user = await getUserById(post.user_id);
    return {
        title: post.title,
        description: post.content.slice(0, 10) + "...",
        authors: [{
            name: user.display_name || user.name || "Unknown author",
            url: `/users/${user.display_name}`,
        }],
    };
}

export default async function BlogViewPage() {
    return <BlogView />;
}
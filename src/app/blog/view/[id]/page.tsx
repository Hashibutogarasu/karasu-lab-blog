"use server";

import { BlogView } from "@/components/BlogView";
import { getPostById } from "@/utils/post_utils";
import { Metadata } from "next";


export const generateMetadata = async ({ params }: { params: { id: string } }): Promise<Metadata> => {
    const post = await getPostById(params.id);
    return {
        title: post.title,
        description: post.content.slice(0, 10) + "...",
    };
}

export default async function BlogViewPage() {
    return <BlogView />;
}
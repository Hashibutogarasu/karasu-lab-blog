import { Post } from "@prisma/client";
import { supabase } from "./supabaseClient";

export async function getPostById(id: string): Promise<Post> {
    const { data } = await supabase.from("posts").select().eq("path", id).single();
    return Promise.resolve(data);
}
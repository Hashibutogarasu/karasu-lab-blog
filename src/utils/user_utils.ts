import { User } from "@prisma/client";
import { supabase } from "./supabaseClient";

export async function getUserById(id: number): Promise<User> {
    return supabase.from("users").select().eq("id", id).single().then(({ data }) => data as User);
}
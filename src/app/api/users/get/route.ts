import { supabase } from "@/utils/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const api_token = req.headers.get("Authorization");

    const { data, error } = await supabase.from("users").select().eq("api_token", api_token).single();

    const res = NextResponse.json(data);
    return res;
}

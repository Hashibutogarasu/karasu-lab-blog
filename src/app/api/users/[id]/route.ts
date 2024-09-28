import { supabase } from "@/utils/supabaseClient";
import { User } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const api_token = req.headers.get("Authorization");

    const { data, error } = await supabase.from("users").select().eq("api_token", api_token).single();

    const res = NextResponse.json(data);
    return res;
}

export async function GET(req: NextRequest) {
    const id = req.nextUrl.pathname.split("/")[3];
    const { data, error } = await supabase.from("users").select().eq("id", id).single();

    const user = data as User;

    return NextResponse.json({
        id: user.id,
        name: user.name,
        display_name: user.display_name,
    });
}
import { supabase } from "@/utils/supabaseClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const userId = req.nextUrl.searchParams.get("userId");

    if (userId) {
        const { data, error } = await supabase.from("posts").select().eq("user_id", userId);

        return NextResponse.json(data ?? [], { status: 200 });
    }

    const { data } = await supabase.from("posts").select();

    return NextResponse.json(data ?? [], { status: 200 });
}
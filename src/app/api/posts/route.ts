import { supabase } from "@/utils/supabaseClient";
import { Post } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    const id = req.nextUrl.searchParams.get("id");

    if (id) {
        const post = (await supabase.from("posts").select().eq("id", id).single()).data as Post;

        return NextResponse.json(post ?? {}, { status: 200 });
    }

    return NextResponse.json({}, { status: 200 });
}
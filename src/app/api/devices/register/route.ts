import { supabase } from "@/utils/supabaseClient";
import { Device } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const api_token = req.headers.get("Authorization");
    const json = await req.json();

    if (api_token == null || json == null) {
        return NextResponse.error();
    }

    const device = json as Device;

    const { data, error } = await supabase.from("users").select().eq("api_token", api_token).single();

    if (data != null || error != null) {
        console.log("Inserting device");
        const { status, statusText, error } = await supabase.from("devices").insert(device);

        const res = NextResponse.json({
            status,
            statusText,
            error,
        });
        return res;
    }
    else {
        return NextResponse.json({ data: "No Data found", error }, { status: 201 });
    }
}

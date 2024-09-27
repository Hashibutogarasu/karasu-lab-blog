"use client";

import { Typography } from "@mui/material";
import { useParams } from "next/navigation";

export default function UserProfilePage() {
    const params = useParams();
    const userId = params.userId;

    return <div>
        <Typography variant="h5">User: {userId}</Typography>
    </div>;
}
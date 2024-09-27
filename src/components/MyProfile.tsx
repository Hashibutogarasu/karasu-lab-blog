"use client";

import LoadingSkeleton from "@/components/Skeleton";
import { useSocialUser } from "@/hooks/useSocialUser";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

export default function MyProfile({ edit }: { edit: boolean }) {
    const user = useSocialUser();

    return <>
        <Typography variant="h3">Profile</Typography>
        {
            !edit ? <><LoadingSkeleton>
                <Avatar src={user?.image ?? ""} alt={user?.name ?? ""} />
            </LoadingSkeleton>
                <Box sx={{ my: 2 }} />
                <Typography variant="body1">User name<LoadingSkeleton>{user?.name}</LoadingSkeleton></Typography>
                <Typography variant="body1">User email<LoadingSkeleton>{user?.email}</LoadingSkeleton></Typography>
                <Box sx={{ my: 2 }} />
                <Button variant="contained" color="primary" onClick={() => {
                    window.location.href = "/settings/profile?edit=true";
                }}>Edit Profile</Button></> : <Button variant="contained" color="primary" onClick={() => {
                    window.location.href = "/settings/profile";
                }}>Save Profile</Button>
        }
    </>
}
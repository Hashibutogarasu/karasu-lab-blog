"use client";

import LoadingSkeleton from "@/components/Skeleton";
import { getUser } from "@/hooks/useSocialUser";
import { Avatar, Box, Button, Typography } from "@mui/material";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";

export default function MyProfile({ userId, editable, hide_edit }: { userId: number | undefined, editable: boolean | undefined, hide_edit: boolean | undefined }) {
    const [user, setUser] = useState<User>();
    const edit = editable ?? false;
    const hide = hide_edit ?? false;

    useEffect(() => {
        getUser(userId).then((user) => {
            setUser(user);
        });
    }, [userId]);

    return <>
        <Typography variant="h3">Profile</Typography>
        <><LoadingSkeleton>
            <Avatar src={user?.image ?? ""} alt={user?.name ?? ""} />
        </LoadingSkeleton>
            <Box sx={{ my: 2 }} />
            <Typography variant="body1">Name:<LoadingSkeleton>{user?.name}</LoadingSkeleton></Typography>
            <Typography variant="body1">Email:<LoadingSkeleton>{user?.email}</LoadingSkeleton></Typography>
            <Typography variant="body1">Display Name:<LoadingSkeleton>{user?.display_name}</LoadingSkeleton></Typography>
            <Box sx={{ my: 2 }} />

            {
                !hide ? <Button variant="contained" color="primary" onClick={() => {
                    window.location.href = "/settings/profile?edit=" + !edit;
                }}>{
                        hide ? "" : edit ? "Save" : "Edit"
                    }</Button> : <></>
            }
        </>

    </>
}
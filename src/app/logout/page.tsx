"use client";

import { DangerButton, StyledCard } from "@/components/StyledComponents";
import { Typography } from "@mui/material";
import { signOut } from "next-auth/react";

export default function LogoutPage() {
    return <>
        <StyledCard>
            <Typography variant="h3">Logout</Typography>
            <Typography>Are you sure you want to logout?</Typography>
            <DangerButton onClick={async () => {
                await signOut({ callbackUrl: "/" });
            }} >Logout</DangerButton>
        </StyledCard>
    </>
}
import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { useSocialUser } from "@/hooks/useSocialUser";

export function AppIconButton() {
    const user = useSocialUser();

    return <Avatar src={user?.image ?? ""} alt={user?.name ?? ""} />;
}
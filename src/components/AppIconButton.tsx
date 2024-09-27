import { useSession } from "next-auth/react";
import { Avatar } from "@mui/material";
import Link from "next/link";
import { useSocialUser } from "@/hooks/useSocialUser";

export function AppIconButton() {
    const user = useSocialUser();

    return <Link href={"/settings/profile"}>
        <Avatar src={user?.image ?? ""} alt={user?.name ?? ""} /></Link>;
}
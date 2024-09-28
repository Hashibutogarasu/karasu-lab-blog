import { useSocialUser } from "@/hooks/useSocialUser";
import { Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AdminGuard({ children }: { children: React.ReactNode }) {
    const user = useSocialUser();
    const router = useRouter();

    const [isAdmin, setIsAdmin] = useState<boolean>(false);

    useEffect(() => {
        setIsAdmin(user?.is_admin || false);
    }, [user, router]);

    return isAdmin ? <>{children}</> : <>
        <Typography variant="h3">You are not an admin.</Typography>
        <Typography variant="body1">Please contact an admin to gain access to this page.</Typography>
    </>;
}
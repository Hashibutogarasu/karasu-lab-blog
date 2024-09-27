import { getUser } from "@/hooks/useSocialUser";
import { Avatar } from "@mui/material";
import { User } from "@prisma/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const supabase = createClientComponentClient();

export function UserIcon({ user_id }: { user_id: number | undefined }) {
    const [avatar, setAvatar] = useState<string | undefined>();
    const router = useRouter();
    const [display_name, setDisplayName] = useState<string | undefined>();

    useEffect(() => {
        supabase.from("users").select().eq("id", user_id).returns<User[]>().single().then(({ data, error }) => {
            if (!error) {
                setAvatar(data.image ?? undefined);
            }
        });
        getUser(user_id).then((user) => {
            setDisplayName((user as any).display_name);
        });
    }, [user_id]);

    return <div onClick={() => {
        if (display_name) {
            router.push(`/user/${display_name}`);
        }

    }}>
        <Avatar src={avatar} />
    </div>;
}
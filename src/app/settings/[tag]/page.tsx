"use client";

import { DeveloperSettings } from "@/components/DeveloperSettings";
import { EmailSettings } from "@/components/EmailSettings";
import MyProfile from "@/components/MyProfile";
import { SettingsGrid } from "@/components/SettingsGrid";
import { generateKey } from "@/utils";
import { useEffect, useState } from "react";

export default function ProfilePage() {
    const [path, setPath] = useState<string | undefined>();
    const [edit, setEdit] = useState(false);
    const [tag, setTag] = useState("");

    useEffect(() => {
        const path = window.location.pathname;
        const segments = path.split("/");
        const tag = segments[segments.length - 1];

        const urlParams = new URLSearchParams(window.location.search);
        const edit = urlParams.get("edit");
        setEdit(edit === "true");

        setTag(tag);
    }, [path]);

    const pathMap: Record<string, JSX.Element> = {
        "profile": <MyProfile edit={edit} key={generateKey()} />,
        "email": <EmailSettings />,
        "developer": <DeveloperSettings />,
    };

    return <SettingsGrid key={tag}>
        {
            pathMap[tag] ?? <div></div>
        }
    </SettingsGrid>;
}

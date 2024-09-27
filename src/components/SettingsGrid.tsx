"use client";

import { Box, Grid2 } from "@mui/material";
import { StyledButton } from "./StyledComponents";
import React from "react";
import { generateKey } from "@/utils";
import { useSocialUser } from "@/hooks/useSocialUser";
import { Email, Key, NotificationAdd, Settings } from "@mui/icons-material";

export function SettingsGrid({ children, key }: { children: React.ReactNode, key?: string }) {
    const [path, setPath] = React.useState("");

    const user = useSocialUser();

    const buttons = [
        { href: "/settings/", text: "Settings", enable: path !== "/settings", visible: true, icon: <Settings /> },
        { href: "/settings/profile", text: "Profile", enable: path !== "/settings/profile", visible: user != undefined },
        { href: "/settings/email", text: "Email Settings", enable: path !== "/settings/email", visible: user != undefined, icon: <Email /> },
        { href: "/settings/notifications", text: "Notifications", enable: path !== "/settings/notifications", visible: user != undefined, icon: <NotificationAdd /> },
        { href: "/settings/security", text: "Security", enable: path !== "/settings/security", visible: user != undefined, icon: <Key /> },
        { href: "/settings/privacy", text: "Privacy", enable: path !== "/settings/privacy", visible: true },
        { href: "/settings/billing", text: "Billing", enable: path !== "/settings/billing", visible: user != undefined },
        { href: "/settings/subscription", text: "Subscription", enable: path !== "/settings/subscription", visible: user != undefined },
        { href: "/settings/developer", text: "Developer", enable: path !== "/settings/developer", visible: user != undefined },
        { href: "/logout", text: "Logout", enable: path !== "/logout", visible: true },
    ];

    return <Grid2 container>
        <div>
            <ul style={{
                listStyleType: "none",
                padding: 0,
                margin: 0,
                display: "flex",
                flexDirection: "column",
                gap: "8px"
            }} key={generateKey()}>
                {
                    buttons.map((button, index) => {
                        return button.visible ? <li key={index}>
                            <StyledButton variant="text" size="small" startIcon={button.icon}
                                href={button.href}
                                disabled={!button.enable}
                                key={generateKey()}
                            >
                                {button.text}
                            </StyledButton>
                        </li> : <></>
                    })
                }
            </ul>
        </div>
        <Box sx={{ mx: 2 }} />
        <div>
            {children}
        </div>
    </Grid2>
}

import { Button, Grid2, Menu, MenuItem } from "@mui/material";
import { FC, MouseEvent, useRef, useState } from "react";
import { AppIconButton } from "./AppIconButton";
import { useRouter } from "next/navigation";
import { Logout, Person, Settings } from "@mui/icons-material";

export const AccountMenu: FC = () => {
    const [open, setOpen] = useState<boolean>(false);
    const anchorEl = useRef<HTMLDivElement>(null);
    const router = useRouter();

    const handleClick = () => {
        setOpen(!open);
    };
    const handleClose = (path: string) => {
        router.push(`${path}`);
        setOpen(false);
    };

    return (
        <>
            <div ref={anchorEl}
                onClick={handleClick}>
                <AppIconButton />
            </div>
            <Menu
                anchorEl={anchorEl.current}
                open={open}
                disableAutoFocusItem={false}
                autoFocus={false}
                onClose={handleClose}
                keepMounted
                transitionDuration={"auto"}
                sx={{}}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "right"
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "right"
                }}
                MenuListProps={{}}
                PaperProps={{
                    elevation: 3
                }}>
                <MenuItem onClick={(_) => { handleClose("/settings") }}>
                    <Grid2 container rowSpacing={1}>
                        <Grid2 >
                            <Settings />
                        </Grid2>
                        <Grid2>
                            Settings
                        </Grid2>
                    </Grid2>
                </MenuItem>
                <MenuItem onClick={(_) => { handleClose("/settings/profile") }}>
                    <Grid2 container rowSpacing={1}>
                        <Grid2 >
                            <Person />
                        </Grid2>
                        <Grid2>
                            Profile
                        </Grid2>
                    </Grid2>
                </MenuItem>
                <MenuItem onClick={(_) => { handleClose("/logout") }}>
                    <Grid2 container rowSpacing={1}>
                        <Grid2 >
                            <Logout />
                        </Grid2>
                        <Grid2>
                            Logout
                        </Grid2>
                    </Grid2>
                </MenuItem>
            </Menu>
        </>
    );
};
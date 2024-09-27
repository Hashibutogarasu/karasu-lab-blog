import { Typography } from "@mui/material";
import Link from "next/link";

export function SiteLogo() {
    return <Typography color={"textPrimary"} fontWeight={"bold"}>
        <Link href="/" style={{
            textDecoration: 'none',
            color: 'inherit',
        }}>
            Karasu Lab</Link>
    </Typography>
}
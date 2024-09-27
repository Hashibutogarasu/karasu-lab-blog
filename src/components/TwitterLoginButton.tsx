import { Twitter } from "@mui/icons-material";
import { Box, Button } from "@mui/material";
import { signIn } from "next-auth/react";

export function TwitterLoginButton() {
    return <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button onClick={() => { signIn("twitter", { callbackUrl: "/settings" }) }} variant="contained" color="primary">
            <Twitter />
            <Box sx={{ mx: 1 }} />
            Signin with Twitter
        </Button>
    </Box>
}
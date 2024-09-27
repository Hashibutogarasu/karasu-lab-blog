import { Box } from "@mui/material"
import { signIn } from "next-auth/react"
import GoogleButton from "react-google-button"

export function GoogleLoginButton() {
    return <Box sx={{ display: "flex", justifyContent: "center" }}>
        <GoogleButton
            onClick={() => {
                signIn("google", { callbackUrl: "/settings" })
            }}
        />
    </Box>
}
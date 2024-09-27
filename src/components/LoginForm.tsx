import { Box, Button, Card, Divider, styled, TextField } from "@mui/material";
import { GoogleLoginButton } from "./GoogleLoginButton";
import { TwitterLoginButton } from "./TwitterLoginButton";
import { StyledCard } from "./StyledComponents";
import { useEffect, useState } from "react";
import { SignIn } from "@/utils";

export function LoginForm() {
    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setEmail(email);
        setPassword(password);
    }, [email, password]);

    return <StyledCard>
        <Box width={300}>
            <TextField label="Email Address" variant="outlined" id="email" type="email" autoComplete="new-email" fullWidth onChange={(value) => { setEmail(value.target.value) }} />
            <Box sx={{ my: 1 }} />
            <TextField label="Password" variant="outlined" id="password" type="password" autoComplete="new-password" fullWidth onChange={(value) => { setPassword(value.target.value) }} />
            <Box sx={{ my: 1 }} />

            <Button variant="contained" onClick={async () => {
                setLoading(true);
                await SignIn({
                    credentials: {
                        email: email ?? "",
                        password: password ?? ""
                    }
                });
                setLoading(false);
            }} fullWidth disabled={loading || (email === undefined || password === undefined)}>
                Login
            </Button>

            <Box sx={{ my: 1 }} />

            <Divider />

            <Box sx={{ my: 1 }} />

            <Box>
                <GoogleLoginButton />
                <Box sx={{ my: 1 }} />
                <TwitterLoginButton />
            </Box>
        </Box>
    </StyledCard>
}

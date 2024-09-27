import { Box, Button, FormControl, TextField, Typography } from "@mui/material";
import { StyledCard } from "./StyledComponents";
import { SignUp } from "@/utils";
import { useState } from "react";

export function EmailSettings() {
    const [loading, setLoading] = useState(false);

    const [email, setEmail] = useState<string | undefined>();
    const [password, setPassword] = useState<string | undefined>();

    return <Box sx={{ width: "100%" }}>
        <StyledCard>
            <FormControl>
                <Typography variant="h6">Email Settings</Typography>
                <Box sx={{ mb: 2 }} />
                <TextField label="Email Address" variant="outlined" id="email" type="email" onChange={(value) => {
                    setEmail(value.target.value);
                }} />
                <Box sx={{ mb: 2 }} />
                <TextField label="Password" variant="outlined" id="password" type="password" onChange={(value) => {
                    setPassword(value.target.value);
                }} />
                <Box sx={{ mb: 2 }} />
                <Button variant="contained" onClick={async () => {
                    setLoading(true);
                    await SignUp(
                        {
                            credentials: {
                                email: email ?? "",
                                password: password ?? ""
                            }
                        }
                    )
                    setLoading(false);
                }} disabled={loading || (email === undefined || password === undefined)}>
                    Save
                </Button>
            </FormControl>
        </StyledCard>
    </Box>
}

import { resetToken, useApiToken } from "@/hooks/useApiKey";
import { useEffect, useState } from "react";
import { StyledCard } from "./StyledComponents";
import { Box, Button, Typography } from "@mui/material";
import { useSocialUser } from "@/hooks/useSocialUser";
import { CamelToSnake } from "snake-camel-types";
import { User } from "@prisma/client";

export function DeveloperSettings() {
    const apiToken = useApiToken();
    const user = useSocialUser() as any as CamelToSnake<User>;

    const [token, setToken] = useState<string | undefined>();

    useEffect(() => {
        if (apiToken) {
            setToken(apiToken);
        }
    }, [apiToken]);

    return <StyledCard>
        <Typography variant="h6">Developer Settings</Typography>
        <Typography variant="body1">API Token: {token ?? user?.api_token}</Typography>
        <Button variant="contained" color="primary" onClick={() => {
            if (apiToken) {
                navigator.clipboard.writeText(apiToken);
            }
        }
        }>Copy API Token</Button>

        <Box sx={{ my: 1 }} />

        <Button variant="contained" color="secondary" onClick={async () => {
            if (user) {
                setToken(await resetToken(user.id));
            }
        }
        }>Reset API Token</Button>
    </StyledCard>
}
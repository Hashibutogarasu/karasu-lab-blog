import { Box } from "@mui/material";

export function TemplateFrame({ children }: { children: React.ReactNode }) {
  return (
    <Box sx={{ m: 25 }}>
      {children}
    </Box>
  )
}
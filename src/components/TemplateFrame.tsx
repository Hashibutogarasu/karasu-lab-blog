import { Box, PaletteMode } from "@mui/material";

export function TemplateFrame({ children, toggleCustomTheme, showCustomTheme, mode, toggleColorMode }: { children: React.ReactNode, toggleCustomTheme: () => void, showCustomTheme: boolean, mode: PaletteMode, toggleColorMode: () => void }) {
  return (
    <Box sx={{ m: 25 }}>
      {children}
    </Box>
  )
}
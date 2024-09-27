import { Box, PaletteMode } from "@mui/material";

export function TemplateFrame({ children, toggleCustomTheme, showCustomTheme, mode, toggleColorMode }: { children: React.ReactNode, toggleCustomTheme: () => void | undefined, showCustomTheme: boolean | undefined, mode: PaletteMode | undefined, toggleColorMode: () => void | undefined }) {
  return (
    <Box sx={{ m: 25 }}>
      {children}
    </Box>
  )
}
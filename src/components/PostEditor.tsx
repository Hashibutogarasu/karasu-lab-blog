import { Box, Button, Divider, Snackbar, Stack, TextField } from "@mui/material";
import MDEditor from "@uiw/react-md-editor";

export function PostEditor({ path, setPath, value, setValue, savePost, disabled, pathError, setPathError, open, setOpen, router, title, setTitle, onKeyDown, children }: { path: string, setPath: (path: string) => void, value: string, setValue: (value: string) => void, savePost: () => void, disabled: boolean, pathError: boolean, setPathError: (pathError: boolean) => void, open: boolean, setOpen: (open: boolean) => void, router: any, title: string, setTitle: (title: string) => void, onKeyDown: (e: any) => void, children?: any }) {
    return <Stack>
        <Snackbar
            open={open}
            autoHideDuration={6000}
            onClose={() => setOpen(false)}
            message="Post saved!"
            action={
                <Button color="secondary" size="small" onClick={() => {
                    router.push("/blog/manage/");
                    setOpen(false);
                }}>
                    Go to post manager
                </Button>
            }
        />
        <div data-color-mode="light">
            <TextField required label="Title" variant="outlined" fullWidth onChange={e => setTitle(e.target.value)} value={title}/>
            <Box sx={{ my: 2 }} />
            <TextField required error={pathError} label="Path" variant="outlined" helperText={pathError ? "Path already exists" : ""} fullWidth value={path} onChange={(e) => {
                setPath(e.target.value);
            }} onKeyDown={async (e) => {
                if (e.key === 'Enter') {
                    onKeyDown(e);
                }
            }} />
            <Box sx={{ my: 2 }} />
            <Divider />
            <Box sx={{ my: 2 }} />
            <div className="container">
                <MDEditor
                    color='light'
                    value={value}
                    onChange={(value) => setValue(value || '')}
                />
                <MDEditor.Markdown source={value} style={{ whiteSpace: 'pre-wrap' }} />
            </div>
        </div>
        <Button variant="contained" color="primary" onClick={savePost} disabled={(disabled || pathError) && title.length > 0 && value.length > 0}>Save</Button>
        {children}
    </Stack>
}
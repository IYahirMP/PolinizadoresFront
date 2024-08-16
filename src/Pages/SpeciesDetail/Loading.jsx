import { Box, Typography } from "@mui/material";

export default function Loading(){
    return (
        <Box height={'100%'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
        <Typography variant="h4" textAlign={'center'}>Cargando...</Typography>
        </Box>
    )
  };
import { useTheme } from "@mui/material"
import {Container, Box, Typography} from "@mui/material";

export default function Gallery (){
    const theme = useTheme();

    const titleGarden = 'Jardin de Polinizadores del Instituto Tecnológico de Ciudad Altamirano';

    return (
    <Container maxWidth='xlg' disableGutters>
        <Box {...theme.gallery.presentation}>
            <Typography variant='h2'>{titleGarden}</Typography>
        </Box>
    </Container>
    );
};
import { useTheme } from "@mui/material"
import {Container, Box, Typography} from "@mui/material";

export default function Gallery (){
    const theme = useTheme();

    const titleGarden = 'Jardin de Polinizadores del Instituto Tecnológico de Ciudad Altamirano';

    return (
    <Container maxWidth={1} disableGutters>
        <Box {...theme.gallery.presentation}>
            <Typography variant='h1' fontSize='3rem' fontWeight={400} color='white'>{titleGarden}</Typography>
        </Box>
    </Container>
    );
};
import { useTheme } from "@mui/material"
import {Container, Box, Typography} from "@mui/material";
import GalleryCard from "../../Components/GalleryCard/GalleryCard";

export default function Gallery (){
    const theme = useTheme();

    const titleGarden = 'Jardin de Polinizadores del Instituto Tecnológico de Ciudad Altamirano';

    return (
    <Container maxWidth='xlg' disableGutters>
        <Box {...theme.gallery.presentation}>
            <Typography variant='h2'>{titleGarden}</Typography>
        </Box>
        <Box {...theme.gallery.cardBox}>
            <GalleryCard title={'Lepidoptera'} description={'Some lepidoptera'} img={'http://127.0.0.1/species/Lepidoptera.jpg'} />
            <GalleryCard title={'Lepidoptera'} description={'Some lepidoptera'} img={'http://127.0.0.1/species/Lepidoptera.jpg'} />
            <GalleryCard title={'Lepidoptera'} description={'Some lepidoptera'} img={'http://127.0.0.1/species/Lepidoptera.jpg'} />
            <GalleryCard title={'Lepidoptera'} description={'Some lepidoptera'} img={'http://127.0.0.1/species/Lepidoptera.jpg'} />
            <GalleryCard title={'Lepidoptera'} description={'Some lepidoptera'} img={'http://127.0.0.1/species/Lepidoptera.jpg'} />
            <GalleryCard title={'Lepidoptera'} description={'Some lepidoptera'} img={'http://127.0.0.1/species/Lepidoptera.jpg'} />
        </Box>
    </Container>
    );
};
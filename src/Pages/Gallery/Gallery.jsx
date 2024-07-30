import { useTheme } from "@mui/material"
import {Container, Box, Typography} from "@mui/material";
import GalleryCard from "../../Components/GalleryCard/GalleryCard";
import { useQuery } from "@tanstack/react-query";

export default function Gallery (){
    const theme = useTheme();

    const {isPending, error, data} = useQuery(
        {
            queryKey: ['galleryData'],
            queryFn: () => fetch('http://127.0.0.1:8000/species').then((res) => res.json(),),
        }
    )

    const titleGarden = 'Jardin de Polinizadores del Instituto Tecnológico de Ciudad Altamirano';
    return (
    <Container maxWidth='xlg' disableGutters>
        <Box {...theme.gallery.presentation}>
            <Typography variant='h2'>{titleGarden}</Typography>
        </Box>
        <Box {...theme.gallery.cardBox}>
            {isPending && <Typography variant="h2">Aun no hay datos.</Typography>}
            {error && <Typography variant="h2">Ha ocurrido un error al solicitar los datos del servidor.</Typography>}
            {data != undefined && error != true && data.map((card) => <GalleryCard key={card.id} title={card.species} description={card.description} img={card.img}/>)}
        </Box>
    </Container>
    );
};
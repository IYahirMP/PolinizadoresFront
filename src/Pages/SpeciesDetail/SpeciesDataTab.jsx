import {Box, Typography} from "@mui/material";
import SpeciesVisualization from "./SpeciesVisualization.jsx";
import ImageGallery from "./ImageGallery.jsx";
import { useTheme } from "@emotion/react";


export default function SpeciesDataTab ({ species, description }) {
    const theme = useTheme().speciesDetails;
  
    return (
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box>
          <Typography variant="h2" sx={{ ...theme.name }}>{species}</Typography>
          <Typography variant="body1" sx={{ ...theme.description }}>{description}</Typography>
        </Box>
        <Box sx={{ ...theme.wrap }}>
          <ImageGallery styles={ {...theme.imageSet} }/>
          <SpeciesVisualization species={species} styles={{...theme.graph}}/>
        </Box>
      </Box>
    );
  };
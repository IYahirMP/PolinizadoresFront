import { createTheme } from "@mui/material";
import { galleryStyles } from "./Pages/Gallery/GalleryStyles";
import { headerStyles } from "./Header/HeaderStyles";
import { speciesDetailStyles } from "./Pages/SpeciesDetail/SpeciesDetailStyles";
import { galleryCardStyles } from "./Components/GalleryCardStyles";

export const theme = createTheme({
    menu: headerStyles,
    gallery: galleryStyles,
    galleryCard: galleryCardStyles,
    speciesDetails: speciesDetailStyles,
  });
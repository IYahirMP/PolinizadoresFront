import { createTheme } from "@mui/material";
import { galleryStyles } from "./Pages/Gallery/GalleryStyles";
import { headerStyles } from "./Header/HeaderStyles";
import { speciesDetailStyles } from "./Pages/SpeciesDetail/SpeciesDetailStyles";

export const theme = createTheme({
    menu: headerStyles,
    gallery: galleryStyles,
    speciesDetails: speciesDetailStyles
  });
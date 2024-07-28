import { createTheme } from "@mui/material";
import { galleryStyles } from "./Pages/Gallery/GalleryStyles";
import { headerStyles } from "./Header/HeaderStyles";

export const theme = createTheme({
    menu: headerStyles,
    gallery: galleryStyles
  });
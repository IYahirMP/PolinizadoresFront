import { createTheme } from "@mui/material";
import { galleryStyles } from "./gallery/GalleryStyles";
import { headerStyles } from "./header/HeaderStyles";

export const theme = createTheme({
    menu: headerStyles,
    gallery: galleryStyles
  });
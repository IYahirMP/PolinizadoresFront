import {ImageList, ImageListItem} from "@mui/material";
import {Paper} from "@mui/material";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import Loading from "./Loading";
import Error from "./Error";

export default function ImageGallery({styles}){
    const {id} = useParams();
    const retrieveImages = (id)=>{
      return fetch(API_ENDPOINTS.SPECIES_IMAGES(id)).then((data) => data.json(),);
    }
    const {isLoading: imagesLoading, error: imageError, data: imageData, isFetching} = useQuery(
      {
        queryKey: ['speciesImage'],
        queryFn: () => retrieveImages(id)
      }
    );

    return (
        <Paper elevation={3} sx={styles}>
          {imagesLoading || isFetching ? (
            <Loading/>
          ): imageError ? (
          <Error/>
          ): imageData != undefined && (
          <ImageList variant="masonry" cols={3} gap={8}>
            {imageData[0].img.map((item) => (
              <ImageListItem key={item}>
                <img
                  srcSet={`${item}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          )}
        </Paper>
    )
}
import {Box, Typography, Paper} from "@mui/material";
import {ImageList, ImageListItem} from "@mui/material";
import { LineChart } from "@mui/x-charts";
import { useTheme } from "@emotion/react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

const Loading = () => {
  return <Box height={'100%'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
    <Typography variant="h4" textAlign={'center'}>Cargando...</Typography>
  </Box>
};

const Error = () => {
  return <Box height={'100%'} width={'100%'} display={'flex'} alignItems={'center'} justifyContent={'center'}>
    <Typography variant="h4" textAlign={'center'}>Ha ocurrido un error. </Typography>
  </Box>
};

export default function SpeciesDataTab ({ species, description }) {
    const theme = useTheme().speciesDetails;
    const {id} = useParams();

    const retrieveImages = (id)=>{
      return fetch(`http://127.0.0.1:8000/speciesImage/${id}`).then((data) => data.json(),);
    }

    const retrieveGraphData = (id) => {
      return fetch(`http://127.0.0.1:8000/graphByMonthSingleSpecies/${id}`).then((data) => data.json(),);
    }
  
    const {isLoading: imagesLoading, error: imageError, data: imageData} = useQuery(
      {
        queryKey: ['speciesImage'],
        queryFn: () => retrieveImages(id)
      }
    );

    const {isLoading: graphLoading, error: graphError, data: graphData} = useQuery({
      queryKey: ['speciesGraph'],
      queryFn: () => retrieveGraphData(id)
    });
  
    return (
      <Box display={'flex'} flexDirection={'column'} alignItems={'center'}>
        <Box>
          <Typography variant="h2" sx={{ ...theme.name }}>{species}</Typography>
          <Typography variant="body1" sx={{ ...theme.description }}>{description}</Typography>
        </Box>
        <Box sx={{ ...theme.wrap }}>
          <Paper elevation={3} sx={{ ...theme.imageSet }}>
            {imagesLoading && <Loading/>}
            {imageError && <Box>Error during image loading, please restart.</Box>}
            {imageData != undefined && !imageError && 
              <ImageList variant="masonry" cols={3} gap={8}>
              {imageData.img.map((item) => (
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
            }
            
          </Paper>
          <Paper sx={{...theme.graph}}>
            {graphLoading && <Loading/>}
            {graphError && <Error/>}
            {graphData != undefined && !graphError  && 
              <LineChart
              xAxis={[{ data: graphData.months }]}
              series={[
                {
                  data: graphData.data,
                },
              ]}
            />
            }
            
          </Paper>
        </Box>
      </Box>
    );
  };
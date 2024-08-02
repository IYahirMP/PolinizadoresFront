import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import {Paper} from "@mui/material";
import {ImageList} from "@mui/material";
import {ImageListItem} from "@mui/material";
import { Typography } from "@mui/material";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const SpeciesDataTab = ({species, description}) =>{
  const theme = useTheme().speciesDetails;

  const itemData = [
    {
      img: 'https://images.unsplash.com/photo-1549388604-817d15aa0110',
      title: 'Bed',
    },
    {
      img: 'https://images.unsplash.com/photo-1525097487452-6278ff080c31',
      title: '',
    },
    {
      img: 'https://images.unsplash.com/photo-1523413651479-597eb2da0ad6',
      title: 'Sink',
    },
    {
      img: 'https://images.unsplash.com/photo-1563298723-dcfebaa392e3',
      title: 'Kitchen',
    },
    {
      img: 'https://images.unsplash.com/photo-1588436706487-9d55d73a39e3',
      title: 'Blinds',
    },
    {
      img: 'https://images.unsplash.com/photo-1574180045827-681f8a1a9622',
      title: 'Chairs',
    },
    {
      img: 'https://images.unsplash.com/photo-1530731141654-5993c3016c77',
      title: 'Laptop',
    },
    {
      img: 'https://images.unsplash.com/photo-1481277542470-605612bd2d61',
      title: 'Doors',
    },
    {
      img: 'https://images.unsplash.com/photo-1517487881594-2787fef5ebf7',
      title: 'Coffee',
    },
    {
      img: 'https://images.unsplash.com/photo-1516455207990-7a41ce80f7ee',
      title: 'Storage',
    },
    {
      img: 'https://images.unsplash.com/photo-1597262975002-c5c3b14bbd62',
      title: 'Candle',
    },
    {
      img: 'https://images.unsplash.com/photo-1519710164239-da123dc03ef4',
      title: 'Coffee table',
    },
  ];

  return(
    <>
      <Typography variant="h2" sx={{...theme.name}}>{species}</Typography>
      <Typography variant="body1" sx={{...theme.description}}>{description}</Typography>
      <Box sx={{...theme.wrap}}>
        <Paper elevation={3} sx={{...theme.imageSet}}>
          <ImageList variant="masonry" cols={3} gap={8}>
            {itemData.map((item) => (
              <ImageListItem key={item.img}>
                <img
                  srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
                  src={`${item.img}?w=248&fit=crop&auto=format`}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Paper>
        <Paper>

        </Paper>
      </Box>
    </>
  );
};

export default function SpeciesDetail() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const {id} = useParams();
  console.log(id);

    const fetchData = () => {
        return fetch(`http://127.0.0.1:8000/species/${String(id)}`).then((res) => res.json(),);
    }

    const {isPending, error, data} = useQuery(
        {
            queryKey: ['speciesData'],
            queryFn: () => fetchData(),
        }
    )
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Informacion general" {...a11yProps(0)} />
          <Tab label="Visualizaciones" {...a11yProps(1)} />
          <Tab label="Mapa" {...a11yProps(2)} />
          <Tab label='Clasificacion' {...a11yProps(3)}></Tab>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box sx={{maxWidth:'80vw',}}>
            {isPending && <Typography variant="h2">Aun no hay datos.</Typography>}
            {error && <Typography variant="h2">Ha ocurrido un error al solicitar los datos del servidor.</Typography>}
            {(error != true && data != undefined) && <SpeciesDataTab species={data.species} description={data.description}/>}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{...theme.speciesDetails.map}}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7573.104370379918!2d-100.67698639037201!3d18.36770337550166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332c4eeb361b65%3A0x5ccd10556cf552d9!2sInstituto%20Tecnol%C3%B3gico%20de%20Cd.%20Altamirano!5e0!3m2!1ses-419!2smx!4v1722530727436!5m2!1ses-419!2smx" width="1450" height="600" border='0' allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
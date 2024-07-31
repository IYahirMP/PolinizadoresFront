import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
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

export default function SpeciesDetail() {
  const [value, setValue] = useState(0);
  const theme = useTheme();
  const {id} = useParams();

    const fetchData = () => {
        fetch(`http://127.0.0.1:8000/species/${id}`).then((res) => res.json(),);
    }

    const {isPending, error, data} = useQuery(
        {
            queryKey: ['speciesData'],
            queryFn: fetchData,
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
            <Typography variant="h2" sx={{...theme.speciesDetails.speciesTitle}}>Especie</Typography>
            <Typography variant="body1" sx={{...theme.speciesDetails.speciesDescription}}>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras dignissim est a urna dignissim varius. Mauris et ligula nisi. Quisque tincidunt semper erat, eu tristique ante hendrerit in. Fusce in porta ante. Sed sed diam orci. Fusce dignissim gravida odio. Morbi nec diam viverra, luctus mi ut, ullamcorper massa. Vestibulum malesuada tellus nibh, vel aliquet lectus molestie eget. Morbi luctus, nibh sollicitudin pretium consequat, leo dolor rhoncus sem, ullamcorper ultricies massa sem et orci. Donec libero leo, consequat eu purus sed, rutrum tincidunt tortor. Vivamus dolor est, aliquet quis eleifend ac, luctus ac mi.</Typography>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Item Two
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
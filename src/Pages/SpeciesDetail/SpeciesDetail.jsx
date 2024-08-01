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

const SpeciesDataTab = ({species, description}) =>{
  const theme = useTheme();

  return(
    <>
      <Typography variant="h2" sx={{...theme.speciesDetails.speciesTitle}}>{species}</Typography>
      <Typography variant="body1" sx={{...theme.speciesDetails.speciesDescription}}>{description}</Typography>
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
        Item Three
      </CustomTabPanel>
    </Box>
  );
}
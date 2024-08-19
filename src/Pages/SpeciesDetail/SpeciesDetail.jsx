import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { useTheme } from "@emotion/react";
import CustomTabPanel from "../../Components/Tabs/CustomTabPanel.jsx";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { Typography } from "@mui/material";
import SpeciesDataTab from "./SpeciesDataTab.jsx";
import SpeciesVisualization from "./SpeciesVisualization.jsx";
import SpeciesClassification from "./SpeciesClassification.jsx";
import API_ENDPOINTS from "../../Config/APISettings.jsx";

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function SpeciesDetail() {
  const [value, setValue] = useState(0);
  const theme = useTheme().speciesDetails;
  const { id } = useParams();

  const fetchData = (id) => {
    return fetch(API_ENDPOINTS.SPECIES_DETAIL(id)).then((res) => res.json(),);
  }

  const {error, data, isFetching, isLoading} = useQuery(
    {
      queryKey: ['speciesData'],
      queryFn: () => fetchData(id),
    }
  )
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
          <Tab label="Informacion general" {...a11yProps(0)} />
          <Tab label="Visualizaciones" {...a11yProps(1)} />
          <Tab label="Mapa" {...a11yProps(2)} />
          <Tab label='Clasificacion' {...a11yProps(3)}></Tab>
        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <Box>
          {isLoading ? (
            <Typography variant="h2">Aun no hay datos.</Typography>
          ): error ? (
            <Typography variant="h2">Ha ocurrido un error al solicitar los datos del servidor.</Typography>
          ): data != undefined && (
          <SpeciesDataTab species={data[0].species} description={data[0].description} />
          )}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>  
        <Box width={"100%"} height={"100%"}>
          {isLoading ? (
            <Typography variant="h2">Aun no hay datos.</Typography>
          ): error ? (
            <Typography variant="h2">Ha ocurrido un error al solicitar los datos del servidor.</Typography>
          ): data != undefined && (
            <SpeciesVisualization species={data[0].species} styles={{...theme.bigGraph}}/>
          )}
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={2}>
        <Box sx={{ ...theme.map }}>
          <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d7573.104370379918!2d-100.67698639037201!3d18.36770337550166!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x84332c4eeb361b65%3A0x5ccd10556cf552d9!2sInstituto%20Tecnol%C3%B3gico%20de%20Cd.%20Altamirano!5e0!3m2!1ses-419!2smx!4v1722530727436!5m2!1ses-419!2smx" width="1450" height="600" border='0' allowfullscreen loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
        </Box>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={3}>
        <Box sx={{ ...theme.map }}>
          <SpeciesClassification/>
        </Box>
      </CustomTabPanel>
    </Box>
  );
}
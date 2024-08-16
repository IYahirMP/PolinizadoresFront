import { useQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import { Graph } from "../../Components/GalleryCard/Graph/Graph";
import { useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";

export default function SpeciesVisualization({species, styles}){
    const {id} = useParams();

    const retrieveGraphData = (id) => {
        return fetch(`http://127.0.0.1:8000/graphByMonthSingleSpecies/${id}`).then((data) => data.json(),);
      }

    const {isLoading: graphLoading, error: graphError, data: graphData} = useQuery({
      queryKey: ['speciesGraph'],
      queryFn: () => retrieveGraphData(id)
    });

    return (
        <Paper sx={styles}>
            {graphLoading && <Loading/>}
            {graphError && <Error/>}
            {graphData != undefined && !graphError  && 
            <Graph
                title={`Detecciones de la especie ${species} durante el año ${graphData.year}`}
                xData={graphData.months}
                yData={graphData.data}
            />
            }
        </Paper>
    );
}
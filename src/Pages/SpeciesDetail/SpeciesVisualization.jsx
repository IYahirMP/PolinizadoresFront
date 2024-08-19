import { useQuery } from "@tanstack/react-query";
import { Paper } from "@mui/material";
import { Graph } from "../../Components/GalleryCard/Graph/Graph";
import { useParams } from "react-router-dom";
import Error from "./Error";
import Loading from "./Loading";
import API_ENDPOINTS from "../../Config/APISettings";

export default function SpeciesVisualization({species, styles}){
    const {id} = useParams();

    const retrieveGraphData = (id) => {
        return fetch(API_ENDPOINTS.SPECIES_GRAPH_MONTH(id)).then((data) => data.json(),);
      }

    const {isLoading: graphLoading, error: graphError, data: graphData, isFetching} = useQuery({
      queryKey: ['speciesGraph'],
      queryFn: () => retrieveGraphData(id)
    });

    return (
        <Paper sx={styles}>
            {(graphLoading || isFetching ) ? (
                <Loading/>
            ) : (graphError) ? (
                <Error/>
            ) : (graphData != undefined) &&(
                <Graph
                        title={`Detecciones de la especie ${species} durante el año ${graphData[0].year}`}
                        xData={graphData[0].months}
                        yData={graphData[0].data}
                    />
            )}
        </Paper>
    );
}
import * as React from 'react';
import Box from '@mui/material/Box';
import { styled, alpha } from '@mui/material/styles';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem, treeItemClasses } from '@mui/x-tree-view/TreeItem';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Loading from './Loading';
import Error from './Error';

const CustomTreeItem = styled(TreeItem)(({ theme }) => ({
    color:
        theme.palette.mode === 'light'
            ? theme.palette.grey[800]
            : theme.palette.grey[200],
    [`& .${treeItemClasses.content}`]: {
        borderRadius: theme.spacing(0.5),
        padding: theme.spacing(0.5, 1),
        margin: theme.spacing(0.2, 0),
        [`& .${treeItemClasses.label}`]: {
            fontSize: '2rem',
            fontWeight: 500,
        },
    },
    [`& .${treeItemClasses.iconContainer}`]: {
        borderRadius: '50%',
        backgroundColor:
            theme.palette.mode === 'light'
                ? alpha(theme.palette.primary.main, 0.25)
                : theme.palette.primary.dark,
        color: theme.palette.mode === 'dark' && theme.palette.primary.contrastText,
        padding: theme.spacing(0, 1.2),
    },
    [`& .${treeItemClasses.groupTransition}`]: {
        marginLeft: 30,
        paddingLeft: 38,
        borderLeft: `1px dashed ${alpha(theme.palette.text.primary, 0.4)}`,
    },
}));

const ComplexItem = ({ children, itemId, label }) => {
    return (
        <SimpleTreeView defaultExpandedItems={['grid']} expandedItems={[itemId]} selectedItems={[itemId]}>
            <CustomTreeItem itemId={itemId} label={label} autoFocus>
                {children}
            </CustomTreeItem>
        </SimpleTreeView>
    );
};

const RecursiveTree = ({hierarchy, begin}) => {
    //Esto se supone que debe comenzar en begin = 0
    if (begin === hierarchy.length - 1) {
        return <CustomTreeItem itemId={hierarchy[begin][0]} label={hierarchy[begin][1]} autoFocus/>;
    }
    
    return (
        <ComplexItem itemId={hierarchy[begin][0]} label={hierarchy[begin][1]}>
            <RecursiveTree hierarchy={hierarchy} begin={begin + 1}/>
        </ComplexItem>
    );
};

export default function SpeciesClassification() {
    const { id } = useParams();
    const fetchData = () => {
        return fetch(API_ENDPOINTS.SPECIES_CLASSIFICATION(id)).then((res) => res.json(),);
      }
    
      const {error: classError, data: classData, isFetching: classIsFetching, isLoading: classIsLoading} = useQuery(
        {
          queryKey: ['speciesClassification'],
          queryFn: () => fetchData(),
        }
      )

    let hierarchy = undefined;
    if (classData != undefined && !classError){
        hierarchy = Object.entries(classData[0]).filter(([key, value]) => key !== "id");
    }

    return (
        <Box sx={{ minHeight: '70vh', minWidth: '90vw' }}>
            {classIsLoading ? (
                <Loading/>
            ): classError ? (
                <Error/>
            ): classData != undefined && hierarchy != undefined && (
            <RecursiveTree hierarchy={hierarchy} begin={0}/>
            )}
        </Box>
    );
}

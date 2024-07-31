import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';

export default function GalleryCard({id, title, description, img}) {
    return (
        <Box sx={{ minWidth: 275, margin: '20px'}}>
            <Card variant="outlined">
                <Box width={'350px'}>
                    <CardContent sx={{display:'flex', flexWrap:'wrap', justifyContent:'center', padding:0}}>
                        <Box sx={{margin:0}}>
                            <CardMedia
                                component="img"
                                width={'100%'}
                                image={img}
                                alt="Paella dish"
                            />
                        </Box>
                        <Box sx={{textAlign:'left', margin:'5%', width:'100%'}}>
                            <Typography variant='h5' sx={{fontWeight:'bold'}}>{title}</Typography>
                        </Box>
                        
                        <Box sx={{height:'10vh', textAlign:'left', width:'100%', margin:'5%'}}>
                            <Typography variant='body2' sx={{overflowWrap:'anywhere'}}>{String(description)}</Typography>
                        </Box>
                    </CardContent>
                    <CardActions>
                        <Button size="small"><Link to={`/galeria/${String(id)}`}>Ver más</Link></Button>
                    </CardActions>
                </Box>
            </Card>
        </Box>
    );
}
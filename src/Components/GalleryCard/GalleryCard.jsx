import * as React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

export default function GalleryCard({title, description, img}) {
    return (
        <Box sx={{ minWidth: 275, margin: '20px'}}>
            <Card variant="outlined">
                <Box width={'300px'}>
                    <CardContent>
                        <Typography variant='h3'>{title}</Typography>
                        <CardMedia
                            component="img"
                            height="194"
                            image={img}
                            alt="Paella dish"
                        />
                        <Typography variant='body1'>{description}</Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small">Learn More</Button>
                    </CardActions>
                </Box>
            </Card>
        </Box>
    );
}
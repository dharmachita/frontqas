import React from 'react';
import { CircularProgress,Container,Stack } from '@mui/material';


const LoadingContainer = () => {
    return ( 
        <Container style={{justifyContent:"center",alignItems:"center",height:"70vh"}}>
            <Stack height="100%" alignItems="center" justifyContent="center">
                <CircularProgress />
            </Stack>
        </Container>        
     );
}
 
export default LoadingContainer;
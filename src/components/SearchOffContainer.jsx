import React from 'react';
import { Container,Stack } from '@mui/material';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const SearcOffContainer = ({msg="No se encontraron datos"}) => {
    return ( 
        <Container style={{justifyContent:"center",alignItems:"center",height:"70vh"}}>
            <Stack height="100%" alignItems="center" justifyContent="center">
                <SearchOffIcon fontSize="large" />
                <p style={{textAlign:"center"}}>{msg}</p>
            </Stack>
        </Container>
     );
}
 
export default SearcOffContainer;
import React from 'react';
import { Container,Stack } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

const ErrorContainer = ({msg="Ha ocurrido un error. Intente nuevamente más tarde"}) => {
    return ( 
        <Container style={{justifyContent:"center",alignItems:"center",height:"70vh"}}>
            <Stack height="100%" alignItems="center" justifyContent="center">
                <ErrorIcon fontSize="large" color="error" />
                <p style={{textAlign:"center"}}>{msg}</p>
            </Stack>
        </Container>        
     );
}
 
export default ErrorContainer;
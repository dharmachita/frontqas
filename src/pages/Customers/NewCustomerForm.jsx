import React from 'react';
// eslint-disable-next-line
import {Grid, Paper, Box, Button, Input, Select} from '@mui/material';
//import '../Styles.css';

// eslint-disable-next-line
const { Text } = Input;

//          <Text name="exampleInputPassword1" label="File input" labelPosition="above" inputType="file" help="Example block-level help text here." />
//          <Text type="success" labelPosition="above" label="Input with success" labelIcon="fas-check" placeholder="Enter ..." help="Help block with success" />
//          <Text type="warning" labelPosition="above" label="Input with warning" labelIcon="far-bell" placeholder="Enter ..." help="Help block with warning" />
//          <Text type="error" labelPosition="above" label="Input with error" labelIcon="far-times-circle" placeholder="Enter ..." help="Help block with error" />

const NewCustomerForm = () => 
(  
<>  
    <Grid>
      <Paper md={3}>
        <Box type="info">
          <div className='label-text'>Código de Cliente: <span className='code'>CD003900</span></div>
        </Box>
      </Paper>
      <Paper md={6}>
        <Box type="info">
            <Button variant="contained">Text</Button>
            <Button variant="contained">Contained</Button>
            <Button variant="outlined">Outlined</Button>   
        </Box>
      </Paper>
      {/*}
    </Grid>
    <Grid>
      <Paper md={6}>
        <Box type="primary" title="Datos generales" border>
          <Text name="name" placeholder="Ingrese Nombre y Apellido" label="Nombre y Apellido" labelPosition="above" />
          <Text name="dni" placeholder="Ingrese N° de DNI" label="DNI" labelPosition="above" inputType="number" />
          <Select />
        </Box>
        <Box type="warning" title="Adjuntos" border>
          <Text name="Fotos" label="Fotos" labelPosition="above" inputType="file" help="Fotos de la ubicación
          " />
        </Box>
      </Paper>
      <Paper md={6}>
        <Box type="success" title="Información de Contacto" border>
            <Text name="phone" placeholder="Número de Teléfono" label="Teléfono" labelPosition="above" inputType="phone"/>
            <Text name="address" placeholder="Dirección" label="Dirección" labelPosition="above" inputType="text" />
            <Select />
            <Text label="Referencia" inputType="textarea" rows={5} labelPosition="above" placeholder="Descripción de la ubicación..." />  
        </Box>
      </Paper>
      {*/}
    </Grid>
  </> 
  );
  
  export default NewCustomerForm;
import { Box } from '@mui/system';
import React from 'react';
import OrderContainer from '../../components/OrderContainer';

const Orders = () => {
    return ( 
        <div>
            <h1>Cargar Venta</h1>
            <Box sx={{display:'flex', justifyContent:'center'}}>
              <OrderContainer />
            </Box>
        </div>
     );
}
 
export default Orders;
import React from 'react';
import {Box} from '@mui/material';
import QuotaContainer from '../../components/QuotaContainer';

const OrdersQuotas = () => {
    return ( 
        <div>
            <h1>Cobro de Cuotas</h1>
            <Box sx={{display:'flex', justifyContent:'center'}}>
              <QuotaContainer />
            </Box>
        </div>
     );
}
 
export default OrdersQuotas;
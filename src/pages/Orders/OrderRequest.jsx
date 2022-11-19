import React from 'react';
import RequestEditTable from '../../components/RequestEditTable';

const OrderRequest = () => {
    return ( 
        <div>
            <h1>Pedidos</h1>
            <RequestEditTable
                urlFetch={`${process.env.REACT_APP_API_ENDPOINT}requests/`}
            />
        </div>
     );
}
 
export default OrderRequest;

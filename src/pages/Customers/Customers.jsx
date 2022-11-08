import React from 'react';
import DataTable from '../../components/DataTable';

const Customers = () => {
    return ( 
        <div>
            <h1 style={{margin:0}}>Clientes</h1>
            <DataTable
                urlFetch={`${process.env.REACT_APP_API_ENDPOINT}customers/`}
            />
        </div>
     );
}
 
export default Customers;


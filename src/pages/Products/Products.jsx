import React from 'react';
import ProductListTable from '../../components/ProductListTable';

const Products = () => {
    return ( 
        <div>
            <h1 style={{margin:0}}>Productos</h1>
                <ProductListTable
                    urlFetch={`${process.env.REACT_APP_API_ENDPOINT}products/`}
                />
        </div>
     );
}
 
export default Products;
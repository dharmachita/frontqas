import axios from 'axios';
import React, { useEffect,useState } from 'react';
import { useParams } from 'react-router-dom';
import CustomerDetail from './CustomerDetail';
import ErrorContainer from '../../components/ErrorContainer';
import SearchOffContainer from '../../components/SearchOffContainer';
import LoadingContainer from '../../components/LoadingContainer';

const CustomerDetailContainer = () => {
    const [data,setData]=useState(null);
    const [error,setError]=useState(false);
    const [isLoading,setIsLoading]=useState(true);
    const {id}=useParams();
    const url=`${process.env.REACT_APP_API_ENDPOINT}customers/${id}`;

    useEffect(()=>{
        setIsLoading(true)
        async function getUser(){
            try {
                const res = await axios.get(url);
                res.data[0].length===0
                    ?setData(null)
                    :setData(res.data[0]); 
                setError(false);              
            } catch (error) {
                setError(true)
            } finally{
                setIsLoading(false);            
            }
        }
        getUser();
    },[url])

    return (
        <div>
            <h1 style={{margin:0}}>Información del Cliente</h1>           
                {
                isLoading
                    ?
                    <LoadingContainer/>
                    :(error
                        ?
                        <ErrorContainer/>
                        :data?<CustomerDetail data={data}/>:<SearchOffContainer msg="No existe información para el cliente solicitado"/>
                    )
                }
            
        </div>
     );
}
 
export default CustomerDetailContainer;
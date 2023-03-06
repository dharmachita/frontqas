import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Results from './Results';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';

const columns = [
    { field: 'date', type:'date', headerName: 'Fecha', width: 120, disableColumnMenu:true, valueFormatter: params => 
    dayjs(params?.value).format("DD/MM/YYYY"),},
    { field: 'code', headerName: 'Código', width: 100, disableColumnMenu:true },
    { field: 'product', headerName: 'Producto', width: 250, disableColumnMenu:true }
  ];

export const CustomerActiveBuyings = ({setSelected,handleNext,id}) => {
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}customers/${id}/openorders`;

    useEffect(()=>{
        const fetchData=async()=>{
          setLoading(true);
          try{
              const res= await fetch(endpoint)
              if(!res.ok){
                  let err=new Error("Error en la petición")
                  err.status=res.status || "00";
                  err.statusText=res.statusText||"Ocurrió un error";
                  throw err;
              }            
              const json = await res.json();
              setData(json);
              setError(null);
          }catch(error){          
              setData([]);
              setError(error);                  
          }finally{
            setLoading(false)                  
          }
      };
      fetchData();
      },[endpoint]);

    return (
        <div style={{ height: 400, display:'flex', alignItems:'center'}}>
        {   loading
            ?<CircularProgress />
            :<Results 
                data={data} 
                handleNext={handleNext} 
                setSelected={setSelected} 
                columns={columns} 
                error={error}
                noDataText='El cliente no tiene ventas activas'
                newTextButton='Cargar Venta'
                url='/ventas'
            />}
        </div>
    )
}
  

import React, { useEffect, useState } from 'react';
import QuotasResults from './QuotasResults';
import dayjs from 'dayjs';
import CircularProgress from '@mui/material/CircularProgress';
import { Stack, Typography } from '@mui/material';

const columns = [
  { field: 'number', headerName: 'Nro', width: 70, disableColumnMenu:true},
  { field: 'duedate', headerName: 'Vencimiento', width: 120, disableColumnMenu:true,valueFormatter: params => 
  params&&dayjs(params?.value).format("DD/MM/YYYY")},  
  { field: 'date', type:'date', headerName: 'Fecha de Cobro', width: 120, disableColumnMenu:true, valueFormatter: params => 
  params&&dayjs(params?.value).format("DD/MM/YYYY"),editable: true},
  { field: 'value', headerName: 'Valor', width: 100, disableColumnMenu:true },
  { field: 'collector', headerName: 'Cobrador', width: 150, disableColumnMenu:true,editable: true }
];

export const CustomerPendingQuotas = ({setDisabledNext,id}) => {
  const [data, setData] = useState([]);
  // eslint-disable-next-line
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const endpoint = `${process.env.REACT_APP_API_ENDPOINT}orders/${id}/quotas`;
  
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
      <Stack>
        {
        loading
        ?<CircularProgress />
        :<QuotasResults 
          data={data} 
          columns={columns}
          setTotal={setTotal}
          total={total}
          setDisabledNext={setDisabledNext}
        />
        }
        <Typography sx={{ mt: 2, mb: 1 }}>
          Total a Cobrar:<b> ${total}</b>
        </Typography>
      </Stack>
  )
}

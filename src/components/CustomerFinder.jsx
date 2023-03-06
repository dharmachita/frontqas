import React,{useState,useEffect} from 'react';
import {OutlinedInput,InputAdornment,IconButton,FormControl} from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import SearchIcon from '@mui/icons-material/Search';
import { Stack } from '@mui/system';
import Results from './Results';

const columns = [
    { field: 'code', headerName: 'Código', width: 100, disableColumnMenu:true },
    { field: 'name', headerName: 'Nombre', width: 300, disableColumnMenu:true },
    { field: 'dni', headerName: 'DNI', width: 100, disableColumnMenu:true }
  ];

export default function CustomerFinder({handleNext,setSelected}){
    const [search, setSearch] = useState("");
    const [data, setData] = useState([]);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);
    const endpoint = `${process.env.REACT_APP_API_ENDPOINT}customers/select`;

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
    
    const handleChange=(e)=>{
        setSearch(e.target.value);
    }
          
    const results = search.length<5 
        ? [] : 
        data.filter( (val)=> val.name.toLowerCase().includes(search.toLocaleLowerCase()) 
        || val.code.toLowerCase().includes(search.toLocaleLowerCase())
        || (val.dni&&val.dni.toLocaleLowerCase().includes(search.toLocaleLowerCase())) )
  
    return (
        <Stack sx={{ alignItems:'center' }}>
        <FormControl sx={{ m: 1, width: '50ch' }} variant="outlined">
            <OutlinedInput
                placeholder="Buscar por Nombre, DNI o Código" 
                name="customerSearch"
                id="customerSearch"
                value={search}
                onChange={handleChange}
                endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="search"
                        edge="end"
                        disabled
                    >
                        <SearchIcon />
                    </IconButton>
                </InputAdornment>}
            />
        </FormControl>
        {search.length>=5&&
        <div style={{ height: 400, display:'flex', alignItems:'center'}}>
            {loading?
            <CircularProgress />:
            <Results 
                data={results} 
                handleNext={handleNext} 
                setSelected={setSelected} 
                columns={columns} 
                error={error}
                noDataText='Cliente No Encontrado'
                newTextButton='Crear Cliente'
                url='/clientes/nuevo'
            />}
        </div>
        }
        </Stack>
    )
}


import React,{useCallback,useEffect,useMemo,useState} from 'react';
import {Box,Paper,Grid} from '@mui/material';
import { DataGrid, esES, GridActionsCellItem, GridToolbarContainer, GridToolbarExport,gridClasses  } from '@mui/x-data-grid';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import ErrorIcon from '@mui/icons-material/Error';
import ResponsiveDialog from './ResponsiveDialog';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { alpha, Stack, styled } from '@mui/material';
import {Link,useRouteMatch} from 'react-router-dom';

const ODD_OPACITY = 0.2;

const StripedDataGrid = styled(DataGrid)(({ theme }) => ({
  [`& .${gridClasses.row}.even`]: {
    backgroundColor: theme.palette.grey[200],
    '&:hover, &.Mui-hovered': {
      backgroundColor: alpha(theme.palette.primary.main, ODD_OPACITY),
      '@media (hover: none)': {
        backgroundColor: 'transparent',
      },
    },
    '&.Mui-selected': {
      backgroundColor: alpha(
        theme.palette.primary.main,
        ODD_OPACITY + theme.palette.action.selectedOpacity,
      ),
      '&:hover, &.Mui-hovered': {
        backgroundColor: alpha(
          theme.palette.primary.main,
          ODD_OPACITY +
            theme.palette.action.selectedOpacity +
            theme.palette.action.hoverOpacity,
        ),
        // Reset on touch devices, it doesn't add specificity
        '@media (hover: none)': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            ODD_OPACITY + theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  },
}));

function CustomToolbar() {
  return (
    <GridToolbarContainer>
      <GridToolbarExport printOptions={{ disableToolbarButton: true }} />
    </GridToolbarContainer>
  );
}

export default function DataTable({urlFetch}) {
    let {url}=useRouteMatch();
    const [data,setData]=useState([]);
    const [error,setError]=useState(null);
    const [loading, setLoading]=useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [dataModal, setDataModal] = useState({});
    let endpointDelete=`${process.env.REACT_APP_API_ENDPOINT}customers/${dataModal.id}`
    const contentText=`¿Está seguro que desea eliminar al cliente: ${dataModal.name}?`
        
    useEffect(()=>{
      const fetchData=async()=>{
        setLoading(true);
        try{
            const res= await fetch(urlFetch)
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
    },[urlFetch]);

    
    const deleteCustomer = useCallback(
      (params) => () => {
        setOpenModal(true);
        setDataModal(params.row);
      },
      [],
    );

    const columns = useMemo(
      () =>
      [
        { field: 'code', headerName: 'Código', width: 150 },
        {
          field: 'name',
          headerName: 'Nombre y Apellido',
          width: 250
        },
        {
          field: 'dni',
          headerName: 'DNI',
          minWidth: 150
        },
        {
          field: 'status',
          headerName: 'Estado',
          minWidth: 150
        },
        {
          field: 'qualification',
          headerName: 'Calificación',
          minWidth: 150
        },
        {
          field: 'city',
          headerName: 'Localidad',
          minWidth: 250
        },
        {
          field: 'phone',
          headerName: 'Teléfono',
          minWidth: 150
        },
        {
          field: 'actions',
          type: 'actions',
          width: 100,
          getActions: (params) => [
            <GridActionsCellItem
            icon={<RemoveRedEyeIcon />}
            component={Link}
            to={`${url}/${params.id}`}
            label="Ver Más..."
            />,
            <GridActionsCellItem
            icon={<EditIcon />}
            label="Editar Cliente"
            component={Link}
            to={`${url}/editar/${params.id}`}
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar Cliente"
              onClick={deleteCustomer(params)}
            />,
          ],
        },
      ],[deleteCustomer,url],
    );

    return (
      <>
      <Grid>
      <Paper>
        <Box sx={{ width: '100%', height:'70vh'}}>
        <StripedDataGrid
            rows={data}
            columns={columns}
            rowsPerPageOptions={[50,100]}
            disableSelectionOnClick
            experimentalFeatures={{ newEditingApi: true }}
            localeText={esES.components.MuiDataGrid.defaultProps.localeText}
            loading={loading}
            error={error}
            components={{
              NoRowsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  La tabla seleccionada no contiene elementos.
                </Stack>
              ),
              Toolbar: CustomToolbar,
              NoResultsOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  <SearchOffIcon fontSize="large" />
                  No se encontraron resultados para la búsqueda dada.
                </Stack>
              ), 
              ErrorOverlay: () => (
                <Stack height="100%" alignItems="center" justifyContent="center">
                  <ErrorIcon fontSize="large" color="error" />
                  Ha ocurrido un error. Intente más tarde.
                </Stack>
              )
            }}
            getRowClassName={(params) =>
              params.indexRelativeToCurrentPage % 2 === 0 ? 'even' : 'odd'
            }            
        />
        </Box>
        <ResponsiveDialog 
          open={openModal} 
          setOpen={setOpenModal} 
          rowData={dataModal}
          setData={setData}
          endpoint={endpointDelete}
          contentText={contentText}
          errorMsg="Ocurrió un error. El cliente no fue eliminado."
          successMsg="Cliente eliminado con éxito."
        />
      </Paper>
      </Grid>
      </>  
    );
}



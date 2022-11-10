import React,{useCallback,useMemo,useState,useEffect} from 'react';
import {Box,Paper,Grid} from '@mui/material';
import { DataGrid, esES, GridActionsCellItem, GridToolbarContainer, GridToolbarExport,gridClasses  } from '@mui/x-data-grid';
import FeaturedPlayListIcon from '@mui/icons-material/FeaturedPlayList';
//import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
//import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import ErrorIcon from '@mui/icons-material/Error';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import { alpha, Stack, styled } from '@mui/material';
import Modal from '../utils/Modal';
import ImagenesContainer from './ImagenesContainer';
import DeleteIcon from '@mui/icons-material/Delete';
//import EditIcon from '@mui/icons-material/Edit';
//import CuotasModal from './CuotasModal';
import ResponsiveDialog from './ResponsiveDialog';

//datos de prueba
import request from '../testdata/requests.json';

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

export default function ProductListTable({urlFetch}) {
    const [data,setData]=useState(request.requests);
    // eslint-disable-next-line
    const [error,setError]=useState(null);
    // eslint-disable-next-line
    const [loading, setLoading]=useState(false);
    const [open,setOpen]=useState(false);
    // eslint-disable-next-line
    const [modal,setModal]=useState({});
    const [openConfirm,setOpenConfirm]=useState(false);
    const [dataConfirm,setDataConfirm]=useState({});
    const contentText=`¿Está seguro que desea eliminar el pedido?`
    let endpointDelete=`${process.env.REACT_APP_API_ENDPOINT}requests/${dataConfirm.id}`

  console.log(data);
        
/*     useEffect(()=>{
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
    },[urlFetch]); */
/*
  const handleDescription = useCallback(
    (params) => () => {
      setModal({
        type:0,
        title:"Descripción el Producto",
        content:params.row.description          
      });
      setOpen(true);        
  }, [])

  const handleImg = useCallback(
    (params) => () => {
      setModal({
        type:1,
        title:"Imágenes del Producto",
        //content:params.row.img
        content:[]          
      });
      setOpen(true);        
  }, [])
*/
  const handleUpdate = useCallback(
    (params) => () => {
      /*setModal({
        type:3,
        title:"Financiación",
        content:params.row.cuotas          
      });
      setOpen(true);*/        
  }, [])

  const handleEliminar = useCallback(
    (params) => () => {
      setOpenConfirm(true);
      setDataConfirm(params.row);
    },
    [],
  );

  const SwitchDataModal=()=>{
      switch (modal.type) {
        case 0:
           return (modal.content
                    ?<p>{modal.content}</p>
                    :<p>El producto no tiene descripción</p>); 
        case 1:  
           return (modal.content.length!==0
                    ?<ImagenesContainer url={modal.content}/>
                    :<p>El producto no tiene imágenes</p>);                                 
        default:
          return "Opción no elegida";
      }
  };

    const columns = useMemo(
      () =>
      [
        { field: 'codeCustomer', headerName: 'Cod Cliente', width: 150 },
        {
          field: 'name',
          headerName: 'Cliente',
          width: 250
        },
        {
          field: 'codeProd',
          headerName: 'Cod Producto',
          minWidth: 150
        },
        {
          field: 'product',
          headerName: 'Producto',
          minWidth: 150
        },
        {
          field: 'quantity',
          headerName: 'Cantidad',
          minWidth: 150
        },
        {
          field: 'deliveryDate',
          headerName: 'Fecha Entrega',
          minWidth: 150
        },
        {
          field: 'status',
          headerName: 'Estado',
          minWidth: 150,
          editable: true
        },
        {
          field: 'actions',
          type: 'actions',
          width: 300,
          getActions: (params) => [
            <GridActionsCellItem
              icon={<FeaturedPlayListIcon />}
              onClick={handleUpdate(params)}
              label="Actualizar"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Eliminar"
              onClick={handleEliminar(params)}
            />,
          ],
        },
      ],[handleUpdate,handleEliminar],
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
                  La tabla no contiene elementos.
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
        {/* Modales */}
        <Modal 
            open={open}
            setOpen={setOpen}
            title={modal.title}
          >
          <SwitchDataModal />
        </Modal>

        <ResponsiveDialog 
          open={openConfirm} 
          setOpen={setOpenConfirm}
          setData={setData}
          rowData={dataConfirm}
          endpoint={endpointDelete}
          contentText={contentText}
          errorMsg="Ocurrió un error. El pedido no fue eliminado."
          successMsg="Pedido eliminado con éxito."
        />
      </Paper>
      </Grid>
      </>  
    );
}

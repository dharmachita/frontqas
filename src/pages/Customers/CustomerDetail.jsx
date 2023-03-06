import React,{useState} from 'react';
import { Grid, Paper } from '@mui/material';
import CustomerOrderDetail from './CustomersOrderDetail';
import Modal from '../../utils/Modal';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ZoomOutMapIcon from '@mui/icons-material/ZoomOutMap';
import ImagenesContainer from '../../components/ImagenesContainer';

//styles
import './CustomerDetail.css'
import Map from '../../components/Map';

const CustomerDetail = ({data}) => {
    const [open,setOpen]=useState(false);
    const [modal,setModal]=useState({});
    let datos = data[0];
    const imgs = data[1];
    datos.latitude=-26.818587;
    datos.longitud=-55.022501;
    console.log(data);


    const handleMap=()=>{
        setModal({
          type:0,
          title:"Ubicación del cliente",
          content:""             
        });
        setOpen(true);
    }

    const handleImg=()=>{
        setModal({
          type:1,
          title:"Fotos del domicilio del cliente",
          content:""             
        });
        setOpen(true);        
    }
    const handleReference=()=>{
        setModal({
          type:2,
          title:"Referencia de domicilio",
          content:datos.reference           
        });
        setOpen(true);        
  }


    const SwitchDataModal=()=>{
        switch (modal.type) {
          case 0:
            return (datos.latitude.length!==0&&datos.longitud.length!==0
                      ?<Map lat={datos.latitude} lng={datos.longitud} />
                      :<p>El cliente no tiene registro de ubicación</p>);
          case 1:  
            return (imgs
                      ?<ImagenesContainer url={imgs}/>
                      :<p>El cliente no tiene fotos del domicilio</p>);                      
          case 2:
            return (datos.reference
                      ?<p>{datos.reference}</p> 
                      :<p>El cliente no tiene registro de ubicación</p>);
          default:
            return "Opción no elegida";
        }
    };

    return ( 
        <div>
            <h2 style={{marginTop:0,marginBottom:"0.83em",color:"rgb(0,0,0,0.5)",fontWeight:500}}><b>{datos.code} - {datos.name}</b></h2>
            <Grid container spacing={3}>
              {/* General Info */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <h3>Información General</h3>
                  <p><b>DNI: </b>{datos.dni}</p>
                  <p><b>Estado: </b><span className={datos.status==='Activo'?'good':'bad'}>{datos.status}</span></p>
                  <p><b>Calificación: </b><span className={datos.sysqual==='003-Buen Cliente'?'good':datos.sysqual==='002-Cliente Medio'?'medium':'bad'}>{datos.sysqual}</span></p>
                  <p><b>Último Cobrador: </b></p>
                </Paper>
              </Grid>
              {/* Contact Info */}
              <Grid item xs={12} md={6}>
                <Paper
                  sx={{
                    p: 2,
                    display: 'flex',
                    flexDirection: 'column'
                  }}
                >
                  <h3>Contacto</h3>
                  <p><b>Teléfono: </b>{datos.phone}</p>
                  <p><b>Dirección: </b>{datos.address}</p>
                  <p><b>Ciudad: </b>{datos.city}</p>
                  <p>
                    <span className='classicLink' onClick={()=>handleReference()}>
                        {`Ver Referencia`}
                        {/* <ZoomOutMapIcon fontSize="small" color="success" /> */}
                    </span>
                    <span className='classicLink' onClick={()=>handleMap()}>
                        {/*`Abrir Ubicación`*/}
                        <LocationOnIcon  fontSize="small" color="error" />                 
                    </span><span className='classicLink' onClick={()=>handleImg()}>
                        {/*`Ver Fotos`*/}
                        <ZoomOutMapIcon fontSize="small" color="success" />
                    </span>
                  </p>                
                </Paper>
              </Grid>
              {/* Orders */}
              <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', paddingBottom:"2px" }}>
                <h3>Compras</h3>
                </Paper>
                <CustomerOrderDetail />
              </Grid>
        </Grid>
        <Modal 
            open={open}
            setOpen={setOpen}
            title={modal.title}
        >
            <SwitchDataModal />
        </Modal>
        </div> 
    );
}
 
export default CustomerDetail;

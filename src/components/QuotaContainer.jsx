import React,{useState} from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import {Button,Paper} from '@mui/material';
import Typography from '@mui/material/Typography';
import CustomerFinder from './CustomerFinder';
import { CustomerActiveBuyings } from './CustomerActiveBuyings';
import { CustomerPendingQuotas } from './CustomerPendingQuotas';
import ResponsiveDialog from './ResponsiveDialog';

const steps = ['Buscar Cliente', 'Seleccionar Venta', 'Cobrar Cuota'];

export default function QuotaContainer() {
  const [activeStep, setActiveStep] = useState(0);
  const [disabledNext, setDisabledNext] = useState(true);
  const [selected, setSelected] = useState([])
  const [orderid, setOrderId] = useState();
  const [open, setOpen] = useState(false);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setDisabledNext(true)
  };

  const handleFinish = () => {
    setOpen(true);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Paper sx={{ width: '70%',display:'flex', justifyContent:'center', height:'600px'}}>
    {/*Paper & Box to container the whole component*/}  
    <Box sx={{ width: '100%', margin:2, height:'100%' }}>
      <Stepper activeStep={activeStep}>
        {steps.map((label, index) => {
          const stepProps = {};
          const labelProps = {};
          return (
            <Step key={label} {...stepProps}>
              <StepLabel {...labelProps}>{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {/*Step Conditional Render*/}
      {activeStep === steps.length ? (
        <React.Fragment>
          {/*Final Step*/}
          <Typography sx={{ mt: 2, mb: 1 }}>
            El cobro de las cuotas se realizó correctamente! {/*gestionar error si api devuelve un problema*/}
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleReset}>Volver</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {/*Inside Steps*/}
          <Box sx={{ height:500,display:'flex', justifyContent:'center', pt: 2 }}>
                {activeStep===0&&<CustomerFinder handleNext={handleNext} setSelected={setSelected}/>}
                {activeStep===1&&<CustomerActiveBuyings handleNext={handleNext} setSelected={setOrderId} id={selected}/>}
                {activeStep===2&&<CustomerPendingQuotas setDisabledNext={setDisabledNext} id={orderid}/>}
          </Box>
          {/*Bottom Navigation Buttons*/}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button color="inherit" disabled={activeStep === 0} onClick={handleReset} sx={{ mr: 1 }}>
            {activeStep > 0 && 'Volver'}
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button onClick={handleFinish} disabled={disabledNext}>
              {activeStep === steps.length - 1 && 'Finalizar'}
            </Button>
          </Box>
        </React.Fragment>
      )}
      </Box>
      <ResponsiveDialog 
        open={open}
        setOpen={setOpen}
        rowData={''}
        setData={''}
        endpoint=''
        contentText="Confirma que desea cobrar las cuotas: 4, 5 y 6 con un total de $8685.99"
        errorMsg="No se pudo hacer lo que se iba a hacer"
        successMsg="Lo que se tenía que hacer se hizo correctamente"
      />
    </Paper>
  );
}
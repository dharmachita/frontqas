import React,{useState} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import MessageSnackbar from '../utils/SnackBar';
import axios from 'axios';

export default function ResponsiveDialog({open,setOpen,rowData,setData,endpoint,contentText,errorMsg,successMsg}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
  const [errorDel, setErrorDel] = useState(false);
  const [stateSnack, setStateSnack] = useState(false);
 
  const handleClose = () => {
    setOpen(false);
  };
  const handleAccept = () => { 

    axios.delete(endpoint)
      .then(res=>{
        setData((prevRows) => prevRows.filter((row) => row.id !== rowData.id));
        setErrorDel(false);
      })
      .catch(err=>{
        setErrorDel(true);
      })
      .then(()=>{
        setStateSnack(true);
        setOpen(false);
      })
  };

  return (
    <div>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Atención"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            {contentText}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Cancelar
          </Button>
          <Button onClick={handleAccept} autoFocus color="error">
            Aceptar
          </Button>
        </DialogActions>
      </Dialog>
      <MessageSnackbar 
        msg={errorDel?errorMsg:successMsg}
        type={errorDel?'error':'success'}
        setState={setStateSnack}
        state={stateSnack}
      />
    </div>
  );
}

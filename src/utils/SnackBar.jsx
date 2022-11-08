import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function MessageSnackbar({msg,type,setState,state}) {
  const vertical='top';
  const horizontal='center';

  const handleClose = () => {
    setState(false);
  };

return (
    <div>
        <Snackbar
            anchorOrigin={{vertical, horizontal}}
            autoHideDuration={6000}
            open={state}
            onClose={handleClose}
            key={vertical + horizontal}
        >
            <Alert onClose={handleClose} severity={type} sx={{ width: '100%' }}>
                {msg}
            </Alert>
        </Snackbar>
    </div>
  );
}


import React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { TimePicker as MuiTP } from '@mui/x-date-pickers/TimePicker';


const TimePicker = () => {
    //definido en el padre
    const [value, setValue] = React.useState(dayjs(new Date()));

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiTP
              label="Hora"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
       </LocalizationProvider>
    )
}
 
export default TimePicker;



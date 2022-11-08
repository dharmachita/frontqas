import React from 'react';
import dayjs from 'dayjs';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker as MuiDTP } from '@mui/x-date-pickers/DateTimePicker';


const DateTimePicker = () => {
    //definido en el padre
    const [value, setValue] = React.useState(dayjs(new Date()));

    const handleChange = (newValue) => {
      setValue(newValue);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MuiDTP
              label="Fecha y Hora"
              inputFormat="DD/MM/YYYY"
              value={value}
              onChange={handleChange}
              renderInput={(params) => <TextField {...params} />}
            />
       </LocalizationProvider>
    )
}
 
export default DateTimePicker;



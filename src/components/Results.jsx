import React from 'react';
import { DataGrid,esES } from '@mui/x-data-grid';
import { Button, Stack } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';
import SearchOffIcon from '@mui/icons-material/SearchOff';
import {Link} from 'react-router-dom';

export default function Results({data,handleNext,setSelected,columns,error,noDataText,newTextButton,url}) {
  
  const handleSelect=(newSelectionModel)=>{
    setSelected(newSelectionModel);
    newSelectionModel>0&&handleNext();
  }

  return (
    <div style={{ height: 400, width: '60ch' }}>
      {
      error&&          
        <Stack height="100%" alignItems="center" justifyContent="center">
          <ErrorIcon fontSize="large" color="error" />
          Ha ocurrido un error. Intente más tarde.
        </Stack>
      }
      {
      data.length===0&&!error&&        
      <Stack height="100%" alignItems="center" justifyContent="center">
        <SearchOffIcon fontSize="large" />
          {noDataText}
        <Button 
          component={Link}
          to={url}>
            {newTextButton}
        </Button> 
      </Stack>
      }
      {
      data.length>0&&  
        <DataGrid
          rows={data}
          columns={columns}
          pageSize={5}
          error={error}
          rowsPerPageOptions={[5]}
          onSelectionModelChange={(newSelectionModel) => {
            handleSelect(newSelectionModel);
          }}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}       
        />
      }
    </div>
  );
}
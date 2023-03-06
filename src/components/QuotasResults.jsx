import React from 'react';
import { DataGrid,esES } from '@mui/x-data-grid';
import { Stack } from '@mui/material';
import ErrorIcon from '@mui/icons-material/Error';

export default function QuotasResults({data,columns,error,setTotal,setDisabledNext}) {
  
  
  const handleSelect=(newSelectionModel)=>{
    setTotal(data.filter(item => newSelectionModel.some(s => s === item.id)).reduce((partialSum, a) => partialSum + a.value, 0));
    newSelectionModel.length>0?setDisabledNext(false):setDisabledNext(true);
  }
  
  
  return (
    <div style={{ height: 450, width: '70ch' }}>
      {
      (error||data.length===0)&&        
        <Stack height="100%" alignItems="center" justifyContent="center">
          <ErrorIcon fontSize="large" color="error" />
          Ha ocurrido un error. Intente más tarde.
        </Stack>
      }
      {
      data.length>0&&  
        <DataGrid
          rows={data}
          columns={columns}
          checkboxSelection
          disableSelectionOnClick
          pageSize={6}
          onSelectionModelChange={(newSelectionModel) => {
            handleSelect(newSelectionModel);
          }}
          //error={error}
          rowsPerPageOptions={[6]}
          localeText={esES.components.MuiDataGrid.defaultProps.localeText}  
          isRowSelectable={(params) => params.row.status !== 1} 
          isCellEditable={(params) => params.row.status !== 1}  
          experimentalFeatures={{ newEditingApi: true }}  
        />
      }
    </div>
  );
}
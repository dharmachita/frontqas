/* 
import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import Snackbar from '@mui/material/Snackbar';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import dayjs from 'dayjs';

const useFakeMutation = () => {
  return React.useCallback(
    (user) =>
      new Promise((resolve, reject) =>
        setTimeout(() => {
          if (user.name?.trim() === '') {
            reject();
          } else {
            resolve(user);
          }
        }, 200),
      ),
    [],
  );
};

function computeMutation(newRow, oldRow) {
  if (newRow.collector !== oldRow.collector) {
    return `Collector from '${oldRow.collector}' to '${newRow.collector}'`;
  }
  if (newRow.date !== oldRow.date) {
    return `Date from '${oldRow.date || ''}' to '${newRow.date || ''}'`;
  }
  return null;
}

export default function AskConfirmationBeforeSave() {
  const mutateRow = useFakeMutation();
  const noButtonRef = React.useRef(null);
  const [promiseArguments, setPromiseArguments] = React.useState(null);

  const [snackbar, setSnackbar] = React.useState(null);

  const handleCloseSnackbar = () => setSnackbar(null);

  const processRowUpdate = React.useCallback(
    (newRow, oldRow) =>
      new Promise((resolve, reject) => {
        const mutation = computeMutation(newRow, oldRow);
        if (mutation) {
          // Save the arguments to resolve or reject the promise later
          setPromiseArguments({ resolve, reject, newRow, oldRow });
        } else {
          resolve(oldRow); // Nothing was changed
        }
      }),
    [],
  );

  const handleNo = () => {
    const { oldRow, resolve } = promiseArguments;
    resolve(oldRow); // Resolve with the old row to not update the internal state
    setPromiseArguments(null);
  };

  const handleYes = async () => {
    const { newRow, oldRow, reject, resolve } = promiseArguments;

    try {
      // Make the HTTP request to save in the backend
      const response = await mutateRow(newRow);
      setSnackbar({ children: 'User successfully saved', severity: 'success' });
      resolve(response);
      setPromiseArguments(null);
    } catch (error) {
      setSnackbar({ children: "Name can't be empty", severity: 'error' });
      reject(oldRow);
      setPromiseArguments(null);
    }
  };

  const handleEntered = () => {
    // The `autoFocus` is not used because, if used, the same Enter that saves
    // the cell triggers "No". Instead, we manually focus the "No" button once
    // the dialog is fully open.
    // noButtonRef.current?.focus();
  };

  const renderConfirmDialog = () => {
    if (!promiseArguments) {
      return null;
    }

    const { newRow, oldRow } = promiseArguments;
    const mutation = computeMutation(newRow, oldRow);

    return (
      <Dialog
        maxWidth="xs"
        TransitionProps={{ onEntered: handleEntered }}
        open={!!promiseArguments}
      >
        <DialogTitle>Confirmación</DialogTitle>
        <DialogContent dividers>
          {`Pressing 'Yes' will change ${mutation}.`}
        </DialogContent>
        <DialogActions>
          <Button ref={noButtonRef} onClick={handleNo}>
            No
          </Button>
          <Button onClick={handleYes}>Yes</Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div style={{ height: 400, width: '100%' }}>
      {renderConfirmDialog()}
      <DataGrid
        rows={rows}
        columns={columns}
        processRowUpdate={processRowUpdate}
        experimentalFeatures={{ newEditingApi: true }}
      />
      {!!snackbar && (
        <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000}>
          <Alert {...snackbar} onClose={handleCloseSnackbar} />
        </Snackbar>
      )}
    </div>
  );
}

*/

import * as React from 'react';
import Box from '@mui/material/Box';
import CancelIcon from '@mui/icons-material/Close';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
  GridRowModes,
  DataGrid,
  GridActionsCellItem,
  esES,
} from '@mui/x-data-grid';
import {
  randomCreatedDate,
  randomTraderName,
  randomUpdatedDate,
} from '@mui/x-data-grid-generator';
import dayjs from 'dayjs';

const initialRows = [
  {
    id: 1,
    number: 1,
    value: 25,
    duedate: randomCreatedDate(),
    date: randomUpdatedDate(),
    collector:randomTraderName(),
    status:1
  },
  {
    id: 2,
    number: 2,
    value: 36,
    duedate: randomCreatedDate(),
    date: randomUpdatedDate(),
    collector:randomTraderName(),
    status:1
  },
  {
    id: 3,
    number: 3,
    value: 19,
    duedate: randomCreatedDate(),
    date: randomUpdatedDate(),
    collector:randomTraderName(),
    status:0
  },
  {
    id: 4,
    number: 4,
    value: 28,
    duedate: randomCreatedDate(),
    date: '',
    collector:randomTraderName(),
    status:0
  },
  {
    id: 5,
    number: 5,
    value: 23,
    duedate: randomCreatedDate(),
    date:'',
    collector:randomTraderName(),
    status:0
  },
];


export default function FullFeaturedCrudGrid() {
  const [rows, setRows] = React.useState(initialRows);
  const [rowModesModel, setRowModesModel] = React.useState({});

  const handleRowEditStart = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleRowEditStop = (params, event) => {
    event.defaultMuiPrevented = true;
  };

  const handleEditClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.Edit } });
  };

  const handleSaveClick = (id) => () => {
    setRowModesModel({ ...rowModesModel, [id]: { mode: GridRowModes.View } });
  };

  const handleCancelClick = (id) => () => {
    setRowModesModel({
      ...rowModesModel,
      [id]: { mode: GridRowModes.View, ignoreModifications: true },
    });

    const editedRow = rows.find((row) => row.id === id);
    if (editedRow.isNew) {
      setRows(rows.filter((row) => row.id !== id));
    }
  };

  const columns = [
    { field: 'number', headerName: 'Nro', width: 70, disableColumnMenu:true},
    { field: 'duedate', headerName: 'Vencimiento', width: 120, disableColumnMenu:true,valueFormatter: params => 
    params.value&&dayjs(params?.value).format("DD/MM/YYYY")},  
    { field: 'date', type:'date', headerName: 'Fecha de Cobro', width: 120, disableColumnMenu:true, valueFormatter: params => 
    params.value&&dayjs(params?.value).format("DD/MM/YYYY"),editable: true},
    { field: 'value', headerName: 'Valor', width: 100, disableColumnMenu:true },
    { field: 'collector', headerName: 'Cobrador', width: 150, disableColumnMenu:true,editable: true },
    {
        field: 'actions',
        type: 'actions',
        headerName: 'Cobrar',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          const isInEditMode = rowModesModel[id]?.mode === GridRowModes.Edit;
          const row = rows.filter(row=>row.id===id)
          if (isInEditMode) {
            return [
              <GridActionsCellItem
                icon={<CheckCircleIcon />}
                label="Save"
                onClick={handleSaveClick(id)}
                color="inherit"
              />,
              <GridActionsCellItem
                icon={<CancelIcon />}
                label="Cancel"
                className="textPrimary"
                onClick={handleCancelClick(id)}
                color="inherit"
              />,
            ];
          }

          return [
            <GridActionsCellItem
              icon={<CurrencyExchangeIcon />}
              label="Edit"
              style={row[0].status===1 ? { display:'none'} : {}}
              className="textPrimary"
              onClick={handleEditClick(id)}
              color="inherit"
            />
          ];
        },
      },
  ];

  const processRowUpdate = (newRow) => {
    const updatedRow = { ...newRow, isNew: false };
    setRows(rows.map((row) => (row.id === newRow.id ? updatedRow : row)));
    return updatedRow;
  };

  return (
    <Box
      sx={{
        height: 500,
        width: '100%',
        '& .actions': {
          color: 'text.secondary',
        },
        '& .textPrimary': {
          color: 'text.primary',
        },
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        editMode="row"
        disableSelectionOnClick
        rowModesModel={rowModesModel}
        onRowModesModelChange={(newModel) => setRowModesModel(newModel)}
        onRowEditStart={handleRowEditStart}
        onRowEditStop={handleRowEditStop}
        processRowUpdate={processRowUpdate}
        componentsProps={{
          toolbar: { setRows, setRowModesModel },
        }}
        experimentalFeatures={{ newEditingApi: true }}
        localeText={esES.components.MuiDataGrid.defaultProps.localeText}  
        isCellEditable={(params) => params.row.status !== 1}  
        isRowSelectable={(params) => params.row.status !== 1} 
      />
    </Box>
  );
}

import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(producto, total, pagadas, valor, vencimiento,cobrador,vendedor,status) {
  return { producto, total, pagadas, valor, vencimiento,cobrador,vendedor,status};
}

const rows = [
  createData('Producto 1', 12, 10, '$2400', '25/10/2022','Venededor 1','Cobrador 1','En Curso'),
  createData('Producto 2', 18, 18, '$3700', 'N/A','Venededor 1','Cobrador 1','Finalizado'),
  createData('Producto 3', 6, 6, '$2500', 'N/A','Venededor 2','Cobrador 1','Finalizado'),
  createData('Producto 4', 6, 6, '$670', 'N/A','Venededor 1','Cobrador 1','Finalizado'),
  createData('Producto 5', '-', '-', '$4900', 'N/A','Venededor 2','Cobrador 1','Finalizado'),
];

export default function CustomerOrderDetail() {
  return (
    <TableContainer component={Paper} style={{paddingBottom:"24px"}}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Producto</TableCell>
            <TableCell>Cuotas Totales</TableCell>
            <TableCell>Cuotas Pagadas</TableCell>
            <TableCell>Valor Cuota</TableCell>
            <TableCell>Próximo Vencimiento</TableCell>
            <TableCell>Vendedor</TableCell>
            <TableCell>Cobrador</TableCell>
            <TableCell>Estado</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{row.producto}</TableCell>
              <TableCell>{row.total}</TableCell>
              <TableCell>{row.pagadas}</TableCell>
              <TableCell>{row.valor}</TableCell>
              <TableCell>{row.vencimiento}</TableCell>
              <TableCell>{row.cobrador}</TableCell>
              <TableCell>{row.vendedor}</TableCell>
              <TableCell>{row.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
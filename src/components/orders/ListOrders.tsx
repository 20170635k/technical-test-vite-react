import { useEffect, useState } from "react";
import OrderService from "../../core/services/Order.service";
import { IOrderResponseDetail } from "../../utils/interfaces/order.interface";
import { NavLink, useNavigate } from "react-router-dom";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {
  IOrder,
  IOrderTableView,
} from "../../utils/interfaces/order.interface";

//dialog delete

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";


// form
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { sumTotalOrders } from "../../utils/functions/product.functions";

function ListOrders() {
  const [orders, setOrders] = useState<IOrderTableView[]>([]);
  const [indexDelete, setIndexDelete] = useState<number>(0);
  const [dialogDelete, setDialogDelete] = useState<boolean>(false);

  let navigate = useNavigate();

  const handleDelete = (index: number) => {
    setIndexDelete(index);
    setDialogDelete(true);
  };

  const handleDeleteClose = (del:boolean)=>{
    if (del) {
      OrderService.delete(orders[indexDelete].id)
      navigate("/orders", { replace: true });
      window.location.reload();
    }
    setIndexDelete(0);
    setDialogDelete(false);
  }

  useEffect(() => {
    OrderService.getAll().then((resp) => {
      let temp: IOrderTableView[] = [];
      resp.data.map((value) => {
        temp.push({
          ...value,
          countProducts: value.orders.length,
          finalPrice: sumTotalOrders(value.orders),
        });
      });
      setOrders(temp);
    });
  }, []);

  return (
    <>
    <Dialog
        open={dialogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the order?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => handleDeleteClose(false)}>Disagree</Button>
          <Button onClick={() => handleDeleteClose(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

      <h2>My Orders</h2>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
      >
        <NavLink to="/orders/addedit">
          <IconButton color="primary" aria-label="add" component="label">
            <AddIcon></AddIcon>
          </IconButton>
        </NavLink>
      </Stack>

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Order #</TableCell>
              <TableCell align="right">date</TableCell>
              <TableCell align="right"> # Products</TableCell>
              <TableCell align="right">Final Price</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orders?.map((productOrder, indexmap) => (
              <TableRow
                key={productOrder.id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {productOrder.id}
                </TableCell>
                <TableCell align="right">{productOrder.number}</TableCell>
                <TableCell align="right">{productOrder.date}</TableCell>
                <TableCell align="right">
                  {productOrder.orders.length}
                </TableCell>
                <TableCell align="right">{productOrder.finalPrice.toFixed(2)}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <NavLink to={"/orders/addedit/"+productOrder.id}>
                      <Tooltip title="Edit">
                        <IconButton
                          color="error"
                          aria-label="edit"
                          component="label"
                        >
                          <ModeEditIcon />
                        </IconButton>
                      </Tooltip>
                    </NavLink>

                    <Tooltip title="Delete">
                      <IconButton
                      onClick={()=>handleDelete(indexmap)}
                        color="primary"
                        aria-label="delete"
                        component="label"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </Stack>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}

export default ListOrders;

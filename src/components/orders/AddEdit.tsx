import { IProductOrderView } from "../../utils/interfaces/product.interface";
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
import { IOrder, IOrderResponse } from "../../utils/interfaces/order.interface";

// form
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { AddProductToOrder } from "./AddProductToOrder";

export function AddEdit(props: { edit: boolean; order: IOrderResponse }) {
  let title = props.edit ? "Edit Order" : "Add Order";

  const [dataForm, setDataForm] = useState<IOrder>({
    orderNumber: 0,
    date: "",
    countProducts: 0,
    finalPrice: 0,
    products: [],
  });

  useEffect(() => {
    console.log(props.order);
    initForm(props.edit, props.order);
  }, []);

  const initForm = (edit: boolean, order: IOrderResponse) => {
    let initFormData: IOrder = {
      orderNumber: 0,
      date: "",
      countProducts: 0,
      finalPrice: 0,
      products: [],
    };
    if (!edit) {
      initFormData = {
        orderNumber: 0,
        date: new Date().toLocaleString(),
        countProducts: 0,
        finalPrice: 0,
        products: [],
      };
    } else {
      initFormData = {
        orderNumber: order.orderNumber,
        date: order.date,
        countProducts: order.countProducts,
        finalPrice: order.finalPrice,
        products: order.products,
      };
    }
    setDataForm(initFormData);
  };

  return (
    <>
      <h2>{title}</h2>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
        }}
        noValidate
        autoComplete="off"
      >
        <Stack
          direction="column"
          alignItems="center"
          justifyContent="center"
          spacing={2}
        >
          <TextField
            id="filled-basic"
            value={dataForm?.orderNumber}
            label="Order Number"
            variant="filled"
          />
          <TextField
            id="filled-basic"
            value={dataForm?.date}
            label="Date"
            variant="filled"
            disabled
          />
          <TextField
            id="filled-basic"
            value={dataForm?.countProducts}
            label="Number of Products"
            variant="filled"
            disabled
          />
          <TextField
            id="filled-basic"
            value={dataForm?.finalPrice}
            label="Final Price"
            variant="filled"
            disabled
          />
        </Stack>
      </Box>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="flex-end"
        spacing={2}
      >
        <AddProductToOrder></AddProductToOrder>
      </Stack>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Id</TableCell>
              <TableCell align="right">Name</TableCell>
              <TableCell align="right">Unit Price</TableCell>
              <TableCell align="right">Quantity</TableCell>
              <TableCell align="right">Total Price</TableCell>
              <TableCell align="right">Options</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {dataForm?.products.map((productOrder) => (
              <TableRow
                key={productOrder.name}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {productOrder.id}
                </TableCell>
                <TableCell align="right">{productOrder.name}</TableCell>
                <TableCell align="right">{productOrder.unitPrice}</TableCell>
                <TableCell align="right">{productOrder.quantity}</TableCell>
                <TableCell align="right">{productOrder.total}</TableCell>
                <TableCell align="right">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Tooltip title="Edit">
                      <IconButton
                        color="error"
                        aria-label="edit"
                        component="label"
                      >
                        <ModeEditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
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

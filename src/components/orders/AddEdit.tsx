import { NavLink, useParams, useNavigate } from "react-router-dom";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogTitle from "@mui/material/DialogTitle";

import Button from "@mui/material/Button";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import {
  IOrder,
  IOrderItemResponseDetail,
  IOrderResponseDetail,
} from "../../utils/interfaces/order.interface";
import { IProductResponse } from "../../utils/interfaces/product.interface";

// form
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import { useEffect, useState } from "react";
import { AddProductToOrder } from "./AddProductToOrder";
import OrderService from "../../core/services/Order.service";
import { sumTotalOrders } from "../../utils/functions/product.functions";
import { Modal } from "@mui/material";

export function AddEdit() {
  const [openAdd, setOpenAdd] = useState(false);
  const [orderItemEdit, setOrderItemEdit] =
    useState<IOrderItemResponseDetail | null>(null);
  const [index, setIndex] = useState(-1);
  const [dialogDelete, setDialogDelete] = useState(false);

  const handleAdd = (open: boolean) => {
    setIndex(-1);
    setOrderItemEdit(null);
    console.log("what is being sended:  ", orderItemEdit);
    setOpenAdd(open);
  };
  const handleEdit = (open: boolean) => {
    setOpenAdd(open);
  };
  const handleDelete = (index: number) => {
    setIndex(index);
    setDialogDelete(true);
  };
  const handleDeleteClose = (del: boolean) => {
    if (del) {
      let temp = dataForm.products;
      temp = temp.filter((value, indexfilter) => {
        return index != indexfilter;
      });
      setDataForm({
        ...dataForm,
        products: temp,
        countProducts: temp.length,
        finalPrice: sumTotalOrders(temp),
      });
    }
    setDialogDelete(false);
  };

  const { id } = useParams();
  let navigate = useNavigate();

  let title = id ? "Edit Order" : "Add Order";

  const addEditProduc = (
    orderItem: IOrderItemResponseDetail,
    index: number
  ): void => {
    if (index != -1) {
      let tempdata = dataForm.products;
      tempdata[index] = orderItem;
      setDataForm({
        ...dataForm,
        products: tempdata,
        finalPrice: sumTotalOrders(tempdata),
      });
    } else {
      setDataForm({
        ...dataForm,
        countProducts: dataForm.countProducts + 1,
        products: [...dataForm.products, orderItem],
        finalPrice: sumTotalOrders([...dataForm.products, orderItem]),
      });
    }
  };

  const [dataForm, setDataForm] = useState<IOrder>({
    orderNumber: 0,
    date: new Date().toLocaleString(),
    countProducts: 0,
    finalPrice: 0,
    products: [],
  });

  useEffect(() => {
    if (id) {
      OrderService.getOrderById(Number(id)).then((resp) => {
        console.log("testing: ", resp.data);
        initForm(resp.data);
      });
    }
  }, []);

  const initForm = (order: IOrderResponseDetail) => {
    let initFormData: IOrder = {
      orderNumber: order.number,
      date: order.date,
      countProducts: order.orders.length,
      finalPrice: sumTotalOrders(order.orders),
      products: order.orders,
    };

    setDataForm(initFormData);
  };

  return (
    <>
      <Modal
        open={openAdd}
        onClose={() => handleAdd(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          {orderItemEdit ? (
            <AddProductToOrder
              addEditProduct={addEditProduc}
              orderItem={orderItemEdit}
              index={index}
              handleOpen={handleAdd}
            />
          ) : (
            <AddProductToOrder
              addEditProduct={addEditProduc}
              index={index}
              handleOpen={handleAdd}
            />
          )}
        </Box>
      </Modal>
      <Dialog
        open={dialogDelete}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Are you sure you want to delete the product?"}
        </DialogTitle>

        <DialogActions>
          <Button onClick={() => handleDeleteClose(false)}>Disagree</Button>
          <Button onClick={() => handleDeleteClose(true)} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>

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
            onChange={(e) =>
              setDataForm({ ...dataForm, orderNumber: Number(e.target.value) })
            }
            inputProps={{ inputMode: "numeric", pattern: "^[1-9]\d*" }}
            type="number"
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
            value={dataForm?.finalPrice.toFixed(2)}
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
        <Tooltip title="Add">
          <IconButton
            onClick={() => handleAdd(true)}
            color="primary"
            aria-label="add"
            component="label"
          >
            <AddIcon />
          </IconButton>
        </Tooltip>
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
            {dataForm?.products.map((productOrder, indexmap) => (
              <TableRow
                key={indexmap}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {productOrder.id}
                </TableCell>
                <TableCell align="right">{productOrder.product.name}</TableCell>
                <TableCell align="right">
                  {productOrder.product.price}
                </TableCell>
                <TableCell align="right">{productOrder.quantity}</TableCell>
                <TableCell align="right">
                  {(productOrder.quantity * productOrder.product.price).toFixed(2)}
                </TableCell>
                <TableCell align="right">
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <Tooltip title="Edit">
                      <IconButton
                        onClick={() => {
                          setIndex(indexmap);
                          setOrderItemEdit(productOrder);
                          handleEdit(true);
                        }}
                        color="error"
                        aria-label="edit"
                        component="label"
                      >
                        <ModeEditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete">
                      <IconButton
                        onClick={() => handleDelete(indexmap)}
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
      <Stack
        padding="5px"
        direction="row"
        alignItems="center"
        justifyContent="right"
        spacing={2}
      >
        
          <Tooltip title="Guardar">
            {id ? (
              <Button
                variant="contained"
                onClick={() => {
                  OrderService.update(dataForm, Number(id));
                  navigate("/orders", { replace: true });
                  window.location.reload();
                }}
                autoFocus
              >
                Save
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={() => {
                  OrderService.add(dataForm);
                  navigate("/orders", { replace: true });
                  window.location.reload();
                }}
                autoFocus
              >
                Save
              </Button>
            )}
          </Tooltip>
      </Stack>
    </>
  );
}

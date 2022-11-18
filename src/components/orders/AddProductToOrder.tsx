import * as React from "react";
import { useEffect, useState } from "react";

import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@mui/icons-material/Add";
import IconButton from "@mui/material/IconButton";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";

// select
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { IProductResponse } from "../../utils/interfaces/product.interface";
import ProductService from "../../core/services/Product.Service";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export function AddProductToOrder() {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [product, setProduct] = useState("");
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<IProductResponse[]>([]);

  useEffect(() => {

    ProductService.getAll().then((resp)=>{
        setProducts(resp.data)
    })

  }, []);

  return (
    <>
      <Tooltip title="Add">
        <IconButton
          onClick={handleOpen}
          color="primary"
          aria-label="add"
          component="label"
        >
          <AddIcon />
        </IconButton>
      </Tooltip>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}>
              <InputLabel id="demo-simple-select-filled-label">
                Product
              </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
              >
                {products.map((product, index) => (
                  <MenuItem
                    selected={index == 0 ? true : false}
                    key={index}
                    value={product.id}
                  >
                    {product.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 220 }}>
              <TextField
                id="filled-basic"
                inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
                value={quantity}
                label="Quantity"
                variant="filled"
                type="number"
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </FormControl>
            <Button variant="outlined">Save</Button>
          </Stack>
        </Box>
      </Modal>
    </>
  );
}

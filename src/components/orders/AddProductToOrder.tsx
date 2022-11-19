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
import ProductService from "../../core/services/Product.service";
import { IOrderItemResponseDetail } from "../../utils/interfaces/order.interface";
import { FormHelperText } from "@mui/material";

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

export function AddProductToOrder(props: {
  addEditProduct: (orderItem: IOrderItemResponseDetail,index:number) => void,
  orderItem?:IOrderItemResponseDetail,
  handleOpen: (opened: boolean) => void,
  index:number
}

) {
  
  const [product, setProduct] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [products, setProducts] = useState<IProductResponse[]>([]);

  const handleAddProduct = (productId: number, quantity: number) => {

    if(!(productId<=0||quantity<=0)){
      let product: IProductResponse | undefined = products.find((value) => {
        return value.id === productId;
      });
  
      let tempProd:IOrderItemResponseDetail ={
        id: 0,
        quantity: quantity,
        product: product!
      }
      if(props.orderItem){
        tempProd = {
          id: props.orderItem.id,
          quantity: quantity,
          product: product!
        }
      }
  
      props.addEditProduct(tempProd,props.index);
      props.handleOpen(false)
    }
  };

  useEffect(() => {
    ProductService.getAll().then((resp) => {
      setProducts(resp.data);
      if(props.orderItem){
        const tempProd:IProductResponse|undefined = resp.data.find((value)=>{
          return value.id == props.orderItem?.product.id
        })
        
        if(tempProd){
          
          setProduct(tempProd.id)
        }
        setQuantity(props.orderItem.quantity)
      }
    });
  }, []);

  return (
      <Box sx={style}>
          <Stack
            direction="column"
            alignItems="center"
            justifyContent="center"
            spacing={2}
          >
            <FormControl variant="filled" sx={{ m: 1, minWidth: 220 }}
            error={product <= 0}
            >
              <InputLabel id="demo-simple-select-filled-label">
                Product
              </InputLabel>
              
              <Select
              
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={product}
                onChange={(e) => {
                  console.log("value selected: ", e.target.value);
                  setProduct(Number(e.target.value));
                }}
                
              >
                {products.map((prod, index) => (
                  <MenuItem
                    selected={product === prod.id}
                    key={index}
                    value={prod.id}
                  >
                    {prod.name}
                  </MenuItem>
                ))}
              </Select>
              <FormHelperText>{product <= 0?"You must select a product":""}</FormHelperText>
            </FormControl>

            <FormControl sx={{ m: 1, minWidth: 220 }}>
              <TextField
                error={quantity<1}
                id="filled-basic"
                inputProps={{ inputMode: "numeric", pattern: "^[1-9]\d*" }}
                value={quantity}
                label="Quantity"
                variant="filled"
                type="number"
                helperText={quantity<1?"Quantity must be greater than 0":""}
                onChange={(e) => setQuantity(Number(e.target.value))}
              />
            </FormControl>
            <Button
              variant="outlined"
              onClick={() => handleAddProduct(product, quantity)}
            >
              Save
            </Button>
          </Stack>
        </Box>
  );
}

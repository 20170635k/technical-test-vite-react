import { IProductResponse } from "./product.interface";

export interface IOrder{
    orderNumber:number,
    date:string,
    countProducts:number,
    finalPrice:number,
    products:IOrderItemResponseDetail[]
}
export interface IOrderResponseDetail{
    id:number,
    number:number,
    date:string,
    orders:IOrderItemResponseDetail[]
}
export interface IOrderItemResponseDetail{
    id:number,
    quantity:number,
    product:IProductResponse
}

export interface IOrderTableView{
    id:number,
    number:number,
    date:string,
    countProducts:number,
    finalPrice:number,
    orders:IOrderItemResponseDetail[]
}
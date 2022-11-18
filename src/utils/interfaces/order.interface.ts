import { IProductOrderView, IProductResponse } from "./product.interface";

export interface IOrder{
    orderNumber:number,
    date:string,
    countProducts:number,
    finalPrice:number,
    products:IProductOrderView[]
}
export interface IOrderResponse{
    id:number,
    orderNumber:number,
    date:string,
    countProducts:number,
    finalPrice:number,
    products:IProductOrderView[]
}
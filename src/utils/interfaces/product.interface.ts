export interface IProduct{
    name:string,
    unitPrice:number
}



export interface IProductResponse{
    id:number,
    name:string,
    price:number
}
export interface IProductOrder{
    id:number,
    name:string,
    unitPrice:number,
    quantity:number
}
export interface IProductOrderView{
    id:number,
    name:string,
    unitPrice:number,
    quantity:number,
    total:number
}
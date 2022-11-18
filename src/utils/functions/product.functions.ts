import { IOrderItemResponseDetail } from './../interfaces/order.interface';

export const sumTotalOrders = (orders:IOrderItemResponseDetail[]):number => {
    let total:number = 0
    orders.forEach(element => {
        total+=element.quantity * element.product.price
    })
    return total;
}
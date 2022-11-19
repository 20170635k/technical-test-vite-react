import { IOrder } from './../../utils/interfaces/order.interface';
import { IProductResponse } from '../../utils/interfaces/product.interface';
import axios from 'axios'
import { IOrderResponseDetail } from '../../utils/interfaces/order.interface';

class OrderService{
    private static BASE_URL_API:string = "http://localhost:8001/api/orders"

    getAll(){
        return axios.get<IOrderResponseDetail[]>(OrderService.BASE_URL_API)
    }
    getOrderById(id:number){
        return axios.get<IOrderResponseDetail>(OrderService.BASE_URL_API+"/"+id)
    }
    delete(id:number){
        return axios.delete<IOrderResponseDetail>(OrderService.BASE_URL_API+"/"+id)
    }
    update(order:IOrder,id:number){
        let temp:IOrderResponseDetail = {
            id,
            number:order.orderNumber,
            date: order.date,
            orders:order.products
        } 
        return axios.put<any>(OrderService.BASE_URL_API+"/"+id, temp)
    }
    add(order:IOrder){
        let temp:IOrderResponseDetail = {
            id: 0,
            number:order.orderNumber,
            date: order.date,
            orders:order.products
        } 
        return axios.post<any>(OrderService.BASE_URL_API, temp)
    }
}

export default new OrderService()
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
}

export default new OrderService()
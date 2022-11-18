import { IProductResponse } from '../../utils/interfaces/product.interface';
import axios from 'axios'

class ProductService{
    private static BASE_URL_API:string = "http://localhost:8001/api/products"

    getAll(){
        return axios.get<IProductResponse[]>(ProductService.BASE_URL_API)
    }
}

export default new ProductService()
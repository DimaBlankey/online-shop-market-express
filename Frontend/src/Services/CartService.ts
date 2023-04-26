import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CartItemModel from "../Models/CartItemModel";

class CartService{
    public async addCartDetails(cartDetails: CartItemModel): Promise<void>{
        const response = await axios.post<CartItemModel>(appConfig.cartUrl + "add-item", cartDetails)
        // add to Store.. CartState
    }
    public async removeCartDetails(cartDetails: CartItemModel): Promise<void>{
        const response = await axios.post<CartItemModel>(appConfig.cartUrl + "remove-item", cartDetails)
        // add to Store.. CartState
    }
    public async getCartByUser(cartId: number):Promise<CartItemModel[]>{
        // check if in Store...CartState
        const response = await axios.get<CartItemModel[]>(appConfig.cartUrl + cartId);
        const items = response.data;
        // Store the cartItems...Cart Store
        return items
    }

}

const cartService = new CartService();

export default cartService
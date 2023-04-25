import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CartItemModel from "../Models/CartItemModel";

class CartService{
    public async addCartDetails(cartDetails: CartItemModel): Promise<void>{
        const response = await axios.post<CartItemModel>(appConfig.cartUrl, cartDetails)
        // add to Store.. CartState
    }
}

const cartService = new CartService();

export default cartService
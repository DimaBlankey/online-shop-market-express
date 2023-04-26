import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CartItemModel from "../Models/CartItemModel";
import { CartActionType, cartStore } from "../Redux/CartState";

class CartService{
    public async addCartDetails(cartDetails: CartItemModel): Promise<void>{
        const response = await axios.post<CartItemModel>(appConfig.cartUrl + "add-item", cartDetails)
        const addedItem = response.data;
        cartStore.dispatch({type: CartActionType.AddItems, payload:addedItem })
    }
    public async removeCartDetails(cartDetails: CartItemModel): Promise<void>{
        const response = await axios.post<CartItemModel>(appConfig.cartUrl + "remove-item", cartDetails)
        const removedItem = response.data;
        cartStore.dispatch({type: CartActionType.RemoveItems, payload:removedItem })
    }
    public async getCartByUser(cartId: number):Promise<CartItemModel[]>{
        let items = cartStore.getState().items;
        if(items.length === 0){
        const response = await axios.get<CartItemModel[]>(appConfig.cartUrl + cartId);
         items = response.data;
            cartStore.dispatch({
                type: CartActionType.FetchItems,
                payload: items
            })
        }
        return items
    }

}

const cartService = new CartService();

export default cartService
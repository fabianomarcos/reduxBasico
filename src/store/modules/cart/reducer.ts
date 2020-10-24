import { Reducer } from "redux";
import { ActionTypes, ICartState } from "./types";
import produce from 'immer';


const INITIAL_STATE: ICartState = {
  items: [],
  failedStockCheck: []
};

const cart: Reducer<ICartState> = (state = INITIAL_STATE, action) => {
  return produce(state, draft => {
    switch(action.type) {
      case ActionTypes.addProductToCartSuccess : {
        const { product } = action.payload;

        const productInCartIndex = draft.items.findIndex(item =>
          item.product.id === product.id,
        );

        if (productInCartIndex >= 0) {
          draft.items[productInCartIndex].quantity += 1;
        } else {
          draft.items.push({
            product,
            quantity: 1,
          });
        }

        break;
      }

      case ActionTypes.addProductToCartFailure: {
        draft.failedStockCheck.push(action.payload.productId);

        break;
      }

      default: {
        return draft;
      }
    }
  });
}

export default cart;
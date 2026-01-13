import { createSlice } from '@reduxjs/toolkit';
import { uiActions } from '../store/ui-slice';


const cartSlice = createSlice({
    name: 'cart',
    initialState: {
        items: [],
        totalQuantity: 0,
    },
    reducers: {
        addItemToCart(state, action) {
            const newItem = action.payload;
            const existingItem = state.items.find(item => item.id === newItem.id);
            state.totalQuantity++;
            if (!existingItem) {
                state.items.push({
                    id: newItem.id,
                    price: newItem.price,
                    quantity: 1,
                    totalPrice: newItem.price,
                    name: newItem.title
                })
            } else {
                existingItem.quantity++;
                existingItem.totalPrice = existingItem.totalPrice + newItem.price;
            }
        },
        removeItemFromCart(state, action) {
            const id = action.payload;
            const existingItem = state.items.find(item => item.id === id);
            state.totalQuantity--;
            if (existingItem.quantity === 1) {
                state.items = state.items.filter(item => item.id !== id);
            } else {
                existingItem.quantity--;
                existingItem.totalPrice = existingItem.totalPrice - existingItem.price;
            }
        }
    }
});


// unlike the typical actionCrators this dosent return actions but it returns a function 
export function sendCartData(cart) {
    return async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status: 'pending',
                title: 'Sending...',
                message: 'Sending cart data!'
            })
        );

        async function sendRequest() {
            const response = await fetch('https://first-project-33326-default-rtdb.firebaseio.com/cart.json', {
                method: 'PUT',
                body: JSON.stringify(cart),
            });

            if (!response.ok) {
                throw new Error('Sending cart data failed.');
            }
        }

        try {
            await sendRequest();
            dispatch(
                uiActions.showNotification({
                    status: 'success',
                    title: 'success...',
                    message: 'success in Sending cart data!'
                })
            );
        } catch (error) {

            sendCartData().catch(error => {  // the sendCartData sends a promise so we can catch it. 
                uiActions.showNotification({
                    status: 'Failed',
                    title: 'Failed',
                    message: 'Failed in Sending cart data!'
                })
            })
        }
    }
}

export const cartActions = cartSlice.actions;
export default cartSlice;
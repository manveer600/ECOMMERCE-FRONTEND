import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { addToCart, deleteItemFromCart, fetchItemsByUserId, resetCart, updateItem } from './CartApi';
const initialState = {
   items:[],
   status:'idle'
};


export const addToCartAsync = createAsyncThunk('user/addtocart', async (item) => {
    const response = await addToCart(item);
    return response.data;
}
);


export const resetCartAsync = createAsyncThunk('user/resetCart', async () => {
    const response = await resetCart();
    return response.data;
}
);

export const fetchItemsByUserIdAsync = createAsyncThunk('user/fetchItemsByUserId', async () => {
    const response = await fetchItemsByUserId();
    return response.data;
}
);


export const updateItemAsync = createAsyncThunk('user/updateItem', async ({productId}) => {
    console.log('itemToUpdate', productId);
    const response = await updateItem(productId);
    return response.data;
}
);


export const deleteItemFromCartAsync = createAsyncThunk('user/deleteItemFromCart', async (itemId) => {
    const response = await deleteItemFromCart(itemId);
    return response.data;
}
);





export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(addToCartAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(addToCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                console.log('action.payload', action.payload);
                state.items.push(action.payload.cart);
            })
            .addCase(fetchItemsByUserIdAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchItemsByUserIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = action.payload.cart;
            })
            .addCase(updateItemAsync.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(updateItemAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.productId.id === action.payload.updatedItem.productId);
                console.log('index', index);
                state.items[index] = action.payload.updatedItem;
            })
            .addCase(deleteItemFromCartAsync.pending, (state, action) => {
                state.status = 'Deleting';
            })
            .addCase(deleteItemFromCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                const index = state.items.findIndex(item => item.id === action.payload.id);
                state.items.splice(index,1);
            })
            .addCase(resetCartAsync.pending, (state, action) => {
                state.status = 'reseting';
            })
            .addCase(resetCartAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.items = [];
            })
    },
});
export default cartSlice.reducer;

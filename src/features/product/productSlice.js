import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createProduct, deleteProduct, fetchAllBrands, fetchAllCategories, fetchAllProducts, fetchProductById, fetchProductsByFilter, updateProduct } from './productApi.js';

const initialState = {
    products: [],
    brands:[],
    categories:[],
    status: 'idle',
    totalItems:0,
    selectedProduct:null
};

export const fetchAllProductsAsync = createAsyncThunk('product/fetchAllProducts', async () => {
    const response = await fetchAllProducts();
    return response.data;
}
);

export const fetchProductByIdAsync = createAsyncThunk('product/fetchProductById', async (id) => {
    const response = await fetchProductById(id);
    return response.data;
}
);

export const fetchAllBrandsAsync = createAsyncThunk('product/fetchAllBrands', async () => {
    const response = await fetchAllBrands();
    return response.data;
}
);

export const fetchAllCategoriesAsync = createAsyncThunk('product/fetchAllCategories', async () => {
    const response = await fetchAllCategories();
    return response.data;
});

export const fetchProductsByFilterAsync = createAsyncThunk('/product/fetchProductsByFilter', async({filter, sort, pagination})=>{
    const response = await fetchProductsByFilter(filter, sort, pagination);
    return response.data;
});

export const createProductAsync = createAsyncThunk('/product/createProductAsync', async(product)=>{
    const response = await createProduct(product);
    return response.data;
})

export const updateProductAsync = createAsyncThunk('/product/updateProductAsync', async(product)=>{
    const response = await updateProduct(product);
    return response.data;
})

export const deleteProductAsync = createAsyncThunk('product/deleteProductAsync', async(id)=>{
    const response = await deleteProduct(id);
    return response.data;
})

export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder
            // .addCase(fetchAllProductsAsync.pending, (state) => {
            //     state.status = 'loading';
            // })
            // .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
            //     state.status = 'idle';
            //     state.products = action.payload.products;
            // })
            .addCase(fetchProductsByFilterAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByFilterAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload.products;
                state.totalItems = action.payload.totalDocs;
            })
            .addCase(fetchAllCategoriesAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllCategoriesAsync.fulfilled, (state,action) => {
                state.status = 'idle';
                state.categories = action.payload.categories;
            })
            .addCase(fetchAllBrandsAsync.pending, (state,action) => {
                state.status = 'loading';
            })
            .addCase(fetchAllBrandsAsync.fulfilled, (state,action) => {
                state.status = 'idle';
                state.brands = action.payload.brands;
            })
            .addCase(fetchProductByIdAsync.pending, (state, action) => {
                state.status = 'pending';
            })
            .addCase(fetchProductByIdAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.selectedProduct = action.payload.product;
            })
            .addCase(createProductAsync.pending, (state,action) => {
                state.status = 'adding product';
            })
            .addCase(createProductAsync.fulfilled, (state,action) => {
                state.status = 'idle';
                state.products.push(action.payload.product);
            })
            .addCase(updateProductAsync.pending, (state,action) => {
                state.status = 'updating product';
            })
            .addCase(updateProductAsync.fulfilled, (state,action) => {
                state.status = 'idle';
                const index = state.products.findIndex((p) => p.id === action.payload.id);
                state.products[index] = action.payload;
            })
            .addCase(deleteProductAsync.pending, (state,action) => {
                state.status = 'deleting product';
            })
            .addCase(deleteProductAsync.fulfilled, (state,action) => {
                state.status = 'idle';
                const index = state.products.findIndex((p) => p.id === action.payload.id);
                delete state.products[index];
            })

    },
});
export default productSlice.reducer;

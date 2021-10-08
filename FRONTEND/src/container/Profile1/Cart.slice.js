import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import purchaseApi from 'src/api/purchare.api'
import { payloadCreator } from 'src/utils/helper'
import { logout } from '../Authention/authention.slice'

export const getCartPurchase = createAsyncThunk('cart/getCartPurchase', payloadCreator(purchaseApi.getCartPurchase))
export const UpdatePurchare = createAsyncThunk('cart/UpdatePurchare', payloadCreator(purchaseApi.updatePurchase))
export const DeletePurchare = createAsyncThunk('cart/DeletePurchare', payloadCreator(purchaseApi.deletePurchase))
export const BuyPurchare = createAsyncThunk('cart/BuyPurchare', payloadCreator(purchaseApi.BuyPurchare))

const cart = createSlice({
  name: 'cart',
  initialState: {
    purcharse: []
  },
  extraReducers: {
    [getCartPurchase.fulfilled]: (state, action) => {
      state.purcharse = action.payload.data
    },
    [logout.fulfilled]: state => {
      state.purcharse = []
    }
  }
})
const cartReducer = cart.reducer
export default cartReducer

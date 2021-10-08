import { toastSuccess } from '../../Helper/toastHelper';
import { Actions } from '../actions';

const initState = {
	items: []
}

const Cart = (state = initState, action) => {
	let status = {
		new: 1,
		process: 2,
	}
	let index = -1;
	let newValue = [];
	switch (action.type) {
		case Actions.ADD_CART:
			if (state.items.length == 0) {
				state.items = [
					{
						product: action.payload.item,
						quantity: action.payload.quantity,
						checkout: status.new,
					}, ...state.items
				];
			} else {
				index = state.items.findIndex(item => item.product.id == action.payload.item.id);
				if (index != -1) {
					state.items[index].quantity += action.payload.quantity;
				} else {
					state.items = [
						{
							product: action.payload.item,
							quantity: action.payload.quantity,
							checkout: status.new,
						}
						, ...state.items
					];
				}
			}

			return {
				...state,
			}
		case Actions.REMOVE_CART:
			state.items = state.items.filter(item => item.product.id != action.payload.product.id);
			return {
				...state,
			}
		case Actions.ADD_ONE_ITEM_CART:
			action.payload.checkout = status.new;
			index = state.items.findIndex(item => item.product.id == action.payload.product.id);
			if (index != -1) {
				state.items[index].quantity += 1;
			}
			newValue = [...state.items];
			return {
				...state,
				items: newValue
			}
		case Actions.REMOVE_ONE_ITEM_CART:
			index = state.items.findIndex(item => item.product.id == action.payload.product.id);
			if (index != -1) {
				state.items[index].quantity -= 1;
			}
			if (state.items[index].quantity == 0) {
				state.items = state.items.filter(item => item.product.id != action.payload.product.id);
			}
			newValue = [...state.items];
			return {
				...state,
				items: newValue
			}
		case Actions.REMOVE_ALL_CART:
			state.items = [];
			return {
				...state,
			}
		case Actions.CHANGE_STATUS_CHECKOUT:
			state.items.map(x => {
				if (action.payload.includes(x.product.id)) {
					x.checkout = status.process;
				}
			})
			return {
				...state,
			}
		default:
			return state;
	}
}
export default Cart;
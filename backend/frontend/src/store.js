import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import {
  productList,
  productDetails,
  productDelete,
  productCreate,
  productUpdate,
  productReviewCreate,
  productTopRated,
} from './reducers/productsReducer';
import {
  userLogin,
  userRegister,
  userDetails,
  userUpdate,
  userList,
  userDelete,
  userUpdateAdmin,
} from './reducers/userReducers';
import {
  orderCreate,
  orderDetails,
  orderPay,
  orderListMy,
  orderDeliver,
  orderList,
} from './reducers/orderReducers';
import cart from './reducers/cartReducers';

const reducer = combineReducers({
  productList,
  productDetails,
  productDelete,
  productCreate,
  productUpdate,
  productReviewCreate,
  productTopRated,
  cart,
  userLogin,
  userRegister,
  userDetails,
  userUpdate,
  userList,
  userDelete,
  userUpdateAdmin,
  orderCreate,
  orderDetails,
  orderPay,
  orderListMy,
  orderDeliver, 
  orderList,
});

const cartItemsFromStorage = localStorage.getItem('cartItems')
  ? JSON.parse(localStorage.getItem('cartItems'))
  : [];

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null;

const shippingInfoFromStorage = localStorage.getItem('shippingAddress')
  ? JSON.parse(localStorage.getItem('shippingAddress'))
  : {};

const initialState = {
  cart: {
    cartItems: cartItemsFromStorage,
    shippingAddress: shippingInfoFromStorage,
  },
  userLogin: { userInfo: userInfoFromStorage },
};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

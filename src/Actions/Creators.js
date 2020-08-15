import Types from '../Constants/Types';

const addCart = (item) => ({type: Types.CART_ADD, item});
const addSettings = (item) => ({type: Types.SETTINGS_ADD, item});

const updateCart = (index, qty) => ({type: Types.CART_UPDATE, index, qty});
const clearCart = () => ({type: Types.CART_CLEAR});

export default {
  addCart,
  clearCart,
  updateCart,
  addSettings,
};

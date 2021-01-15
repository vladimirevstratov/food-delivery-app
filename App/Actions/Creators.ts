import Types from '../Constants/Types';

const addCart = (item: any) => ({type: Types.CART_ADD, item});
const addSettings = (item: any) => ({type: Types.SETTINGS_ADD, item});

const updateCart = (index: any, qty: any) => ({
  type: Types.CART_UPDATE,
  index,
  qty,
});
const clearCart = () => ({type: Types.CART_CLEAR});

export default {
  addCart,
  clearCart,
  updateCart,
  addSettings,
};

import Types from '../Constants/Types';
import Immutable from 'seamless-immutable';

import {createReducer} from 'reduxsauce';

export const INITIAL_STATE = Immutable({
  skidka: 0,
});

const addsettings = (state, action) => {
  console.log('Load Settings');
  let newState = JSON.parse(JSON.stringify(state));

  if (!newState.skidka) {
    //Создание settings, если он не существует(первый клик в корзину)
    newState = {
      skidka: 0,
    };
  }

  newState.skidka = action.item;

  return state.merge(newState);
};

// map our types to our handlers
const ACTION_HANDLERS = {
  [Types.SETTINGS_ADD]: addsettings,
};

//export default createReducer(INITIAL_STATE, ACTION_HANDLERS)
export const reducer = createReducer(INITIAL_STATE, ACTION_HANDLERS);

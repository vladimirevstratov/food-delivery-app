import {takeLatest, all} from 'redux-saga/effects';
import {StartupTypes} from '../Redux/StartupRedux';
import {startup} from './StartupSagas';

/* ------------- Connect Types To Sagas ------------- */

export default function* root() {
  yield all([
    // some sagas only receive an action
    takeLatest(StartupTypes.STARTUP, startup),
  ]);
}

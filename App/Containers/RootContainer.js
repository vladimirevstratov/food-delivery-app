import React, {useEffect} from 'react';
import {Platform} from 'react-native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import {useDispatch} from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import SplashScreen from 'react-native-splash-screen';
import {Root} from 'native-base';
import styles from './Styles/RootContainerStyles';

const RootContainer = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      dispatch(StartupActions.startup());
    }
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    /* eslint-disable-next-line */
  }, []);

  return (
    <Root style={styles.applicationView}>
      <ReduxNavigation />
    </Root>
  );
};

export default RootContainer;

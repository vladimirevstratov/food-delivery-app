import React from 'react';
import {StackNavigator} from 'react-navigation';
import NavigationDrawer from './NavigationDrawer';
import CartScreen from '../Containers/CartScreen';
import ItemScreen from '../Containers/ItemScreen';
import CheckoutScreen from '../Containers/CheckoutScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    NavigationDrawer: {screen: NavigationDrawer},
    CartScreen: {screen: (props) => <CartScreen {...props} />},
    ItemScreen: {screen: (props) => <ItemScreen {...props} />},
    CheckoutScreen: {screen: (props) => <CheckoutScreen {...props} />},
  },
  {
    // Default config for all screens
    headerMode: 'none',
    initialRouteName: 'NavigationDrawer',
    navigationOptions: {
      headerStyle: styles.header,
    },
  },
);

export default PrimaryNav;

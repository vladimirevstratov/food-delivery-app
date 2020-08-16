import React from 'react';
import {StackNavigator} from 'react-navigation';
import NavigationDrawer from './NavigationDrawer';
import CategoryScreen from '../Containers/CategoryScreen';
import CartScreen from '../Containers/CartScreen';
import ItemScreen from '../Containers/ItemScreen';
import CheckoutScreen from '../Containers/CheckoutScreen';

import styles from './Styles/NavigationStyles';

// Manifest of possible screens
const PrimaryNav = StackNavigator(
  {
    NavigationDrawer: {screen: NavigationDrawer},
    //CategoryScreen: { screen: CategoryScreen },
    CartScreen: {screen: () => <CartScreen />},
    ItemScreen: {screen: () => <ItemScreen />},
    CheckoutScreen: {screen: () => <CheckoutScreen />},
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

import React from 'react';
import {DrawerNavigator} from 'react-navigation';
import CategoryScreen from '../Containers/CategoryScreen';
import CartScreen from '../Containers/CartScreen';
import ContactScreen from '../Containers/ContactScreen';
import DrawerContent from '../Containers/DrawerContent';

const NavigationDrawer = DrawerNavigator(
  {
    //Меню: { screen: CategoriesListScreen },
    Меню: {
      screen: (props: any) => <CategoryScreen {...props} />,
      /*navigationOptions: {
        drawerIcon: () => <Icon name="md-cart" color="#cccccc"/>,
      }*/
    },
    Корзина: {screen: (props: any) => <CartScreen {...props} />},
    Контакты: {screen: (props: any) => <ContactScreen {...props} />},
    /*Рестораны: { screen: CartScreen },
		Акции: { screen: CartScreen },*/
  },
  {
    initialRouteName: 'Меню',
    contentComponent: (props) => <DrawerContent {...props} />,
  },
);

export default NavigationDrawer;

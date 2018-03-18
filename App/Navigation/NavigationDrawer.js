import React from "react";
import { DrawerNavigator } from "react-navigation";
//import CategoriesListScreen from "../Containers/CategoriesListScreen";
import CategoryScreen from "../Containers/CategoryScreen";
import CartScreen from "../Containers/CartScreen";
import ContactScreen from "../Containers/ContactScreen";
import DrawerContent from "../Containers/DrawerContent";
import { Icon } from "native-base";




import styles from "./Styles/NavigationStyles";

const NavigationDrawer = DrawerNavigator({
		//Меню: { screen: CategoriesListScreen },
		Меню: {
			screen: CategoryScreen,
			/*navigationOptions: {
        drawerIcon: () => <Icon name="md-cart" color="#cccccc"/>,
      }*/
		},
		Корзина: { screen: CartScreen },
		Контакты: { screen: ContactScreen },
    /*Рестораны: { screen: CartScreen },
		Акции: { screen: CartScreen },*/
	},
	{
		initialRouteName: "Меню",
		contentComponent: props => <DrawerContent {...props} />,
    //drawerWidth: 250,
	}
);

export default NavigationDrawer;

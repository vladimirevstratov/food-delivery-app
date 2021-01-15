import React from 'react';
import {Platform} from 'react-native';
import {Text, Button, Badge, Icon} from 'native-base';
import {Colors} from '../Themes/';

const CartIconHeader = (props: any) => {
  let itemsQty = 0;
  let itemslimitQty = '99+';
  (props.items || []).map((section: any /*i: any*/) => {
    itemsQty += parseFloat(section.qty);
  });

  return itemsQty === 0 ? (
    <Button transparent onPress={props.onCartPress} style={{right: 5}}>
      <Icon name="cart" style={{color: '#34909F', fontSize: 30}} />
    </Button>
  ) : (
    <Button
      transparent
      onPress={props.onCartPress}
      style={{width: 60, right: 5}}
      badge>
      <Badge
        style={{
          backgroundColor: Colors.pink0,
          position: 'absolute',
          right: 0,
          top: 0,
          paddingTop: 0,
          paddingBottom: 0,
          borderRadius: 100,
          height: 25,
          zIndex: 2,
        }}>
        <Text>{itemsQty <= 99 ? itemsQty : itemslimitQty}</Text>
      </Badge>
      <Icon
        name="cart"
        style={{
          color: '#34909F',
          fontSize: 30,
          paddingTop: Platform.OS === 'ios' ? 2 : 0,
          paddingLeft: Platform.OS === 'ios' ? 3.4 : 1.7,
        }}
      />
    </Button>
  );
};

export default CartIconHeader;

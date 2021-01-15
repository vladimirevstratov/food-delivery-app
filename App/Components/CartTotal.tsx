import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import styles from '../Containers/Styles/CartScreenStyles';

const CartTotal = (props: any) => {
  return (
    <View style={styles.checkoutsummary}>
      <View style={styles.summarycol1}>
        <Text style={styles.summarycol1text0}>Итого</Text>
        <Text style={styles.summarycol1text1}>
          Скидка {props.skidka}% ({props.tax}₽)
        </Text>
      </View>
      <View style={styles.summarycol2}>
        <Text style={styles.summarycol2text0}>{props.total} ₽</Text>
        <Text style={styles.summarycol2text1}>{props.subTotal} ₽</Text>
      </View>
    </View>
  );
};

export default CartTotal;

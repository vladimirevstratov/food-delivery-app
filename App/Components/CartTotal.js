import React from 'react';
import {View} from 'react-native';
import {Text} from 'native-base';
import styles from '../Containers/Styles/CartScreenStyles';

export default class SwipeRowCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <View style={styles.checkoutsummary}>
        <View style={styles.summarycol1}>
          <Text style={styles.summarycol1text0}>Итого</Text>
          <Text style={styles.summarycol1text1}>
            Скидка {this.props.skidka}% ({this.props.tax}₽)
          </Text>
        </View>
        <View style={styles.summarycol2}>
          <Text style={styles.summarycol2text0}>{this.props.total} ₽</Text>
          <Text style={styles.summarycol2text1}>{this.props.subTotal} ₽</Text>
        </View>
      </View>
    );
  }
}

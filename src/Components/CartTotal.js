import React, {PropTypes} from "react";
import { connect } from "react-redux";
import Config from '../Config/AppConfig'
import Actions from '../Actions/Creators';
import { Image, BackHandler, View, FlatList, Animated, TouchableOpacity, TouchableHighlight, Slider, Dimensions, Alert } from "react-native";
import { Container, Header, Content, List, Footer, ListItem, Text, Left, Right, Body, Button, Icon, Title, Separator, Thumbnail } from 'native-base';
import styles from '../Containers/Styles/CartScreenStyles'


export default class SwipeRowCart extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <View style={styles.checkoutsummary}>
          <View style={styles.summarycol1}>
            <Text style={styles.summarycol1text0}>Итого</Text>
            <Text style={styles.summarycol1text1}>Скидка {this.props.skidka}% ({this.props.tax}₽)</Text>
          </View>
          <View style={styles.summarycol2}>
            <Text style={styles.summarycol2text0}>{this.props.total} ₽</Text>
            <Text style={styles.summarycol2text1}>{this.props.subTotal} ₽</Text>
          </View>
        </View>
    );
  }
}

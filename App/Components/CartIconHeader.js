import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
import Config from '../Config/AppConfig';
import Actions from '../Actions/Creators';
import {
  Image,
  BackHandler,
  View,
  FlatList,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
  Slider,
  Dimensions,
  Alert,
  Platform,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  List,
  Footer,
  ListItem,
  Text,
  Left,
  Right,
  Body,
  Button,
  Badge,
  Icon,
  Title,
  Separator,
  Thumbnail,
} from 'native-base';
import styles from '../Containers/Styles/CartScreenStyles';
import {Colors} from '../Themes/';

export default class CartIconHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    var itemsQty = 0;
    var itemslimitQty = '99+';
    (this.props.items || []).map((section, i) => {
      itemsQty += parseFloat(section.qty);
    });

    return itemsQty == 0 ? (
      <Button transparent onPress={this.props.onCartPress} style={{right: 5}}>
        <Icon name="cart" style={{color: '#34909F', fontSize: 30}} />
      </Button>
    ) : (
      <Button
        transparent
        onPress={this.props.onCartPress}
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
  }
}

import React from 'react';
import {connect} from 'react-redux';
import Actions from '../Actions/Creators';
import SwipeRowCart from '../Components/SwipeRowCart';
import CartTotal from '../Components/CartTotal';
import {Image, BackHandler, View, FlatList, Dimensions} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Text,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Title,
} from 'native-base';
import styles from './Styles/CartScreenStyles';
import {NavigationActions} from 'react-navigation';
import {Colors} from '../Themes/';

class CartScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      damping: 1 - 0.6,
      tension: 300,
    };
  }

  static propTypes = {
    //   items: PropTypes.array,
  };

  /*CartScreen.propTypes = {
  products: PropTypes.array,
	}*/

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: '86%',
          backgroundColor: '#CED0CE',
          marginLeft: '14%',
        }}
      />
    );
  };

  setQty = (index, qty) => {
    this.props.updateCart(index, qty);
  };

  navigatetoMenu() {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'NavigationDrawer'})],
    });
    this.props.navigation.dispatch(resetAction);
  }

  render() {
    //Начало подсчета итоговых цен
    var subTotal = 0;

    (this.props.items || []).map((section, i) => {
      subTotal += parseFloat(section.qty) * parseFloat(section.price);
    });
    console.log(subTotal);

    //calculate tax
    var tax = ((subTotal / 100) * this.props.skidka).toFixed(0);

    //Calucalte total
    var TOTAL = subTotal - tax;
    //Конец подсчета итоговых цен

    return (
      <Container>
        <Header
          style={{backgroundColor: '#ffffff'}}
          androidStatusBarColor={Colors.black}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: '#34909F'}} />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title style={{color: '#222222'}}>КОРЗИНА</Title>
          </Body>
          <Right>
            {this.props.items.length != 0 && (
              <Button
                transparent
                onPress={() => {
                  this.props.clearCart();
                }}>
                <Icon name="trash" style={{color: '#34909F', fontSize: 30}} />
              </Button>
            )}
          </Right>
        </Header>
        {this.props.items.length == 0 ? (
          <Content style={styles.content}>
            <View style={styles.emptycart}>
              <Text style={styles.textemptycart}>Ваша корзина пуста</Text>
              <View style={styles.blockbuttontomenu}>
                <Button
                  style={styles.buttontomenu}
                  onPress={() => this.navigatetoMenu()}>
                  <Text style={styles.buttontextemptycart}>В МЕНЮ</Text>
                </Button>
              </View>
            </View>
          </Content>
        ) : (
          <Content style={styles.content}>
            <FlatList
              data={this.props.items}
              renderItem={({item, index}) => (
                <SwipeRowCart
                  onRef={(ref) => (this.child = ref)}
                  damping={this.state.damping}
                  key={item.id}
                  tension={this.state.tension}
                  action={this.setQty}
                  index={index}
                  qty={item.qty}>
                  <View style={styles.rowContent}>
                    <View style={styles.listitem0left}>
                      <Image
                        style={styles.rowIcon}
                        source={{uri: item.photo}}
                      />
                      <View>
                        <Text style={styles.rowTitle}>{item.name}</Text>
                      </View>
                    </View>
                    <View style={styles.rowButton}>
                      <View
                        style={
                          styles.button0
                        } /* onPress={() => this.onPressSnapTo()}*/
                      >
                        <Text style={styles.buttontext0}>
                          {item.qty} x {item.price} р
                        </Text>
                      </View>
                    </View>
                  </View>
                </SwipeRowCart>
              )}
              keyExtractor={(item, index) => index.toString()}
            />
          </Content>
        )}

        {this.props.items.length != 0 && (
          <Footer style={styles.footer}>
            <CartTotal
              skidka={this.props.skidka}
              tax={tax}
              total={TOTAL}
              subTotal={subTotal}
            />
            <Button
              full
              style={styles.buttoncheckout}
              onPress={() =>
                this.props.navigation.navigate('CheckoutScreen', {
                  preTotal: subTotal,
                  total: TOTAL,
                  skidka: tax,
                })
              }>
              <Text>ОФОРМИТЬ ЗАКАЗ</Text>
            </Button>
          </Footer>
        )}
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
    skidka: state.settings.skidka,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateCart: (index, qty) => dispatch(Actions.updateCart(index, qty)),
    clearCart: () => dispatch(Actions.clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CartScreen);

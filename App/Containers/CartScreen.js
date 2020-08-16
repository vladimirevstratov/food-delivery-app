import React, {PropTypes} from 'react';
import {connect} from 'react-redux';
//import Config from '../Config/AppConfig';
import Actions from '../Actions/Creators';
import SwipeRowCart from '../Components/SwipeRowCart';
import CartTotal from '../Components/CartTotal';
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
  Icon,
  Title,
  Separator,
  Thumbnail,
} from 'native-base';
import styles from './Styles/CartScreenStyles';
import {NavigationActions} from 'react-navigation';
import Interactable from 'react-native-interactable';
import {Colors} from '../Themes/';

const Screen = Dimensions.get('window');

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

  /*onPressSnapTo = () => {
    this.child.onRowPress();
  }*/

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
              //ItemSeparatorComponent={this.renderSeparator}
              //ListHeaderComponent={this.renderHeader}
              //ListFooterComponent={this.renderFooter}
              keyExtractor={(item, index) => index.toString()}
              //onRefresh={this.handleRefresh}
              //refreshing={this.state.refreshing}
              //onEndReached={this.handleLoadMore}
              //onEndReachedThreshold={50}
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

//РЕНДЕР БЕСПЛАТНЫХ ПРИПРАВ (из части render)
/*	<Separator bordered style={styles.freesaucerow}>
	<Text style={styles.freesaucetext}>БЕСПЛАТНЫЕ ПРИПРАВЫ</Text>
	</Separator>
	<List dataArray={items1}
		renderRow={(item) =>
			<ListItem>
				<Thumbnail circle size={51} source={require('../Images/sushi.png')} />
				<Body>
					<Text style={styles.cartitems}>{item}</Text>
				</Body>
				<Right>
					<Button bordered style={styles.button1}>
						<Text style={styles.buttontext1}>+ платная порция</Text>
					</Button>
				</Right>
			</ListItem>
		}>
	</List> */
//

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

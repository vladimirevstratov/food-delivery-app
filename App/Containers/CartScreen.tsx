import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Actions from '../Actions/Creators';
import SwipeRowCart from '../Components/SwipeRowCart';
import CartTotal from '../Components/CartTotal';
import {Image, BackHandler, View, FlatList} from 'react-native';
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

const CartScreen = (props: any) => {
  const [cartState] = useState({
    damping: 1 - 0.6,
    tension: 300,
  });

  const {items} = useSelector((state: any) => state.cart);
  const {skidka} = useSelector((state: any) => state.settings);

  const dispatch = useDispatch();

  const backPressed = () => {
    props.navigation.goBack();
    return true;
  };

  const setQty = (index: any, qty: any) => {
    updateCart(index, qty);
  };

  const navigatetoMenu = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'NavigationDrawer'})],
    });
    props.navigation.dispatch(resetAction);
  };

  const clearCart = () => dispatch(Actions.clearCart());
  const updateCart = (index: any, qty: any) =>
    dispatch(Actions.updateCart(index, qty));

  //Начало подсчета итоговых цен
  let subTotal = 0;

  (items || []).map((section: any /*, i: any*/) => {
    subTotal += parseFloat(section.qty) * parseFloat(section.price);
  });
  console.log(subTotal);

  //calculate tax
  let tax: any = ((subTotal / 100) * skidka).toFixed(0);

  //Calucalte total
  let TOTAL = subTotal - tax;
  //Конец подсчета итоговых цен

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backPressed);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressed);
    };
    /* eslint-disable-next-line */
  }, []);

  return (
    <Container>
      <Header
        style={{backgroundColor: '#ffffff'}}
        androidStatusBarColor={Colors.black}>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" style={{color: '#34909F'}} />
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Title style={{color: '#222222'}}>КОРЗИНА</Title>
        </Body>
        <Right>
          {items.length !== 0 && (
            <Button
              transparent
              onPress={() => {
                clearCart();
              }}>
              <Icon name="trash" style={{color: '#34909F', fontSize: 30}} />
            </Button>
          )}
        </Right>
      </Header>
      {items.length === 0 ? (
        <Content style={styles.content}>
          <View style={styles.emptycart}>
            <Text style={styles.textemptycart}>Ваша корзина пуста</Text>
            <View style={styles.blockbuttontomenu}>
              <Button
                style={styles.buttontomenu}
                onPress={() => navigatetoMenu()}>
                <Text style={styles.buttontextemptycart}>В МЕНЮ</Text>
              </Button>
            </View>
          </View>
        </Content>
      ) : (
        <Content style={styles.content}>
          <FlatList
            data={items}
            renderItem={({item, index}) => (
              <SwipeRowCart
                damping={cartState.damping}
                key={item.id}
                tension={cartState.tension}
                action={setQty}
                index={index}
                qty={item.qty}>
                <View style={styles.rowContent}>
                  <View style={styles.listitem0left}>
                    <Image style={styles.rowIcon} source={{uri: item.photo}} />
                    <View>
                      <Text style={styles.rowTitle}>{item.name}</Text>
                    </View>
                  </View>
                  <View style={styles.rowButton}>
                    <View style={styles.button0}>
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

      {items.length !== 0 && (
        <Footer style={styles.footer}>
          <CartTotal
            skidka={skidka}
            tax={tax}
            total={TOTAL}
            subTotal={subTotal}
          />
          <Button
            full
            style={styles.buttoncheckout}
            onPress={() =>
              props.navigation.navigate('CheckoutScreen', {
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
};

export default CartScreen;

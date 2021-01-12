import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Actions from '../Actions/Creators';
import {Image, BackHandler} from 'react-native';
import {
  Text,
  View,
  Container,
  Header,
  Footer,
  Content,
  Title,
  Left,
  Right,
  Body,
  Icon,
  Button,
} from 'native-base';
import CartIconHeader from '../Components/CartIconHeader';
import {Colors} from '../Themes/';
import {Col, Row, Grid} from 'react-native-easy-grid';
import styles from './Styles/ItemScreenStyles';

const ItemScreen = (props) => {
  const [itemState] = useState({
    loading: false,
    item: props.navigation.state.params.data1,
  });

  const {items} = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const backPressed = () => {
    props.navigation.goBack();
    return true;
  };

  const prepareToAddToCart = () => {
    const newItem = {
      qty: 1,
      id: itemState.item.id,
      name: itemState.item.name,
      description: itemState.item.desc,
      photo: itemState.item.photo,
      price: itemState.item.price,
    };

    dispatch(Actions.addCart(newItem));
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', backPressed);

    return () =>
      BackHandler.removeEventListener('hardwareBackPress', backPressed);

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
          <Title style={{color: '#222222'}}>
            {itemState.item.name.toUpperCase()}
          </Title>
        </Body>
        <Right>
          <CartIconHeader
            items={items}
            onCartPress={() => props.navigation.navigate('CartScreen')}
          />
        </Right>
      </Header>

      <Content style={styles.content}>
        <Grid style={{backgroundColor: '#fcfcfc'}}>
          <Col
            style={{
              height: 320,
              borderBottomWidth: 3,
              borderBottomColor: '#f4f4f4',
              paddingTop: 15,
            }}>
            <Row
              style={{
                height: 221,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{width: 220, height: 220, borderRadius: 110}}
                source={{uri: itemState.item.photo}}
              />
            </Row>
            <Row
              style={{
                height: 60,
                paddingTop: 15,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: 37, color: '#0F0F0F'}}>
                {itemState.item.name}
              </Text>
            </Row>
          </Col>
        </Grid>
        <Grid>
          <Col
            style={{
              backgroundColor: '#ffffff',
              height: 160,
              alignItems: 'center',
            }}>
            <Row
              style={{
                height: 85,
                paddingTop: 15,
                width: 280,
                justifyContent: 'center',
              }}>
              <Text
                style={{fontSize: 16, color: '#8F8E8E', textAlign: 'center'}}>
                {itemState.item.desc}
              </Text>
            </Row>
            <Row
              style={{
                height: 40,
                width: 85,
                backgroundColor: '#EDDECC',
                borderRadius: 30,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  color: '#8F8E8E',
                  textAlign: 'center',
                  alignSelf: 'center',
                }}>
                {itemState.item.weight}
                {itemState.item.measure}
              </Text>
            </Row>
          </Col>
        </Grid>
      </Content>
      <Footer style={styles.footer}>
        <View style={styles.footerblock}>
          <View style={styles.priceblock}>
            <Text style={styles.pricetext}>{itemState.item.price}</Text>
            <Text style={styles.currencytext}>руб</Text>
          </View>
          <View style={styles.addblock}>
            <Button
              bordered
              style={styles.addtocartbtn}
              onPress={() => {
                prepareToAddToCart();
              }}>
              <View style={styles.addtocartblock}>
                <Text style={styles.addtocarttext}>В КОРЗИНУ</Text>
                <Icon name="cart" style={styles.addtocarticon} />
              </View>
            </Button>
          </View>
        </View>
      </Footer>
    </Container>
  );
};

export default ItemScreen;

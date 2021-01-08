import {useDispatch, useSelector} from 'react-redux';
import Actions from '../Actions/Creators';
import React, {useEffect, useState} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  BackHandler,
  TouchableWithoutFeedback,
} from 'react-native';
import {
  Container,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  ListItem,
  Thumbnail,
  Text,
  Toast,
} from 'native-base';
import CartIconHeader from '../Components/CartIconHeader';
import styles from './Styles/CategoryScreenStyles';
import {Colors} from '../Themes/';
import firebase from '@react-native-firebase/database';

const CategoryScreen = (props) => {
  const menuref = firebase().ref('Меню');
  const ref = menuref.orderByChild('id');
  const setref = firebase().ref('Настройки/Общие');
  const [categoryState, setCategoryState] = useState({
    loading: true,
    items: [],
  });

  const {items} = useSelector((state) => state.cart);

  const dispatch = useDispatch();

  const isConnectionOnline = () => {
    //Проверка на доступность интернет соединения
    return new Promise((resolve, reject) => {
      fetch('https://google.com')
        .then((response) => {
          if (response.status >= 200 && response.status <= 1000) {
            resolve(true);
          } else {
            console.log(response.status);
            Toast.show({
              text: 'Нет соединения',
              position: 'bottom',
              duration: 5000,
            });
            reject('offline');
          }
        })
        .catch((error) => {
          Toast.show({
            text: 'Нет соединения',
            position: 'bottom',
            duration: 5000,
          });
          resolve();
        });
    });
  };

  const getItems = (querySnapshot) => {
    const newItems = [];

    querySnapshot.forEach((doc) => {
      const item = doc.val();

      newItems.push({
        name: item.название,
        measure: item.измерение,
        price: item.цена,
        weight: item.вес,
        photo: item.фото,
        desc: item.описание,
        id: item.id,
      });
    });

    setCategoryState({
      items: newItems,
      loading: false,
    });
  };

  const getTax = (querySnapshot) => {
    const setingsapp = querySnapshot.val();

    dispatch(Actions.addSettings(setingsapp.скидка));
  };

  const renderSeparator = () => {
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

  const renderHeader = () => {
    if (!categoryState.loading) {
      return null;
    }
    return (
      <View style={styles.loadingview}>
        <ActivityIndicator animating size="large" color={Colors.blue0} />
      </View>
    );
  };

  const prepareToAddToCart = (item) => {
    let newItem = {
      qty: 1,
      id: item.id,
      name: item.name,
      description: item.desc,
      photo: item.photo,
      price: item.price,
    };

    dispatch(Actions.addCart(newItem));
  };

  const handlePressItem = (item) => {
    props.navigation.navigate('ItemScreen', {data1: item});
  };

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack();
      return false;
    });

    isConnectionOnline()
      .then(() => {
        return new Promise((resolve) => {
          setref.once('value').then((value) => {
            resolve(value);
          });
        });
      })
      .then(getTax)
      .then(() => {
        return new Promise((resolve, reject) => {
          ref.once('value').then((value) => {
            resolve(value);
          });
        });
      })
      .then(getItems)
      .catch((err) => {
        console.log(err);
      });
    /* eslint-disable-next-line */
  }, [])

  return (
    <Container style={styles.container}>
      <Header
        style={{backgroundColor: '#ffffff'}}
        androidStatusBarColor={Colors.black}>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.navigate('DrawerOpen')}>
            <Icon name="menu" style={{color: '#34909F'}} />
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Title style={{color: '#222222'}}>МЕНЮ</Title>
        </Body>
        <Right>
          <CartIconHeader
            items={items}
            onCartPress={() => props.navigation.navigate('CartScreen')}
          />
        </Right>
      </Header>
      <FlatList
        data={categoryState.items}
        renderItem={({item}) => (
          <ListItem>
            <View style={styles.listitem0}>
              <TouchableWithoutFeedback onPress={() => handlePressItem(item)}>
                <View style={styles.listitem0left}>
                  <Thumbnail circle size={51} source={{uri: item.photo}} />
                  <View style={styles.itemtext}>
                    <Text style={styles.itemname} uppercase={true}>
                      {item.name}
                    </Text>
                    <Text style={styles.itemweight}>
                      {item.weight}
                      {item.measure}
                    </Text>
                  </View>
                </View>
              </TouchableWithoutFeedback>
              <View style={styles.listitem0right}>
                <TouchableWithoutFeedback onPress={() => handlePressItem(item)}>
                  <View style={styles.itemprice}>
                    <Text style={styles.pricetext}>{item.price}</Text>
                    <Text style={styles.currencytext}>руб</Text>
                  </View>
                </TouchableWithoutFeedback>
                <Button
                  transparent
                  style={styles.carticonbtn}
                  onPress={() => {
                    prepareToAddToCart(item);
                  }}>
                  <Icon name="cart" style={styles.carticon} />
                </Button>
              </View>
            </View>
          </ListItem>
        )}
        ItemSeparatorComponent={renderSeparator}
        ListHeaderComponent={renderHeader}
        keyExtractor={(item, index) => index.toString()}
      />
    </Container>
  );
};

export default CategoryScreen;

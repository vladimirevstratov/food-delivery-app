import React, {useEffect, useState} from 'react';
import firebase from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import {BackHandler, FlatList, ActivityIndicator} from 'react-native';
import {
  Text,
  View,
  Container,
  Header,
  Content,
  Title,
  Left,
  Right,
  Body,
  Icon,
  ListItem,
  Button,
  Thumbnail,
} from 'native-base';
import CartIconHeader from '../Components/CartIconHeader';
import styles from './Styles/CategoriesListScreenStyles';
import {Colors} from '../Themes/';

const CategoriesListScreen = (props) => {
  const [state, setState] = useState({
    items: [],
    loading: true,
  });

  const {items} = useSelector((reduxState) => reduxState.cart);

  const menuref = firebase.firestore().collection('меню');
  const ref = menuref.orderBy('id');

  const listenForItems = (querySnapshot) => {
    const newItems = [];

    querySnapshot.forEach((doc) => {
      const item = doc.data();
      const itemref = menuref.doc(doc.id).collection('allitems');

      newItems.push({
        key: doc.id,
        doc,
        name: item.name,
        itemref,
      });
    });

    setState({
      items: newItems,
      loading: false,
    });
  };

  const renderHeader = () => {
    if (!state.loading) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 40,
        }}>
        <ActivityIndicator animating size="large" color={Colors.blue0} />
      </View>
    );
  };

  const handlePressCategory = (item) => {
    props.navigation.navigate('CategoryScreen', {
      name: item.name,
      ref: item.itemref,
    });
  };

  const unsubscribe = () => ref.onSnapshot(listenForItems);

  useEffect(() => {
    BackHandler.addEventListener('hardwareBackPress', () => {
      props.navigation.goBack();
      return true;
    });

    return () => {
      unsubscribe();
    };

    /* eslint-disable-next-line */
  }, []);

  return (
    <Container>
      <Header
        style={{backgroundColor: '#ffffff'}}
        androidStatusBarColor={Colors.black}>
        <Left>
          <Button
            transparent
            onPress={() => props.navigation.navigate('DrawerOpen')}>
            <Icon name="ios-menu" style={{color: '#34909F'}} />
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
      <Content /*padder*/ style={styles.content}>
        <FlatList
          style={styles.list}
          data={state.items}
          renderItem={({item}) => (
            <ListItem
              style={styles.row0}
              onPress={() => {
                handlePressCategory(item);
              }}>
              <Thumbnail
                circle
                size={51}
                source={require('../Images/rolls.png')}
              />
              <Text
                onPress={() => {
                  handlePressCategory(item);
                }}
                style={styles.row0text}
                uppercase={true}>
                {item.name}
              </Text>
            </ListItem>
          )}
          ListHeaderComponent={renderHeader}
        />
      </Content>
    </Container>
  );
};

export default CategoriesListScreen;

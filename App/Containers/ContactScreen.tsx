import {connect, useSelector} from 'react-redux';
import React, {Component, useEffect, useState} from 'react';
import {
  View,
  ActivityIndicator,
  BackHandler,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
import MapView, {Marker} from 'react-native-maps';
import {
  Container,
  Content,
  Header,
  Title,
  Button,
  Icon,
  Left,
  Right,
  Body,
  Text,
  Tab,
  Tabs,
  Item,
} from 'native-base';
import CartIconHeader from '../Components/CartIconHeader';
import styles from './Styles/ContactScreenStyles';
import {Images, Colors} from '../Themes/';
import firebase from '@react-native-firebase/database';

const ContactScreen = (props) => {
  //TODO write rest props to initial
  const [contactState, setContactState] = useState({
    markercoordinate: {
      latitude: 52.509366,
      longitude: 85.162462,
    },
    markertitle: 'BurgerRoom',
    markerdescription: 'Самые мощные бургеры в Бийске! Трофимова, 4А',
    loading: true,
  });

  const {items} = useSelector((state) => state.cart);

  const ref = firebase().ref('Настройки/Контакты');

  const backPressed = () => {
    this.props.navigation.goBack();
    return true;
  };

  const onPressUrl = (url) => {
    Linking.canOpenURL(url)
      .then((supported) => {
        if (!supported) {
          console.log("Can't handle url: " + url);
        } else {
          return Linking.openURL(url);
        }
      })
      .catch((err) => console.error('An error occurred', err));
  };

  useEffect(() => {
    ref.once('value').then((snapshot) => {
      const value = snapshot.val();
      setContactState({
        ...contactState,
        title: value.заголовок,
        phone: value.телефон,
        adress: value.адрес,
        graphic: value.график,
        desc1: value.описание1,
        desc2: value.описание2,
        vk: value.вк,
        instagram: value.инстаграм,
        geotitle: value.геозаголовок,
        geodesc: value.геоописание,
        loading: false,
      });
    });

    BackHandler.addEventListener('hardwareBackPress', backPressed);

    return () => {
      BackHandler.removeEventListener('hardwareBackPress', backPressed);
    };

    /* eslint-disable-next-line */
  }, []);

  return (
    <Container style={styles.container}>
      <Header
        style={{backgroundColor: '#ffffff'}}
        androidStatusBarColor={Colors.black}
        hasTabs>
        <Left>
          <Button transparent onPress={() => props.navigation.goBack()}>
            <Icon name="arrow-back" style={{color: '#34909F'}} />
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Title style={{color: '#222222'}}>КОНТАКТЫ</Title>
        </Body>
        <Right>
          <CartIconHeader
            items={items}
            onCartPress={() => props.navigation.navigate('CartScreen')}
          />
        </Right>
      </Header>
      <Tabs tabBarUnderlineStyle={styles.underlinestyle}>
        <Tab
          heading="О нас"
          tabStyle={styles.tabs}
          textStyle={styles.texttab}
          activeTabStyle={styles.activetab}
          activeTextStyle={styles.activetexttab}>
          {contactState.loading ? (
            <View style={styles.loadingview}>
              <ActivityIndicator animating size="large" color={Colors.blue0} />
            </View>
          ) : (
            <Content style={styles.content}>
              <View style={styles.logoimg}>
                <Image source={Images.logo} style={styles.logo} />
              </View>
              <Text style={styles.abouttext}>{contactState.title}</Text>
              <View style={styles.contact}>
                <Item style={styles.contactitem}>
                  <View style={styles.contacticonblock}>
                    <Icon
                      name="pin"
                      style={{
                        color: '#34909F',
                        fontSize: 30,
                        paddingTop: 0,
                        paddingLeft: 1.7,
                      }}
                    />
                  </View>
                  <Text style={styles.row}>{contactState.adress}</Text>
                </Item>
                <Item style={styles.contactitem}>
                  <View style={styles.contacticonblock}>
                    <Icon
                      name="call"
                      style={{
                        color: '#34909F',
                        fontSize: 30,
                        paddingTop: 0,
                        paddingLeft: 1.7,
                      }}
                    />
                  </View>
                  <Text
                    style={styles.row}
                    onPress={() => {
                      onPressUrl(`tel:+7${contactState.phone}`);
                    }}>
                    8{contactState.phone}
                  </Text>
                </Item>
                <Item style={styles.contactitem}>
                  <View style={styles.contacticonblock}>
                    <Icon
                      name="time"
                      style={{
                        color: '#34909F',
                        fontSize: 30,
                        paddingTop: 0,
                        paddingLeft: 1.7,
                      }}
                    />
                  </View>
                  <Text style={styles.row}>
                    График работы: {contactState.graphic}
                  </Text>
                </Item>
              </View>
              <View style={styles.aboutdesc}>
                <View style={styles.aboutdescrow}>
                  <Icon
                    name="md-star-outline"
                    style={{
                      color: '#34909F',
                      fontSize: 30,
                      paddingTop: 0,
                      paddingLeft: 1.7,
                    }}
                  />
                  <Text style={styles.aboutdesctext}>{contactState.desc1}</Text>
                </View>
                <View style={styles.aboutdescrow}>
                  <Icon
                    name="md-star-outline"
                    style={{
                      color: '#34909F',
                      fontSize: 30,
                      paddingTop: 0,
                      paddingLeft: 1.7,
                    }}
                  />
                  <Text style={styles.aboutdesctext}>{contactState.desc2}</Text>
                </View>
                <View style={styles.social}>
                  <TouchableWithoutFeedback
                    onPress={() => onPressUrl(contactState.vk)}>
                    <Image
                      style={styles.vk}
                      source={require('../Images/Icons/vk.png')}
                    />
                  </TouchableWithoutFeedback>
                  <TouchableWithoutFeedback
                    onPress={() => onPressUrl(contactState.instagram)}>
                    <Image
                      style={styles.instagram}
                      source={require('../Images/Icons/instagram.png')}
                    />
                  </TouchableWithoutFeedback>
                </View>
              </View>
            </Content>
          )}
        </Tab>
        <Tab
          heading="На карте"
          tabStyle={styles.tabs}
          textStyle={styles.texttab}
          activeTabStyle={styles.activetab}
          activeTextStyle={styles.activetexttab}>
          <View style={styles.mapcontainer}>
            <MapView
              initialRegion={{
                latitude: 52.509574,
                longitude: 85.16244,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}
              style={styles.map}>
              <Marker
                coordinate={contactState.markercoordinate}
                title={contactState.geotitle}
                description={contactState.geodesc}
                pinColor={Colors.blue0}
              />
            </MapView>
            <View style={styles.bubble}>
              <View style={styles.amount}>
                <Text style={styles.maptext}>{contactState.adress}</Text>
              </View>
            </View>
          </View>
        </Tab>
      </Tabs>
    </Container>
  );
};

export default ContactScreen;

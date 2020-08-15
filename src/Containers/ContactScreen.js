import {connect} from 'react-redux';
import Actions from '../Actions/Creators';
import React, {Component} from 'react';
import {
  View,
  FlatList,
  ActivityIndicator,
  BackHandler,
  TouchableWithoutFeedback,
  Image,
  Linking,
} from 'react-native';
//import { SearchBar } from "react-native-elements";
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
  Badge,
  List,
  ListItem,
  Thumbnail,
  Text,
  Tab,
  Tabs,
  ScrollableTab,
  Item,
} from 'native-base';
import CartIconHeader from '../Components/CartIconHeader';
import styles from './Styles/ContactScreenStyles';
import {Images, Colors} from '../Themes/';
import firebase from 'react-native-firebase';

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markercoordinate: {
        latitude: 52.509366,
        longitude: 85.162462,
      },
      markertitle: 'BurgerRoom',
      markerdescription: 'Самые мощные бургеры в Бийске! Трофимова, 4А',
      loading: true,
    };
    this.ref = firebase.database().ref('Настройки/Контакты');
  }

  componentDidMount() {
    this.ref.once('value').then((snapshot) => {
      const value = snapshot.val();
      this.setState({
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
  }

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

  onPressUrl = (url) => {
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

  render() {
    return (
      <Container style={styles.container}>
        <Header
          style={{backgroundColor: '#ffffff'}}
          androidStatusBarColor={Colors.black}
          hasTabs>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: '#34909F'}} />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title style={{color: '#222222'}}>КОНТАКТЫ</Title>
          </Body>
          <Right>
            <CartIconHeader
              items={this.props.items}
              onCartPress={() => this.props.navigation.navigate('CartScreen')}
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
            {this.state.loading ? (
              <View style={styles.loadingview}>
                <ActivityIndicator
                  animating
                  size="large"
                  color={Colors.blue0}
                />
              </View>
            ) : (
              <Content style={styles.content}>
                <View style={styles.logoimg}>
                  <Image source={Images.logo} style={styles.logo} />
                </View>
                <Text style={styles.abouttext}>{this.state.title}</Text>
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
                    <Text style={styles.row}>{this.state.adress}</Text>
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
                      onPress={() =>
                        this.onPressUrl(`tel:+7${this.state.phone}`)
                      }>
                      8{this.state.phone}
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
                      График работы: {this.state.graphic}
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
                    <Text style={styles.aboutdesctext}>{this.state.desc1}</Text>
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
                    <Text style={styles.aboutdesctext}>{this.state.desc2}</Text>
                  </View>
                  <View style={styles.social}>
                    <TouchableWithoutFeedback
                      onPress={() => this.onPressUrl(this.state.vk)}>
                      <Image
                        style={styles.vk}
                        source={require('../Images/Icons/vk.png')}
                      />
                    </TouchableWithoutFeedback>
                    <TouchableWithoutFeedback
                      onPress={() => this.onPressUrl(this.state.instagram)}>
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
                  coordinate={this.state.markercoordinate}
                  title={this.state.geotitle}
                  description={this.state.geodesc}
                  pinColor={Colors.blue0}
                />
              </MapView>
              <View style={styles.bubble}>
                <View style={styles.amount}>
                  <Text style={styles.maptext}>{this.state.adress}</Text>
                </View>
              </View>
            </View>
          </Tab>
        </Tabs>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  };
};

export default connect(mapStateToProps)(CategoryScreen);

/*
Название категории
{this.props.navigation.state.params.name.toUpperCase()}
*/

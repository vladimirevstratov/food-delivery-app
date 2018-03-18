import { connect } from "react-redux";
import Actions from '../Actions/Creators';
import React, { Component } from "react";
import { View, FlatList, ActivityIndicator, BackHandler, TouchableWithoutFeedback } from "react-native";
//import { SearchBar } from "react-native-elements";
import { Container, Header, Title, Button, Icon, Left, Right, Body, Badge, List, ListItem, Thumbnail, Text, Toast } from "native-base";
import CartIconHeader from '../Components/CartIconHeader';
import { NavigationActions } from 'react-navigation'
import styles from './Styles/CategoryScreenStyles';
import { Colors } from '../Themes/';
import firebase from 'react-native-firebase';

class CategoryScreen extends Component {
  constructor(props) {
    super(props);
    this.menuref = firebase.database().ref('Меню');
		this.ref = this.menuref.orderByChild('id');
    this.setref = firebase.database().ref('Настройки/Общие');
    this.state = {
      loading: true,
      items: []
      //page: 1,
      //seed: 1,
      //error: null,
      //refreshing: false
    };
}

  componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", () => {
			this.props.navigation.goBack();
			return false;
		});

    this.isConnectionOnline()
        .then(()=>{
          return new Promise((resolve, reject) => {
            this.setref
              .once('value')
              .then((value)=>{resolve(value)})
          });
        })
        .then(this.getTax)
        .then(()=>{
          return new Promise((resolve, reject) => {
            this.ref
              .once('value')
              .then((value)=>{resolve(value)})
          });
        })
        .then(this.getItems)
        .catch((err)=>{console.log(err)});
  }

  componentWillMount() {
  }

  componentWillUnmount() {
	}

  isConnectionOnline = () => { //Проверка на доступность интернет соединения
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
                 reject("offline");
               }
            })
            .catch( (error) => {
                Toast.show({
                   text: 'Нет соединения',
                   position: 'bottom',
                   //buttonText: 'Обновить',
                   duration: 5000,
                   //onClose: () => {this.gettingDatafromFirebase()}
                });
                //console.log(error);
                resolve();
                //reject("no internet connection");
            })
    });
  };

  getItems = (querySnapshot) => {
    const items = [];
    //console.log(querySnapshot);
    querySnapshot.forEach((doc) => {
        const item = doc.val();

        items.push({
          name: item.название,
          measure: item.измерение,
          price: item.цена,
          weight: item.вес,
          photo: item.фото,
          desc: item.описание,
          id: item.id
        });

    });

        this.setState({
          items,
          loading: false,
        });

  }

  getTax = (querySnapshot) => {
    const setingsapp = querySnapshot.val();
    this.props.addSettings(setingsapp.скидка);
  }

  //
  //Firestore база данных
  /* constructor(props) {
    super(props);
    this.menuref = firebase.firestore().collection('меню/AEqnmj4Lcib50eJ9HYh7/товары');
		this.ref = this.menuref.orderBy('id');
    this.state = {
      loading: true,
      items: []
      //page: 1,
      //seed: 1,
      //error: null,
      //refreshing: false
    };
    //console.log(this.state.items);

 }

  componentDidMount() {
		BackHandler.addEventListener("hardwareBackPress", () => {
			this.props.navigation.goBack();
			return false;
		});
    this.unsubscribe = this.ref.onSnapshot(this.listenForItems);

    //firebase.messaging().requestPermissions();
    firebase.messaging().getToken()
      .then((token) => {
        console.log('Device FCM Token: ', token);
        firebase.messaging().subscribeToTopic('/topics/news'); //Подписываемся на топик Firebase Cloud Messaging
      })
      .catch( (err) => console.log(err));
  }

  componentWillMount() {
  }

  componentWillUnmount() {
    this.unsubscribe();
	}

  listenForItems = (querySnapshot) => {
  	const items = [];

	  querySnapshot.forEach((doc) => {
        const item = doc.data();

				items.push({
		      name: item.название,
          measure: item.измерение,
          price: item.цена,
          weight: item.вес,
          photo: item.фото,
          desc: item.описание,
          id: item.id
			  });

		});

	  console.log({items});
			  this.setState({
			    items,
			    loading: false,
				});

  }*/
  //
  //Firestore база данных
  //
  /*handleRefresh = () => {
    this.setState(
      {
        page: 1,
        seed: this.state.seed + 1,
        refreshing: true
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  };

  handleLoadMore = () => {
    this.setState(
      {
        page: this.state.page + 1
      },
      () => {
        this.makeRemoteRequest();
      }
    );
  }; */

  renderSeparator = () => {
    return (
      <View
        style={{
          height: 0,
          width: "86%",
          backgroundColor: "#CED0CE",
          marginLeft: "14%"
        }}
      />
    );
  };

  renderHeader = () => {
    if (!this.state.loading) return null;
    return (
      <View style={styles.loadingview}>
        <ActivityIndicator animating size="large" color={Colors.blue0} />
      </View>
    );
  };

  prepareToAddToCart(item) {
    var newItem={
			qty:1,
			id:item.id,
      name:item.name,
      description:item.desc,
			photo:item.photo,
      price:item.price
    }
		//console.log(this.props);
    //console.log(newItem);
    /*Alert.alert(
      I18n.t('addedInCart'),
      this.props.productName+", "+this.props.data.price_name+" "+I18n.t('productAdded'),
    )*/
    this.props.addCart(newItem);
  }

  handlePressItem = (item) => {
    this.props.navigation.navigate("ItemScreen", {data1: item});
  };

  render() {
    return (
       <Container style={styles.container}>
            <Header style={{ backgroundColor: '#ffffff' }} androidStatusBarColor={Colors.black}>
      				<Left>
                <Button transparent onPress={() => this.props.navigation.navigate("DrawerOpen")}>
                  <Icon name="menu" style={{ color: '#34909F' }}/>
                </Button>
      				</Left>
      				<Body style={{ flex: 3 }}>
      					<Title style={{ color: '#222222' }}>МЕНЮ</Title>
      				</Body>
              <Right>
    						<CartIconHeader items={this.props.items} onCartPress={() => this.props.navigation.navigate("CartScreen")} />
    					</Right>
      			</Header>
            <FlatList
              data={this.state.items}
              renderItem={({ item }) => (
                <ListItem>
                   <View style={styles.listitem0}>
                      <TouchableWithoutFeedback onPress={() => this.handlePressItem(item)}>
                         <View style={styles.listitem0left}>
                              <Thumbnail circle size={51} source={{uri: item.photo}} />
                              <View style={styles.itemtext}>
                                  <Text style={styles.itemname} uppercase={true}>{item.name}</Text>
                                  <Text style={styles.itemweight}>{item.weight}{item.measure}</Text>
                              </View>
                         </View>
                      </TouchableWithoutFeedback>
                         <View style={styles.listitem0right}>
                          <TouchableWithoutFeedback onPress={() => this.handlePressItem(item)}>
                            <View style={styles.itemprice}>
                                <Text style={styles.pricetext}>{item.price}</Text>
                                <Text style={styles.currencytext}>руб</Text>
                            </View>
                          </TouchableWithoutFeedback>
                            <Button transparent style={styles.carticonbtn} onPress={()=>{this.prepareToAddToCart(item)}}>
                              <Icon name="cart" style={styles.carticon} />
                            </Button>
                         </View>
                   </View>
                </ListItem>

              )}
              ItemSeparatorComponent={this.renderSeparator}
              ListHeaderComponent={this.renderHeader}
              //ListFooterComponent={this.renderFooter}
              keyExtractor={(item, index) => index.toString()}
              //onRefresh={this.handleRefresh}
              //refreshing={this.state.refreshing}
              //onEndReached={this.handleLoadMore}
              //onEndReachedThreshold={50}
            />
      </Container>
    );
  }
}

const mapStateToProps = state => {
	return {
    items: state.cart.items,
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (item) => dispatch(Actions.addCart(item)),
    addSettings: (item) => dispatch(Actions.addSettings(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryScreen);


/*
Название категории
{this.props.navigation.state.params.name.toUpperCase()}
*/

/*
Кнопка назад в header
<Button transparent onPress={() => this.props.navigation.goBack()}>
  <Icon name="md-arrow-back" style={{ color: '#34909F' }}/>
</Button>
*/

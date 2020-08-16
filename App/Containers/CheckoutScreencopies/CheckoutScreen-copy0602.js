import React from 'react';
import {connect} from 'react-redux';
import Actions from '../Actions/Creators';
import firebase from '@react-native-firebase/database';
import {
  Image,
  BackHandler,
  View,
  TouchableNativeFeedback,
  Alert,
  NetInfo,
} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Input,
  List,
  ListItem,
  Item,
  Text,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Title,
  Toast,
  Separator,
  Thumbnail,
} from 'native-base';
import {RadioButtons, SegmentedControls} from 'react-native-radio-buttons';
import {NavigationActions} from 'react-navigation';
import styles from './Styles/CheckoutScreenStyles';
import {Colors} from '../Themes/';

class CheckoutScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      nameClient: '',
      phoneClient: '',
      adressClient: '',
      commentClient: '',
      products: this.props.items,
      deliveryoptions: {label: 'Доставка', value: 'Доставка'},
      paymentoptions: {label: 'Наличными', value: 'Наличными'},
      persons: 0,
      showToast: false,
      btndisabled: false,
    };
  }

  componentDidMount() {
    //this.iteminput.addEventListener('iteminputChecking', this.checknameInput);
  }

  componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
  }

  backPressed = () => {
    this.gobackwithAlert();
    return true;
  };

  //Возврат назад с проверкой и Alert
  gobackwithAlert() {
    Alert.alert(
      'Вы не оформили заказ до конца',
      'Введенные данные очистятся при возврате назад.',
      [
        {
          text: 'Оформить заказ',
          onPress: () => console.log('Продолжение оформления заказа'),
        },
        {text: 'Выйти', onPress: () => this.props.navigation.goBack()},
      ],
      {cancelable: false},
    );
  }

  //Отправка заказа в базу
  addOrder = (props) => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'NavigationDrawer'})],
    });

    disablebtnfunction = () => {
      //Предотвращение двойного клика(двойной отправки в базу)
      return new Promise((resolve, reject) => {
        this.setState({btndisabled: true});
        resolve();
      });
    };

    var data = {
      nameClient: this.state.nameClient,
      phoneClient: this.state.phoneClient,
      adressClient: this.state.adressClient,
      persons: this.state.persons,
      commentClient: this.state.commentClient,
      products: this.state.products,
    };

    function setOrderwithConnectionChecking() {
      function isConnectionOnline() {
        return new Promise((resolve, reject) => {
          fetch('https://google.com')
            .then((response) => {
              if (response.status === 200) {
                resolve('success');
              } else {
                console.log('failure');
                reject();
              }
            })
            .catch(function (error) {
              Toast.show({
                text: 'Нет соединения',
                position: 'top',
                duration: 10000,
              });
              console.log(error);
            });
        });
      }

      function addOrderData(indexData) {
        //Записываем в базу
        return new Promise((resolve, reject) => {
          var newRef = firebase().ref('orders/Заказы/').push().key;
          firebase()
            .ref('orders/Заказы/' + '-order' + newRef)
            .set(indexData)
            .then(function () {
              console.log('Order written');
            });
          resolve(true);
        });
      }

      clearCartandAlertandNavigate = () => {
        //Очистка корзины и навигация на главную страницу
        return new Promise((resolve, reject) => {
          Alert.alert(
            'Мы получили Ваш заказ!',
            'Перезвоним Вам, для уточнения времени и проверки заказа.',
            [
              {
                text: 'OK',
                onPress: () => {
                  props.clearCart();
                  props.navigation.dispatch(resetAction);
                  resolve();
                },
              },
            ],
            {cancelable: false},
          );
        });
      };

      isConnectionOnline()
        .then((status) => {
          addOrderData(data);
        })
        .then(() => {
          this.clearCartandAlertandNavigate();
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    if (this.state.deliveryoptions.value == 'Доставка') {
      if (
        !this.state.nameClient ||
        !this.state.phoneClient ||
        !this.state.adressClient
      ) {
        if (!this.state.nameClient) {
          this.setState({namestatuserror: true, namestatussuccess: false});
          //console.log('Поле с номером телефона не заполнено');
        } else {
          this.setState({namestatuserror: false, namestatussuccess: true});
        }
        if (!this.state.phoneClient) {
          this.setState({phonestatuserror: true, phonestatussuccess: false});
          //console.log('Поле с именем не заполнено');
        } else {
          this.setState({phonestatuserror: false, phonestatussuccess: true});
        }
        if (!this.state.adressClient) {
          if (this.state.deliveryoptions.value == 'Доставка') {
            this.setState({
              adressstatuserror: true,
              adressstatussuccess: false,
            });
            //console.log('Поле с адресом доставки не заполнено');
          } else {
            this.setState({
              adressstatuserror: false,
              adressstatussuccess: true,
            });
          }
        } else {
          this.setState({adressstatuserror: false, adressstatussuccess: true});
        }
      } else {
        setOrderwithConnectionChecking();
      }
    }
    if (this.state.deliveryoptions.value == 'Самовывоз') {
      if (!this.state.nameClient || !this.state.phoneClient) {
        if (!this.state.nameClient) {
          this.setState({namestatuserror: true, namestatussuccess: false});
          //console.log('Поле с номером телефона не заполнено');
        } else {
          this.setState({namestatuserror: false, namestatussuccess: true});
        }
        if (!this.state.phoneClient) {
          this.setState({phonestatuserror: true, phonestatussuccess: false});
          //console.log('Поле с именем не заполнено');
        } else {
          this.setState({phonestatuserror: false, phonestatussuccess: true});
        }
      } else {
        setOrderwithConnectionChecking();
      }
    }
  };

  //Увеличение количества персон
  increment() {
    if (this.state.persons < 99) {
      this.setState((prevState) => ({
        persons: prevState.persons + 1,
      }));
    }
  }

  //Уменьшение количества персон
  decrement() {
    if (this.state.persons > 1) {
      this.setState((prevState) => ({
        persons: prevState.persons - 1,
      }));
    }
  }

  render() {
    //console.log(this.state);

    //Значения кнопок выбора опций
    const deliveryoptions = [
      {label: 'Доставка', value: 'Доставка'},
      {label: 'Самовывоз', value: 'Самовывоз'},
    ];

    const paymentoptions = [
      {label: 'Картой', value: 'Картой'},
      {label: 'Наличными', value: 'Наличными'},
    ];

    //Запись значений в состояние после клика на кнопку выбора опций
    function setDeliveryOption(option) {
      this.setState({
        deliveryoptions: option,
      });
    }

    function setPaymentOption(option) {
      this.setState({
        paymentoptions: option,
      });
    }

    return (
      <Container>
        <Header
          style={{backgroundColor: '#ffffff'}}
          androidStatusBarColor={Colors.black}>
          <Left>
            <Button transparent onPress={() => this.gobackwithAlert()}>
              <Icon name="arrow-back" style={{color: '#34909F'}} />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title style={{color: '#222222'}}>ОФОРМЛЕНИЕ ЗАКАЗА</Title>
          </Body>
          <Right />
        </Header>
        <Content style={styles.content}>
          <View style={{marginTop: 10, padding: 5, backgroundColor: 'white'}}>
            <SegmentedControls
              tint={'#34909F'}
              selectedTint={'white'}
              backTint={'#3D3D3D'}
              optionStyle={{
                fontSize: 20,
                fontWeight: 'normal',
                fontFamily: 'Avenir-Book',
                paddingTop: 7,
              }}
              containerStyle={{
                marginLeft: 10,
                marginRight: 10,
                height: 57,
              }}
              options={deliveryoptions}
              onSelection={setDeliveryOption.bind(this)}
              selectedOption={this.state.deliveryoptions}
              extractText={(option) => option.label}
              testOptionEqual={(a, b) => {
                if (!a || !b) {
                  return false;
                }
                return a.label === b.label;
              }}
            />
          </View>
          <View style={{marginTop: 0, padding: 5, backgroundColor: 'white'}}>
            <SegmentedControls
              tint={'#34909F'}
              selectedTint={'white'}
              backTint={'#3D3D3D'}
              optionStyle={{
                fontSize: 20,
                fontWeight: 'normal',
                fontFamily: 'Avenir-Book',
                paddingTop: 7,
              }}
              containerStyle={{
                marginLeft: 10,
                marginRight: 10,
                height: 57,
                alignSelf: 'center',
              }}
              options={paymentoptions}
              onSelection={setPaymentOption.bind(this)}
              selectedOption={this.state.paymentoptions}
              extractText={(option) => option.label}
              testOptionEqual={(a, b) => {
                if (!a || !b) {
                  return false;
                }
                return a.label === b.label;
              }}
            />
          </View>

          <View style={styles.inputblock}>
            <View style={styles.btninputblock}>
              <Item disabled style={styles.iteminput1}>
                <Icon active name="people" style={styles.inputicon} />
                <Input
                  disabled
                  placeholder={
                    this.state.persons == 0
                      ? 'Кол-во персон'
                      : this.state.persons + ''
                  }
                  style={styles.input0persons}
                />
              </Item>
              <View style={styles.btnblock}>
                <Button
                  style={styles.btnminus}
                  onPress={() => this.decrement()}>
                  <Text style={styles.btnminustext}>-</Text>
                </Button>
                <Button style={styles.btnplus} onPress={() => this.increment()}>
                  <Text style={styles.btnplustext}>+</Text>
                </Button>
              </View>
            </View>
            <Item
              error={this.state.namestatuserror}
              success={this.state.namestatussuccess}
              style={styles.iteminput}>
              <Icon active name="person" style={styles.inputicon} />
              <Input
                placeholder="Введите ваше имя"
                style={styles.input0}
                onChangeText={(nameClient) => this.setState({nameClient})}
                maxLength={50}
              />
              {this.state.namestatussuccess && <Icon name="checkmark-circle" />}
              {this.state.namestatuserror && <Icon name="close-circle" />}
            </Item>
            <Item
              ref={(elem) => (this.iteminput = elem)}
              error={this.state.phonestatuserror}
              success={this.state.phonestatussuccess}
              style={styles.iteminput}>
              <Icon active name="call" style={styles.inputicon} />
              <Input
                placeholder="Введите ваш телефон"
                style={styles.input0}
                onChangeText={(phoneClient) => this.setState({phoneClient})}
                maxLength={11}
                keyboardType={'numeric'}
              />
              {this.state.phonestatussuccess && (
                <Icon name="checkmark-circle" />
              )}
              {this.state.phonestatuserror && <Icon name="close-circle" />}
            </Item>
            {this.state.deliveryoptions.value == 'Доставка' && (
              <Item
                error={this.state.adressstatuserror}
                success={this.state.adressstatussuccess}
                style={styles.iteminput}>
                <Icon active name="pin" style={styles.inputicon} />
                <Input
                  placeholder="Адрес доставки"
                  style={styles.input0}
                  onChangeText={(adressClient) => this.setState({adressClient})}
                  maxLength={100}
                />
                {this.state.adressstatussuccess && (
                  <Icon name="checkmark-circle" />
                )}
                {this.state.adressstatuserror && <Icon name="close-circle" />}
              </Item>
            )}
            <Item style={styles.iteminput}>
              <Icon active name="md-text" style={styles.inputicon} />
              <Input
                placeholder="Комментарий (не обязательно)"
                style={styles.input0}
                onChangeText={(commentClient) => this.setState({commentClient})}
                maxLength={400}
              />
            </Item>
          </View>
        </Content>
        <Footer style={styles.buttoncontinueblock}>
          <Button
            disabled={this.state.btndisabled}
            full
            style={styles.buttoncontinue}
            onPress={() => this.addOrder(this.props)}>
            <Text style={styles.btncontinuetext}>ПРОДОЛЖИТЬ</Text>
          </Button>
        </Footer>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(Actions.clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);

/* OLD ORDER OPTIONS RENDER PART
<View style={styles.checkoutoptions}>
	<View style={styles.checkoutoptionsrow1}>
		<Button full style={styles.buttonleft}>
			<Text style={styles.row1text0}>Доставка</Text>
		</Button>
		<Button full style={styles.buttonright}>
			<Text style={styles.row1text1}>Самовывоз</Text>
		</Button>
	</View>
	<View style={styles.checkoutoptionsrow2}>
		<Button full style={styles.buttonleft}>
			<Text style={styles.row2text0}>Оплата наличными</Text>
		</Button>
		<Button full style={styles.buttonright}>
			<Text style={styles.row2text1}>Оплата картой</Text>
		</Button>
	</View>
</View>
 OLD ORDER OPTIONS RENDER PART */

import React from 'react';
import {connect} from 'react-redux';
import Actions from '../Actions/Creators';
import Config from '../Config/AppConfig';
import firebase from 'react-native-firebase';
import {
  Image,
  BackHandler,
  View,
  TouchableNativeFeedback,
  Alert,
  ActivityIndicator,
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
import Moment from 'moment';
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
      orderstatus: 'Новый',
      products: this.props.items,
      deliveryoptions: {label: 'Доставка', value: 'Доставка'},
      paymentoptions: {label: 'Наличными', value: 'Наличными'},
      persons: 1,
      showToast: false,
      btndisabled: false,
      loading: false,
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

    setOrderwithConnectionChecking = () => {
      disablebtnfunction = () => {
        //Отключение кнопки продолжить
        return new Promise((resolve, reject) => {
          this.setState({btndisabled: true}, () => {
            resolve();
          });
        });
      };

      checkingisInputsCorrect = () => {
        //Отключение кнопки продолжить
        return new Promise((resolve, reject) => {
          if (
            !this.state.namestatussuccess ||
            !this.state.phonestatussuccess ||
            !this.state.adressstatussuccess
          ) {
            if (!this.state.namestatussuccess) {
              this.setState(
                {namestatuserror: false, namestatussuccess: true},
                () => {
                  resolve();
                },
              );
            }
            if (!this.state.phonestatussuccess) {
              this.setState(
                {phonestatuserror: false, phonestatussuccess: true},
                () => {
                  resolve();
                },
              );
            }
            if (!this.state.adressstatussuccess) {
              this.setState(
                {adressstatuserror: false, adressstatussuccess: true},
                () => {
                  resolve();
                },
              );
            }
          } else {
            resolve();
          }
        });
      };

      isConnectionOnline = () => {
        //Проверка на доступность интернет соединения
        return new Promise((resolve, reject) => {
          fetch('https://google.com')
            .then((response) => {
              if (response.status >= 200 && response.status <= 1000) {
                resolve(true);
              } else {
                Toast.show({
                  text: 'Нет соединения',
                  position: 'top',
                  duration: 2000,
                });
                this.setState({btndisabled: false});
                reject('offline');
              }
            })
            .catch((error) => {
              Toast.show({
                text: 'Нет соединения',
                position: 'top',
                duration: 2000,
              });
              this.setState({btndisabled: false}, () => {
                reject('no internet connection');
              });
            });
        });
      };

      loadingActivitytrue = () => {
        //Отключение кнопки продолжить
        return new Promise((resolve, reject) => {
          this.setState({loading: true}, () => {
            resolve();
          });
        });
      };

      addOrderData = () => {
        //Записываем в базу
        return new Promise((resolve, reject) => {
          var newRef = firebase.database().ref('Заказы').push().key;
          var dateandtime = new Date();
          var productsarray = [];
          var products = this.state.products;
          products.map((product, i) => {
            productsarray.push({
              id: product.id,
              название: product.name,
              цена: product.price,
              количество: product.qty,
            });
          });
          var data = {
            id: Moment(dateandtime).format('x').slice(-5), //newRef.toString().slice(-4),
            имя: this.state.nameClient,
            телефон: this.state.phoneClient,
            доставка: this.state.deliveryoptions.value,
            оплата: this.state.paymentoptions.value,
            адрес: this.state.adressClient,
            персон: this.state.persons,
            комментарий: this.state.commentClient,
            статус: this.state.orderstatus,
            создано: Moment(dateandtime).format('YYYY-MM-DD HH:mm'),
            продукты: productsarray,
            итог: this.props.navigation.state.params.total,
            скидка: this.props.navigation.state.params.skidka,
          };
          firebase
            .database()
            .ref('Заказы/' + 'order' + newRef)
            .set(data)
            .then(() => {
              console.log('Order written');
              this.setState({orderid: data.id}, () => {
                resolve();
              });
            });
        });
      };

      /**
       * SEND GRID SEND
       */
      sendGridEmail = (/*,cart,shipping,subTotal,callback*/) => {
        return new Promise((resolve, reject) => {
          var message =
            '\nЗаказ №' + this.state.orderid + '\n\n=============\n';
          message += 'Имя: ' + this.state.nameClient + '\n';
          message += 'Телефон: ' + this.state.phoneClient + '\n';
          message += 'Доставка: ' + this.state.deliveryoptions.value + '\n';
          message += 'Оплата: ' + this.state.paymentoptions.value + '\n';
          message += 'Адрес: ' + this.state.adressClient + '\n';
          message += 'Персон: ' + this.state.persons + '\n';
          message += 'Комментарий: ' + this.state.commentClient + '\n';
          message += 'Статус: ' + this.state.orderstatus;
          message += '\n=============\n';
          message += '\n';
          var products = this.state.products;
          //Iterate the messages
          products.map((product, i) => {
            message += product.name + '\n';
            message += 'Количество: ' + product.qty + '\n';
            message += 'Цена: ' + product.qty + ' x ' + product.price + '\n';
            message += '-------------\n';
          });
          message +=
            'Итог: ' + this.props.navigation.state.params.preTotal + 'р' + '\n';
          message +=
            'С учетом скидки: ' +
            this.props.navigation.state.params.total +
            'р';

          fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' + Config.SENDGRID_API_KEY,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              personalizations: [
                {
                  to: [
                    {
                      email: Config.sendToEmail,
                    },
                  ],
                  subject:
                    'Новый заказ №' +
                    this.state.orderid +
                    ' от ' +
                    this.state.nameClient +
                    ' ' +
                    this.state.phoneClient,
                },
              ],
              from: {
                email: 'burgerroom@appinbox.ru', //shipping.email
              },
              content: [
                {
                  type: 'text',
                  value: message,
                },
              ],
            }),
          })
            .then((response) => {
              console.log('sended to sengrid');
              resolve();
            })
            .catch((error) => {
              console.log('Не удалось отправить e-mail');
            });
        });
      };

      loadingActivityfalse = () => {
        //Отключение кнопки продолжить
        return new Promise((resolve, reject) => {
          this.setState({loading: false}, () => {
            console.log('loading false');
            resolve();
          });
        });
      };

      clearCartandAlertandNavigate = () => {
        //Очистка корзины и навигация на главную страницу
        return new Promise((resolve, reject) => {
          Alert.alert(
            'Номер Вашего заказа: ' + this.state.orderid,
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

      disablebtnfunction()
        .then(() => {
          return checkingisInputsCorrect();
        })
        .then(() => {
          return isConnectionOnline();
        })
        .then(() => {
          return loadingActivitytrue();
        })
        .then(() => {
          return addOrderData();
        })
        .then(() => {
          return sendGridEmail();
        })
        .then(() => {
          return loadingActivityfalse();
        })
        .then(() => {
          clearCartandAlertandNavigate();
        })
        .catch((error) => {
          console.log(error);
        });
    };

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
        adressstatuserror: false,
        adressstatussuccess: false,
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
        {this.state.loading == false ? (
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
                    placeholder={'Персон: ' + this.state.persons}
                    style={styles.input0persons}
                  />
                </Item>
                <View style={styles.btnblock}>
                  <Button
                    style={styles.btnminus}
                    onPress={() => this.decrement()}>
                    <Text style={styles.btnminustext}>-</Text>
                  </Button>
                  <Button
                    style={styles.btnplus}
                    onPress={() => this.increment()}>
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
                {this.state.namestatussuccess && (
                  <Icon name="checkmark-circle" />
                )}
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
                    onChangeText={(adressClient) =>
                      this.setState({adressClient})
                    }
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
                  onChangeText={(commentClient) =>
                    this.setState({commentClient})
                  }
                  maxLength={400}
                />
              </Item>
            </View>
          </Content>
        ) : (
          <Content style={styles.content}>
            <View style={styles.loadingview}>
              <ActivityIndicator animating size="large" color={Colors.blue0} />
            </View>
          </Content>
        )}
        {this.state.loading == false && (
          <Footer style={styles.buttoncontinueblock}>
            <Button
              disabled={this.state.btndisabled}
              full
              style={styles.buttoncontinue}
              onPress={() => this.addOrder(this.props)}>
              <Text style={styles.btncontinuetext}>ПРОДОЛЖИТЬ</Text>
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
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    clearCart: () => dispatch(Actions.clearCart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CheckoutScreen);

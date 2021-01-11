import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import Actions from '../Actions/Creators';
import firebase from '@react-native-firebase/database';
import {BackHandler, View, Alert, ActivityIndicator} from 'react-native';
import {
  Container,
  Header,
  Content,
  Footer,
  Input,
  Item,
  Text,
  Left,
  Right,
  Body,
  Icon,
  Button,
  Title,
  Toast,
} from 'native-base';
import {SegmentedControls} from 'react-native-radio-buttons';
import {NavigationActions} from 'react-navigation';
import Moment from 'moment';
import styles from './Styles/CheckoutScreenStyles';
import {Colors} from '../Themes/';

const CheckoutScreen = (props) => {
  const {items} = useSelector((state) => state.cart);

  const [checkoutState, setCheckoutState] = useState({
    nameClient: '',
    phoneClient: '',
    adressClient: '',
    commentClient: '',
    orderstatus: 'Новый',
    products: items,
    deliveryoptions: {label: 'Доставка', value: 'Доставка'},
    paymentoptions: {label: 'Наличными', value: 'Наличными'},
    persons: 1,
    showToast: false,
    btndisabled: false,
    loading: false,
  });

  const dispatch = useDispatch();

  const clearCart = () => dispatch(Actions.clearCart());

  //Возврат назад с проверкой и Alert
  const gobackwithAlert = () => {
    Alert.alert(
      'Вы не оформили заказ до конца',
      'Введенные данные очистятся при возврате назад.',
      [
        {
          text: 'Оформить заказ',
          onPress: () => console.log('Продолжение оформления заказа'),
        },
        {text: 'Выйти', onPress: () => props.navigation.goBack()},
      ],
      {cancelable: false},
    );
  };

  const backPressed = () => {
    gobackwithAlert();
    return true;
  };

  //Отправка заказа в базу
  const addOrder = () => {
    const resetAction = NavigationActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName: 'NavigationDrawer'})],
    });

    const setOrderwithConnectionChecking = () => {
      const disablebtnfunction = () => {
        //Отключение кнопки продолжить
        return new Promise((resolve, reject) => {
          setCheckoutState({...checkoutState, btndisabled: true});

          resolve();
        });
      };

      const checkingisInputsCorrect = () => {
        //Отключение кнопки продолжить
        return new Promise((resolve, reject) => {
          if (
            !checkoutState.namestatussuccess ||
            !checkoutState.phonestatussuccess ||
            !checkoutState.adressstatussuccess
          ) {
            if (!checkoutState.namestatussuccess) {
              setCheckoutState({
                ...checkoutState,
                namestatuserror: false,
                namestatussuccess: true,
              });

              resolve();
            }
            if (!checkoutState.phonestatussuccess) {
              setCheckoutState({
                ...checkoutState,
                phonestatuserror: false,
                phonestatussuccess: true,
              });

              resolve();
            }
            if (!checkoutState.adressstatussuccess) {
              setCheckoutState({
                ...checkoutState,
                adressstatuserror: false,
                adressstatussuccess: true,
              });

              resolve();
            }
          } else {
            resolve();
          }
        });
      };

      const isConnectionOnline = () => {
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
                setCheckoutState({...checkoutState, btndisabled: false});
                reject('offline');
              }
            })
            .catch((error) => {
              Toast.show({
                text: 'Нет соединения',
                position: 'top',
                duration: 2000,
              });
              setCheckoutState({...checkoutState, btndisabled: false});

              reject('no internet connection');
            });
        });
      };

      const loadingActivitytrue = () => {
        //Отключение кнопки продолжить
        return new Promise((resolve, reject) => {
          setCheckoutState({...checkoutState, loading: true});

          resolve();
        });
      };

      const addOrderData = () => {
        //Записываем в базу
        return new Promise((resolve, reject) => {
          const newRef = firebase().ref('Заказы').push().key;
          const dateandtime = new Date();
          const productsarray = [];
          const products = checkoutState.products;
          products.map((product, i) => {
            productsarray.push({
              id: product.id,
              название: product.name,
              цена: product.price,
              количество: product.qty,
            });
          });
          let data = {
            id: Moment(dateandtime).format('x').slice(-5), //newRef.toString().slice(-4),
            имя: checkoutState.nameClient,
            телефон: checkoutState.phoneClient,
            доставка: checkoutState.deliveryoptions.value,
            оплата: checkoutState.paymentoptions.value,
            адрес: checkoutState.adressClient,
            персон: checkoutState.persons,
            комментарий: checkoutState.commentClient,
            статус: checkoutState.orderstatus,
            создано: Moment(dateandtime).format('YYYY-MM-DD HH:mm'),
            продукты: productsarray,
            итог: props.navigation.state.params.total,
            скидка: props.navigation.state.params.skidka,
          };
          firebase()
            .ref('Заказы/' + 'order' + newRef)
            .set(data)
            .then(() => {
              console.log('Order written');
              setCheckoutState({...checkoutState, orderid: data.id});

              resolve();
            });
        });
      };

      /**
       * SEND GRID SEND
       */
      const sendGridEmail = (/*,cart,shipping,subTotal,callback*/) => {
        return new Promise((resolve, reject) => {
          let message =
            '\nЗаказ №' + checkoutState.orderid + '\n\n=============\n';
          message += 'Имя: ' + checkoutState.nameClient + '\n';
          message += 'Телефон: ' + checkoutState.phoneClient + '\n';
          message += 'Доставка: ' + checkoutState.deliveryoptions.value + '\n';
          message += 'Оплата: ' + checkoutState.paymentoptions.value + '\n';
          message += 'Адрес: ' + checkoutState.adressClient + '\n';
          message += 'Персон: ' + checkoutState.persons + '\n';
          message += 'Комментарий: ' + checkoutState.commentClient + '\n';
          message += 'Статус: ' + checkoutState.orderstatus;
          message += '\n=============\n';
          message += '\n';
          let products = checkoutState.products;
          //Iterate the messages
          products.map((product, i) => {
            message += product.name + '\n';
            message += 'Количество: ' + product.qty + '\n';
            message += 'Цена: ' + product.qty + ' x ' + product.price + '\n';
            message += '-------------\n';
          });
          message +=
            'Итог: ' + props.navigation.state.params.preTotal + 'р' + '\n';
          message +=
            'С учетом скидки: ' + props.navigation.state.params.total + 'р';

          fetch('https://api.sendgrid.com/v3/mail/send', {
            method: 'POST',
            headers: {
              Authorization: 'Bearer ' /* + Config.SENDGRID_API_KEY*/,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              personalizations: [
                {
                  to: [
                    {
                      email: /*Config.sendToEmail*/ 'email',
                    },
                  ],
                  subject:
                    'Новый заказ №' +
                    checkoutState.orderid +
                    ' от ' +
                    checkoutState.nameClient +
                    ' ' +
                    checkoutState.phoneClient,
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

      const loadingActivityfalse = () => {
        //Отключение кнопки продолжить
        return new Promise((resolve, reject) => {
          setCheckoutState({...checkoutState, loading: false});

          console.log('loading false');
          resolve();
        });
      };

      const clearCartandAlertandNavigate = () => {
        //Очистка корзины и навигация на главную страницу
        return new Promise((resolve, reject) => {
          Alert.alert(
            'Номер Вашего заказа: ' + checkoutState.orderid,
            'Перезвоним Вам, для уточнения времени и проверки заказа.',
            [
              {
                text: 'OK',
                onPress: () => {
                  clearCart();
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

    if (checkoutState.deliveryoptions.value === 'Доставка') {
      if (
        !checkoutState.nameClient ||
        !checkoutState.phoneClient ||
        !checkoutState.adressClient
      ) {
        if (!checkoutState.nameClient) {
          setCheckoutState({
            ...checkoutState,
            namestatuserror: true,
            namestatussuccess: false,
          });
          //console.log('Поле с номером телефона не заполнено');
        } else {
          setCheckoutState({
            ...checkoutState,
            namestatuserror: false,
            namestatussuccess: true,
          });
        }
        if (!checkoutState.phoneClient) {
          setCheckoutState({
            ...checkoutState,
            phonestatuserror: true,
            phonestatussuccess: false,
          });
          //console.log('Поле с именем не заполнено');
        } else {
          setCheckoutState({
            ...checkoutState,
            phonestatuserror: false,
            phonestatussuccess: true,
          });
        }
        if (!checkoutState.adressClient) {
          if (checkoutState.deliveryoptions.value === 'Доставка') {
            setCheckoutState({
              ...checkoutState,
              adressstatuserror: true,
              adressstatussuccess: false,
            });
            //console.log('Поле с адресом доставки не заполнено');
          } else {
            setCheckoutState({
              ...checkoutState,
              adressstatuserror: false,
              adressstatussuccess: true,
            });
          }
        } else {
          setCheckoutState({
            ...checkoutState,
            adressstatuserror: false,
            adressstatussuccess: true,
          });
        }
      } else {
        setOrderwithConnectionChecking();
      }
    }
    if (checkoutState.deliveryoptions.value === 'Самовывоз') {
      if (!checkoutState.nameClient || !checkoutState.phoneClient) {
        if (!checkoutState.nameClient) {
          setCheckoutState({
            ...checkoutState,
            namestatuserror: true,
            namestatussuccess: false,
          });
          //console.log('Поле с номером телефона не заполнено');
        } else {
          setCheckoutState({
            ...checkoutState,
            namestatuserror: false,
            namestatussuccess: true,
          });
        }
        if (!checkoutState.phoneClient) {
          setCheckoutState({
            ...checkoutState,
            phonestatuserror: true,
            phonestatussuccess: false,
          });
          //console.log('Поле с именем не заполнено');
        } else {
          setCheckoutState({
            ...checkoutState,
            phonestatuserror: false,
            phonestatussuccess: true,
          });
        }
      } else {
        setOrderwithConnectionChecking();
      }
    }
  };

  //Увеличение количества персон
  const increment = () => {
    if (checkoutState.persons < 99) {
      setCheckoutState((prevState) => ({
        ...prevState,
        persons: prevState.persons + 1,
      }));
    }
  };

  //Уменьшение количества персон
  const decrement = () => {
    if (checkoutState.persons > 1) {
      setCheckoutState((prevState) => ({
        ...prevState,
        persons: prevState.persons - 1,
      }));
    }
  };

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
    setCheckoutState({
      ...checkoutState,
      deliveryoptions: option,
      adressstatuserror: false,
      adressstatussuccess: false,
    });
  }

  function setPaymentOption(option) {
    setCheckoutState({
      ...checkoutState,
      paymentoptions: option,
    });
  }

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
          <Button transparent onPress={() => gobackwithAlert()}>
            <Icon name="arrow-back" style={{color: '#34909F'}} />
          </Button>
        </Left>
        <Body style={{flex: 3}}>
          <Title style={{color: '#222222'}}>ОФОРМЛЕНИЕ ЗАКАЗА</Title>
        </Body>
        <Right />
      </Header>
      {checkoutState.loading === false ? (
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
              onSelection={setDeliveryOption}
              selectedOption={checkoutState.deliveryoptions}
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
              onSelection={setPaymentOption}
              selectedOption={checkoutState.paymentoptions}
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
                  placeholder={'Персон: ' + checkoutState.persons}
                  style={styles.input0persons}
                />
              </Item>
              <View style={styles.btnblock}>
                <Button style={styles.btnminus} onPress={() => decrement()}>
                  <Text style={styles.btnminustext}>-</Text>
                </Button>
                <Button style={styles.btnplus} onPress={() => increment()}>
                  <Text style={styles.btnplustext}>+</Text>
                </Button>
              </View>
            </View>
            <Item
              error={checkoutState.namestatuserror}
              success={checkoutState.namestatussuccess}
              style={styles.iteminput}>
              <Icon active name="person" style={styles.inputicon} />
              <Input
                placeholder="Введите ваше имя"
                style={styles.input0}
                onChangeText={(nameClient) =>
                  setCheckoutState({...checkoutState, nameClient})
                }
                maxLength={50}
              />
              {checkoutState.namestatussuccess && (
                <Icon name="checkmark-circle" />
              )}
              {checkoutState.namestatuserror && <Icon name="close-circle" />}
            </Item>
            <Item
              ref={(elem) => (this.iteminput = elem)}
              error={checkoutState.phonestatuserror}
              success={checkoutState.phonestatussuccess}
              style={styles.iteminput}>
              <Icon active name="call" style={styles.inputicon} />
              <Input
                placeholder="Введите ваш телефон"
                style={styles.input0}
                onChangeText={(phoneClient) =>
                  setCheckoutState({...checkoutState, phoneClient})
                }
                maxLength={11}
                keyboardType={'numeric'}
              />
              {checkoutState.phonestatussuccess && (
                <Icon name="checkmark-circle" />
              )}
              {checkoutState.phonestatuserror && <Icon name="close-circle" />}
            </Item>
            {checkoutState.deliveryoptions.value === 'Доставка' && (
              <Item
                error={checkoutState.adressstatuserror}
                success={checkoutState.adressstatussuccess}
                style={styles.iteminput}>
                <Icon active name="pin" style={styles.inputicon} />
                <Input
                  placeholder="Адрес доставки"
                  style={styles.input0}
                  onChangeText={(adressClient) =>
                    setCheckoutState({...checkoutState, adressClient})
                  }
                  maxLength={100}
                />
                {checkoutState.adressstatussuccess && (
                  <Icon name="checkmark-circle" />
                )}
                {checkoutState.adressstatuserror && (
                  <Icon name="close-circle" />
                )}
              </Item>
            )}
            <Item style={styles.iteminput}>
              <Icon active name="md-text" style={styles.inputicon} />
              <Input
                placeholder="Комментарий (не обязательно)"
                style={styles.input0}
                onChangeText={(commentClient) =>
                  setCheckoutState({...checkoutState, commentClient})
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
      {checkoutState.loading === false && (
        <Footer style={styles.buttoncontinueblock}>
          <Button
            disabled={checkoutState.btndisabled}
            full
            style={styles.buttoncontinue}
            onPress={() => addOrder()}>
            <Text style={styles.btncontinuetext}>ПРОДОЛЖИТЬ</Text>
          </Button>
        </Footer>
      )}
    </Container>
  );
};

export default CheckoutScreen;

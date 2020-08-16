import {StyleSheet} from 'react-native';
import {ApplicationStyles, Metrics, Colors} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  mainview: {
    justifyContent: 'space-between',
  },
  content: {
    backgroundColor: Colors.background,
    flex: 1,
  },
  loadingview: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight / 1.5,
  },
  checkoutoptions: {
    //блок выбора функций заказа
    flex: 1,
    flexDirection: 'column',
    paddingTop: 15,
    paddingBottom: 10,
    paddingLeft: 15,
    paddingRight: 15,
  },
  checkoutoptionsrow1: {
    //первый ряд выбора функций заказа
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkoutoptionsrow2: {
    //второй ряд выбора функций заказа
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 9,
  },
  buttonleft: {
    //левая кнопка в ряду выбора функций заказа
    flex: 1,
    backgroundColor: Colors.grey4,
    height: 57,
    borderRadius: 3,
    marginRight: 1,
  },
  buttonright: {
    //правая кнопка в ряду выбора функций заказа
    flex: 1,
    backgroundColor: Colors.grey4,
    height: 57,
    borderRadius: 3,
    marginLeft: 1,
  },
  row1text0: {
    //текст на первой кнопке в первом ряду
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.text0,
    fontSize: Metrics.text0,
  },
  row1text1: {
    //текст на второй кнопке в первом ряду
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.text0,
    fontSize: Metrics.text0,
  },
  row2text0: {
    //текст на первой кнопке во втором ряду
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.text0,
    fontSize: Metrics.text0,
  },
  row2text1: {
    //текст на второй кнопке во втором ряду
    justifyContent: 'center',
    textAlign: 'center',
    color: Colors.text0,
    fontSize: Metrics.text0,
  },
  buttoncontinueblock: {
    //блок продолжить в футере
    height: 59,
    paddingTop: 0,
    backgroundColor: Colors.pink0,
  },
  buttoncontinue: {
    //кнопка продолжить в футере
    backgroundColor: Colors.pink0,
    height: 59,
    flex: 1,
  },
  btncontinuetext: {
    //текст на кнопке продолжить в футере
    //  uppercase: true
  },
  inputblock: {
    //блок ввода информации о пользователе
    flexDirection: 'column',
    paddingTop: 15,
  },
  iteminput: {
    //поля ввода данных пользователем
    paddingLeft: 18,
    height: 55,
    paddingTop: 16,
    marginRight: 15,
  },
  iteminput1: {
    //поле выбора количества персон
    paddingLeft: 18,
    height: 50,
    paddingTop: 16,
    flex: 0.94,
  },
  btninputblock: {
    //блок первого поля и кнопок плюс, минус
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
    paddingRight: 15,
  },
  inputicon: {
    //иконка слева от поля ввода пользователем
    color: Colors.grey5,
    flex: 0.1,
  },
  input0: {
    //текст placeholder для ввода пользователем
    fontSize: Metrics.text1,
    paddingLeft: 14,
  },
  input0persons: {
    //текст placeholder для выбора пользователем количества персон
    fontSize: Metrics.text1,
    paddingLeft: 22,
    flex: 0.7,
  },
  btnblock: {
    //блок кнопок плюс, минус
    flexDirection: 'row',
    paddingTop: 15,
    justifyContent: 'space-between',
  },
  btnplus: {
    //кнопка плюс
    height: 35,
    width: 45,
    backgroundColor: Colors.background,
    borderColor: Colors.grey5,
    borderWidth: 1,
    justifyContent: 'center',
  },
  btnplustext: {
    //текст на кнопке плюс
    color: Colors.grey5,
    fontSize: 20,
  },
  btnminus: {
    //кнопка минус
    height: 35,
    width: 45,
    backgroundColor: Colors.background,
    borderColor: Colors.grey5,
    borderWidth: 1,
    marginRight: 3,
    justifyContent: 'center',
  },
  btnminustext: {
    //текст на кнопке минус
    color: Colors.grey5,
    fontSize: 20,
  },
});

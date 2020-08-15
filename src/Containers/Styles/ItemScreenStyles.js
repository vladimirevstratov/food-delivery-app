import {StyleSheet} from 'react-native';
import {ApplicationStyles, Metrics, Colors} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background,
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  //Footer Starts
  footer: {
    //Весь футер
    paddingBottom: 5,
    paddingLeft: 25,
    paddingRight: 25,
    paddingTop: 0,
    backgroundColor: Colors.background,
    elevation: 0,
  },
  footerblock: {
    //Контент футера
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceblock: {
    //Блок цены товара
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  pricetext: {
    //Текст цены товара
    fontSize: 37,
    color: '#36A0A9',
    alignSelf: 'center',
  },
  currencytext: {
    //Текст валюты цены товара
    fontSize: 16,
    color: '#36A0A9',
    alignSelf: 'center',
    transform: [{rotate: '-90deg'}],
    paddingBottom: 10,
  },
  addblock: {
    alignSelf: 'center',
  },
  addtocartbtn: {
    backgroundColor: Colors.background,
    paddingLeft: 7,
    paddingRight: 7,
    borderColor: Colors.background,
  },
  addtocartblock: {
    //Блок добавления в корзину
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  addtocarttext: {
    //Текст добавить в корзину
    fontSize: 24,
    color: '#AE516C',
    alignSelf: 'center',
  },
  addtocarticon: {
    alignSelf: 'center',
    color: Colors.pink0,
    fontSize: 35,
    paddingLeft: 10,
  },
  //Footer Ends

  /* gridtop: {
     backgroundColor: Colors.grey0
  },
  coltop: {
    height: 320,
    borderBottomWidth: 3,
    borderBottomColor: Colors.grey1,
    paddingTop: 100,
    paddingBottom: 10
  },
  rowimage: {
    height: 221,
    justifyContent: 'center',
    alignItems: 'center',
  },
  rowtext: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
  },
  textitem: {
    fontSize: 37,
    color: Colors.black0
  },
  colmiddle: {
    backgroundColor: Colors.background,
    height: 160,
    alignItems: 'center'
  },
  rowdesc: {
    height: 80,
    paddingTop: 15,
    width: 280
  },
  descitem: {
    fontSize: 16,
    color: Colors.grey2,
    textAlign: 'center'
  } */

  /*row: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    margin: Metrics.baseMargin,
    backgroundColor: Colors.fire,
    borderRadius: Metrics.smallMargin
  },
  boldLabel: {
    fontWeight: 'bold',
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center',
    marginBottom: Metrics.smallMargin
  },
  label: {
    alignSelf: 'center',
    color: Colors.snow,
    textAlign: 'center'
  },
  listContent: {
    justifyContent: 'space-around',
    flexDirection: 'row',
    flexWrap: 'wrap'
  } */
});

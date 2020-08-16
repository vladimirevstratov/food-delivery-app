import {StyleSheet} from 'react-native';
import {ApplicationStyles, Metrics, Colors} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  content: {
    backgroundColor: Colors.background,
  },
  cartitems: {
    width: 150,
  },
  freesaucerow: {
    height: 45,
    backgroundColor: Colors.background,
    borderTopColor: Colors.grey3,
    borderTopWidth: 1,
    borderBottomColor: Colors.grey3,
    borderBottomWidth: 1,
  },
  freesaucetext: {
    fontSize: 20,
    color: Colors.black1,
  },
  button0: {
    backgroundColor: Colors.blue0,
    width: 125,
    height: 33,
    borderRadius: 8,
    justifyContent: 'center',
  },
  buttontext0: {
    fontSize: 19,
    color: Colors.text0,
    textAlign: 'center',
  },
  button1: {
    borderColor: Colors.blue2,
    width: 115,
    borderRadius: 8,
    height: 44,
  },
  buttontext1: {
    fontSize: 13,
    color: Colors.blue2,
    textAlign: 'center',
  },
  checkoutsummary: {
    backgroundColor: Colors.blue1,
    flex: 1,
    flexDirection: 'row',
    paddingTop: 15,
    paddingBottom: 13,
  },
  summarycol1: {
    width: Metrics.screenWidth / 2,
  },
  summarycol2: {
    width: Metrics.screenWidth / 2,
  },
  summarycol1text0: {
    paddingLeft: 17,
    color: Colors.text0,
    fontSize: 24,
  },
  summarycol1text1: {
    paddingLeft: 17,
    color: Colors.text0,
    fontSize: 13,
  },
  summarycol2text0: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingRight: 23,
    color: Colors.text0,
    fontSize: 25,
  },
  summarycol2text1: {
    justifyContent: 'flex-end',
    textAlign: 'right',
    paddingRight: 23,
    textDecorationLine: 'line-through',
    color: Colors.text0,
    fontSize: 13,
  },
  buttoncheckout: {
    backgroundColor: Colors.pink0,
    height: 59,
  },
  //STARTING row action StyleSheet
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  listitem0left: {
    //миниатюра и название элемента
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rowIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 20,
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 120,
  },
  rowSubtitle: {
    fontSize: 18,
    color: 'gray',
  },
  rowButton: {
    paddingRight: 15,
  },
  button: {
    width: 75,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonImage: {
    width: 40,
    height: 40,
  },
  playground: {
    marginTop: Metrics.screenHeight <= 500 ? 0 : 80,
    padding: 20,
    width: Metrics.screenWidth - 40,
    backgroundColor: '#5894f3',
    alignItems: 'stretch',
    alignSelf: 'center',
  },
  playgroundLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  slider: {
    height: 40,
  },
  //ENDING row action StyleSheet
  footer: {
    //блок продолжить в футере
    height: 140,
    paddingBottom: 0,
    flexDirection: 'column',
    //backgroundColor: Colors.pink0
  },
  //ПУСТАЯ КОРЗИНА
  emptycart: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 40,
  },
  textemptycart: {
    fontSize: Metrics.listtext,
  },
  buttontextemptycart: {
    fontSize: Metrics.listtext,
  },
  blockbuttontomenu: {
    justifyContent: 'center',
    paddingTop: 15,
  },
  buttontomenu: {
    backgroundColor: Colors.blue0,
    width: 140,
    borderRadius: 8,
    justifyContent: 'center',
  },
});

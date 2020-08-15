import {StyleSheet} from 'react-native';
import {ApplicationStyles, Metrics, Colors} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  loadingview: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight / 1.5,
  },
  content: {
    flex: 1,
    paddingLeft: 15,
    paddingRight: 15,
  },
  //Tabs
  tabs: {
    //фон вкладки
    backgroundColor: Colors.blue0,
  },
  underlinestyle: {
    backgroundColor: Colors.background,
  },
  texttab: {
    //текст вкладки
    color: Colors.text0,
  },
  activetab: {
    //фон активной вкладки
    backgroundColor: Colors.blue1,
  },
  activetexttab: {
    //текст активной вкладки
    color: Colors.text0,
    fontWeight: 'normal',
  },
  //Tabs
  logoimg: {
    padding: 30,
    height: 150,
    justifyContent: 'center',
  },
  logo: {
    height: 100,
    resizeMode: 'contain',
    alignSelf: 'center',
  },
  abouttext: {
    paddingTop: 5,
    alignSelf: 'center',
    fontSize: 18,
  },
  contact: {
    paddingTop: 10,
  },
  contactitem: {
    paddingTop: 5,
  },
  contacticonblock: {
    width: 35,
  },
  aboutdesc: {
    flex: 1,
    paddingTop: 10,
  },
  aboutdescrow: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  aboutdesctext: {
    paddingLeft: 15,
    paddingRight: 20,
  },
  social: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingTop: 20,
  },
  vk: {
    width: 40,
    height: 40,
    paddingRight: 10,
  },
  instagram: {
    width: 40,
    height: 40,
  },
  //Maps
  mapcontainer: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  bubble: {
    width: 190,
    flexDirection: 'row',
    alignSelf: 'center',
    backgroundColor: Colors.grey4,
    opacity: 0.7,
    marginBottom: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderColor: Colors.grey4,
    borderWidth: 0.5,
  },
  amount: {
    flex: 1,
  },
  maptext: {
    color: Colors.text0,
    alignSelf: 'center',
  },
  //Maps
  /*listitem0: { //элемент списка
    flex: 1,
    flexDirection: 'row'
  },
  listitem0left: { //миниатюра и название элемента
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemtext: { //блок текста элемента в списке элементов категории
    paddingLeft: 15,
    flexDirection: 'column',
    justifyContent: 'flex-start'
  },
  itemweight: {
    alignSelf: 'flex-start',
    color: Colors.grey2
  },
  itemname: { //главный текст элемента в списке элементов категории
    fontSize: Metrics.listtext,
    color: Colors.black2,
    alignSelf: 'flex-start'
  },
  listitem0right: { //цена, валюта и иконка корзины
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  itemprice: {  //блок стоимости и валюты
    alignItems: 'center',
    width: 45
  },
  pricetext: { //текст цены элемента
    fontSize: Metrics.pricetext,
    color: Colors.blue0,
    fontWeight: Metrics.semibold,
    height: 29
  },
  currencytext: { //текст валюты элемента
    fontSize: Metrics.currencytext,
    color: Colors.blue1,
    height: 24
  },
  carticon: { //иконка корзины
    color: Colors.pink0,
    fontSize: 30,
    paddingBottom: 5
  },
  carticonbtn: {
    alignSelf: 'center'
  },
  //STARTING row action StyleSheet
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
    paddingLeft: 10,
    paddingRight: 10
  },
  rowIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    margin: 20
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    width: 120
  },
  rowSubtitle: {
    fontSize: 18,
    color: 'gray'
  },
  rowButton: {
    paddingRight: 15
  },
  button: {
    width: 75,
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonImage: {
    width: 40,
    height: 40
  },
  playground: {
    marginTop: Metrics.screenHeight <= 500 ? 0 : 80,
    padding: 20,
    width: Metrics.screenWidth - 40,
    backgroundColor: '#5894f3',
    alignItems: 'stretch',
    alignSelf: 'center'
  },
  playgroundLabel: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 15
  },
  slider: {
    height: 40
  }
  //ENDING row action StyleSheet
  */
});

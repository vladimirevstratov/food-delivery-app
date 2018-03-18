import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    backgroundColor: Colors.background
  },
  loadingview: {
    alignItems: 'center',
    justifyContent: 'center',
    height: Metrics.screenHeight/1.5
  },
  listitem0: { //элемент списка
    flex: 1,
    flexDirection: 'row'
  },
  listitem0left: { //миниатюра и название элемента
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center'
  },
  itemtext: { //блок текста элемента в списке элементов категории
    flex: 0.8,
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
    //flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    //width: 100
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
    fontSize: 28,
    width: 25,
    paddingBottom: 0
  },
  carticonbtn: {
    marginLeft: 5,
    alignSelf: 'center',
    height: 50,
    width: 50,
    backgroundColor: Colors.background,
    alignContent: 'center',
    justifyContent: 'center'
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
})

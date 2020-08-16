import {StyleSheet} from 'react-native';
import {ApplicationStyles, Metrics} from '../../Themes/';

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  //STARTING row action StyleSheet
  //Тут нужны вообще стили, не??
  rowContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#eeeeee',
  },
  rowIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#73d4e3',
    margin: 20,
  },
  rowTitle: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  rowSubtitle: {
    fontSize: 18,
    color: 'gray',
  },
  button: {
    width: 50,
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonIcon: {
    width: 40,
    height: 40,
    color: '#ffffff',
    fontSize: 40,
  },
  buttonQty: {
    color: '#ffffff',
    fontSize: 35,
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
});

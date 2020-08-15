import { StyleSheet } from 'react-native'
import { ApplicationStyles, Metrics, Colors } from '../../Themes/'

export default StyleSheet.create({
  ...ApplicationStyles.screen,
  container: {
    flex: 1,
    marginTop: Metrics.navBarHeight,
    backgroundColor: Colors.background
  },
  content: {
    flex: 1,
    backgroundColor: Colors.background
  },
  row0: { //пункт меню
    height: 70
  },
  row0text: { //текст пункта меню
    paddingLeft: 15,
    fontSize: Metrics.listtext
  },
  list: { //меню
    paddingTop: 5,
    paddingBottom: 5
  }
})

import { Colors } from '../../Themes/'

export default {
  container: {
    flex: 1,
    padding: 0,
    backgroundColor: '#fff'
  },
  logo: {
    flex: 1,
    width: 150,
    resizeMode: 'contain'
  },
  header: {
    height: 150,
    padding: 30,
    backgroundColor: Colors.black
  },
  content: {
    padding: 20
  },
  callus: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    paddingRight: 15,
    paddingTop: 15,
    borderTopColor: '#cccccc',
    borderTopWidth: 1
  }
}

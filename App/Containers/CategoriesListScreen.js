import React from 'react';
import firebase from '@react-native-firebase/database';
import {connect} from 'react-redux';
import {
  Image,
  BackHandler,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  Text,
  View,
  Container,
  Header,
  Content,
  Title,
  Left,
  Right,
  Body,
  Badge,
  Icon,
  List,
  ListItem,
  Button,
  Thumbnail,
} from 'native-base';
import CartIconHeader from '../Components/CartIconHeader';
import styles from './Styles/CategoriesListScreenStyles';
import {Colors} from '../Themes/';

class CategoriesListScreen extends React.Component {
  constructor() {
    super();
    this.menuref = firebase.firestore().collection('меню');
    this.ref = this.menuref.orderBy('id');

    this.unsubscribe = null;

    this.state = {
      items: [],
      loading: true,
    };
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', () => {
      this.props.navigation.goBack();
      return true;
    });
    this.unsubscribe = this.ref.onSnapshot(this.listenForItems);
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  listenForItems = (querySnapshot) => {
    const items = [];

    querySnapshot.forEach((doc) => {
      const item = doc.data();
      const itemref = this.menuref.doc(doc.id).collection('allitems');
      /*const subitems = this.menuref.doc(doc.id).collection('allitems').get()
				     .then(snapshot => {
					     snapshot.forEach(subCollectionDoc => {
										console.log(subCollectionDoc.data());
							 });
						 });
 				*/
      items.push({
        key: doc.id,
        doc,
        name: item.name,
        itemref,
      });
    });

    //console.log({items});
    this.setState({
      items,
      loading: false,
    });
  };

  renderHeader = () => {
    if (!this.state.loading) {
      return null;
    }

    return (
      <View
        style={{
          paddingVertical: 40,
        }}>
        <ActivityIndicator animating size="large" color={Colors.blue0} />
      </View>
    );
  };

  handlePressCategory = (item) => {
    this.props.navigation.navigate('CategoryScreen', {
      name: item.name,
      ref: item.itemref,
    });
  };

  render() {
    /*const counttext = 0;
		countItemsArray = () => {
			this.props.items.forEach((elem) => {
				counttext+=1;
			});
		}*/

    //console.log(this.props.items);
    return (
      <Container>
        <Header
          style={{backgroundColor: '#ffffff'}}
          androidStatusBarColor={Colors.black}>
          <Left>
            <Button
              transparent
              onPress={() => this.props.navigation.navigate('DrawerOpen')}>
              <Icon name="ios-menu" style={{color: '#34909F'}} />
            </Button>
          </Left>
          <Body style={{flex: 3}}>
            <Title style={{color: '#222222'}}>МЕНЮ</Title>
          </Body>
          <Right>
            <CartIconHeader
              items={this.props.items}
              onCartPress={() => this.props.navigation.navigate('CartScreen')}
            />
          </Right>
        </Header>
        <Content /*padder*/ style={styles.content}>
          <FlatList
            style={styles.list}
            data={this.state.items}
            renderItem={({item}) => (
              <ListItem
                style={styles.row0}
                onPress={() => {
                  this.handlePressCategory(item);
                }}>
                <Thumbnail
                  circle
                  size={51}
                  source={require('../Images/rolls.png')}
                />
                <Text
                  onPress={() => {
                    this.handlePressCategory(item);
                  }}
                  style={styles.row0text}
                  uppercase={true}>
                  {item.name}
                </Text>
              </ListItem>
            )}
            ListHeaderComponent={this.renderHeader}
          />
        </Content>
      </Container>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.cart.items,
  };
};

export default connect(mapStateToProps)(CategoriesListScreen);

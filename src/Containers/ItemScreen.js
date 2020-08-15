import React from "react";
import { connect } from "react-redux";
import Actions from '../Actions/Creators';
import { Image, BackHandler, TouchableWithoutFeedback } from "react-native";
import {
	Text,
	View,
	Container,
	Header,
	Footer,
	Content,
	Title,
	Left,
	Right,
	Body,
	Icon,
	Button,
	Badge
  } from "native-base";
import CartIconHeader from '../Components/CartIconHeader';
import { Colors } from '../Themes/';
import { Col, Row, Grid } from 'react-native-easy-grid';
// import Icon from 'react-native-vector-icons/Ionicons'

// Styles
import styles from './Styles/ItemScreenStyles'



class ItemScreen extends React.Component {


	constructor(props) {
    super(props);

    this.state = {
      loading: false,
      item: this.props.navigation.state.params.data1
      //page: 1,
      //seed: 1,
      //error: null,
      //refreshing: false
    };
  }

	componentWillMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backPressed);
	}

	componentWillUnmount() {
	    BackHandler.removeEventListener('hardwareBackPress', this.backPressed);
	}

	backPressed = () => {
	    this.props.navigation.goBack();
	    return true;
	}

	prepareToAddToCart() {
    var newItem={
			qty:1,
			id:this.state.item.id,
      name:this.state.item.name,
      description:this.state.item.desc,
			photo:this.state.item.photo,
      price:this.state.item.price
    }
		//console.log(this.props);
    //console.log(newItem);
    /*Alert.alert(
      I18n.t('addedInCart'),
      this.props.productName+", "+this.props.data.price_name+" "+I18n.t('productAdded'),
    )*/
    this.props.addCart(newItem);
  }


	/*handlePressCategory = () => {
	  this.props.navigation.navigate("CategoryScreen");
	};*/

	render() {
		return (
			<Container>
				<Header style={{ backgroundColor: '#ffffff' }} androidStatusBarColor={Colors.black}>
					<Left>
						<Button transparent onPress={() => this.props.navigation.goBack()}>
							<Icon name="arrow-back" style={{ color: '#34909F' }} />
						</Button>
					</Left>
					<Body style={{ flex: 3 }}>
						<Title style={{ color: '#222222' }}>{this.state.item.name.toUpperCase()}</Title>
					</Body>
					<Right>
						<CartIconHeader items={this.props.items} onCartPress={() => this.props.navigation.navigate("CartScreen")} />
					</Right>
				</Header>

				<Content/*padder*/ style={styles.content}>
						<Grid style={{ backgroundColor: '#fcfcfc' }}>
								<Col style={{ height: 320, borderBottomWidth: 3, borderBottomColor: '#f4f4f4', paddingTop: 15 }}>
                     <Row style={{ height: 221, justifyContent: 'center', alignItems: 'center' }}>
											 <Image
											    style={{width: 220, height: 220, borderRadius: 110}}
											 		source={{uri: this.state.item.photo}}
												/>
										 </Row>
										 <Row style={{ height: 60, paddingTop: 15, justifyContent: 'center', alignItems: 'center' }}>
											 <Text style={{ fontSize: 37, color: '#0F0F0F' }}>{this.state.item.name}</Text>
										 </Row>
								</Col>
					  </Grid>
						<Grid>
							<Col style={{ backgroundColor: '#ffffff', height: 160, alignItems: 'center' }}>
									 <Row style={{ height: 85, paddingTop: 15, width: 280, justifyContent: 'center' }}>
										 <Text style={{ fontSize: 16, color: '#8F8E8E', textAlign: 'center' }}>{this.state.item.desc}</Text>
									 </Row>
									 <Row style={{ height: 40, width: 85, backgroundColor: '#EDDECC', borderRadius: 30, justifyContent: 'center' }}>
										 <Text style={{ fontSize: 20, color: '#8F8E8E', textAlign: 'center', alignSelf: 'center' }}>{this.state.item.weight}{this.state.item.measure}</Text>
									 </Row>
							</Col>
						</Grid>
				</Content>
				<Footer style={styles.footer}>
					<View style={styles.footerblock}>
						<View style={styles.priceblock}>
							<Text style={styles.pricetext}>{this.state.item.price}</Text>
							<Text style={styles.currencytext}>руб</Text>
						</View>
						<View style={styles.addblock}>
							<Button bordered style={styles.addtocartbtn} onPress={()=>{this.prepareToAddToCart()}}>
								<View style={styles.addtocartblock}>
									<Text style={styles.addtocarttext}>В КОРЗИНУ</Text>
									<Icon name="cart" style={styles.addtocarticon} />
								</View>
							</Button>
						</View>
					</View>
				</Footer>
			</Container>
		);
	}
}

const mapStateToProps = state => {
	return {
		items: state.cart.items,
	};
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCart: (item) => dispatch(Actions.addCart(item)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemScreen);

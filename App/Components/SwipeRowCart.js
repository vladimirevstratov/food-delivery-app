import React, {PropTypes} from "react";
import { Image, BackHandler, View, FlatList, Animated, TouchableOpacity, TouchableHighlight, Alert, Slider, Dimensions } from "react-native";
import { Container, Header, Content, List, ListItem, Text, Left, Right, Body, Button, Icon, Title, Separator, Thumbnail } from 'native-base';
// Styles
import styles from './Styles/SwipeRowStyles';
import Interactable from 'react-native-interactable';
import { Colors } from '../Themes/';

const InteractableIcon = Animated.createAnimatedComponent(Icon);
const InteractableText = Animated.createAnimatedComponent(Text);

export default class SwipeRowCart extends React.Component {
  constructor(props) {
    super(props);
    this._deltaX = new Animated.Value(0);
    this.state = {
      isMoving: false,
      position: 1,
      //timer: 3500,
      //await: false
    };
  }

  /*componentDidMount() {
    this.props.onRef(this)
  }
  componentWillUnmount() {
    this.props.onRef(undefined)
  }*/

  //componentDidMount() {
  //  clearTimeout(this.timeout);
  //}

/*  componentWillUnmount() {
    if (this.timeout) {
      clearTimeout(this.timeout)
      //this.timeout = null
    }
  }

  timeout = (interactableEl) => {
          if(interactableEl){
            setTimeout(function() {
              interactableEl.snapTo({index: 1});
              console.log("Таймаут кончился");
            }, this.state.timer);
          }else{
            clearTimeout(this.timeout)
          }
  }
Этот код работает не корректно, так как неправильно происходит unmount компонента
*/

  /*setTimePassed() {
     this.setState({timePassed: true});
  }*/

  render() {
    const activeOpacity = this.state.position !== 1 ? 1 : 1;
    return (
      <View style={{backgroundColor: Colors.pink0}}>
        <View style={{position: 'absolute', right: 5, height: 75, flexDirection: 'row', alignItems: 'center'}}>
          <TouchableOpacity style={[styles.button]} onPress={()=>{
            this.props.action(this.props.index,-1);
            //this.state.await=false;
            //console.log(this.state.timer);
          }}>
            <InteractableIcon name="remove-circle" style={
              [styles.buttonIcon, {
                opacity: this._deltaX.interpolate({
                  inputRange: [-150, -115],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp'
                }),
                transform: [{
                  scale: this._deltaX.interpolate({
                    inputRange: [-150, -115],
                    outputRange: [1, 0.7],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                  })
                }]
              }
            ]} />
          </TouchableOpacity>
          <View style={[styles.button]}>
            <InteractableText style={
              [styles.buttonQty, {
                opacity: this._deltaX.interpolate({
                  inputRange: [-75, -50],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                  //extrapolateRight: 'clamp'
                }),
                transform: [{
                  scale: this._deltaX.interpolate({
                    inputRange: [-75, -50],
                    outputRange: [1, 0.7],
                    extrapolateLeft: 'clamp',
                    //extrapolateRight: 'clamp'
                  })
                }]
              }
            ]}>
            {this.props.qty}
            </InteractableText>
          </View>
          <TouchableOpacity style={[styles.button]} onPress={()=>{
            if(this.props.qty<99){
              this.props.action(this.props.index,1);
            }
            //this.state.await=true;
            //console.log(this.state.timer);
          }}>
            <InteractableIcon name="add-circle" style={
              [styles.buttonIcon, {
                opacity: this._deltaX.interpolate({
                  inputRange: [-75, -50],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                  //extrapolateRight: 'clamp'
                }),
                transform: [{
                  scale: this._deltaX.interpolate({
                    inputRange: [-75, -50],
                    outputRange: [1, 0.7],
                    extrapolateLeft: 'clamp',
                    //extrapolateRight: 'clamp'
                  })
                }]
              }
            ]} />
          </TouchableOpacity>
        </View>
        <View style={{position: 'absolute', left: 20, height: 75, flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity style={[styles.button]} onPress={()=>{
              this.props.action(this.props.index,0);
              const deletebtn = true;
            }}>
            <InteractableIcon name="trash" style={
              [styles.buttonIcon, {
                opacity: this._deltaX.interpolate({
                  inputRange: [50, 75],
                  outputRange: [0, 1],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp'
                }),
                transform: [{
                  scale: this._deltaX.interpolate({
                    inputRange: [50, 75],
                    outputRange: [0.7, 1],
                    extrapolateLeft: 'clamp',
                    extrapolateRight: 'clamp'
                  })
                }]
              }
            ]} />
            </TouchableOpacity>
        </View>
        <Interactable.View
          ref={el => this.interactableElem = el}
          horizontalOnly={true}
          snapPoints={[
            {x: 75, damping: 1-this.props.damping, tension: this.props.tension},
            {x: 0, damping: 1-this.props.damping, tension: this.props.tension},
            {x: -170, damping: 1-this.props.damping, tension: this.props.tension}
          ]}
          onSnap={this.onSnap.bind(this)}
          onDrag={this.onDrag.bind(this)}
          onStop={this.onStopMoving.bind(this)}
          onRowPress={this.onRowPress.bind(this)}
          dragToss={0.01}
          animatedValueX={this._deltaX}>
          <TouchableHighlight onPress={this.onRowPress.bind(this)} activeOpacity={activeOpacity} underlayColor={'#dddddd'}>
            <View style={{left: 0, right: 0, height: 75, backgroundColor: 'white'}}>
              {this.props.children}
            </View>
          </TouchableHighlight>
        </Interactable.View>
      </View>
    );
  }

  onSnap({nativeEvent}) {
    const { index } = nativeEvent;
    this.setState({position: index});
    /*if(!this.interactableElem){
      clearTimeout(this.timeout)
    }*/
  }

  onRowPress() {
    const { isMoving, position } = this.state;
/*    if (!isMoving && position == 2 || position == 0) {
      this.interactableElem.snapTo({index: 1});
    }else{
      this.interactableElem.snapTo({index: 2});
    }*/
    if (!isMoving && position == 1) {
      this.interactableElem.snapTo({index: 2});
    }else{
      this.interactableElem.snapTo({index: 1});
    }
  }
  onDrag({nativeEvent}) {
    const { state } = nativeEvent;
    if (state === 'start') {
      this.setState({isMoving: true});
    }
  }
  onStopMoving() {
    this.setState({isMoving: false});
    const element = this.interactableElem;
    /*const { position } = this.state;
    if(position == 2 && element){
      this.timeout(element);
    }*/
  }
  /*onButtonPress(name) {
    alert(`Button ${name} pressed`);
  }*/
}

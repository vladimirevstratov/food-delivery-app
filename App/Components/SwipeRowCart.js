import React, { useRef, useState } from 'react';
import {
  View,
  Animated,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
import {Text, Icon} from 'native-base';
import styles from './Styles/SwipeRowStyles';
import Interactable from 'react-native-interactable';
import {Colors} from '../Themes/';

const InteractableIcon = Animated.createAnimatedComponent(Icon);
const InteractableText = Animated.createAnimatedComponent(Text);

const SwipeRowCart = (props) => {
  const [componentState, setComponentState] = useState({
    isMoving: false,
    position: 1,
  });

  const interactableRef = useRef(null);

  const deltaX = useRef(new Animated.Value(0)).current;
  const deltaY = useRef(new Animated.Value(0)).current;

  const onSnap = ({nativeEvent}) => {
    const {index} = nativeEvent;
    setComponentState({...componentState, position: index});
  };

  const onRowPress = () => {
    const {isMoving, position} = componentState;

    if (!isMoving && position === 1) {
      interactableRef.current.snapTo({index: 2});
    } else {
      interactableRef.current.snapTo({index: 1});
    }
  };

  const onDrag = ({nativeEvent}) => {
    const {state} = nativeEvent;
    if (state === 'start') {
      setComponentState({...componentState, isMoving: true});
    }
  };

  const onStopMoving = () => {
    setComponentState({...componentState, isMoving: false});
  };

  const activeOpacity = componentState.position !== 1 ? 1 : 1;

  return (
    <View style={{backgroundColor: Colors.pink0}}>
      <View
        style={{
          position: 'absolute',
          right: 5,
          height: 75,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            props.action(props.index, -1);
          }}>
          <InteractableIcon
            name="remove-circle"
            style={[
              styles.buttonIcon,
              {
                opacity: deltaX.interpolate({
                  inputRange: [-150, -115],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: [
                  {
                    scale: deltaX.interpolate({
                      inputRange: [-150, -115],
                      outputRange: [1, 0.7],
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          />
        </TouchableOpacity>
        <View style={[styles.button]}>
          <InteractableText
            style={[
              styles.buttonQty,
              {
                opacity: deltaX.interpolate({
                  inputRange: [-75, -50],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                }),
                transform: [
                  {
                    scale: deltaX.interpolate({
                      inputRange: [-75, -50],
                      outputRange: [1, 0.7],
                      extrapolateLeft: 'clamp',
                    }),
                  },
                ],
              },
            ]}>
            {props.qty}
          </InteractableText>
        </View>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            if (props.qty < 99) {
              props.action(props.index, 1);
            }
          }}>
          <InteractableIcon
            name="add-circle"
            style={[
              styles.buttonIcon,
              {
                opacity: deltaX.interpolate({
                  inputRange: [-75, -50],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                }),
                transform: [
                  {
                    scale: deltaX.interpolate({
                      inputRange: [-75, -50],
                      outputRange: [1, 0.7],
                      extrapolateLeft: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <View
        style={{
          position: 'absolute',
          left: 20,
          height: 75,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <TouchableOpacity
          style={[styles.button]}
          onPress={() => {
            props.action(props.index, 0);
          }}>
          <InteractableIcon
            name="trash"
            style={[
              styles.buttonIcon,
              {
                opacity: deltaX.interpolate({
                  inputRange: [50, 75],
                  outputRange: [0, 1],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp',
                }),
                transform: [
                  {
                    scale: deltaX.interpolate({
                      inputRange: [50, 75],
                      outputRange: [0.7, 1],
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp',
                    }),
                  },
                ],
              },
            ]}
          />
        </TouchableOpacity>
      </View>
      <Interactable.View
        ref={interactableRef}
        horizontalOnly={true}
        snapPoints={[
          {
            x: 75,
            damping: 1 - props.damping,
            tension: props.tension,
          },
          {
            x: 0,
            damping: 1 - props.damping,
            tension: props.tension,
          },
          {
            x: -170,
            damping: 1 - props.damping,
            tension: props.tension,
          },
        ]}
        onSnap={onSnap}
        onDrag={onDrag}
        onStop={onStopMoving}
        onRowPress={onRowPress}
        dragToss={0.01}
        animatedValueX={deltaX}
        animatedValueY={deltaY}>
        <TouchableHighlight
          onPress={onRowPress}
          activeOpacity={activeOpacity}
          underlayColor={'#dddddd'}>
          <View
            style={{left: 0, right: 0, height: 75, backgroundColor: 'white'}}>
            {props.children}
          </View>
        </TouchableHighlight>
      </Interactable.View>
    </View>
  );
};

export default SwipeRowCart;

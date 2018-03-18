import React, { Component } from 'react'
import { View, StatusBar, Platform } from 'react-native'
import ReduxNavigation from '../Navigation/ReduxNavigation'
import { connect } from 'react-redux'
import StartupActions from '../Redux/StartupRedux'
import ReduxPersist from '../Config/ReduxPersist'
import SplashScreen from 'react-native-splash-screen'
import { Root } from "native-base";

import FCM from "react-native-fcm";

import {registerKilledListener, registerAppListener} from "../Services/Listeners";

// Styles
import styles from './Styles/RootContainerStyles'

registerKilledListener();

class RootContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: "",
      tokenCopyFeedback: ""
    }
  }

  async componentDidMount () {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup()
    }
    if(Platform.OS === 'android'){ 
      SplashScreen.hide();
    }
    registerAppListener(this.props.navigation);
    FCM.getInitialNotification().then(notif => {
      this.setState({
        initNotif: notif
      })
      /*if(notif.targetScreen === 'detail'){ Переход при нажатии на push уведомление
        setTimeout(()=>{
          this.props.navigation.navigate('Detail')
        }, 500)
      }*/
    });

    try{
      let result = await FCM.requestPermissions({badge: false, sound: true, alert: true});
    } catch(e){
      console.error(e);
    }

    FCM.getFCMToken().then(token => {
      console.log("TOKEN (getFCMToken)", token);
      this.setState({token: token || ""});
      FCM.subscribeToTopic('/topics/news');
    });

    if(Platform.OS === 'ios'){
      FCM.getAPNSToken().then(token => {
        console.log("APNS TOKEN (getFCMToken)", token);
        FCM.subscribeToTopic('/topics/news');
      });
    }
  }

  render () {
    return (
      <Root style={styles.applicationView}>
        <ReduxNavigation />
      </Root>
    )
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup())
})

export default connect(null, mapDispatchToProps)(RootContainer)

import React, {Component} from 'react';
import {View, StatusBar, Platform} from 'react-native';
import ReduxNavigation from '../Navigation/ReduxNavigation';
import {connect} from 'react-redux';
import StartupActions from '../Redux/StartupRedux';
import ReduxPersist from '../Config/ReduxPersist';
import SplashScreen from 'react-native-splash-screen';
import {Root} from 'native-base';

//import {registerKilledListener, registerAppListener} from "../Services/Listeners";

// Styles
import styles from './Styles/RootContainerStyles';

registerKilledListener();

class RootContainer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      token: '',
      tokenCopyFeedback: '',
    };
  }

  async componentDidMount() {
    // if redux persist is not active fire startup action
    if (!ReduxPersist.active) {
      this.props.startup();
    }
    if (Platform.OS === 'android') {
      SplashScreen.hide();
    }
    registerAppListener(this.props.navigation);
  }

  render() {
    return (
      <Root style={styles.applicationView}>
        <ReduxNavigation />
      </Root>
    );
  }
}

// wraps dispatch to create nicer functions to call within our component
const mapDispatchToProps = (dispatch) => ({
  startup: () => dispatch(StartupActions.startup()),
});

export default connect(null, mapDispatchToProps)(RootContainer);

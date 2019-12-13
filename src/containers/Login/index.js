import React, {Component} from 'react';
import PhoneInput from 'react-native-phone-input';
import {connect} from 'react-redux';
import {View, StatusBar, Alert} from 'react-native';
import {Container, Item, Input, Button, Text} from 'native-base';
import {
  phoneChanged,
  codeChanged,
  onCodeDispatched,
  onPhoneLogin,
  clearAuth,
  onSignOut,
} from '../../store/actions';
import firebase from 'react-native-firebase';
import {GoogleSignin, GoogleSigninButton} from 'react-native-google-signin';

export default class LoginScreen extends Component {
  static navigationOptions = {
    header: null,
  };

  constructor() {
    super();
    this.state = {
      valid: '',
      number: '',
      code: '',
      isOtp: false,
      confirmResult: null,
    };
  }

  // componentDidMount() {
  //   this.unsubscribe = firebase.auth().onAuthStateChanged(user => {
  //     if (user) {
  //       this.props.navigation.navigate('Home');
  //     }
  //   });
  // }

  // componentWillUnmount() {
  //   if (this.unsubscribe) this.unsubscribe();
  // }

  componentDidMount() {
    GoogleSignin.configure();
  }

  _configureGoogleSignIn() {
    // GoogleSignin.configure({
    //   scopes: ["https://www.googleapis.com/auth/drive.readonly"],
    //   webClientId:
    //     "3426880691-r45kflhulo6nppvphlq11mp7nltlkjt9.apps.googleusercontent.com", //Replace with your own client id
    //   offlineAccess: true,
    //   hostedDomain: "",
    //   loginHint: "",
    //   forceConsentPrompt: true,
    //   accountName: "",
    //   iosClientId:
    //     "XXXXXX-krv1hjXXXXXXp51pisuc1104q5XXXXXXe.apps.googleusercontent.com"
    // });
  }

  _signIn = async props => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const obj = {};

      obj.name = userInfo.user.name;
      obj.id = userInfo.user.id;
      obj.email = userInfo.user.email;
      obj.photo = userInfo.user.photo;

      await GoogleSignin.revokeAccess();

      alert(userInfo.user.name);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // sign in was cancelled
        Alert.alert('cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation in progress already
        Alert.alert('in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        Alert.alert('play services not available or outdated');
      } else {
        console.log('Something went wrong:', error.toString());
        Alert.alert('Something went wrong', error.toString());
        this.setState({
          error,
        });
      }
    }
  };

  onPhoneChange(number) {
    this.setState({number});
  }

  onLoginButtonPress() {
    const {number} = this.state;

    firebase
      .auth()
      .signInWithPhoneNumber('+92' + number)
      .then(confirmResult => {
        this.setState({
          confirmResult,
          message: 'Code has been sent!',
          isOtp: true,
        });
        console.log('confirmResult: ', confirmResult);
        this.props.navigation.navigate('OtpVerification', {
          confirmResult: confirmResult,
        });
      })
      .catch(error => {
        Alert.alert(JSON.stringify(error));
        console.log(error);
      });
  }

  renderPhoneNumberInput() {
    const {auth} = this.props;
    return (
      <View
        style={{
          paddingRight: 20,
          paddingLeft: 20,
        }}>
        <Item
          rounded
          style={{
            backgroundColor: 'white',
            alignContent: 'center',
          }}>
          <Input
            style={{
              textAlign: 'center',
            }}
            maxLength={15}
            keyboardType={'phone-pad'}
          />
          <PhoneInput
            ref={ref => {
              this.phone = ref;
            }}
            style={{
              alignContent: 'center',
              justifyContent: 'center',
            }}
            textStyle={{
              fontSize: 20,
              fontWeight: 'bold',
            }}
            onChangePhoneNumber={e => this.onPhoneChange(e)}
            value={this.state.number}
          />
        </Item>
        <Button
          light
          rounded
          style={{
            width: '100%',
            marginTop: 10,
            justifyContent: 'center',
          }}
          // onPress={() => alert("wore")}
          onPress={this.onLoginButtonPress.bind(this)}>
          <Text
            style={{
              fontSize: 20,
              color: '#042a41',
              fontWeight: 'bold',
            }}>
            Log in With Phone
          </Text>
        </Button>
      </View>
    );
  }

  render() {
    return (
      <Container style={{flex: 1, backgroundColor: '#4F6D7A'}}>
        <StatusBar barStyle="light-content" backgroundColor="#062b40" />
        <Container
          style={{
            flex: 1,
            justifyContent: 'center',
            backgroundColor: '#4F6D7A',
          }}>
          {this.renderPhoneNumberInput()}
          <GoogleSigninButton
            style={{width: 192, height: 48}}
            size={GoogleSigninButton.Size.Wide}
            color={GoogleSigninButton.Color.Dark}
            onPress={this._signIn}
            disabled={this.state.isSigninInProgress}
          />
        </Container>
      </Container>
    );
  }
}

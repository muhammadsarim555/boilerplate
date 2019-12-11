import React, {Component} from 'react';
import PhoneInput from 'react-native-phone-input';
import {connect} from 'react-redux';
import {View, StatusBar} from 'react-native';
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

  componentWillUnmount() {
    if (this.unsubscribe) this.unsubscribe();
  }

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
        console.log(error);
        // this.setState({
        //   message: `Sign In With Phone Number Error:
        //   ${error.message}`,
        // });
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
        </Container>
      </Container>
    );
  }
}

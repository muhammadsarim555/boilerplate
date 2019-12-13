import React, {Component} from 'react';
import PhoneInput from 'react-native-phone-input';
import {connect} from 'react-redux';
import {View, StatusBar,Alert} from 'react-native';
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

export default class OtpVerification extends Component {
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

  onCodeChange(code) {
    this.setState({code});
  }

  verifyOTP = async () => {
    const {confirmResult} = this.props.navigation.state.params;
    let otp = this.state.code;
    if (confirmResult && otp) {
      alert(otp);
      confirmResult
        .confirm(otp)
        .then(user => {
          console.log('oho!', user);
          this.props.navigation.navigate('Home');
        })
        .catch(error => {
          Alert.alert(JSON.stringify(error)) &&
            this.setState({
              message: `Code Confirm Error: ${error.message}`,
            });
        });
    }
  };

  renderCodeInput() {
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
              fontSize: 20,
              color: '#042a41',
              fontWeight: 'bold',
            }}
            maxLength={8}
            keyboardType={'numeric'}
            placeholder="confirmation code here"
            onChangeText={this.onCodeChange.bind(this)}
            value={this.state.code}
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
          onPress={() => this.verifyOTP()}>
          <Text
            style={{
              fontSize: 20,
              color: '#042a41',
              fontWeight: 'bold',
            }}>
            Enter Code
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
          {this.renderCodeInput()}
        </Container>
      </Container>
    );
  }
}

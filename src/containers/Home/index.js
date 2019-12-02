import React, {Component} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';

// FILES
import {Components} from '../../components';
import Icon from 'react-native-vector-icons/Feather';

import MapView, {PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const leftIcon = props => {
  return (
    <TouchableOpacity
      //   onPress={() => props.navigation.navigate('Dashboard')}
      style={{
        width: 45,
        height: 45,
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 27,
        shadowColor: '#00000021',
        shadowOffset: {
          width: 0,
          height: 6,
        },
        shadowOpacity: 0.37,
        shadowRadius: 7.49,
        elevation: 3,
      }}>
      <Icon name={'arrow-left'} size={22} color={'blue'} />
    </TouchableOpacity>
  );
};

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
        {/* <Components.Header leftIcon={leftIcon(this.props)} /> */}

        <MapView
          provider={PROVIDER_GOOGLE} // remove if not using Google Maps
          style={{
            height: 400,
            width: 400,
            justifyContent: 'flex-end',
            alignItems: 'center',
          }}
          region={{
            latitude: 37.78825,
            longitude: -122.4324,
            latitudeDelta: 0.015,
            longitudeDelta: 0.0121,
          }}></MapView>
      </View>
    );
  }
}

export default Home;

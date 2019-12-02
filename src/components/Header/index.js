import React, {Component} from 'react';
import {View} from 'react-native';
import {withNavigation} from 'react-navigation';

class Header extends Component {
  constructor(props) {
    super(props);
  }

  static defaultProps = {
    defaultHeaderImage: null,
    defaultHeaderColor: null,
    leftIcon: null,
    rightIcon: null,
    title: null,
    titleStyle: null,
  };

  render() {
    const {leftIcon, rightIcon} = this.props;

    return (
      <View
        style={{
          width: '100%',
          backgroundColor: 'transparent',
          height: '8%',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}>
        {leftIcon}
        {rightIcon}
      </View>
    );
  }
}

export default withNavigation(Header);

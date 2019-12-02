import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import {createStackNavigator} from 'react-navigation-stack';

// SCREENS
import {Screens} from '../containers';

const AppNavigator = createStackNavigator(
  {
    Login: Screens.Login,
    Home: Screens.Home,
  },

  // {
  //   headerMode: 'none',
  //   navigationOptions: {
  //     headerVisible: false,
  //     header: null,
  //     headerForceInset: {top: 'never', bottom: 'never'},
  //   },
  // },
);

export default createAppContainer(AppNavigator);

// export default createAppContainer(
//     createSwitchNavigator(
//       {
//         AuthLoading: Loader,
//         App: AppNavigator,
//         Auth: AuthStack
//       },
//       {
//         initialRouteName: "AuthLoading"
//       }
//     )
//   );

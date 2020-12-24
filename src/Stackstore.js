import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Store from '../src/screens/store';
import Infor from '../src/screens/inforproduct';
import theme from './utils/theme';
const Stack = createStackNavigator();

export default class Stackstore extends Component {
  render() {
    return (
      <Stack.Navigator initialRouteName="store">
        <Stack.Screen
          name="store"
          component={Store}
          options={{
            headerShown: false,
          }}></Stack.Screen>
        <Stack.Screen
          name="inforproduct"
          component={Infor}
          options={{
            headerStyle: {
              backgroundColor: theme.COLOR_PRIMARY,
            },
            headerTitle: 'Thông tin sản phẩm',
            headerTintColor: 'white',
          }}></Stack.Screen>
      </Stack.Navigator>
    );
  }
}

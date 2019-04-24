import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import NavigationService from './services/navigationService';
import LoadingScreen from './components/LoadingScreen';
import MenuScreen from './components/MenuScreen';
import NationalScreen from './components/national/NationalScreen';
import MPScreen from './components/national/MPScreen';
import MPProfileScreen from './components/national/MPProfileScreen';
import * as firebase from "firebase";
import Login from "./components/Login";

const _Nav = createStackNavigator({
  Loading: LoadingScreen,
  Menu: MenuScreen,
  National: NationalScreen,
  MPS: MPScreen,
  MPP: MPProfileScreen,
  Login: Login
},
  {
    initialRouteName: "Loading",
    headerMode: 'none'
  });
const AppContainer = createAppContainer(_Nav);

export default class App extends React.Component {

  render() {
    return (
      <AppContainer
        ref={(_NavRef) => {
          NavigationService.setTopLevelNavigator(_NavRef);
        }}>
      </AppContainer>
    );
  }
}
// Initialize Firebase
var config = {
  apiKey: "AIzaSyC5clVP4VjIRjIlfY-RHZOCj3d4czzshRU",
  authDomain: "votey-96189.firebaseapp.com",
  databaseURL: "https://votey-96189.firebaseio.com",
  projectId: "votey-96189",
  storageBucket: "votey-96189.appspot.com",
  messagingSenderId: "382852666477"
};
firebase.initializeApp(config);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

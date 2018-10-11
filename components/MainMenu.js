import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Alert,
	ActivityIndicator
} from "react-native";
import MainOptions from "./MainOptions";
import CreatePlayers from "./CreatePlayers";
import { createStackNavigator, navigationOptions } from "react-navigation";


export default class MainMenu extends React.Component {
  render() {
    return (
      <View style={mainMenuStyles.container}>
        <AppStack />
      </View>
    )
  }
}

const AppStack = createStackNavigator(
	{
		Main: { screen: MainOptions },
		Players: { screen: CreatePlayers },
	},
	{
		navigationOptions: {
			title: "White Tigers - Login",
			headerStyle: {
				backgroundColor: "#002033"
			},
			headerTitleStyle: {
				color: "#FFFFFF"
			}
		}
	}
);

const mainMenuStyles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		width: '100%'
	}
})

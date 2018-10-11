import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Alert,
	ActivityIndicator,
	Image
} from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import * as firebase from "firebase";
import LoginForm from "./components/LoginForm";
import CreatePlayers from "./components/CreatePlayers";
import MainMenu from "./components/MainMenu";
import { createStackNavigator, navigationOptions } from "react-navigation";

export default class App extends React.Component {
	constructor(props) {
		super(props);
		//this.inputRefs = {};
		this.state = {
			loggedIn: false,
			waitingValidation: true
		};
		this.renderContent = this.renderContent.bind(this);
	}

	async componentWillMount() {
		// Initialize Firebase
		var config = {
			apiKey: "AIzaSyCK94wRIdWlBrmRWABvp5jm9NLLaoSgwOE",
			authDomain: "white-tigersdb.firebaseapp.com",
			databaseURL: "https://white-tigersdb.firebaseio.com",
			projectId: "white-tigersdb",
			storageBucket: "white-tigersdb.appspot.com",
			messagingSenderId: "460147339745"
		};
		firebase.initializeApp(config);

		firebase.auth().onAuthStateChanged(user => {
			debugger;
			if (user) {
				// User is signed in.
				this.setState({ loggedIn: true, waitingValidation: false });
				debugger;
			} else {
				// No user is signed in.
				this.setState({ loggedIn: false, waitingValidation: false });
			}
		});
	}

	renderContent() {
		let loggedIn = this.state.loggedIn;
		let validation = this.state.waitingValidation;
		if (validation === true && loggedIn === false) {
			return (
				<View>
					<Image
						style={{
							flex: 1,
							alignSelf: 'center',
							width: 150
						}}
						source={require("./images/wtlogo.png")}
						resizeMode="stretch"
					/>
				</View>
			);
		} else if (loggedIn === false && validation === false) {
			return (
				<LoginForm />
			);
		} else if (loggedIn === true && validation === false) {
			return (
				<MainMenu />
			);
		}
		/*<Header
			placement="left"
			leftComponent={{ icon: "menu", color: "#fff" }}
			centerComponent={{ text: "White Tigers", style: { color: "#fff" } }}
			outerContainerStyles={{
				alignSelf: "stretch",
				marginBottom: 20,
				backgroundColor: "#212D40"
			}}
		/>*/
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					backgroundColor: "#FFFFFF",
					justifyContent: "center",
					alignItems: 'center'
				}}>
				{this.renderContent()}
			</View>
		);
	}
}

/*const AppStack = createStackNavigator(
	{
		Login: { screen: LoginForm },
		Home: { screen: CreatePlayers }
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
);*/

const mainPage = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#FFFFFF"
	},
	titleText: {
		textAlign: "center",
		marginBottom: 15,
		fontSize: 18
	},
	dropdownText: {
		textAlign: "left",
		marginLeft: 10
	}
});

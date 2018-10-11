import React from "react";
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Alert,
	ActivityIndicator
} from "react-native";
import { Button } from "react-native-elements";
import Input from "./Input";
import CreatePlayers from './CreatePlayers';
import MainMenu from './MainMenu';
import * as firebase from "firebase";


export default class LoginForm extends React.Component {
	constructor(props) {
		super(props);
		//this.inputRefs = {};
		this.state = {
			email: "",
			password: "",
			error: "",
			loading: false
		};
		this.onLogin = this.onLogin.bind(this);
		this.loginSuccess = this.onLogin.bind(this);
	}

	onLogin() {
		this.setState({ error: "", loading: true });
		let email = this.state.email;
		let password = this.state.password;
		let error = this.state.error;
    email = email.replace(/ $/, "");
		const loginSuccess = this.loginSuccess;
		firebase
			.auth()
			.signInWithEmailAndPassword(email, password)
			.then(() => {
        //if login was successful
				this.setState({ error: "", loading: false, email: '', password: '' });
        console.log("logged in");

			})
			.catch(() => {
				this.setState({ error: "Authentication failed", loading: false });
				console.log("failed");
			});
      //navigation.navigate('CreatePlayers');
	}

	loginSuccess() {
		console.log("success");
	}

  renderContent() {
    let loading = this.state.loading;
    let email = this.state.email;
    let password = this.state.password;
    let loginFn = this.onLogin;
    if(loading === false){
      return (
        <View style={{ backgroundColor: 'white', height: '100%', paddingTop: 20 }}>
          <Input
            placeholder="user@mail.com"
            label="Email"
            value={email}
            onChangeText={email => this.setState({ email })}
          />
          <Input
            secureTextEntry
            placeholder="**********"
            label="Password"
            value={password}
            onChangeText={password => this.setState({ password })}
          />
          <Button
            onPress={loginFn}
            title="Log In"
            buttonStyle={{
              backgroundColor: "rgba(62, 146, 204, 1)",
              width: 250,
              height: 45,
              borderColor: "transparent",
              borderWidth: 0,
              borderRadius: 5,
              alignSelf: "center"
            }}
            color="#fff"
            accessibilityLabel="Login"
          />
        </View>
      );
    }
    else if(loading === true) {
      return (
      <View style={{ backgroundColor: 'white', height: '100%', paddingTop: 20 }}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={{ textAlign: 'center' }}>Logging in...</Text>
      </View>
      );
    }
    /*else if(loading === false && loggedIn === true){
      console.log("my loading is false and logged in is true");
      return(
        <View>
          <MainMenu />
        </View>
      );
    }*/
  }

	render() {
		return (
      <View>
        {this.renderContent()}
      </View>
		);
	}
}

const styles = {
	containerStyle: {
		backgroundColor: '#FFFFFF'
	}
};

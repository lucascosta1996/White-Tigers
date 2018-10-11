import React from "react";
import { StyleSheet, Text, View, TextInput, Alert } from "react-native";
import { Header } from "react-native-elements";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
import firebase from "firebase";
import RNPickerSelect from "react-native-picker-select";

export default class CreatePlayers extends React.Component {
	constructor(props) {
		super(props);
		this.inputRefs = {};
		this.state = {
			firstname: "",
     		secondname: "",
			age: "",
			positions: [],
			mainposition: "",
			secondaryposition: "",
			bloodtype: ""
		};
		this.createPlayer = this.createPlayer.bind(this);
		//this.alertPostState = this.alertPostState.bind(this);
	}

	async componentWillMount() {
		firebase
			.database()
			.ref("Positions")
			.once("value", data => {
				positionsList = new Array();
				let i = 0;
				data.forEach(item => {
					let position = new Object();
					position.label = item.toJSON();
					position.value = item.toJSON();
					positionsList.push(position);
				});
				this.setState({ positions: positionsList });
			});
	}

	/*alertPostState() {
		Alert.alert("Player added!", "My Alert Msg", {
			text: "Ok",
			onPress: () => console.log("Ask me later pressed")
		});
	}*/

	createPlayer(e) {
		let firstname = this.state.firstname;
    	let lastname = this.state.lastname;
		let age = this.state.age;
		let mainposition = this.state.mainposition;
		let secondaryposition = this.state.secondaryposition;
		let bloodtype = this.state.bloodtype;
    	let fullname = firstname + lastname;
		let nameId = fullname.replace(" ", "");
		debugger;
		firebase
			.database()
			.ref("Players/" + nameId.toLowerCase())
			.set({
				firstname: firstname,
        lastname: lastname,
				age: age,
				mainposition: mainposition,
				secondaryposition: secondaryposition,
				bloodtype: bloodtype
			})
			.then(() => {
        this.setState({});
				console.log("inserted");
				debugger;
				this.alertPostState();
			})
			.catch(error => {
				console.log("error");
			});
	}

	render() {
		return (
			<View style={styles.container}>
        <Text style={styles.titleText}>Add Player</Text>
        <TextInput
					underlineColorAndroid={"transparent"}
					onChangeText={firstname => this.setState({ firstname })}
					placeholder="First Name"
					style={styles.input}
				/>
				<TextInput
					underlineColorAndroid={"transparent"}
					onChangeText={lastname => this.setState({ lastname })}
					placeholder="Last Name"
					style={styles.input}
				/>
				<Text style={styles.dropdownText}>What's player's main position?</Text>
				<RNPickerSelect
					placeholder={{
						label: "Select a position...",
						value: null
					}}
					items={this.state.positions}
					onValueChange={value => {
						this.setState({
							mainposition: value
						});
					}}
					onUpArrow={() => {
						this.inputRefs.name.focus();
					}}
					onDownArrow={() => {
						this.inputRefs.picker2.togglePicker();
					}}
					style={{ ...pickerSelectStyles }}
					value={this.state.mainposition}
					ref={el => {
						this.inputRefs.picker = el;
					}}
				/>
				<Text style={styles.dropdownText}>What's player's secondary position?</Text>
				<RNPickerSelect
					placeholder={{
						label: "Select a position...",
						value: null
					}}
					items={this.state.positions}
					onValueChange={value => {
						this.setState({
							secondaryposition: value
						});
					}}
					onUpArrow={() => {
						this.inputRefs.name.focus();
					}}
					onDownArrow={() => {
						this.inputRefs.picker2.togglePicker();
					}}
					style={{ ...pickerSelectStyles }}
					value={this.state.secondaryposition}
					ref={el => {
						this.inputRefs.picker = el;
					}}
				/>
				<TextInput
					underlineColorAndroid={"transparent"}
					onChangeText={age => this.setState({ age })}
					placeholder="Age"
					style={styles.input}
				/>
				<TextInput
					underlineColorAndroid={"transparent"}
					onChangeText={bloodtype => this.setState({ bloodtype })}
					placeholder="Blood type"
					style={styles.input}
				/>
				<Button
					onPress={this.createPlayer}
					title="Add"
					buttonStyle={{
						backgroundColor: "rgba(62, 146, 204, 1)",
						width: 250,
						height: 45,
						borderColor: "transparent",
						borderWidth: 0,
						borderRadius: 5,
						alignSelf: 'center'
					}}
					color="#fff"
					accessibilityLabel="Insert new player in database"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		width: '90%'
	},
	input: {
		fontSize: 16,
		borderColor: "#A0A0A0",
		borderBottomWidth: 1,
		alignSelf: "stretch",
		marginTop: 10,
		marginLeft: 10,
		marginRight: 10,
		marginBottom: 15
	},
	titleText: {
		textAlign: 'center',
		marginBottom: 15,
		fontSize: 18
	},
	dropdownText: {
		textAlign: 'left',
		marginLeft: 10
	}
});

const pickerSelectStyles = StyleSheet.create({
	underline: {
		alignSelf: 'stretch',
		paddingTop: 0,
		marginTop: 0,
		marginLeft: 0,
		marginRight: 0,
	},
	viewContainer: {
		paddingTop: 0,
		paddingBottom: 0,
		marginBottom: 15,
		paddingLeft: 0,
		marginTop: 0,
		marginLeft: 10,
		marginRight: 10
	},
	inputIOS: {
        fontSize: 8,
        paddingTop: 5,
        paddingHorizontal: 10,
        paddingBottom: 5,
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 4,
        backgroundColor: 'white',
        color: 'black',
    }

});

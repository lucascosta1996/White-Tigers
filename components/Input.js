import React from "react";
import { StyleSheet, TextInput, View, Text } from "react-native";

const Input = ({
	label,
	value,
	onChangeText,
	placeholder,
	secureTextEntry
}) => {
	const { inputStyle, containerStyle, labelStyle } = styles;
	return (
		<View style={containerStyle}>
			<Text style={labelStyle}> {label} </Text>
			<TextInput
				secureTextEntry={secureTextEntry}
				placeholder={placeholder}
				autocorrect={false}
				value={value}
				onChangeText={onChangeText}
				style={inputStyle}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
  inputStyle: {
    fontSize: 16,
		borderColor: "#FFFFFF",
    borderBottomColor: "#FFFFFF",
    paddingBottom: 10,
    paddingLeft: 5,
		borderBottomWidth: 1,
		alignSelf: "stretch",
		marginTop: 10,
		marginLeft: 5,
		marginRight: 5,
		marginBottom: 15
	},
  labelStyle: {
    textAlign: 'left',
    marginLeft: 5,
    fontWeight: 'bold'
    },
  containerStyle: {
    width: '100%'
    }
})

export default Input;

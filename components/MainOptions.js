import React from 'react';
import {
	StyleSheet,
	Text,
	View,
	TextInput,
	Alert,
	ActivityIndicator
} from "react-native";
import { createStackNavigator, navigationOptions } from "react-navigation";

export default class MainOptions extends React.Component {

  componentDidMount(){
    console.log("main options");
  }

  render(){
    return(
      <View style={{ backgroundColor: '#000000'  }}>
        <Text>Main Options</Text>
      </View>
    );
  }
}

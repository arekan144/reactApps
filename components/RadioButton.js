import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

class RadioButton extends Component {
    constructor(props) {
        super(props);
        // this.state = {
        //     checked: false
        // };
    }
    handlePress = () => {
        // console.log("??")
        this.props.change(this.props.id)
    }
    render() {
        return (
            <TouchableOpacity onPress={this.handlePress} style={{ margin: 6, flexDirection: 'row' }} >
                <Image style={{ width: 30, height: 30 }} source={this.props.checked ? require('./ye.png') : require('./no.png')} />
                <Text style={{ color: "white" }}> {this.props.name} </Text>
            </TouchableOpacity>
        );
    }
}

export default RadioButton;

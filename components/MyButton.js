import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
class MyButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }
    handleOnPress = () => {
        this.props.onPress();
    }
    render() {
        return (
            <TouchableOpacity
                style={
                    {
                        alignItems: "center",
                        backgroundColor: this.props.bgColor,
                        padding: 10
                    }
                }
                onPress={this.handleOnPress}
            >
                <Text style={{ color: this.props.txtColor, fontSize: 10 }}> {this.props.title} </Text>
            </TouchableOpacity>
        );
    }
}

MyButton.propTypes = {
    onPress: PropTypes.func.isRequired,
    title: PropTypes.string.isRequired,
    bgColor: PropTypes.string.isRequired,
    txtColor: PropTypes.string.isRequired
};

export default MyButton;

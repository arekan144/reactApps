import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
export default class SpecialButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pos: 0,
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
                        backgroundColor: 'rgba(100,100,100,0.4)',
                        padding: 10,
                        borderRadius: 100,
                        width: 100,
                        height: 100,
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }
                }
                onPress={this.handleOnPress}
            >

                <Image
                    style={{

                        alignSelf: 'center',


                    }}

                    source={require('./plus.png')}
                />

            </TouchableOpacity>
        );
    }
}
SpecialButton.propTypes = {
    onPress: PropTypes.func.isRequired,
};
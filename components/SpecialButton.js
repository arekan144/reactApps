import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, Dimensions } from 'react-native';
import PropTypes from 'prop-types';
export default class SpecialButton extends Component {
    constructor(props) {
        super(props);
        this.state = {
            obrazek: this.props.obrazek,
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
                        width: Dimensions.get('window').width * this.props.mnoznik,
                        height: Dimensions.get('window').width * this.props.mnoznik,
                        justifyContent: 'center',
                        alignSelf: 'center'
                    }
                }
                onPress={this.handleOnPress}
            >

                <Image
                    style={{

                        alignSelf: 'center',
                        // width: Dimensions.get('window').width * 0.3,
                        // height: Dimensions.get('window').width * 0.3,

                    }}

                    source={(this.props.obrazek == './plus.png') ? require('./plus.png') : ((this.props.obrazek == './stn.png') ? require('./stn.png') : require('./odw.png'))}
                />

            </TouchableOpacity>
        );
    }
}
SpecialButton.propTypes = {
    onPress: PropTypes.func.isRequired,
};
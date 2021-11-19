import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Image, ActivityIndicator, ImageBackground } from 'react-native';
import PropTypes from 'prop-types';
export default class FotoItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        }
        // console.log(this.props.selected, this.props.source)
    }
    onPressHandle = () => {
        // alert("id " + this.props.id)
        this.props.onpress(this.props.id)
    }
    onLongPressHandle = () => {
        // console.log("long")
        this.props.onlonghandle(this.props.id)
    }
    render() {

        return (
            <TouchableOpacity
                onPress={this.onPressHandle}
                onLongPress={this.onLongPressHandle}
                style={{
                    width: this.props.width,
                    height: this.props.height,
                    borderRadius: 100,
                }}
            >
                <ImageBackground
                    resizeMode="cover"
                    style={{
                        overflow: 'hidden',
                        width: this.props.width,
                        height: this.props.height,
                        alignItems: 'flex-end',
                        justifyContent: 'flex-end',
                    }}
                    source={{ uri: this.props.source }}
                    onLoadEnd={() => this.setState({ loading: false })}
                >
                    {this.props.selected ?
                        <Image
                            style={{
                                width: this.props.height,
                                alignSelf: 'center',
                                height: this.props.height,
                            }}
                            source={require('./plus.png')}
                        /> :
                        null
                    }
                    {this.state.loading ?
                        <ActivityIndicator size="large"
                            animating={this.state.loading}
                            color="#ff0000" /> :
                        null}
                    <View style={{ backgroundColor: 'black' }}><Text style={{ color: 'white' }} >{this.props.id}</Text></View>
                </ImageBackground>

            </TouchableOpacity>
        );
    }
}

FotoItem.propTypes = {
    id: PropTypes.string.isRequired,
    width: PropTypes.number.isRequired,
    // height: PropTypes.number,
    // selected: PropTypes.bool.isRequired,
    source: PropTypes.string.isRequired
};
import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

export default class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: '#8BC34A' }}>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Galery")}
                    style={{ flex: 1, margin: 25, alignItems: 'center', justifyContent: 'flex-end' }}>
                    <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}> Camera App</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, margin: 25, alignItems: 'center' }}>
                    <Text style={{ fontSize: 12, color: 'white' }}> show gallery pictures </Text>
                    <Text style={{ fontSize: 12, color: 'white' }}> take picture from camera </Text>
                    <Text style={{ fontSize: 12, color: 'white' }}> save photo to device </Text>
                    <Text style={{ fontSize: 12, color: 'white' }}> delete photo from device </Text>
                    <Text style={{ fontSize: 12, color: 'white' }}> share photo </Text>
                </View>
            </View >
        );
    }
}

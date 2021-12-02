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
                    <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}> Camera App 2</Text>
                </TouchableOpacity>
                <View style={{ flex: 1, margin: 25, alignItems: 'center' }}>
                    {/* <Text style={{ fontSize: 12, color: 'white' }}> Camera App 2 </Text> */}
                    <Text style={{ fontSize: 12, color: 'white' }}> change camera white balance</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}> change camera flash mode</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}> change camera picture size</Text>
                    <Text style={{ fontSize: 12, color: 'white' }}> change camera camera ratio</Text>
                </View>
            </View >
        );
    }
}

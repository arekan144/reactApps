import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', flexDirection: 'column', backgroundColor: '#8BC34A' }}>
                <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}>Arkadiusz Sala</Text>
                <TouchableOpacity onPress={() => this.props.navigation.navigate("Show")}>
                    <Text style={{ fontSize: 35, fontWeight: 'bold', color: 'white' }}> Sqlite App</Text>
                </TouchableOpacity>
                <Text style={{ fontSize: 12, color: 'white' }}> manage sqlite</Text>
                <Text style={{ fontSize: 12, color: 'white' }}> use animation</Text>
                <Text style={{ fontSize: 12, color: 'white' }}> use ring</Text>

            </View>
        );
    }
}



export default Main;

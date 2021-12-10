import React, { Component, version } from 'react';
import { View, Text } from 'react-native';
import SpecialButton from './SpecialButton';
import Database from './Database';

export default class AddMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        return (

            <View style={{ flex: 1, alignItems: 'flex-end', justifyContent: 'space-around' }} >
                <View style={{ alignSelf: 'center', }}>
                    <Text> "+" dodaje do bazy budzik z godziną 00:00 </Text>
                </View>
                <SpecialButton onPress={() => {
                    Database.add('00:00:00', JSON.stringify([]), 0)
                    this.props.route.params.do()
                    this.props.navigation.goBack();
                }} />
            </View>

        );
    }
}

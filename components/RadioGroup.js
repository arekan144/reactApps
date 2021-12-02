import React, { Component } from 'react';
import { View, Text } from 'react-native';
import RadioButton from './RadioButton';

class RadioGroup extends Component {
    constructor(props) {
        super(props);

        // console.log(this.state.chosen)
    }
    change = (data) => {
        // this.setState({ chosen: data })
        this.props.change(this.props.id, data);

        // console.log(this.state.chosen)
    }
    render() {
        let a = this.props.data.map((dat, i) => {
            return <RadioButton id={i} change={this.change} key={i + (Math.random() * 5)} checked={i == this.props.selected} name={dat} />
        })

        // console.log(a);
        return (
            <View style={{ padding: 25, flex: 1 }}>
                <Text style={{ color: "white", fontSize: 16 }}>
                    {/* {this.props.color}, {JSON.stringify(this.change)},
                    {this.props.direction}, {JSON.stringify(this.props.data)}, */}
                    {this.props.groupName}
                </Text>
                {a}
            </View>
        );
    }
}

export default RadioGroup;

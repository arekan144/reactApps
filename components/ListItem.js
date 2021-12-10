import React, { Component } from 'react';

import { View, Text, Dimensions } from 'react-native';
import SpecialButton from './SpecialButton';
import DataItem from './DataItem';



class ListItem extends Component {
    constructor(props) {
        super(props);
        this.week = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz']
        this.state = {
            data: []
        };
        if (typeof this.props.data == 'object')
            for (let x = 0; x < this.props.data.length; x++) {
                this.state.data[x] = this.props.data[x];
            }
    }
    changeSwitch = (n) => {
        let index = this.state.data.findIndex(el => el.key == n);
        // console.log(index)
        if (index == -1)
            return -1;
        let prev = this.state.data;
        prev[index].is = !prev[index].is
        //console.log(prev[index])

        this.setState({
            data: [...prev],
        })
    }
    addDay = (n, day) => {
        let index = this.state.data.findIndex(el => el.key == n);
        if (index == -1)
            return -1;
        let prev = this.state.data;
        if (typeof day == 'object')
            prev[index].chosen = day;
        else
            prev[index].chosen = []
        // let inday = prev[index].chosen.indexOf(day);
        // if (inday != -1) {
        //     prev[index].chosen.splice(inday, 1);
        // }
        // else {
        //     prev[index].chosen.push(day);
        // }

        this.setState({ data: prev });
        // console.log(prev[index])

    }

    render() {
        // console.log(this.props, 'r')
        return (
            <View>

                <View>
                    {this.state.data.map((el, i) =>
                        <DataItem
                            key={Math.floor(Math.random() * 10) + 'dd' + i}
                            ka={el.key}
                            hour={el.hour}
                            is={el.is}
                            del={this.props.rem}
                            chosen={el.chosen}
                            addDay={this.addDay}
                            changeSwitch={() => { }} />
                    )}
                </View>


            </View>
        );
    }
}

export default ListItem;

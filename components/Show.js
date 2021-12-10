import React, { Component } from 'react';
import { View, Text, ScrollView, Dimensions } from 'react-native';

import ListItem from './ListItem';
import SpecialButton from './SpecialButton';
import Database from "./Database";

class Show extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };

    }
    /*
{
            hour: '00:00:00',
            is: false,
            key: Math.floor(Math.random() * 1000) + 'b',
            chosen: [''],
            extended: false,
        }
*/
    refresh = () => {
        // Database.removeAll();
        Database.getAll().then((all) => {
            // console.log(all)
            all = JSON.parse(all)
            let ae = all["rows"]._array.map((el) => {
                console.log(el, el.days, "ooo")
                return {
                    hour: el.hour,
                    is: el.active == 1,
                    key: el.id,
                    chosen: (typeof el.days == 'string') ? JSON.parse(el.days) : [],
                    extended: false,
                }
            })

            this.setState({ data: ae })
        })
    }
    componentDidMount() {
        // Database.removeAll();
        Database.createTable();
        // Database.add('00:00:00', JSON.stringify(['Pon']), false)
        this.refresh();
        // Database.removeAll();
    }
    // addBudzik = () => {
    //     let standard = {
    //         hour: '00:00:00',
    //         is: false,
    //         key: Math.floor(Math.random() * 1000) + 'b',
    //         chosen: [''],
    //         extended: false,
    //     }
    //     // console.log('data', standard)
    //     this.setState({ data: [...this.state.data, standard] })
    //     // console.log(this.state.data)
    // }
    delBudzik = (key) => {
        let index = this.state.data.findIndex(el => el.key == key)
        let blok = [...this.state.data];
        let a = blok.splice(index, 1);
        this.setState({ data: blok })

        Database.remove(key);
    }

    render() {
        return (
            <View style={{ flex: 1, alignItems: 'center', flexDirection: 'column', backgroundColor: "#90E040" }}>

                <ScrollView style={{ zIndex: 1 }}>
                    <ListItem rem={this.delBudzik} data={this.state.data} key={'d' + this.state.data.length + Math.floor(Math.random() * 123131)} ></ListItem>
                </ScrollView>

                <View style={{ flex: 1, position: 'absolute', top: 500, zIndex: 5, }} >
                    <SpecialButton style={{ zIndex: 5, }} onPress={() => {
                        // this.addBudzik();
                        this.props.navigation.navigate("AddMenu", { do: this.refresh })
                    }} />
                </View>

            </View>
        );
    }
}

export default Show;

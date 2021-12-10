import React, { Component } from 'react';
import { View, Text, Dimensions, Switch, TouchableNativeFeedback, Image, Animated } from 'react-native';
import Database from './Database';

class DataItem extends Component {
    constructor(props) {
        super(props);
        this.dimienions = { width: Dimensions.get('window').width * 0.85, height: Dimensions.get('window').height * 0.20 }
        this.week = ['Pon', 'Wt', 'Śr', 'Czw', 'Pt', 'Sob', 'Ndz']
        this.state = {
            chosed: this.props.chosen,
            extended: false,
            height: new Animated.Value(0),
            angle: new Animated.Value(180),
        }
        if (this.state.extended) {
            this.state.angle = new Animated.Value(0)
            this.state.height = new Animated.Value(1)
        }

        // this.state.angle.addListener(({ value }) => this._value = value);
        /**
         * props: hour, switch 
         */
    }
    async toggle() {
        //animacja
        if (this.state.extended) {
            await Animated.spring(
                this.state.angle,
                {
                    toValue: 180,
                    velocity: 2,
                    tension: 0,
                    friction: 10,
                    useNativeDriver: true
                }
            ).start();
            await Animated.spring(
                this.state.height,
                {
                    toValue: 0,
                    velocity: 2,
                    tension: 0,
                    friction: 10,
                    useNativeDriver: false
                }
            ).start();
        }
        else {
            await Animated.spring(
                this.state.angle,
                {
                    toValue: 0,
                    velocity: 2,
                    tension: 0,
                    friction: 10,
                    useNativeDriver: true
                }
            ).start();
            await Animated.spring(
                this.state.height,
                {
                    toValue: 1,
                    velocity: 2,
                    tension: 0,
                    friction: 10,
                    useNativeDriver: false
                }
            ).start();
        }

        this.setState({ extended: !this.state.extended },);

        // this.setState({ extended: !this.state.extended });
        // this.setState({ angle: new Animated.Value(0) })
    }
    addD = (el) => {
        let prev = [...this.state.chosed];
        let din = prev.indexOf(el);
        // console.log(din, el)
        if (din == -1) {
            prev.push(el);
        } else {
            prev.splice(din, 1);
        }
        Database.updateDays(this.props.ka, prev);
        this.setState({ chosed: prev })
        // this.addD(prev)
    }
    render() {
        const SetInterpolate = this.state.angle.interpolate({
            inputRange: [0, 180],
            outputRange: ['180deg', '360deg'],
        });
        const maxHeight = this.state.height.interpolate({
            inputRange: [0, 1],
            outputRange: [this.dimienions.height - 25, this.dimienions.height]
        });
        // console.log(JSON.stringify(this.state.angle) + 'deg')
        const Rotate_Y_AnimatedStyle = {
            transform: [{ rotateZ: SetInterpolate }],
        };

        return (
            <Animated.View style={
                [{ width: this.dimienions.width, height: maxHeight, borderBottomColor: '#22a522', borderBottomWidth: 3, padding: 10, }]

            }>
                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: 0 }}>
                    <Text style={{ fontSize: 24 }}> {this.props.hour} </Text>
                    <Switch
                        style={{ marginTop: -7, padding: 0 }}
                        trackColor={{ false: "#767577", true: "#81b0ff" }}
                        thumbColor={this.props.is ? "blue" : "#f4f3f4"}
                        ios_backgroundColor="#3e3e3e"
                        onValueChange={async () => {
                            if (this.state.extended)
                                await this.toggle();
                            this.props.changeSwitch(this.props.ka)
                        }}
                        value={this.props.is}
                    />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        style={{
                            width: 100,
                            height: 100
                        }}
                        onPress={() => {
                            console.log(JSON.stringify(this.props.del));
                            this.props.del(this.props.ka)
                        }}
                    >
                        <View style={{
                            width: Dimensions.get('window').width / 10,
                            height: Dimensions.get('window').width / 10,
                        }}>
                            <Image

                                style={{
                                    backgroundColor: 'rgba(100,100,100,0.4)',
                                    padding: 10,
                                    borderRadius: 100,
                                    width: Dimensions.get('window').width / 10,
                                    height: Dimensions.get('window').width / 10,
                                    justifyContent: 'center',
                                    alignSelf: 'center',
                                    overflow: 'hidden'
                                }}


                                source={require('./kosz.png')}
                            />
                        </View>

                    </TouchableNativeFeedback>
                    <TouchableNativeFeedback
                        background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}
                        style={{
                            width: 100,
                            height: 100
                        }}
                        onPress={async () => { await this.toggle(); }}
                    >
                        <View style={{
                            width: Dimensions.get('window').width / 10,
                            height: Dimensions.get('window').width / 10,
                        }}>
                            <Animated.Image

                                style={[
                                    {
                                        backgroundColor: 'rgba(100,100,100,0.4)',
                                        padding: 10,
                                        borderRadius: 100,
                                        width: Dimensions.get('window').width / 10,
                                        height: Dimensions.get('window').width / 10,
                                        justifyContent: 'center',
                                        alignSelf: 'center',
                                        overflow: 'hidden'
                                    },
                                    Rotate_Y_AnimatedStyle
                                ]}


                                source={require('./strz.png')}
                            />
                        </View>

                    </TouchableNativeFeedback>
                </View>
                {this.state.chosed.length == 0 || this.state.extended ?
                    null :
                    <View>
                        <Text style={{ fontSize: 20 }}>
                            {this.week.map(el => {
                                return (this.state.chosed.indexOf(el) != -1) ? el + " " : '';
                            })}
                        </Text>
                    </View>
                }
                {
                    !this.state.extended ?
                        null :
                        <View style={{ paddingTop: 5, flexDirection: 'row', justifyContent: 'flex-start' }}>
                            {this.week.map(el =>
                                <TouchableNativeFeedback
                                    background={TouchableNativeFeedback.Ripple('rgba(255,255,255,1)', true)}

                                    onPress={() => { this.addD(el) }}
                                    key={el + Math.random() * 10 + 'tt'}
                                >
                                    <View
                                        style={{
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            width: 30,
                                            height: 30,
                                            marginLeft: 5,
                                            // margin: 15,
                                            backgroundColor: this.state.chosed.indexOf(el) != -1 ? 'black' : null,
                                            borderRadius: 100
                                        }}>
                                        <Text style={{ alignItems: 'center', color: this.state.chosed.indexOf(el) != -1 ? 'white' : 'black', }}>
                                            {el}
                                        </Text>
                                    </View>
                                </TouchableNativeFeedback>)}

                        </View>
                }
            </Animated.View >
        );
    }
}
export default DataItem;

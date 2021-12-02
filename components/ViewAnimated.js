import React, { Component } from "react";
import { View, Text, Button, Animated, StyleSheet, Dimensions } from "react-native";

class ViewAnimated extends Component {
    constructor(props) {
        super(props);
        this.min = -Dimensions.get('screen').width;
        this.state = {
            pos: new Animated.Value(this.min),  //startowa pozycja y wysuwanego View
        };
        this.isHidden = true
        console.log(this.state.pos)
    }

    toggle() {
        let toPos;
        if (this.isHidden) toPos = 0; else toPos = this.min;

        //animacja

        Animated.spring(
            this.state.pos,
            {
                toValue: toPos,
                velocity: 1,
                tension: 0,
                friction: 10,
                useNativeDriver: true
            }
        ).start();

        this.isHidden = !this.isHidden;
    }

    render() {
        return (
            <View style={{ flex: 1 }}>

                <Animated.View
                    style={[
                        styles.animatedView,
                        {
                            transform: [
                                { translateX: this.state.pos }
                            ]
                        }]} >
                    <Text>ANIMATE ME!</Text>

                </Animated.View>

                <Button title="start" style={styles.button} onPress={() => { this.toggle() }} />

            </View>
        );
    }
}


var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "#00ff00",
        height: 500,
        width: Dimensions.get('window').width / 2
    }
});

export default ViewAnimated

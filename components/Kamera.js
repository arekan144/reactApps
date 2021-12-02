import React, { Component } from 'react';
import { View, Text, BackHandler, ScrollView, ToastAndroid, Dimensions, Animated, StyleSheet } from 'react-native';

import { Camera } from "expo-camera";
import SpecialButton from './SpecialButton';
import * as MediaLibrary from "expo-media-library";
import RadioGroup from './RadioGroup';
import MyButton from './MyButton';

// import AsyncStorage from '@react-native-async-storage/async-storage';

export default class Kamera extends Component {
    constructor(props) {
        super(props);
        // console.log(Camera.Constants.WhiteBalance)


        // Camera.Constants.WhiteBalance
        // console.log(Camera.Constants.FlashMode)
        this.ratios2 = [0.75, 0.5625]
        this.ratios = ["4:3", "16:9"];
        this.wbs = [];
        this.fms = [];


        // console.log(Camera.Constants.FlashMode)
        for (let wb in Camera.Constants.WhiteBalance) {
            this.wbs[Camera.Constants.WhiteBalance[wb]] = wb;
        }
        for (let fm in Camera.Constants.FlashMode) {
            this.fms[Camera.Constants.FlashMode[fm]] = fm;
        }
        // console.log(this.wbs)
        this.min = -Dimensions.get('screen').width;
        this.isHidden = true
        this.state = {
            pos: new Animated.Value(this.min),  //startowa pozycja y wysuwanego View
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
            width: 360,
            sizes: [[], []],
            size: 0,
            ratio: 0,
            wb: 0,
            fm: 0,
        }

    }
    getSizes = async () => {
        if (this.camera) {
            let sizes = []
            for (let x = 0; x < this.ratios.length; x++)
                sizes[x] = await this.camera.getAvailablePictureSizesAsync(this.ratios[x]);
            // this.sizes[i] = await this.camera.getAvailablePictureSizesAsync(ratio)
            // console.log(sizes)
            this.setState({ sizes: sizes })
        }
    };
    toggle = () => {
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

    componentDidMount = async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();

        this.setState({ hasCameraPermission: status == 'granted', width: Dimensions.get('screen').width });
        // setTimeout(() => { this.getSizes(); }, 1000)

        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);

    }
    makeFoto = async () => {

        if (this.camera) {
            const album = await MediaLibrary.getAlbumAsync("expo");
            // console.log(album, 'fot')
            let foto = await this.camera.takePictureAsync();
            const asset = await MediaLibrary.createAssetAsync(foto.uri);
            // console.log(album, asset)
            if (album == null) {
                await MediaLibrary.createAlbumAsync('expo', asset, false);
            } else {
                // console.log("???")
                await MediaLibrary.addAssetsToAlbumAsync([asset], album, false);
            }
            // let asset = await MediaLibrary.createAssetAsync(foto.uri); // domyślnie zapisuje w folderze DCIM

            // alert(JSON.stringify(asset, null, 4))

        }
    }
    chngFoto = async () => {
        this.setState({
            type: this.state.type === Camera.Constants.Type.back
                ? Camera.Constants.Type.front
                : Camera.Constants.Type.back,
        });
    }
    handleDoIt = () => {
        // console.log("DO IT", this.props.route.params.doit)
        this.props.route.params.doit();
    }
    handleBackPress = () => {
        //tutaj wywołanie funkcji odświeżającej gallery, przekazanej w props-ach
        //...
        //powrót do ekranu poprzedniego
        this.handleDoIt();
        this.props.navigation.goBack()
        return true;
    }
    componentWillUnmount = () => {
        this.handleDoIt();
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);
    }
    placeholder = () => { alert('TODO: zamien tutaj funckje!') }
    handleChange = (data, num) => {
        console.log(data, num, "chnnng")

        let ob = {}
        ob[data] = num;

        if (data == 'ratio') {
            ob['size'] = 0;
        }


        // console.log(ob, { "ratio": num }, "chnnng")
        this.setState(ob);

        // console.log(this.state.ogal);
    }
    render() {
        const { hasCameraPermission } = this.state; // podstawienie zmiennej ze state
        if (hasCameraPermission == null) {
            return <View />;
        } else if (hasCameraPermission == false) {
            return <Text>brak dostępu do kamery</Text>;
        } else {
            return (
                <View style={{ flex: 1 }}>
                    <Camera
                        ref={ref => {
                            this.camera = ref; // Uwaga: referencja do kamery używana później
                            // this.getSizes();
                        }}
                        style={{ flex: 1, flexDirection: 'row', aspectRatio: this.ratios2[this.state.ratio] }}
                        onCameraReady={() => { this.getSizes() }}
                        ratio={this.ratios[this.state.ratio]}
                        whiteBalance={this.wbs[this.state.wb]}
                        pictureSize={this.state.sizes[this.state.ratio][this.state.size]}
                        flashMode={this.fms[this.state.fm]}
                    >
                        <Animated.View
                            style={[
                                styles.animatedView,
                                {
                                    transform: [
                                        { translateX: this.state.pos }
                                    ]
                                }]} >
                            {/* <Text style={{ color: 'white' }}>ddd</Text> */}

                            <ScrollView>
                                <RadioGroup
                                    // color="#123456"
                                    change={this.handleChange}
                                    // direction="column/row"
                                    data={this.ratios}
                                    selected={this.state.ratio}
                                    id={'ratio'}
                                    groupName="CAMERA RATIO" />
                                <RadioGroup
                                    // color="#123456"
                                    change={this.handleChange}
                                    // direction="column/row"
                                    id={'size'}
                                    selected={this.state.size}
                                    data={this.state.sizes[this.state.ratio]}
                                    groupName="PICTURE SIZES" />
                                <RadioGroup
                                    // color="#123456"
                                    change={this.handleChange}
                                    // direction="column/row"
                                    id={'wb'}
                                    data={this.wbs}
                                    selected={this.state.wb}
                                    groupName="WHITE BALANCE" />
                                <RadioGroup
                                    // color="#123456"
                                    change={this.handleChange}
                                    // direction="column/row"
                                    id={'fm'}
                                    data={this.fms}
                                    selected={this.state.fm}
                                    groupName="FLASH MODE" />
                            </ScrollView>

                            {/* <MyButton onPress={this.handleChange} title="hoko" bgColor="#c4c4c4" txtColor="white" /> */}
                        </Animated.View>
                        <View style={{ width: 360, flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'space-between' }}>
                            {/* tutaj wstaw buttony do obsługi kamery, które widać na filmie*/}
                            <SpecialButton mnoznik={0.15} obrazek={'./odw.png'} onPress={this.chngFoto} />
                            <SpecialButton mnoznik={0.25} obrazek={'./plus.png'} onPress={this.makeFoto} />
                            <SpecialButton mnoznik={0.15} obrazek={'./stn.png'} onPress={this.toggle} />

                        </View>
                    </Camera >
                </View >
            );
        }
    }
}
var styles = StyleSheet.create({

    animatedView: {
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: "rgba(100,100,100,0.4)",
        height: Dimensions.get('window').height - 60,
        width: Dimensions.get('window').width / 2
    }
});

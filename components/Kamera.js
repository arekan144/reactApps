import React, { Component } from 'react';
import { View, Text, BackHandler, ToastAndroid } from 'react-native';
import { Camera } from "expo-camera";
import SpecialButton from './SpecialButton';
import * as MediaLibrary from "expo-media-library";
export default class Kamera extends Component {
    constructor(props) {
        super(props);
        this.state = {
            hasCameraPermission: null,         // przydzielone uprawnienia do używania kamery
            type: Camera.Constants.Type.back,  // typ kamery
        };
    }
    componentDidMount = async () => {
        let { status } = await Camera.requestCameraPermissionsAsync();
        this.setState({ hasCameraPermission: status == 'granted' });
        BackHandler.addEventListener("hardwareBackPress", this.handleBackPress);
    }
    makeFoto = async () => {

        if (this.camera) {
            const album = await MediaLibrary.getAlbumAsync("EXPO");
            console.log(album, 'fot')
            let foto = await this.camera.takePictureAsync();
            const asset = await MediaLibrary.createAssetAsync(foto.uri);
            if (album == null) {
                await MediaLibrary.createAlbumAsync('EXPO', asset, false);
            } else {
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
    handleBackPress = () => {
        //tutaj wywołanie funkcji odświeżającej gallery, przekazanej w props-ach
        //...
        //powrót do ekranu poprzedniego
        this.props.route.params.doit();
        this.props.navigation.goBack()
        return true;
    }
    componentWillUnmount = () => {
        BackHandler.removeEventListener("hardwareBackPress", this.handleBackPress);

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
                        }}
                        style={{ flex: 1, flexDirection: 'row', aspectRatio: 0.75 }}
                        type={this.state.type}>
                        <View style={{ flex: 1, flexDirection: 'row', alignSelf: 'flex-end', justifyContent: 'center' }}>
                            {/* tutaj wstaw buttony do obsługi kamery, które widać na filmie*/}
                            <SpecialButton mnoznik={0.15} obrazek={'./odw.png'} onPress={this.chngFoto} />
                            <SpecialButton mnoznik={0.25} obrazek={'./plus.png'} onPress={this.makeFoto} />
                        </View>
                    </Camera>
                </View>
            );
        }
    }
}

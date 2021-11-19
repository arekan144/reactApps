import React, { Component } from 'react';
import { View, Text, ImageBackground, Dimensions, ActivityIndicator } from 'react-native';
import * as Sharing from 'expo-sharing';
import MyButton from './MyButton';
import * as MediaLibrary from "expo-media-library";

export default class BigFoto extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: true,
        };
        // console.log(this.props.route.params.data.id)
    }
    deleteOne = async () => {
        // let o = [this.props.route.params.data.id]
        // console.log(o)
        console.log("DELETE")
        // console.log(this.props.navigation, 'oqoqoq')
        let obj = [this.props.route.params.data.id]

        const delete_album = await MediaLibrary.createAlbumAsync('selected', obj.pop(), false) // false==move, true==copy to the new album
        if (obj.length > 0)
            await MediaLibrary.addAssetsToAlbumAsync(obj, delete_album.id, false) // false==move, true==copy to the new album
        // console.log(this.props.navigation, 'llelelel')
        if (await MediaLibrary.deleteAlbumsAsync([delete_album.id], true))
            this.props.navigation.navigate('Main', { refresh: true, deleted: this.props.route.params.data.id })
        // this.props.navigation.navigate('Main', { refresh: true })
        //true==delete album with files (needed for iOS only, android is always true)
        // console.log(resp)
        // this.props.navigation.navigate("Galery")
        // if (resp === true) {
        // alert("OK")
        // } else {
        // nie udało się usunąć
        // }
    }
    shareIt = () => {
        Sharing.shareAsync(this.props.route.params.data.uri)
    }
    render() {
        // console.log(this.props.route.params.data)
        let width = Dimensions.get('window').width * 0.9;
        let height = Dimensions.get('window').height * 0.7;

        // let height = Dimensions.get('window').height;
        return (
            <View >
                <ImageBackground
                    resizeMode="contain"
                    style={{
                        // overflow: 'hidden',
                        width: width,
                        height: height,
                        alignSelf: 'center',
                        // height: this.props.height,
                        // alignItems: 'flex-end',
                        // justifyContent: 'flex-end',
                    }}
                    source={{ uri: this.props.route.params.data.uri }}
                    onLoadEnd={() => this.setState({ loading: false })}
                >
                    {this.state.loading ?
                        <ActivityIndicator size="large"
                            animating={this.state.loading}
                            color="#ff0000" /> :
                        null}
                    {/* <View style={{ backgroundColor: 'black' }}><Text style={{ color: 'white' }} >{this.props.id}</Text></View> */}
                </ImageBackground>
                <View style={{ alignSelf: 'center', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                    <MyButton
                        txtColor="black"
                        bgColor=""
                        title={'SHARE'}
                        onPress={this.shareIt}
                    />
                    <MyButton
                        txtColor="black"
                        bgColor=""
                        title={'DELETE'}
                        onPress={this.deleteOne}
                    />
                </View>
            </View>
        );
    }
}

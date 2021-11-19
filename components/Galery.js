import React, { Component } from 'react';
import { View, Text, Dimensions, ActivityIndicator, FlatList, ToastAndroid } from 'react-native';
import MyButton from './MyButton';
import * as MediaLibrary from "expo-media-library";
import FotoItem from './FotoItem';

export default class Galery extends Component {
    constructor(props) {
        super(props);
        this.state = {
            gird_list: true,
            granted_media: false,
            photosloaded: false,
            selected: [],
        };
        this.max_column = 5;
    }
    placeholder = () => { alert('TODO: zamien tutaj funckje!') }
    selectFoto = (id) => {
        this.props.navigation.navigate("BigFoto", {
            data: this.state.photosloaded.find(el => el.id == id),
        })
    }


    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        console.log("toja")
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii');
        } else this.setState({ granted_media: true })

        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo'    // typ pobieranych danych, photo jest domyślne
        })
        // alert(obj.assets.length)
        obj = obj.assets;
        if (this.props.route.params && this.props.route.params.deleted) {
            obj.splice(obj.findIndex(el => el.id == this.props.route.params.deleted), 1)
        }
        // alert(JSON.stringify(obj.assets, null, 5))
        this.setState({ photosloaded: obj })
    }
    cnsMe = () => {
        console.log(this.state.photosloaded)
    }
    handleCamera = () => {
        this.props.navigation.navigate("Kamera", { doit: this.componentDidMount });
    }
    getSelected = (id) => {
        // alert("getselected!!!")
        let blk = [...this.state.selected]
        if (this.state.selected.indexOf(id) == -1) {
            blk = [...this.state.selected, id]
            ToastAndroid.showWithGravity(
                'zaznaczono',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            // alert(JSON.stringify(blk))
        } else {
            blk = [...this.state.selected]
            blk.splice(blk.indexOf(id), 1);
            ToastAndroid.showWithGravity(
                'odznaczono',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            // alert(JSON.stringify(blk))
        }
        this.setState({
            selected: blk,
        })
        return 0;
    }
    handleDelete = async () => {
        if (this.state.selected.length == 0) {
            ToastAndroid.showWithGravity(
                'nic nie jest zaznaczone!',
                ToastAndroid.SHORT,
                ToastAndroid.CENTER
            );
            return false;
        }
        let o = [...this.state.selected]
        const delete_album = await MediaLibrary.createAlbumAsync('selected', this.state.selected.pop(), false) // false==move, true==copy to the new album
        if (this.state.selected.length > 0) {
            await MediaLibrary.addAssetsToAlbumAsync(this.state.selected, delete_album.id, false) // false==move, true==copy to the new album
        }
        const resp = await MediaLibrary.deleteAlbumsAsync([delete_album.id], true) //true==delete album with files (needed for iOS only, android is always true)

        if (resp === true) {
            // alert("OK")
            // this.props.navigation.navigate("Main", { refresh: true });
            this.componentDidMount();
            // let blok = [...this.state.photosloaded]
            // // console.log(blok, "o0o", o)
            // o.forEach(el => {
            //     blok.splice(blok.findIndex(bl => bl.id == el), 1);
            // })
            // this.setState({
            //     photosloaded: blok,
            // })
        } else {
            // nie udało się usunąć
        }
    }
    render() {

        let width = Dimensions.get('window').width;
        let height = Dimensions.get('window').height;
        return (
            <View style={{ flex: 1, backgroundColor: 'lightgrey' }}>
                <View style={{ width: Dimensions.get('window').width, flexDirection: 'row', justifyContent: 'center', }}>
                    <MyButton
                        txtColor="black"
                        bgColor=""
                        title={'GRID/LIST'}
                        onPress={() => this.setState({ gird_list: !this.state.gird_list })}
                    />
                    <MyButton
                        txtColor="black"
                        bgColor=""
                        title={'OPEN CAMERA'}
                        onPress={this.handleCamera}
                    />
                    <MyButton
                        txtColor="black"
                        bgColor=""
                        title={'REMOVE SELECTED'}
                        onPress={this.handleDelete}
                    />
                </View>
                {this.state.granted_media ?
                    <View style={{
                        flexWrap: 'wrap',
                        justifyContent: 'space-around',
                        alignContent: 'center',
                        alignItems: 'center'
                    }}>
                        {this.state.photosloaded ?

                            < FlatList
                                style={{
                                    width: Dimensions.get('window').width,

                                }}
                                contentContainerStyle={{
                                    // alignItems: 'center',
                                    alignSelf: 'center'
                                    // alignContent: 'space-around',

                                }}
                                numColumns={(this.state.gird_list) ? /*'row'*/ 1 : /*'column'*/ this.max_column}
                                key={(this.state.gird_list) ? /*'row'*/ 1 : /*'column'*/ this.max_column}
                                data={this.state.photosloaded}
                                keyExtractor={(_, i) => i.toString()}
                                renderItem={({ item, index }) =>
                                    <FotoItem
                                        id={item.id}
                                        width={(this.state.gird_list) ?
                                            /*'row'*/  width * 0.9 :
                                            /*'column'*/ width / this.max_column - 5}
                                        height={(this.state.gird_list) ?
                                            /*'row'*/  height * 0.3 :
                                            /*'column'*/ height / this.max_column - 5}
                                        selected={this.state.selected.indexOf(item.id) != -1}
                                        source={item.uri}
                                        onlonghandle={this.getSelected}
                                        onpress={this.selectFoto}
                                    />
                                }
                            />
                            : <ActivityIndicator size="small" color="#ff0000" />}
                    </View>
                    : <Text>Nie mam dostępu do zdjęć na tym urządzeniu! :(</Text>}

            </View>
        );
    }
}

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
    /**
     * placeholder
     */
    placeholder = () => { alert('TODO: zamien tutaj funckje!') }
    //
    selectFoto = (id) => {
        this.props.navigation.navigate("BigFoto", {
            data: this.state.photosloaded.find(el => el.id == id),
            doit: this.handleDelete
        })
    }
    /**
     * Funkcja odświeża listę zdjęć
     */
    refreshTheAllFotos = async () => {
        let album = await MediaLibrary.getAlbumAsync("EXPO")

        console.log(album, 'gal')
        let obj = await MediaLibrary.getAssetsAsync({
            first: 100,           // ilość pobranych assetów
            mediaType: 'photo',    // typ pobieranych danych, photo jest domyślne
            album: album
        })
        obj = obj.assets;
        if (this.props.route.params && this.props.route.params.deleted) {
            obj.splice(obj.findIndex(el => el.id == this.props.route.params.deleted), 1)
        }
        this.setState({ photosloaded: obj })
        return true;
    }
    // nie wykonuj tego kilka razy!!!
    componentDidMount = async () => {
        let { status } = await MediaLibrary.requestPermissionsAsync();
        if (status !== 'granted') {
            alert('brak uprawnień do czytania image-ów z galerii');
        } else this.setState({ granted_media: true });
        this.refreshTheAllFotos();
    }

    handleCamera = () => {
        this.props.navigation.navigate("Kamera", { doit: this.refreshTheAllFotos });
    }
    /**
     * Żeby skrócić ilość kodu
     */
    toastItQuick = (string, position) => {
        ToastAndroid.showWithGravity(
            string,
            ToastAndroid.SHORT,
            position ? ToastAndroid.BOTTOM : ToastAndroid.CENTER
        );
    }
    /**
    * getSelected - funkcja sprawdzająca, czy chcemy odznaczyć czy zaznaczyć
    */
    getSelected = (id) => {
        let blk = [...this.state.selected]
        if (this.state.selected.indexOf(id) == -1) {
            blk = [...this.state.selected, id]
            this.toastItQuick('ZAZNACZONO')
        } else {
            blk = [...this.state.selected]
            blk.splice(blk.indexOf(id), 1);
            this.toastItQuick('ODZNACZONO')
        }
        this.setState({
            selected: blk,
        })
        return 0;
    }
    /**
     * USUWA PLIKI
     */
    handleDelete = async () => {
        if (this.state.selected.length == 0) { // jeżeli nic nie jest zaznaczone, powiadom
            this.toastItQuick('BRAK ZAZNACZENIA')
            return false;
        }
        // musimy utworzyć album z zaznaczonymi, aby potem przenieść te pliki z głównego albumu
        const delete_album = await MediaLibrary.createAlbumAsync('selected', this.state.selected.pop(), false) // false==move, true==copy to the new album
        await MediaLibrary.addAssetsToAlbumAsync(this.state.selected, delete_album.id, false) // false==move, true==copy to the new album
        // usuń
        const resp = await MediaLibrary.deleteAlbumsAsync([delete_album.id], true) //true==delete album with files (needed for iOS only, android is always true)
        // odśwież
        if (resp === true) {
            this.refreshTheAllFotos();
        } else {
            return false;
        }
        return true;
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
                                    alignSelf: 'center'
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

import React, { useEffect, useState, useContext } from 'react'
import Constants from 'expo-constants'
import CardVideos from '../../components/cardVideos'
import axios from '../../services/api'
import videosInterface from '../../interfaces/videosInterface'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import AuthContext from '../../services/contexts'


const FeedVideos = (value: any) => {
    const { user, darkmode } = useContext(AuthContext)
    const [videos, setVideos] = useState<Array<videosInterface>>()
    const [cardsVisibility, setCardsVisibility] = useState(false)
    useEffect(() => {
        setTimeout(loadVideos, 2000)
    }, [])

    async function loadVideos() {
        await axios.get('videos', {
            headers: {
                'Authorization': 'Bearer ' + user.token
            }
        }).then(response => {
            setVideos(response.data)
            setCardsVisibility(true)
        }).catch(error => {
            alert(`${error.response.data}`)
        })
    }

    const renderItem = ({ item }) => {
        if (!item.id) {
            console.log('aqui não')
            return <Text>Não veio</Text>
        } else {
            console.log('aqui não')
            return <CardVideos key={item.id} title={item.title} describe={item.description} page='NewsDetails' video={item.path} visible={cardsVisibility} />
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.titleHeader}>Vile</Text>
            </View>
            <View style={!darkmode ? styles.main : styles.mainDark}>
                <FlatList
                    ListHeaderComponent={<Text style={!darkmode ? styles.title : styles.titleDark}>Videos</Text>}
                    data={videos}
                    ListEmptyComponent={videos?.length < 1 && cardsVisibility ? <Text style={!darkmode ? {} : {color:'#6B6B6B'}}>Nenhum video disponivel no momento </Text>
                        :
                        <CardVideos key={''} title={''} describe={''} page='NewsDetails' video={''} visible={cardsVisibility} />}
                    renderItem={renderItem}
                    refreshing={false}
                    onRefresh={loadVideos}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={(i, k) => k.toString()}
                />
            
            </View>

        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFC633',
        paddingTop: Constants.statusBarHeight,
    },

    backgroundVideo: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
    },

    profileImgContainer: {
        height: 60,
        width: 60,
        borderRadius: 40,
        flex: 1,
        // shadowColor: "#000",
        // shadowOffset: {
        //     width: 0,
        //     height: 3,
        // },
        // shadowOpacity: 0.29,
        // shadowRadius: 4.65,

        // elevation: 7,
    },
    profileImg: {
        height: 60,
        width: 60,
        borderRadius: 40,
    },

    header: {
        // backgroundColor:'#fff',
        flexDirection: 'row',
        padding: 20,
        justifyContent: "center",
        alignItems: "center",
    },

    main: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#fff'
    },
    
    mainDark: {
        flex: 1,
        paddingHorizontal: 20,
        backgroundColor: '#121212'
    },

    title: {
        padding: 20,
        fontSize: 24,
        fontFamily: 'Ubuntu_500Medium',
    },
    
    titleDark: {
        padding: 20,
        fontSize: 24,
        fontFamily: 'Ubuntu_500Medium',
        color:'#6B6B6B'
    },

    titleHeader: {
        fontSize: 32,
        color: '#464141',
        padding: 10,
        fontFamily: 'Ubuntu_300Light',
    },
})

export default FeedVideos
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    Animated,
    View,
    FlatList,
    TextInput,
    Keyboard,
    SafeAreaView,
    ScrollView,
    Image,
    Linking,
    StatusBar,
    TouchableOpacity,
    SectionList,
    Alert,
    Platform,
    UIManager,
    LayoutAnimation,
    LogBox,
    Modal,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import Color from '../../Global/Color';
import { Poppins } from '../../Global/FontFamily';


LogBox.ignoreAllLogs();

const HeaderHeight = 150;
// create a component
const HomeScreen = () => {

    const dispatch = useDispatch();
    const [netInfo_State, setNetinfo] = useState(true);
    const [selectTab, setSelectTab] = useState('FullTime');

    const [tabIndex, setIndex] = useState(0);
    const [height, setHeight] = useState(undefined);
    let listRefArr = useRef([]);
    let isListGliding = useRef(false);
    let listOffset = useRef({});

    const [ActionSelect, setActionSelect] = useState([
        {
            id: 1,
            name: 'Property',
            image: Media.propertyMain,
            subImage: Media.propertysub,
        },
        {
            id: 2,
            name: 'Actions',
            image: Media.AuctionMain,
            subImage: Media.AuctionSub,
        },
        {
            id: 1,
            name: 'Property',
            image: Media.propertyMain,
            subImage: Media.propertysub,
        },
        {
            id: 2,
            name: 'Actions',
            image: Media.AuctionMain,
            subImage: Media.AuctionSub,
        },
    ]);

    const [routes] = useState([
        { id: 1, title: 'Buy' },
        { id: 2, title: 'Rent' },
        { id: 3, title: 'Rent' },
        { id: 4, title: 'Rent' },
        { id: 5, title: 'Rent' },
    ]);
    const scrollY = useRef(new Animated.Value(0)).current;

    const [BuySection] = useState([
        {
            id: 1,
            title: 'Apply Albion Home Online',
            data: ['Apply Albion Home Online'],
        },
        { id: 2, title: 'Check your Eligibility', data: ['Check your Eligibility'] },
        { id: 3, title: 'How it works', data: ['How it works'] },
    ]);

    useEffect(() => {
        scrollY.addListener(({ value }) => {
            const curRoute = routes[tabIndex].key;
            listOffset.current[curRoute] = value;
        });
        return () => {
            scrollY.removeAllListeners();
        };
    }, []);

    useEffect(() => {
        try {
            const unsubscribe = NetInfo.addEventListener(state => {
                setNetinfo(state.isConnected);
            });
            return () => unsubscribe;
        } catch (error) {
            console.log("catch in use_effect's Home_Loan : ", error);
        }
    }, []);

    const onMomentumScrollBegin = () => {
        isListGliding.current = true;
    };

    const onMomentumScrollEnd = () => {
        isListGliding.current = false;
        syncScrollOffset();
    };

    const onScrollEndDrag = () => {
        syncScrollOffset();
    };

    const syncScrollOffset = () => {
        // const curRouteKey = routes[tabIndex].key;
        listRefArr.current.forEach(item => {
            if (item.key !== curRouteKey) {
                if (scrollY._value < HeaderHeight && scrollY._value >= 0) {
                    if (item.value) {
                        item.value.scrollToOffset({
                            offset: scrollY._value,
                            animated: false,
                        });
                        listOffset.current[item.key] = scrollY._value;
                    }
                } else if (scrollY._value >= HeaderHeight) {
                    if (
                        listOffset.current[item.key] < HeaderHeight ||
                        listOffset.current[item.key] == null
                    ) {
                        if (item.value) {
                            item.value.scrollToOffset({
                                offset: HeaderHeight,
                                animated: false,
                            });
                            listOffset.current[item.key] = HeaderHeight;
                        }
                    }
                }
            }
        });
    };

    if (Platform.OS === 'android') {
        UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.SectionList
                sections={BuySection}
                scrollEnabled={true}
                keyExtractor={(item, index) => item + index}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={1}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                    {
                        useNativeDriver: true,
                    },
                )}
                onMomentumScrollBegin={onMomentumScrollBegin}
                onScrollEndDrag={onScrollEndDrag}
                onMomentumScrollEnd={onMomentumScrollEnd}
                nestedScrollEnabled
                initialNumToRender={5}
                renderItem={({ item }) => {
                    switch (item) {
                        case 'Apply Albion Home Online':
                            return (
                                <View style={{ width: scr_width, backgroundColor: 'white' }}>
                                    <View style={{ width: scr_width, backgroundColor: Color.primary, alignItems: 'center' }}>
                                        <TouchableOpacity
                                            style={{
                                                marginHorizontal: 5,
                                                borderColor: Color.lightgrey,
                                                marginVertical: 10,
                                                borderWidth: 1,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                                width: '95%',
                                                height: 50, backgroundColor: Color.white,
                                                paddingHorizontal: 10, marginVertical: 20
                                            }}>
                                            <Text
                                                style={{
                                                    flex: 1,
                                                    fontSize: 16,
                                                    paddingTop: 2,
                                                    color: Color.cloudyGrey,
                                                    fontFamily: Poppins.Medium,
                                                }}
                                                numberOfLines={1}>
                                                {`Search Jobs`}
                                            </Text>
                                            <View style={[styles.numberCountryCode, { textAlign: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', top: 10 }]}>
                                                <Iconviewcomponent
                                                    Icontag={'Feather'}
                                                    iconname={'search'}
                                                    icon_size={28}
                                                    icon_color={Color.black}
                                                />
                                            </View>

                                        </TouchableOpacity>
                                    </View>
                                    <View
                                        style={{
                                            width: '100%',
                                            alignItems: 'center',
                                        }}>
                                        <View style={{ width: '95%', }}>
                                            <Image
                                                source={require('../../assets/images/banner.png')}
                                                style={{
                                                    width: '100%',
                                                    height: 180,
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </View>
                                    </View>
                                </View>
                            );
                        case 'Check your Eligibility':
                            return (
                                <View style={{ width: '100%', alignItems: 'center' }}>
                                    <View
                                        style={{
                                            width: '100%',
                                            marginVertical: 10,
                                            alignItems: 'center',
                                        }}>
                                        <Text
                                            style={{
                                                width: '95%',
                                                fontSize: 16,
                                                color: 'black',
                                                fontFamily: 'Poppins-SemiBold',
                                                paddingHorizontal: 10,
                                            }}>
                                            Explore by Categories
                                        </Text>

                                        <View style={{ width: '90%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                            <TouchableOpacity onPress={() => { setSelectTab("FullTime") }} style={{ padding: 8, paddingHorizontal: 20, borderRadius: 30, marginTop: 2, backgroundColor: selectTab === "FullTime" ? Color.primary : Color.lightgrey, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: selectTab === "FullTime" ? Color.white : Color.black, textAlign: 'center', fontSize: 14, fontFamily: Poppins.SemiBold }}>Full Time</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { setSelectTab("PartTime") }} style={{ padding: 8, paddingHorizontal: 20, borderRadius: 30, marginTop: 2, backgroundColor: selectTab === "PartTime" ? Color.primary : Color.lightgrey, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: selectTab === "PartTime" ? Color.white : Color.black, textAlign: 'center', fontSize: 14, fontFamily: Poppins.SemiBold }}>Part Time</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { setSelectTab("Freelance") }} style={{ padding: 8, paddingHorizontal: 20, borderRadius: 30, marginTop: 2, backgroundColor: selectTab === "Freelance" ? Color.primary : Color.lightgrey, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: selectTab === "Freelance" ? Color.white : Color.black, textAlign: 'center', fontSize: 14, fontFamily: Poppins.SemiBold }}>Freelance</Text>
                                            </TouchableOpacity>
                                        </View>
                                    </View>

                                    <View
                                        style={{
                                            width: '95%',
                                            marginVertical: 10,
                                            alignItems: 'center'
                                        }}>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text
                                                style={{

                                                    fontSize: 16,
                                                    color: 'black',
                                                    fontFamily: Poppins.Regular,
                                                    paddingHorizontal: 10,
                                                }}>
                                                You Might Like
                                            </Text>
                                            <TouchableOpacity>
                                                <Text
                                                    style={{
                                                        fontSize: 16,
                                                        color: '#0033A0',
                                                        fontFamily: Poppins.SemiBold,
                                                        paddingHorizontal: 10,
                                                    }}>
                                                    See All
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        <View style={{ width: '95%', alignItems: 'center', paddingVertical: 10 }}>
                                            <FlatList
                                                data={ActionSelect}
                                                keyExtractor={(item, index) => item + index}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            style={{
                                                                width: 150, height: 100,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderColor: Color.lightgrey,
                                                                borderWidth: 1,
                                                                padding: 5, margin: 5,
                                                                borderRadius: 10,
                                                            }}>
                                                            <Image
                                                                source={{ uri: item.image }}
                                                                style={{
                                                                    width: 50,
                                                                    height: 50,
                                                                    resizeMode: 'contain',
                                                                }}
                                                            />
                                                            <Text>{item.name}</Text>
                                                        </TouchableOpacity>
                                                    );
                                                }}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                            />
                                        </View>


                                    </View>
                                </View >
                            );
                        case 'How it works':
                            return (
                                <View
                                    style={{
                                        width: scr_width,
                                        height: height,
                                        alignSelf: 'center',
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                    }}>
                                    <View
                                        style={{
                                            width: '100%',
                                            marginVertical: 10,
                                            alignItems: 'center',
                                        }}>
                                        <Text
                                            style={{
                                                width: '95%',
                                                fontSize: 16,
                                                color: 'black',
                                                fontFamily: 'Poppins-SemiBold',
                                                paddingHorizontal: 10,
                                            }}>
                                            Explore by Categories
                                        </Text>

                                        <View style={{ width: '95%', alignItems: 'center', paddingVertical: 10 }}>
                                            <FlatList
                                                data={ActionSelect}
                                                keyExtractor={(item, index) => item + index}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            style={{
                                                                width: 150, height: 100,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderColor: Color.lightgrey,
                                                                borderWidth: 1,
                                                                padding: 5, margin: 5,
                                                                borderRadius: 10,
                                                            }}>
                                                            <Image
                                                                source={{ uri: item.image }}
                                                                style={{
                                                                    width: 50,
                                                                    height: 50,
                                                                    resizeMode: 'contain',
                                                                }}
                                                            />
                                                            <Text>{item.name}</Text>
                                                        </TouchableOpacity>
                                                    );
                                                }}
                                                horizontal={true}
                                                showsHorizontalScrollIndicator={false}
                                            />
                                        </View>


                                    </View>

                                </View>
                            );
                    }
                }}
            />

        </SafeAreaView >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    numberCountryCode: {
        height: 48,
        color: Color.black,
        fontSize: 16,
        fontFamily: Poppins.SemiBold,
        textAlign: "center",
        alignItems: "center",
        paddingTop: 0
    },
});

//make this component available to the app
export default HomeScreen;

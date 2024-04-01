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
    Button,
    Dimensions,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import NetInfo from '@react-native-community/netinfo';
import { scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Media } from '../../Global/Media';
import Color from '../../Global/Color';
import { Poppins } from '../../Global/FontFamily';


import FIcon from 'react-native-vector-icons/FontAwesome';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import Icon from 'react-native-vector-icons/Ionicons';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import CircularProgress from 'react-native-circular-progress-indicator';


LogBox.ignoreAllLogs();

// const TabBarHeight = 50;
const HeaderHeight = 150;
const windowHeight = Dimensions.get('window').height;

// create a component
const HomeScreen = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [netInfo_State, setNetinfo] = useState(true);
    const [selectTab, setSelectTab] = useState('FullTime');

    const [tabIndex, setIndex] = useState(0);
    const [height, setHeight] = useState(undefined);
    let listRefArr = useRef([]);
    let isListGliding = useRef(false);
    let listOffset = useRef({});

    const [ActionSelect, setActionSelect] = useState([
        {
            id: 0,
            job_name: 'Business Development Executive',
            image: Media.propertyMain,
            subImage: Media.propertysub,
            job_type: 'Full Time',
            job_post_date: '1 day ago',
            job_comp_logo: '',
            job_comp_name: 'Wipro Technologies ',
            job_comp_book_status: true,
            job_comp_salary: '₹10k -  ₹20 k',
            job_comp_applicant: '500',

        },
        {
            id: 1,
            job_name: 'Mobile App Development',
            image: Media.AuctionMain,
            subImage: Media.AuctionSub,
            job_type: 'Full Time',
            job_post_date: '3 days ago',
            job_comp_logo: '',
            job_comp_name: 'TCS',
            job_comp_book_status: false,
            job_comp_salary: '₹40k -  ₹70 k',
            job_comp_applicant: '250',
        },
        {
            id: 2,
            job_name: 'Graphics Designer',
            image: Media.propertyMain,
            subImage: Media.propertysub,
            job_type: 'Freelance',
            job_post_date: '1 day ago',
            job_comp_logo: '',
            job_comp_name: 'KGISL Group',
            job_comp_book_status: false,
            job_comp_salary: '₹30k -  ₹50 k',
            job_comp_applicant: '50',
        },
        {
            id: 3,
            job_name: 'Website designer',
            image: Media.AuctionMain,
            subImage: Media.AuctionSub,
            job_type: 'Full Time',
            job_post_date: '4 days ago',
            job_comp_logo: '',
            job_comp_name: 'Brightway Group Tech',
            job_comp_book_status: false,
            job_comp_salary: '₹25k -  ₹60 k',
            job_comp_applicant: '7',
        },
        {
            id: 4,
            job_name: 'SEO Analyst',
            image: Media.AuctionMain,
            subImage: Media.AuctionSub,
            job_type: 'Part Time',
            job_post_date: '2 days ago',
            job_comp_logo: '',
            job_comp_name: 'Avanexa Technologies',
            job_comp_book_status: false,
            job_comp_salary: '₹15k -  ₹30 k',
            job_comp_applicant: '15',
        },
    ]);

    const [topCompany, setTopCompany] = useState([
        {
            id: 0,
            comp_logo: Media.propertyMain,
            comp_name: 'Calibre Infotech',
            comp_address: 'Coimbatore',
            comp_offer_count: '10',
            image: Media.propertyMain,

        },
        {
            id: 1,
            comp_logo: Media.propertyMain,
            comp_name: 'Calibre Infotech',
            comp_address: 'Coimbatore',
            comp_offer_count: '10',
            image: Media.propertyMain,
        },
        {
            id: 2,
            comp_logo: Media.propertyMain,
            comp_name: 'Calibre Infotech',
            comp_address: 'Coimbatore',
            comp_offer_count: '10',
            image: Media.propertyMain,
        },
        {
            id: 3,
            comp_logo: Media.propertyMain,
            comp_name: 'Calibre Infotech',
            comp_address: 'Coimbatore',
            comp_offer_count: '10',
            image: Media.propertyMain,
        },
        {
            id: 4,
            comp_logo: Media.propertyMain,
            comp_name: 'Calibre Infotech',
            comp_address: 'Coimbatore',
            comp_offer_count: '10',
            image: Media.propertyMain,
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
        { id: 3, title: 'Banner', data: ['Banner'] },
        { id: 3, title: 'RecommendedJobs', data: ['RecommendedJobs'] },
    ]);

    const [profileCompletion] = useState([
        {
            id: 1,
            name: 'Add resume',
            subname: 'Boost profile for your dream job with a standout resume',
            btname: 'Upload Resume',
            icon: 'card-account-details-outline',
        },
        {
            id: 2,
            name: 'Add Your Best Works',
            subname: 'Highlight your best works to strengthen your profile',
            btname: 'Add Projects',
            icon: 'folder-open',
        },
        {
            id: 1,
            name: 'Personal Details',
            subname: 'Add personal details to enrich your profile',
            btname: 'Add Details',
            icon: 'card-account-details-outline',
        },
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

    // useEffect(() => {
    //     try {
    //         const unsubscribe = NetInfo.addEventListener(state => {
    //             setNetinfo(state.isConnected);
    //         });
    //         return () => unsubscribe;
    //     } catch (error) {
    //         console.log("catch in use_effect's Home_Screen : ", error);
    //     }
    // }, []);

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

            <View style={{ width: '95%', flexDirection: 'row', width: scr_width, backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center' }}>
                <TouchableOpacity activeOpacity={0.5}
                    style={{
                        marginHorizontal: 5,
                        borderColor: Color.lightgrey,
                        marginVertical: 10,
                        borderWidth: 1,
                        flexDirection: 'row',
                        alignItems: 'center',
                        borderRadius: 5,
                        width: '80%',
                        height: 50, backgroundColor: Color.white,
                        paddingHorizontal: 10, marginVertical: 20
                    }}>
                    <View style={[styles.numberCountryCode, { textAlign: 'center', alignSelf: 'center', alignContent: 'center', alignItems: 'center', top: 10 }]}>
                        <Iconviewcomponent
                            Icontag={'Feather'}
                            iconname={'search'}
                            icon_size={28}
                            icon_color={Color.Venus}
                        />
                    </View>
                    <Text
                        style={{
                            flex: 1,
                            fontSize: 16,
                            paddingTop: 2, paddingHorizontal: 10,
                            color: Color.Venus,
                            fontFamily: Poppins.Medium,
                        }}
                        numberOfLines={1}>
                        {`Search Jobs`}
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate("Filter")}
                    style={{ justifyContent: 'center', alignItems: 'center', backgroundColor: Color.white, padding: 10, margin: 5, borderRadius: 5 }}>
                    <Iconviewcomponent
                        Icontag={'MaterialCommunityIcons'}
                        iconname={'filter-menu-outline'}
                        icon_size={28}
                        icon_color={Color.primary}
                    />
                </TouchableOpacity>
            </View>

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
                // contentContainerStyle={{
                //     paddingTop: HeaderHeight,
                //     paddingHorizontal: 5,
                //     minHeight: windowHeight - TabBarHeight,
                //     // flexGrow: 1,
                // }}
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

                                    {/* <View
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
                                    </View> */}

                                    <View
                                        style={{
                                            marginVertical: 20,
                                            padding: 10,
                                            backgroundColor: '#D9F2FE',
                                        }}>
                                        <View
                                            style={{
                                                marginVertical: 10,
                                                flexDirection: 'row',
                                                alignItems: 'center',
                                            }}>
                                            <CircularProgress
                                                value={77}
                                                radius={40}
                                                progressValueColor={'#000'}
                                                valueSuffix="%"
                                                titleColor={Color.black}
                                                activeStrokeColor="#0BA02C"
                                                activeStrokeWidth={15}
                                                inActiveStrokeWidth={15}
                                                activeStrokeSecondaryColor={'#0BA02C'}
                                            />
                                            <View
                                                style={{
                                                    flex: 1,
                                                    padding: 10,
                                                }}>
                                                <Text
                                                    style={{
                                                        fontFamily: Poppins.Medium,
                                                        fontSize: 18,
                                                        color: Color.black,
                                                    }}>
                                                    Profile Score
                                                </Text>
                                                <Text
                                                    style={{
                                                        fontFamily: Poppins.Medium,
                                                        fontSize: 14,
                                                        color: Color.cloudyGrey,
                                                    }}>
                                                    Boost your profile for your dream job
                                                </Text>
                                            </View>
                                        </View>
                                        <ScrollView showsHorizontalScrollIndicator={false} horizontal>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    alignItems: 'center',
                                                    justifyContent: 'center',
                                                }}>
                                                {profileCompletion?.map((item, index) => {
                                                    return (
                                                        <View
                                                            key={index}
                                                            style={{
                                                                flex: 1,
                                                                backgroundColor: Color.white,
                                                                marginHorizontal: 10,
                                                                padding: 10,
                                                                borderRadius: 10,
                                                                width: 280,
                                                                alignItems: 'flex-end',
                                                            }}>
                                                            <View
                                                                style={{
                                                                    justifyContent: 'center',
                                                                    alignItems: 'flex-end',
                                                                    backgroundColor: '#DEFCE4',
                                                                    paddingHorizontal: 10,
                                                                    padding: 5,
                                                                    borderRadius: 10,
                                                                }}>
                                                                <Text
                                                                    style={{
                                                                        fontFamily: Poppins.Bold,
                                                                        fontSize: 12,
                                                                        color: Color.green,
                                                                    }}>
                                                                    Boost 10%
                                                                </Text>
                                                            </View>
                                                            <View
                                                                key={index}
                                                                style={{
                                                                    flexDirection: 'row',
                                                                    alignItems: 'flex-start',
                                                                }}>
                                                                <MCIcon name={item.icon} size={40} color={Color.blue} />
                                                                <View
                                                                    style={{
                                                                        flex: 1,
                                                                        marginHorizontal: 10,
                                                                    }}>
                                                                    <Text
                                                                        style={{
                                                                            fontFamily: Poppins.Medium,
                                                                            fontSize: 16,
                                                                            color: Color.black,
                                                                        }}>
                                                                        {item?.name}
                                                                    </Text>
                                                                    <Text
                                                                        style={{
                                                                            flex: 1,
                                                                            fontFamily: Poppins.Medium,
                                                                            fontSize: 14,
                                                                            color: Color.black,
                                                                            marginVertical: 5,
                                                                        }}>
                                                                        {item?.subname}
                                                                    </Text>
                                                                    <Button
                                                                        title={item.btname}
                                                                        mode="contained"
                                                                        onPress={() => console.log('Pressed')}
                                                                        style={{
                                                                            marginVertical: 10,
                                                                        }}>
                                                                        {/* {item.btname} */}
                                                                    </Button>
                                                                </View>
                                                            </View>
                                                        </View>
                                                    );
                                                })}
                                            </View>
                                        </ScrollView>
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
                                                <Text style={{ color: selectTab === "FullTime" ? Color.white : Color.black, textAlign: 'center', fontSize: 12, fontFamily: Poppins.SemiBold }}>Full Time</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { setSelectTab("PartTime") }} style={{ padding: 8, paddingHorizontal: 20, borderRadius: 30, marginTop: 2, backgroundColor: selectTab === "PartTime" ? Color.primary : Color.lightgrey, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: selectTab === "PartTime" ? Color.white : Color.black, textAlign: 'center', fontSize: 12, fontFamily: Poppins.SemiBold }}>Part Time</Text>
                                            </TouchableOpacity>
                                            <TouchableOpacity onPress={() => { setSelectTab("Freelance") }} style={{ padding: 8, paddingHorizontal: 20, borderRadius: 30, marginTop: 2, backgroundColor: selectTab === "Freelance" ? Color.primary : Color.lightgrey, justifyContent: 'center', alignItems: 'center' }}>
                                                <Text style={{ color: selectTab === "Freelance" ? Color.white : Color.black, textAlign: 'center', fontSize: 12, fontFamily: Poppins.SemiBold }}>Freelance</Text>
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

                                                    fontSize: 14,
                                                    color: 'black',
                                                    fontFamily: Poppins.Regular,
                                                    paddingHorizontal: 10,
                                                }}>
                                                You Might Like
                                            </Text>
                                            <TouchableOpacity onPress={() => navigation.navigate("JobListScreen")}>
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
                                        <View style={{ width: '97%', alignItems: 'center', paddingVertical: 10 }}>
                                            <FlatList
                                                data={ActionSelect}
                                                keyExtractor={(item, index) => item + index}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => navigation.navigate("DetailedScreen")}
                                                            key={index}
                                                            style={{
                                                                width: 300,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderColor: Color.lightgrey,
                                                                borderWidth: 1,
                                                                padding: 10, margin: 5,
                                                                borderRadius: 5,
                                                            }}>

                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Text style={{ padding: 7, paddingHorizontal: 20, backgroundColor: '#DEFCE4', fontSize: 12, color: '#0BA02C', borderRadius: 5, fontFamily: Poppins.Medium }}>{item.job_type}</Text>

                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={'time-outline'}
                                                                        icon_size={20}
                                                                        icon_color={Color.Venus}
                                                                    />
                                                                    <Text style={{ fontSize: 12, color: Color.Venus, fontFamily: Poppins.Medium, paddingHorizontal: 5 }}>{item.job_post_date}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                                                <View style={{ padding: 10, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFFAFF', borderRadius: 50 }}>
                                                                    <Image
                                                                        // source={{ uri: item.image }}
                                                                        source={require('../../assets/logos/user.png')}
                                                                        style={{
                                                                            width: 35,
                                                                            height: 35,
                                                                            resizeMode: 'contain',
                                                                        }}
                                                                    />
                                                                </View>
                                                                <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                                                    <Text style={{ width: '100%', fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Medium, textAlign: 'justify' }} numberOfLines={2}>{item.job_name}</Text>
                                                                    <Text style={{ fontSize: 12, color: Color.Venus, fontFamily: Poppins.Light, textAlign: 'justify' }} numberOfLines={1}>{item.job_comp_name}</Text>
                                                                </View>
                                                                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'FontAwesome'}
                                                                        iconname={'bookmark-o'}
                                                                        icon_size={22}
                                                                        icon_color={Color.Venus}
                                                                    />
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                                    <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Poppins.Medium, paddingHorizontal: 5 }}>Salary/Month</Text>
                                                                    <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, paddingHorizontal: 5 }}>{item.job_comp_salary}</Text>
                                                                </View>
                                                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                                    <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Poppins.Medium, paddingHorizontal: 5 }} >Applicant</Text>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <Image
                                                                            source={require('../../assets/images/vector.png')}
                                                                            style={{
                                                                                width: 20,
                                                                                height: 20,
                                                                                resizeMode: 'contain',
                                                                            }}
                                                                        />
                                                                        <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, paddingHorizontal: 5 }}>{item.job_comp_applicant}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
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
                                <View style={{ width: scr_width, height: height, alignSelf: 'center', alignItems: 'center', backgroundColor: 'white', }}>
                                    <View style={{ width: '100%', marginVertical: 10, alignItems: 'center', }}>
                                        <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text
                                                style={{
                                                    fontSize: 16,
                                                    color: 'black',
                                                    fontFamily: 'Poppins-SemiBold',
                                                    paddingHorizontal: 10,
                                                }}>
                                                Top Companies
                                            </Text>
                                            <TouchableOpacity onPress={() => navigation.navigate("CompanyList")}>
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
                                                data={topCompany}
                                                keyExtractor={(item, index) => item + index}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity
                                                            key={index}
                                                            style={{
                                                                width: 180,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderColor: Color.white,
                                                                borderWidth: 0.5,
                                                                padding: 5, margin: 5,
                                                                borderRadius: 10, elevation: 1,
                                                                backgroundColor: '#EFFAFF'
                                                            }}>
                                                            <Image
                                                                // source={{ uri: item.comp_logo }}
                                                                source={require('../../assets/logos/user.png')}
                                                                style={{
                                                                    width: 80,
                                                                    height: 80,
                                                                    resizeMode: 'contain',
                                                                }}
                                                            />
                                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, paddingVertical: 5 }}>{item.comp_name}</Text>
                                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                <Iconviewcomponent
                                                                    Icontag={'Fontisto'}
                                                                    iconname={'map-marker-alt'}
                                                                    icon_size={20}
                                                                    icon_color={Color.Venus}
                                                                />
                                                                <Text style={{ fontSize: 13, color: Color.Venus, fontFamily: Poppins.Medium, paddingHorizontal: 5 }}>{item.comp_address}</Text>
                                                            </View>
                                                            <Text style={{ fontSize: 15, color: Color.primary, fontFamily: Poppins.Medium, textDecorationLine: 'underline', paddingVertical: 5 }}>{item.comp_offer_count} Jobs Open</Text>
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
                        case 'Banner':
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
                        case 'RecommendedJobs':
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
                                            width: '95%',
                                            marginVertical: 10,
                                            alignItems: 'center'
                                        }}>
                                        <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                            <Text
                                                style={{
                                                    // width: '90%',
                                                    fontSize: 16,
                                                    color: 'black',
                                                    fontFamily: 'Poppins-SemiBold',
                                                    paddingHorizontal: 10,
                                                }}>
                                                Recommended Jobs
                                            </Text>
                                            <TouchableOpacity onPress={() => navigation.navigate("JobListScreen")}>
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
                                        <View style={{ width: '97%', alignItems: 'center', paddingVertical: 10 }}>
                                            <FlatList
                                                data={ActionSelect}
                                                keyExtractor={(item, index) => item + index}
                                                renderItem={({ item, index }) => {
                                                    return (
                                                        <TouchableOpacity onPress={() => navigation.navigate("JobListScreen")}
                                                            key={index}
                                                            style={{
                                                                width: 300,
                                                                alignItems: 'center',
                                                                justifyContent: 'center',
                                                                borderColor: Color.lightgrey,
                                                                borderWidth: 1,
                                                                padding: 10, margin: 5,
                                                                borderRadius: 5,
                                                            }}>

                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <Text style={{ padding: 7, paddingHorizontal: 20, backgroundColor: '#DEFCE4', fontSize: 12, color: '#0BA02C', borderRadius: 5, fontFamily: Poppins.Medium }}>{item.job_type}</Text>

                                                                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'Ionicons'}
                                                                        iconname={'time-outline'}
                                                                        icon_size={20}
                                                                        icon_color={Color.Venus}
                                                                    />
                                                                    <Text style={{ fontSize: 12, color: Color.Venus, fontFamily: Poppins.Medium, paddingHorizontal: 5 }}>{item.job_post_date}</Text>
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                                                <View style={{ padding: 10, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFFAFF', borderRadius: 50 }}>
                                                                    <Image
                                                                        // source={{ uri: item.image }}
                                                                        source={require('../../assets/logos/user.png')}
                                                                        style={{
                                                                            width: 35,
                                                                            height: 35,
                                                                            resizeMode: 'contain',
                                                                        }}
                                                                    />
                                                                </View>
                                                                <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                                                    <Text style={{ width: '100%', fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Medium, textAlign: 'justify' }} numberOfLines={2}>{item.job_name}</Text>
                                                                    <Text style={{ fontSize: 12, color: Color.Venus, fontFamily: Poppins.Light, textAlign: 'justify' }} numberOfLines={1}>{item.job_comp_name}</Text>
                                                                </View>
                                                                <View style={{ flex: 0.5, justifyContent: 'center', alignItems: 'center' }}>
                                                                    <Iconviewcomponent
                                                                        Icontag={'FontAwesome'}
                                                                        iconname={'bookmark-o'}
                                                                        icon_size={22}
                                                                        icon_color={Color.Venus}
                                                                    />
                                                                </View>
                                                            </View>
                                                            <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                                    <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Poppins.Medium, paddingHorizontal: 5 }}>Salary/Month</Text>
                                                                    <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, paddingHorizontal: 5 }}>{item.job_comp_salary}</Text>
                                                                </View>
                                                                <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                                                    <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Poppins.Medium, paddingHorizontal: 5 }} >Applicant</Text>
                                                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                                        <Image
                                                                            source={require('../../assets/images/vector.png')}
                                                                            style={{
                                                                                width: 20,
                                                                                height: 20,
                                                                                resizeMode: 'contain',
                                                                            }}
                                                                        />
                                                                        <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, paddingHorizontal: 5 }}>{item.job_comp_applicant}</Text>
                                                                    </View>
                                                                </View>
                                                            </View>
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

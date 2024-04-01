//import liraries
import React, { Component, useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, Animated, UIManager, Platform, Image, TextInput, TouchableOpacity, ScrollView } from 'react-native';
import Color from '../../Global/Color';
import { Media } from '../../Global/Media';
import { scr_width } from '../../Utils/Dimensions';
import { useDispatch } from 'react-redux';
import { Iconviewcomponent } from '../../Components/Icontag';
import { Poppins } from '../../Global/FontFamily';

// create a component

const ContactUs = () => {
    const dispatch = useDispatch();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);

    let listOffset = useRef({});
    let listRefArr = useRef([]);
    let isListGliding = useRef(false);
    const [tabIndex, setIndex] = useState(0);

    const [routes] = useState([
        { id: 1, title: 'Buy' },
        { id: 2, title: 'Rent' },
        { id: 3, title: 'Rent' },
        { id: 4, title: 'Rent' },
        { id: 5, title: 'Rent' },
    ]);
    const [BuySection] = useState([
        {
            id: 1,
            title: 'Apply Albion Home Online',
            data: ['Apply Albion Home Online'],
        },
        { id: 3, title: 'How it works', data: ['How it works'] },
    ]);

    const scrollY = useRef(new Animated.Value(0)).current;

    useEffect(() => {
        scrollY.addListener(({ value }) => {
            const curRoute = routes[tabIndex].key;
            listOffset.current[curRoute] = value;
        });
        return () => {
            scrollY.removeAllListeners();
        };
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
        <View style={styles.container}>
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
                                <View style={{ width: '100%', backgroundColor: 'white' }}>
                                    <View style={{ width: scr_width, elevation: 2, borderRadius: 0 }}>
                                        <Image
                                            source={{ uri: Media.contactUs }}
                                            style={{
                                                width: scr_width,
                                                height: 150,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </View>
                                    <View style={{ width: '100%', alignItems: 'center' }}>

                                        <View style={{ width: '95%', marginVertical: 10, alignItems: 'center' }}>
                                            <Text style={{ fontSize: 16, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'left', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>For any other queries and feedback can reach us with below address </Text>

                                            <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                                                <View style={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: Color.primary, borderWidth: 1 }}>
                                                    <Iconviewcomponent
                                                        Icontag={'Feather'}
                                                        iconname={'phone-call'}
                                                        icon_size={22}
                                                        iconstyle={{ color: Color.primary }}
                                                    />
                                                </View>
                                                <Text style={{ fontSize: 18, color: Color.lightBlack, textAlign: 'justify', fontWeight: '600', lineHeight: 22, letterSpacing: 0.5, paddingHorizontal: 10 }}>+91 994-330-0100</Text>
                                            </TouchableOpacity>

                                            <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
                                                <View style={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: Color.primary, borderWidth: 1 }}>
                                                    <Iconviewcomponent
                                                        Icontag={'Ionicons'}
                                                        iconname={'mail'}
                                                        icon_size={22}
                                                        iconstyle={{ color: Color.primary }}
                                                    />
                                                </View>
                                                <Text style={{ fontSize: 18, color: Color.lightBlack, textAlign: 'justify', fontWeight: '600', lineHeight: 22, letterSpacing: 0.5, paddingHorizontal: 10 }}>admin@fobes.in</Text>
                                            </TouchableOpacity>
                                        </View>

                                        <View style={{ width: '95%', paddingHorizontal: 10, marginTop: 10, paddingVertical: 10 }}>
                                            <Text style={{ fontSize: 18, color: Color.black, fontWeight: 'bold', letterSpacing: 0.5 }}>
                                                Registered Address:
                                            </Text>
                                            <Text style={{ fontSize: 15, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>
                                                Level 5, Tamarai Tech Park,</Text>
                                            <Text style={{ fontSize: 15, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>
                                                S.P. Plot No. 16-19 & 20 A, </Text>
                                            <Text style={{ fontSize: 15, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>
                                                Thiru Vi Ka Industrial Estate, Inner Ring Road,                                             </Text>

                                            <Text style={{ fontSize: 15, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>
                                                Guindy, Chennai,
                                            </Text>
                                            <Text style={{ fontSize: 15, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>
                                                Tamil Nadu, 600 032, India.
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            );
                        case 'How it works':
                            return (
                                <View
                                    style={{
                                        width: '100%',
                                        height: height,
                                        alignItems: 'center',
                                        backgroundColor: 'white',
                                    }}>
                                    <View style={{ width: '100%', marginVertical: 10, alignItems: 'center', }}>
                                        <Text style={{ width: '100%', paddingHorizontal: 20, fontSize: 18, color: Color.black, fontWeight: 'bold', letterSpacing: 0.5 }}>
                                            Get In Touch
                                        </Text>

                                        <View style={{ width: '100%', paddingHorizontal: 15, alignItems: 'center' }}>
                                            <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 15, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>
                                                Enter Your Name
                                            </Text>
                                            <View style={styles.NumberBoxConatiner}>
                                                <TextInput
                                                    placeholder="Enter Your Name"
                                                    placeholderTextColor={Color.grey}
                                                    value={""}
                                                    keyboardType="name-phone-pad"
                                                    maxLength={10}
                                                    onChangeText={text => {
                                                        console.log("text --------- :", text);
                                                    }}
                                                    style={styles.numberTextBox}
                                                />
                                            </View>
                                        </View>
                                        {/* <Text style={styles.invalidLogin}>{error}</Text> */}

                                        <View style={{ width: '100%', paddingHorizontal: 15, alignItems: 'center' }}>
                                            <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 15, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>
                                                Enter Your E-mail
                                            </Text>
                                            <View style={styles.NumberBoxConatiner}>
                                                <TextInput
                                                    placeholder="Enter Your Email"
                                                    placeholderTextColor={Color.grey}
                                                    value={""}
                                                    keyboardType="email-address"
                                                    maxLength={10}
                                                    onChangeText={text => {
                                                        console.log("text --------- :", text);
                                                    }}
                                                    style={styles.numberTextBox}
                                                />
                                            </View>
                                        </View>

                                        <View style={{ width: '100%', paddingHorizontal: 15, alignItems: 'center' }}>
                                            <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 15, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>
                                                Enter your Subjects
                                            </Text>
                                            <View style={[styles.incomeBoxConatiner, { width: '95%' }]}>
                                                <TextInput
                                                    placeholder="Enter your Subjects"
                                                    placeholderTextColor={Color.grey}
                                                    value={""}
                                                    keyboardType="name-phone-pad"
                                                    maxLength={10}
                                                    onChangeText={(text) => {
                                                        // setIncome(text);
                                                        console.log("text --------- :", text);
                                                    }}
                                                    style={styles.numberTextBox}
                                                />
                                            </View>
                                        </View>
                                        <View style={{ width: '100%', paddingHorizontal: 15, alignItems: 'center' }}>
                                            <Text style={{ width: '100%', paddingHorizontal: 10, fontSize: 15, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>
                                                Enter your Message
                                            </Text>
                                            <View style={{ width: '95%' }}>
                                                <TextInput
                                                    placeholder="Enter your Message ..."
                                                    placeholderTextColor={Color.cloudyGrey}
                                                    value={""}
                                                    textAlignVertical="top"
                                                    onChangeText={text => {
                                                        console.log("message ============= :", text)
                                                    }}
                                                    // onContentSizeChange={event => {
                                                    //   setCardHeight(
                                                    //     Math.max(150, event.nativeEvent.contentSize.height),
                                                    //   );
                                                    // }}
                                                    multiline
                                                    style={{
                                                        fontSize: 15,
                                                        flex: 1,
                                                        color: Color.cloudyGrey,
                                                        padding: 10,
                                                        height: 150,
                                                        borderWidth: 1,
                                                        borderColor: Color.cloudyGrey,
                                                        marginVertical: 5,
                                                        borderRadius: 5,
                                                    }}
                                                />
                                            </View>
                                        </View>


                                        <TouchableOpacity
                                            activeOpacity={0.7}
                                            style={{
                                                width: '90%',
                                                height: 50,
                                                marginVertical: 20,
                                                backgroundColor: Color.primary,
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                borderRadius: 5,
                                            }}>
                                            <Text style={{ fontSize: 16, color: 'white' }}>
                                                Send Message
                                            </Text>
                                        </TouchableOpacity>
                                    </View>

                                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                                            <Image
                                                source={require('../../assets/logos/user.png')}
                                                style={{ width: 100, height: 100, resizeMode: 'contain' }}
                                            />
                                        </View>
                                        <View style={{ flex: 3, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 10 }}>
                                            <Text style={{ width: '100%', textAlign: 'left', fontSize: 18, color: Color.primary, fontWeight: 'bold', letterSpacing: 0.2 }}>Fobes Skill Itech Private Limited</Text>
                                            <Text style={{ width: '100%', textAlign: 'justify', fontSize: 14, color: Color.cloudyGrey, fontFamily: Poppins.Regular, lineHeight: 20, letterSpacing: 0.5, paddingVertical: 5 }} >You are hired! Get yourself registered. The top companies in the league are hiring now.</Text>
                                        </View>
                                    </View>
                                </View>
                            );
                    }
                }}
            />
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2c3e50',
    },
    NumberBoxConatiner: {
        width: '95%',
        borderColor: Color.grey,
        borderWidth: 1,
        paddingStart: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 5,
    },
    incomeBoxConatiner: {
        width: '95%',
        borderColor: Color.grey,
        borderWidth: 1,
        paddingStart: 10,
        height: 50,
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'flex-start',
        borderRadius: 5,
    },
    numberTextBox: {
        width: '100%',
        height: 50,
        color: Color.black,
        fontSize: 16,
        fontFamily: 'Poppins-Regular',
    },
    invalidLogin: {
        width: '90%',
        fontSize: 13,
        marginHorizontal: 10,
        fontFamily: 'Poppins-SemiBold',
        color: Color.red,
    },
});

//make this component available to the app
export default ContactUs;

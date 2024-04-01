//import liraries
import React, { Component, useState } from 'react';
import { View, Text, StyleSheet, StatusBar, Animated, FlatList, Image, TouchableOpacity } from 'react-native';
import Color from '../../Global/Color';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from "react-redux";
import NetInfo from "@react-native-community/netinfo";
import { Media } from '../../Global/Media';
import { scr_width } from '../../Utils/Dimensions';
import { Poppins } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';

const aboutData = [
    {
        'id': '0',
        'rent_title': 'Cost Effective',
        'rent_subText': 'Whether you choose to post your jobs directly or have them indexed automatically, our pricing model is highly competitive and cost-effective.'
    },
    {
        'id': '1',
        'rent_title': 'Easy to Use',
        'rent_subText': 'We have created a streamlined user-interface so you can easily manage your jobs and candidates.'
    },
    {
        'id': '2',
        'rent_title': 'Quality Candidate',
        'rent_subText': 'Irrespective of your organization’s size, we have a large pool of candidates with diverse skill sets and experience levels.'
    },
];

// create a component
const AboutUs = () => {

    const dispatch = useDispatch();
    const navigation = useNavigation();
    const [netInfo_State, setNetinfo] = useState(true);
    const [height, setHeight] = useState(undefined);


    function renderHeaderItem() {
        try {
            return (
                <View style={{ width: '100%', alignItems: 'center' }}>
                    <View style={{ width: scr_width }}>
                        <Image
                            source={{ uri: Media.aboutUs }}
                            style={{
                                width: scr_width,
                                height: 150,
                                resizeMode: 'contain',
                            }}
                        />
                    </View>

                    <View style={{ width: '100%', padding: 10 }}>
                        <Text style={{ fontSize: 18, color: Color.black, fontWeight: 'bold', letterSpacing: 0.5 }}>We’re a highly skilled and professionals team</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>At Fobes, we're more than just a job portal; we're your partner in career success. Our dedicated team is committed to revolutionizing the job search experience.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: Color.routeColor, textAlign: 'justify', fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, paddingVertical: 10 }}>We believe in connecting talent with opportunity, ensuring that every individual finds meaningful work, and every employer discovers exceptional talent. With a passion for excellence, we strive to make the job market accessible, transparent, and rewarding for all. Join us on this journey as we shape the future of employment.</Text>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 10 }}>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'bag-check-outline'}
                                icon_size={26}
                                iconstyle={{ color: Color.cloudyGrey, paddingVertical: 5 }}
                            />
                            <Text style={{ fontSize: 20, color: Color.primary, fontFamily: Poppins.SemiBold, fontWeight: 'bold', paddingVertical: 5 }}>52</Text>
                            <Text style={{ fontSize: 16, color: Color.routeColor, fontFamily: Poppins.Regular, letterSpacing: 0.5 }}>Live Jobs</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'FontAwesome'}
                                iconname={'building-o'}
                                icon_size={26}
                                iconstyle={{ color: Color.cloudyGrey, paddingVertical: 5 }}
                            />
                            <Text style={{ fontSize: 20, color: Color.primary, fontFamily: Poppins.SemiBold, fontWeight: 'bold', paddingVertical: 5 }}>1345</Text>
                            <Text style={{ fontSize: 16, color: Color.routeColor, fontFamily: Poppins.Regular, letterSpacing: 0.5 }}>Companies</Text>
                        </View>
                        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                            <Iconviewcomponent
                                Icontag={'Feather'}
                                iconname={'users'}
                                icon_size={26}
                                iconstyle={{ color: Color.cloudyGrey, paddingVertical: 5 }}
                            />
                            <Text style={{ fontSize: 20, color: Color.primary, fontFamily: Poppins.SemiBold, fontWeight: 'bold', paddingVertical: 5 }}>2462</Text>
                            <Text style={{ fontSize: 16, color: Color.routeColor, fontFamily: Poppins.Regular, letterSpacing: 0.5 }}>Candidates</Text>
                        </View>
                    </View>

                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ paddingHorizontal: 5, fontSize: 18, color: Color.black, fontWeight: 'bold', letterSpacing: 0.5 }}>Why Choose Fobes</Text>
                    </View>
                </View>
            );
        } catch (error) {
            console.log("catch in renderHeader_Item's : ", error);
        }
    }

    function renderAboutItem(item, index) {
        try {
            return (
                <View style={{ width: '100%', alignItems: 'center' }}>

                    <View style={{ width: '100%', paddingVertical: 10, paddingHorizontal: 10 }}>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <View style={{ width: 5, height: 5, backgroundColor: '#666', borderRadius: 50 }}></View>
                            <Text style={{ fontSize: 16, color: Color.black, textAlign: 'justify', marginHorizontal: 10, fontWeight: '700', }}>{item.rent_title}</Text>
                        </View>
                        <Text style={{ width: '100%', fontSize: 15, color: Color.cloudyGrey, textAlign: 'justify', fontWeight: '400', lineHeight: 25 }}>{item.rent_subText}</Text>
                    </View>
                </View>
            );
        } catch (error) {
            console.log("catch in renderAbout_Item's : ", error);
        }
    }

    function renderFooterItem() {
        try {
            return (
                <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 5, }}>
                    <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginTop: 20 }}>
                        <Text style={{ paddingHorizontal: 0, fontSize: 18, color: Color.black, fontWeight: 'bold', letterSpacing: 0.5 }}>Our Mission</Text>
                    </View>
                    <View style={{ width: '100%', }}>
                        <Text style={{ width: '100%', fontSize: 14, color: Color.routeColor,fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>At Fobes, our mission is to empower individuals and organizations to achieve their full potential by connecting talent with opportunity. We believe that every person deserves meaningful work, and every employer deserves exceptional talent.</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: Color.routeColor,  fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>We are dedicated to delivering quality connections. We strive for excellence in matching talent to the right opportunities, resulting in long-lasting, fulfilling employment relationships.</Text>
                    </View>

                    <View style={{ width: '100%', marginVertical: 10, alignItems: 'center' }}>
                        <Text style={{ width: '100%', textAlign: 'left', fontSize: 18, color: Color.black, fontWeight: 'bold', letterSpacing: 0.5 }}>Contact Us</Text>
                        <Text style={{ width: '100%', fontSize: 14, color: Color.routeColor, fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingVertical: 10 }}>For any other queries and feedback can reach us with below address </Text>

                        <TouchableOpacity style={{ width: '95%', flexDirection: 'row', alignItems: 'center', marginVertical: 20 }}>
                            <View style={{ width: 45, height: 45, justifyContent: 'center', alignItems: 'center', borderRadius: 50, borderColor: Color.primary, borderWidth: 1 }}>
                                <Iconviewcomponent
                                    Icontag={'Feather'}
                                    iconname={'phone-call'}
                                    icon_size={22}
                                    iconstyle={{ color: Color.primary }}
                                />
                            </View>
                            <Text style={{ fontSize: 18, color: Color.lightBlack, fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingHorizontal: 10 }}>+91 994-330-0100</Text>
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
                            <Text style={{ fontSize: 18, color: Color.lightBlack, fontFamily: Poppins.Regular, textAlign: 'justify', lineHeight: 22, letterSpacing: 0.5, paddingHorizontal: 10 }}>admin@fobes.in</Text>
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
        } catch (error) {
            console.log("catch in renderFooter_Item's : ", error);
        }
    }

    return (
        <View style={styles.container}>
            <StatusBar
                hidden={false}
                backgroundColor={Color.primary}
                translucent={false}
                barStyle='dark-content'
                networkActivityIndicatorVisible={true} />

            {netInfo_State ? null :
                <Animated.View animation="fadeInRight" style={{ flex: 1, position: 'absolute', zIndex: 9999, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#626262', opacity: 0.5, padding: 10 }}>
                    <Text style={{ color: 'white' }}>No Internet Connection</Text>
                </Animated.View>
            }


            <View style={{ width: '100%', height: height, justifyContent: 'center', alignItems: 'center', backgroundColor: 'white' }}>
                <FlatList
                    data={aboutData}
                    keyExtractor={(item, index) => item + index}
                    ListHeaderComponent={() => renderHeaderItem()}
                    renderItem={({ item, index }) => renderAboutItem(item, index)}
                    ListFooterComponent={() => renderFooterItem()}
                    style={{ width: '95%' }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
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
});

//make this component available to the app
export default AboutUs;

//import liraries
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
import { Media } from '../../Global/Media';
import { Poppins } from '../../Global/FontFamily';
import Color from '../../Global/Color';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';

// create a component
const JobListScreen = () => {

    const navigation = useNavigation();

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

    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: scr_height * 0.8 - 10, alignItems: 'center' }}>

                <View style={{ width: '100%', flexDirection: 'row', width: scr_width, backgroundColor: Color.primary, justifyContent: 'center', alignItems: 'center' }}>
                    <TouchableOpacity activeOpacity={0.5}
                        style={{
                            marginHorizontal: 5,
                            borderColor: Color.lightgrey,
                            marginVertical: 10,
                            borderWidth: 1,
                            flexDirection: 'row',
                            alignItems: 'center',
                            borderRadius: 5,
                            width: '90%',
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
                </View>

                <FlatList
                    data={ActionSelect}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("DetailedScreen")}
                                key={index}
                                style={{
                                    width: '97%',
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                    borderColor: Color.lightgrey,
                                    borderWidth: 1,
                                    padding: 10, margin: 5,
                                    borderRadius: 5,
                                }}>

                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <Text style={{ padding: 10, paddingHorizontal: 20, backgroundColor: '#DEFCE4', fontSize: 13, color: '#0BA02C', borderRadius: 5, fontFamily: Poppins.Medium, letterSpacing: 0.3 }}>{item.job_type}</Text>

                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <Iconviewcomponent
                                            Icontag={'Ionicons'}
                                            iconname={'time-outline'}
                                            icon_size={20}
                                            icon_color={Color.Venus}
                                        />
                                        <Text style={{ fontSize: 13, color: Color.Venus, fontFamily: Poppins.Medium, paddingHorizontal: 5, letterSpacing: 0.3 }}>{item.job_post_date}</Text>
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
                                        <Text style={{ width: '100%', fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.Medium, textAlign: 'justify', fontWeight: '700', letterSpacing: 0.3 }} numberOfLines={2}>{item.job_name}</Text>
                                        <Text style={{ fontSize: 13, color: Color.Venus, fontFamily: Poppins.Light, textAlign: 'justify', letterSpacing: 0.3 }} numberOfLines={1}>{item.job_comp_name}</Text>
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
                                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium, paddingHorizontal: 5, letterSpacing: 0.3 }}>Salary / Month</Text>
                                        <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, paddingHorizontal: 5, paddingVertical: 5, letterSpacing: 0.3 }}>{item.job_comp_salary}</Text>
                                    </View>
                                    <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium, paddingHorizontal: 5, letterSpacing: 0.3 }} >Applicant</Text>
                                        <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: 5 }}>
                                            <Image
                                                source={require('../../assets/images/vector.png')}
                                                style={{
                                                    width: 20,
                                                    height: 20,
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                            <Text style={{ fontSize: 16, color: Color.primary, fontFamily: Poppins.SemiBold, paddingHorizontal: 5, letterSpacing: 0.3 }}>{item.job_comp_applicant}</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View>
        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: scr_width,
        height: scr_height, alignItems: 'center',
        backgroundColor: Color.white,
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
export default JobListScreen;

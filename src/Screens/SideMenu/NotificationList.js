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
const NotificationList = () => {

    const navigation = useNavigation();

    const [ActionSelect, setActionSelect] = useState([
        {
            id: 0,
            job_name: `You've Applied for this Job`,
            image: Media.propertyMain,
            subImage: Media.propertysub,
            job_type: 'Full Time',
            job_post_date: '1 day ago',
            job_comp_logo: '',
            job_comp_name: 'You have successfully applied for the job. Thank you for your application!',
            job_comp_book_status: true,
            job_comp_salary: '₹10k -  ₹20 k',
            job_comp_applicant: '500',

        },
        {
            id: 1,
            job_name: 'New Job Posted',
            image: Media.AuctionMain,
            subImage: Media.AuctionSub,
            job_type: 'Full Time',
            job_post_date: '3 days ago',
            job_comp_logo: '',
            job_comp_name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            job_comp_book_status: false,
            job_comp_salary: '₹40k -  ₹70 k',
            job_comp_applicant: '250',
        },
        {
            id: 2,
            job_name: `You've Applied for this Job`,
            image: Media.propertyMain,
            subImage: Media.propertysub,
            job_type: 'Freelance',
            job_post_date: '1 day ago',
            job_comp_logo: '',
            job_comp_name: 'You have successfully applied for the job. Thank you for your application!',
            job_comp_book_status: false,
            job_comp_salary: '₹30k -  ₹50 k',
            job_comp_applicant: '50',
        },
        {
            id: 3,
            job_name: `You've Applied for this Job`,
            image: Media.AuctionMain,
            subImage: Media.AuctionSub,
            job_type: 'Full Time',
            job_post_date: '4 days ago',
            job_comp_logo: '',
            job_comp_name: 'You have successfully applied for the job. Thank you for your application!',
            job_comp_book_status: false,
            job_comp_salary: '₹25k -  ₹60 k',
            job_comp_applicant: '7',
        },
        {
            id: 4,
            job_name: 'New Job Posted',
            image: Media.AuctionMain,
            subImage: Media.AuctionSub,
            job_type: 'Part Time',
            job_post_date: '2 days ago',
            job_comp_logo: '',
            job_comp_name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            job_comp_book_status: false,
            job_comp_salary: '₹15k -  ₹30 k',
            job_comp_applicant: '15',
        },
        {
            id: 5,
            job_name: 'New Job Posted',
            image: Media.AuctionMain,
            subImage: Media.AuctionSub,
            job_type: 'Part Time',
            job_post_date: '2 days ago',
            job_comp_logo: '',
            job_comp_name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ',
            job_comp_book_status: false,
            job_comp_salary: '₹15k -  ₹30 k',
            job_comp_applicant: '15',
        },
    ]);

    return (
        <View style={styles.container}>
            <View style={{ width: '95%', height: scr_height * 0.8 - 10 }}>
                <FlatList
                    data={ActionSelect}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => {

                        let applied = item.job_name === "You've Applied for this Job" ? '#0BA02C' : Color.lightBlack
                        let appliedCheck = item.job_name === "You've Applied for this Job" ? '#0BA02C' : Color.width
                        return (
                            <TouchableOpacity
                                key={index}
                                style={{
                                    width: '98%',
                                    // alignItems: 'center',
                                    // justifyContent: 'center',
                                    borderColor: Color.lightgrey,
                                    borderWidth: 1,
                                    padding: 10, margin: 5,
                                    borderRadius: 5,
                                }}>
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                    <View style={{ padding: 10, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: '#EFFAFF', borderRadius: 50 }}>
                                        <Image
                                            source={require('../../assets/images/app_status.png')}
                                            style={{
                                                width: 35,
                                                height: 35,
                                                resizeMode: 'contain',
                                            }}
                                        />
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                            {appliedCheck ?
                                                <Iconviewcomponent
                                                    Icontag={'Feather'}
                                                    iconname={'check'}
                                                    icon_size={20}
                                                    icon_color={'#0BA02C'}
                                                /> : null
                                            }
                                            <Text style={{ width: '100%', fontSize: 16, color: applied, paddingHorizontal: 5, fontFamily: Poppins.SemiBold, textAlign: 'justify', paddingVertical: 5 }} numberOfLines={1}>{item.job_name}</Text>
                                        </View>
                                        <Text style={{ width: '100%', fontSize: 13, color: Color.cloudyGrey, fontFamily: Poppins.Regular, textAlign: 'justify' }} numberOfLines={2}>{item.job_comp_name}</Text>
                                    </View>

                                </View>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                    <Iconviewcomponent
                                        Icontag={'Ionicons'}
                                        iconname={'time-outline'}
                                        icon_size={20}
                                        icon_color={Color.primary}
                                    />
                                    <Text style={{ fontSize: 14, color: Color.lightBlack, fontFamily: Poppins.Medium, textAlign: 'justify', paddingHorizontal: 5 }} numberOfLines={2}>{item.job_post_date}</Text>
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
});


//make this component available to the app
export default NotificationList;

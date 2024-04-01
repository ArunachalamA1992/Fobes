//import liraries
import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    Image,
    TouchableOpacity,
} from 'react-native';
import Color from '../../Global/Color';
import { Poppins } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useDispatch } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { Media } from '../../Global/Media';


// create a component
const SavedJobScreen = () => {
    const dispatch = useDispatch();
    const navigation = useNavigation()
    const [netInfo_State, setNetinfo] = useState(true);
    const [scr_height, setScr_height] = useState(undefined);


    const [ApplyJobData, setApplyJobData] = useState([
        {
            id: 0,
            apply_job_name: 'Business Development Executive',
            apply_job_image: Media.status,
            apply_job_subImage: Media.propertysub,
            apply_job_type: 'Full Time',
            apply_job_post_date: '1 day ago',
            apply_apply_job_comp_logo: '',
            apply_job_comp_name: 'Wipro Technologies ',
            apply_job_comp_book_status: true,
            apply_job_comp_salary: '₹10k -  ₹20 k',
            apply_job_comp_applicant: '500',
            apply_job_comp_loc: 'Coimbatore, Tamilnadu'

        },
        {
            id: 1,
            apply_job_name: 'Mobile App Development',
            apply_job_image: Media.status,
            apply_job_subImage: Media.AuctionSub,
            apply_job_type: 'Full Time',
            apply_job_post_date: '3 days ago',
            apply_job_comp_logo: '',
            apply_job_comp_name: 'TCS',
            apply_job_comp_book_status: false,
            apply_job_comp_salary: '₹40k -  ₹70 k',
            apply_job_comp_applicant: '250',
            apply_job_comp_loc: 'Chennai, Tamilnadu'
        },
        {
            id: 2,
            apply_job_name: 'Graphics Designer',
            apply_job_image: Media.status,
            apply_job_subImage: Media.propertysub,
            apply_job_type: 'Freelance',
            apply_job_post_date: '1 day ago',
            apply_job_comp_logo: '',
            apply_job_comp_name: 'KGISL Group',
            apply_job_comp_book_status: false,
            apply_job_comp_salary: '₹30k -  ₹50 k',
            apply_job_comp_applicant: '50',
            apply_job_comp_loc: 'Coimbatore, Tamilnadu'
        },
        {
            id: 3,
            apply_job_name: 'Website designer',
            apply_job_image: Media.status,
            apply_job_subImage: Media.AuctionSub,
            apply_job_type: 'Full Time',
            apply_job_post_date: '4 days ago',
            apply_job_comp_logo: '',
            apply_job_comp_name: 'Brightway Group Tech',
            apply_job_comp_book_status: false,
            apply_job_comp_salary: '₹25k -  ₹60 k',
            apply_job_comp_applicant: '7',
            apply_job_comp_loc: 'Madurai, Tamilnadu'
        },
        {
            id: 4,
            apply_job_name: 'SEO Analyst',
            apply_job_image: Media.status,
            apply_job_subImage: Media.AuctionSub,
            apply_job_type: 'Part Time',
            apply_job_post_date: '2 days ago',
            apply_job_comp_logo: '',
            apply_job_comp_name: 'Avanexa Technologies',
            apply_job_comp_book_status: false,
            apply_job_comp_salary: '₹15k -  ₹30 k',
            apply_job_comp_applicant: '15',
            apply_job_comp_loc: 'Chennai, Tamilnadu'
        },
        {
            id: 5,
            apply_job_name: 'Website designer',
            apply_job_image: Media.status,
            apply_job_subImage: Media.AuctionSub,
            apply_job_type: 'Full Time',
            apply_job_post_date: '4 days ago',
            apply_job_comp_logo: '',
            apply_job_comp_name: 'Brightway Group Tech',
            apply_job_comp_book_status: false,
            apply_job_comp_salary: '₹25k -  ₹60 k',
            apply_job_comp_applicant: '7',
            apply_job_comp_loc: 'Coimbatore, Tamilnadu'
        },
        {
            id: 6,
            apply_job_name: 'SEO Analyst',
            apply_job_image: Media.status,
            apply_job_subImage: Media.AuctionSub,
            apply_job_type: 'Part Time',
            apply_job_post_date: '2 days ago',
            apply_job_comp_logo: '',
            apply_job_comp_name: 'Avanexa Technologies',
            apply_job_comp_book_status: false,
            apply_job_comp_salary: '₹15k -  ₹30 k',
            apply_job_comp_applicant: '15',
            apply_job_comp_loc: 'Madurai, Tamilnadu'
        },
    ]);


    return (
        <View style={styles.container}>
            <View style={{ width: '100%', height: scr_height, alignItems: 'center', paddingVertical: 10, marginVertical: 10 }}>
                <FlatList
                    data={ApplyJobData}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => {
                        return (
                            <View
                                key={index}
                                style={{
                                    width: '95%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: Color.lightgrey,
                                    borderWidth: 1,
                                    padding: 10, margin: 7,
                                    borderRadius: 5,
                                }}>
                                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', paddingVertical: 10 }}>
                                    <TouchableOpacity style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                        <View style={{ width: 70, height: 70, backgroundColor: '#EFFAFF', padding: 5, borderRadius: 50 }}>
                                            <Image
                                                source={require('../../assets/images/app_status.png')}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </View>
                                        <View style={{ flex: 2, justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                            <Text style={{ width: '100%', fontSize: 16, color: Color.lightBlack, fontFamily: Poppins.SemiBold, textAlign: 'justify', fontWeight: '700', letterSpacing: 0.3, lineHeight: 22 }} numberOfLines={2}>{item.apply_job_name}</Text>
                                            <Text style={{ fontSize: 13, color: Color.darkGrey, fontFamily: Poppins.Medium, textAlign: 'justify', fontWeight: '700', letterSpacing: 0.3, lineHeight: 22 }} numberOfLines={1}>{item.apply_job_comp_name}</Text>
                                        </View>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={{ flex: 0, justifyContent: 'center', alignItems: 'center', padding: 10 }}>
                                        <Iconviewcomponent
                                            Icontag={'Ionicons'}
                                            iconname={'bookmark-outline'}
                                            icon_size={26}
                                            icon_color={Color.Venus}
                                        />
                                    </TouchableOpacity>
                                </View>

                                <View style={{ width: '100%', flexDirection: 'row', paddingVertical: 5, justifyContent: 'space-between', alignItems: 'center' }}>
                                    <View style={{ flex: 2, flexDirection: 'row', alignItems: 'center' }}>
                                        <Iconviewcomponent
                                            Icontag={'Fontisto'}
                                            iconname={'map-marker-alt'}
                                            icon_size={20}
                                            icon_color={Color.lightgrey}
                                        />
                                        <Text style={{ fontSize: 13, color: Color.lightBlack, fontFamily: Poppins.Medium, paddingHorizontal: 5, fontWeight: '700', letterSpacing: 0.3, lineHeight: 22 }} numberOfLines={2}>{item.apply_job_comp_loc}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <Iconviewcomponent
                                            Icontag={'FontAwesome'}
                                            iconname={'briefcase'}
                                            icon_size={20}
                                            icon_color={Color.lightgrey}
                                        />
                                        <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Poppins.Medium, paddingHorizontal: 5, fontWeight: '700', letterSpacing: 0.3, lineHeight: 22 }} numberOfLines={2}>{item.apply_job_type}</Text>
                                    </View>
                                    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
                                        <View style={{ width: 8, height: 8, borderRadius: 30, backgroundColor: Color.lightgrey }}></View>
                                        <Text style={{ fontSize: 12, color: Color.lightBlack, fontFamily: Poppins.Medium, paddingHorizontal: 5, fontWeight: '700', letterSpacing: 0.3, lineHeight: 22 }} numberOfLines={2}>{item.apply_job_comp_salary}</Text>
                                    </View>
                                </View>
                            </View>
                        );
                    }}
                    showsVerticalScrollIndicator={false}
                />
            </View >
        </View >
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.white,
    },
});


//make this component available to the app
export default SavedJobScreen;

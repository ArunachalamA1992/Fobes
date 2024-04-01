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
import Color from '../../Global/Color';
import { Poppins } from '../../Global/FontFamily';
import { Iconviewcomponent } from '../../Components/Icontag';
import { useNavigation } from '@react-navigation/native';

// create a component
const CompanyList = () => {
    const navigation = useNavigation();

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
            comp_address: 'Chennai',
            comp_offer_count: '150',
            image: Media.propertyMain,
        },
        {
            id: 2,
            comp_logo: Media.propertyMain,
            comp_name: 'Calibre Infotech',
            comp_address: 'Bangalore',
            comp_offer_count: '25',
            image: Media.propertyMain,
        },
        {
            id: 3,
            comp_logo: Media.propertyMain,
            comp_name: 'CTS',
            comp_address: 'Coimbatore',
            comp_offer_count: '250',
            image: Media.propertyMain,
        },
        {
            id: 4,
            comp_logo: Media.propertyMain,
            comp_name: 'TCS',
            comp_address: 'Hyderabad',
            comp_offer_count: '120',
            image: Media.propertyMain,
        },
    ]);


    return (
        <View style={styles.container}>
            <View style={{ width: '97%', paddingVertical: 10 }}>
                <FlatList
                    data={topCompany}
                    keyExtractor={(item, index) => item + index}
                    renderItem={({ item, index }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate("CompanyDetails")}
                                key={index}
                                style={{
                                    width: '98%',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    borderColor: Color.white, padding: 5, margin: 5,
                                    borderRadius: 5, elevation: 0.5,
                                    backgroundColor: '#fff', paddingHorizontal: 10
                                }}>
                                <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingTop: 10 }}>
                                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                        <View style={{ width: 70, height: 70, backgroundColor: Color.white, borderRadius: 50, padding: 0 }}>
                                            <Image
                                                // source={{ uri: item.comp_logo }}
                                                source={require('../../assets/logos/user.png')}
                                                style={{
                                                    width: '100%',
                                                    height: '100%',
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </View>
                                        <View style={{ justifyContent: 'flex-start', alignItems: 'flex-start', paddingHorizontal: 10 }}>
                                            <Text style={{ fontSize: 16, color: Color.black, fontFamily: Poppins.SemiBold, }} numberOfLines={2}>{item.comp_name}</Text>
                                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                                <Iconviewcomponent
                                                    Icontag={'FontAwesome'}
                                                    iconname={'star'}
                                                    icon_size={20}
                                                    icon_color={Color.sunShade}
                                                />
                                                <Text style={{ fontSize: 13, color: Color.Venus, fontFamily: Poppins.Medium, paddingHorizontal: 5 }}>4.5</Text>
                                                <Text style={{ fontSize: 13, color: Color.Venus, fontFamily: Poppins.Medium, paddingHorizontal: 5 }}>(500 reviews)</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={{ paddingHorizontal: 10 }}>
                                        <Iconviewcomponent
                                            Icontag={'Ionicons'}
                                            iconname={'chevron-forward-outline'}
                                            icon_size={24}
                                            icon_color={Color.Venus}
                                        />
                                    </View>
                                </View>
                                <View style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10 }}>
                                    <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
                                        <Iconviewcomponent
                                            Icontag={'Fontisto'}
                                            iconname={'map-marker-alt'}
                                            icon_size={20}
                                            icon_color={Color.Venus}
                                        />
                                        <Text style={{ fontSize: 14, color: Color.Venus, fontFamily: Poppins.Medium, paddingHorizontal: 5 }} numberOfLines={1}>{item.comp_address}</Text>
                                    </View>
                                    <View style={{ flex: 1, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                                        <Text style={{ fontSize: 14, color: Color.primary, fontFamily: Poppins.SemiBold, textDecorationLine: 'underline', paddingVertical: 5 }} numberOfLines={1}>{item.comp_offer_count} Jobs Open</Text>
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
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DBF3FF',
    },
});

//make this component available to the app
export default CompanyList;

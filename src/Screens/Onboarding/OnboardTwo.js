//import liraries
import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { scr_height, scr_width } from '../../Utils/Dimensions';
import { Poppins } from '../../Global/FontFamily';
import Color from '../../Global/Color';
import { useNavigation } from '@react-navigation/native';
import { Iconviewcomponent } from '../../Components/Icontag';

// create a component
const OnboardTwo = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <View style={{ flex: 2, alignItems: 'center', justifyContent: 'center' }}>
                <Image
                    source={require('../../assets/images/onboard_2.png')}
                    // source={{ uri: 'https://cdni.iconscout.com/illustration/premium/thumb/online-job-search-4836622-4032953.png' }}
                    style={{ width: '100%', height: '100%', resizeMode: 'cover' }} />
            </View>
            <View style={{ flex: 1.2, justifyContent: 'center', alignItems: 'center' }}>
                <View style={{ flex: 1, width: '100%', justifyContent: 'center', alignItems: 'center', backgroundColor: 'white', paddingVertical: 10 }}>
                    <Text style={{ width: '80%', fontSize: 20, fontFamily: Poppins.SemiBold, color: Color.primary, textAlign: 'center', textTransform: 'capitalize' }}>Grab the Oppurtunity</Text>
                    <Text style={{ width: '80%', fontSize: 14, fontFamily: Poppins.Regular, color: Color.routeColor, textAlign: 'center', paddingVertical: 5 }} numberOfLines={2}>Thrilled to have you onboard! Let's explore new career horizons together.</Text>
                </View>
                <View style={{ flex: 1, justifyContent: 'flex-start', alignItems: 'flex-start', bottom: 0, backgroundColor: 'white' }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start', }}>
                        <TouchableOpacity onPress={() => navigation.navigate("OnboardOne")} style={{ padding: 10, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 50 }}>
                            {/* <Text style={{ fontSize: 16, color: Color.white, fontFamily: Poppins.SemiBold, textTransform: 'uppercase' }}>Get Started</Text> */}
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-back-outline'}
                                icon_size={26}
                                icon_color={Color.white}
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => navigation.navigate("Auth")} style={{ padding: 10, paddingHorizontal: 10, justifyContent: 'center', alignItems: 'center', backgroundColor: Color.primary, borderRadius: 50, marginHorizontal: 10 }}>
                            {/* <Text style={{ fontSize: 16, color: Color.white, fontFamily: Poppins.SemiBold, textTransform: 'uppercase' }}>Get Started</Text> */}
                            <Iconviewcomponent
                                Icontag={'Ionicons'}
                                iconname={'chevron-forward-outline'}
                                icon_size={26}
                                icon_color={Color.white}
                            />
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    container: {
        width: scr_width,
        height: scr_height,
        backgroundColor: '#fff',
    },
});

//make this component available to the app
export default OnboardTwo;

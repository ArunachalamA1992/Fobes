import React, { useEffect, useState } from 'react';
import { View, Image, StyleSheet, Animated } from 'react-native';
import Color from './Global/Color';
import { Poppins } from './Global/FontFamily';
import { useNavigation } from '@react-navigation/native';

const SplashScreen = () => {
    const navigation = useNavigation();
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        try {
            // setIsLoading(true);
            const SplashLoad = setTimeout(() => {
                // checkForUpdates();
                navigation.navigate("OnboardOne");
                // setIsLoading(false);
            }, 3000);
            return () => {
                clearInterval(SplashLoad);
            };


        } catch (error) {
            console.log("dlgldflg ", error);
        }
    }, [])

    const imageScale = new Animated.Value(0.1);

    Animated.timing(imageScale, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
    }).start();

    return (
        <View style={styles.container}>
            <Animated.Image
                source={require('./assets/logos/mainlogo.png')}
                style={[styles.image, { transform: [{ scale: imageScale }] }]}
            />
            <Animated.Text
                style={[{ fontSize: 20, color: Color.primary, fontFamily: Poppins.SemiBold, paddingVertical: 10 }, { transform: [{ scale: imageScale }] }]}
            >
                Fobes
            </Animated.Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    image: {
        width: 130,
        height: 130,
    },
});

export default SplashScreen;
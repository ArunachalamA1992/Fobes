import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import {ApplyJobData} from '../../Global/Content';

const SavedJobScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={ApplyJobData}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('DetailedScreen', {item});
              }}
              key={index}
              style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: Color.lightgrey,
                borderWidth: 1,
                padding: 10,
                borderRadius: 5,
                marginVertical: 5,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'flex-start',
                  paddingVertical: 10,
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                  }}>
                  <View
                    style={{
                      width: 70,
                      height: 70,
                      backgroundColor: '#EFFAFF',
                      padding: 5,
                      borderRadius: 50,
                    }}>
                    <Image
                      source={require('../../assets/images/app_status.png')}
                      style={{
                        width: '100%',
                        height: '100%',
                        resizeMode: 'contain',
                      }}
                    />
                  </View>
                  <View
                    style={{
                      justifyContent: 'flex-start',
                      alignItems: 'flex-start',
                      paddingHorizontal: 10,
                    }}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: Color.lightBlack,
                        fontFamily: Gilmer.Medium,
                        textAlign: 'justify',
                      }}
                      numberOfLines={2}>
                      {item.job_name}
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.darkGrey,
                        fontFamily: Gilmer.Regular,
                        textAlign: 'justify',
                      }}
                      numberOfLines={1}>
                      {item.job_comp_name}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'flex-end',
                    paddingHorizontal: 10,
                  }}>
                  <Iconviewcomponent
                    Icontag={'Ionicons'}
                    iconname={'bookmark'}
                    icon_size={22}
                    icon_color={Color.primary}
                  />
                </View>
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 5,
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <View
                  style={{
                    flex: 1,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <Iconviewcomponent
                    Icontag={'Fontisto'}
                    iconname={'map-marker-alt'}
                    icon_size={20}
                    icon_color={Color.lightgrey}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.lightBlack,
                      fontFamily: Gilmer.Medium,
                      marginHorizontal: 5,
                    }}
                    numberOfLines={2}>
                    {item.location}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      justifyContent: 'flex-start',
                      alignItems: 'center',
                      marginHorizontal: 10,
                    }}>
                    <Iconviewcomponent
                      Icontag={'FontAwesome'}
                      iconname={'briefcase'}
                      icon_size={20}
                      icon_color={Color.lightgrey}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.lightBlack,
                        fontFamily: Gilmer.Medium,
                        paddingHorizontal: 5,
                      }}
                      numberOfLines={2}>
                      {item.job_type}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                  }}>
                  <View
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: 30,
                      backgroundColor: Color.lightgrey,
                    }}></View>
                  <Text
                    style={{
                      fontSize: 12,
                      color: Color.lightBlack,
                      fontFamily: Gilmer.Medium,
                      paddingHorizontal: 5,
                    }}
                    numberOfLines={2}>
                    {item.job_post_date}
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
});

export default SavedJobScreen;

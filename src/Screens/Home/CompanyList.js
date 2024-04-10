import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import {Media} from '../../Global/Media';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {Iconviewcomponent} from '../../Components/Icontag';
import {useNavigation} from '@react-navigation/native';

const CompanyList = () => {
  const navigation = useNavigation();

  const [topCompany, setTopCompany] = useState([
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
      comp_address: 'Chennai',
      comp_offer_count: '150',
      image: Media.propertyMain,
    },
    {
      id: 3,
      comp_logo: Media.propertyMain,
      comp_name: 'Calibre Infotech',
      comp_address: 'Bangalore',
      comp_offer_count: '25',
      image: Media.propertyMain,
    },
    {
      id: 4,
      comp_logo: Media.propertyMain,
      comp_name: 'CTS',
      comp_address: 'Coimbatore',
      comp_offer_count: '250',
      image: Media.propertyMain,
    },
    {
      id: 5,
      comp_logo: Media.propertyMain,
      comp_name: 'TCS',
      comp_address: 'Hyderabad',
      comp_offer_count: '120',
      image: Media.propertyMain,
    },
  ]);

  return (
    <View style={styles.container}>
      <FlatList
        data={topCompany}
        keyExtractor={(item, index) => item + index}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              onPress={() => navigation.navigate('CompanyDetails')}
              key={index}
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                borderColor: Color.cloudyGrey,
                borderWidth: 1,
                padding: 5,
                margin: 5,
                borderRadius: 5,
                paddingHorizontal: 10,
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={Media.user}
                  style={{
                    width: 70,
                    height: 70,
                    resizeMode: 'contain',
                  }}
                />
                <View
                  style={{
                    flex: 1,
                    justifyContent: 'flex-start',
                    alignItems: 'flex-start',
                    paddingHorizontal: 10,
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      color: Color.black,
                      fontFamily: Gilmer.Bold,
                    }}
                    numberOfLines={2}>
                    {item.comp_name}
                  </Text>
                  <View style={{flexDirection: 'row', alignItems: 'center'}}>
                    <Iconviewcomponent
                      Icontag={'FontAwesome'}
                      iconname={'star'}
                      icon_size={20}
                      icon_color={Color.sunShade}
                    />
                    <Text
                      style={{
                        fontSize: 12,
                        color: Color.Venus,
                        fontFamily: Gilmer.Medium,
                        paddingHorizontal: 5,
                      }}>
                      4.5 (500 reviews)
                    </Text>
                  </View>
                </View>
                <Iconviewcomponent
                  Icontag={'Ionicons'}
                  iconname={'chevron-forward-outline'}
                  icon_size={24}
                  icon_color={Color.Venus}
                />
              </View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingVertical: 10,
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
                    icon_color={Color.Venus}
                  />
                  <Text
                    style={{
                      fontSize: 14,
                      color: Color.Venus,
                      fontFamily: Gilmer.Medium,
                      paddingHorizontal: 5,
                    }}
                    numberOfLines={1}>
                    {item.comp_address}
                  </Text>
                </View>
                <Text
                  style={{
                    fontSize: 14,
                    color: Color.primary,
                    fontFamily: Gilmer.Bold,
                    textDecorationLine: 'underline',
                    paddingVertical: 5,
                  }}
                  numberOfLines={1}>
                  {item.comp_offer_count} Jobs Open
                </Text>
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

export default CompanyList;

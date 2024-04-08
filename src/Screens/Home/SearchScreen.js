import React, {useState} from 'react';
import {Image, ScrollView, StyleSheet, Text, View} from 'react-native';
import Color from '../../Global/Color';
import {Searchbar} from 'react-native-paper';
import F6Icon from 'react-native-vector-icons/FontAwesome6';
import {Gilmer} from '../../Global/FontFamily';
import {Media} from '../../Global/Media';

const SearchScreen = ({navigation}) => {
  const [search, setSearch] = useState('');
  const [recentSearch] = useState([
    {
      id: 1,
      name: 'Fresher',
      value: 'fresher',
    },
    {
      id: 2,
      name: 'Experienced',
      value: 'experienced',
    },
  ]);
  const [MostSearch] = useState([
    {
      id: 1,
      name: 'Fresher',
      value: 'fresher',
    },
    {
      id: 2,
      name: 'Experienced',
      value: 'experienced',
    },
  ]);
  const [TopCompany] = useState([
    {
      id: 1,
      name: 'Indigoindia',
      value: 'Indigoindia',
    },
    {
      id: 2,
      name: 'ODD Infotech',
      value: 'ODD Infotech',
    },
    {
      id: 3,
      name: 'ODD Infotech',
      value: 'ODD Infotech',
    },
    {
      id: 4,
      name: 'ODD Infotech',
      value: 'ODD Infotech',
    },
    {
      id: 5,
      name: 'ODD Infotech',
      value: 'ODD Infotech',
    },
    {
      id: 6,
      name: 'ODD Infotech',
      value: 'ODD Infotech',
    },
    {
      id: 7,
      name: 'ODD Infotech',
      value: 'ODD Infotech',
    },
  ]);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Searchbar
          placeholder="Search Jobs, Companies"
          placeholderTextColor={Color.grey}
          style={styles.searchView}
          value={search}
          iconColor={Color.grey}
          inputStyle={{color: Color.black}}
          onChangeText={search => setSearch(search)}
        />
        <Searchbar
          placeholder="Search Location"
          placeholderTextColor={Color.grey}
          style={styles.searchView}
          value={search}
          icon={() => (
            <F6Icon name="location-dot" size={20} color={Color.lightgrey} />
          )}
          iconColor={Color.grey}
          inputStyle={{color: Color.black}}
          onChangeText={search => setSearch(search)}
        />
        <View style={{marginTop: 20}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginVertical: 10,
            }}>
            <Text
              style={{
                flex: 1,
                fontFamily: Gilmer.Bold,
                fontSize: 18,
                color: Color.black,
                textTransform: 'capitalize',
                marginHorizontal: 5,
                marginTop: 10,
              }}>
              Recent Search
            </Text>
            <Text
              style={{
                fontFamily: Gilmer.Medium,
                fontSize: 14,
                color: Color.primary,
                textTransform: 'capitalize',
                marginHorizontal: 5,
                marginTop: 10,
              }}>
              Clear All
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {recentSearch.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#9DCBE250',
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor: '#9DCBE2',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}>
                    {item?.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginVertical: 10,
            }}>
            Most Popular Searches
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {MostSearch.map((item, index) => {
              return (
                <View
                  key={index}
                  style={{
                    backgroundColor: '#9DCBE250',
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor: '#9DCBE2',
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      fontFamily: Gilmer.Bold,
                      fontSize: 14,
                      color: Color.black,
                      textTransform: 'capitalize',
                      marginHorizontal: 5,
                      marginVertical: 10,
                    }}>
                    {item?.name}
                  </Text>
                </View>
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 20}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginVertical: 10,
            }}>
            Top Companies
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              {TopCompany.map((item, index) => {
                return (
                  <View
                    key={index}
                    style={{
                      // paddingHorizontal: 10,
                      marginVertical: 10,
                      marginHorizontal: 5,
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: Color.cloudyGrey,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Image
                      source={Media.user}
                      style={{width: 100, height: 100, resizeMode: 'contain'}}
                    />
                    <Text
                      style={{
                        fontFamily: Gilmer.Bold,
                        fontSize: 14,
                        color: Color.black,
                        textTransform: 'capitalize',
                        marginHorizontal: 5,
                        marginVertical: 10,
                      }}>
                      {item?.name}
                    </Text>
                  </View>
                );
              })}
            </View>
          </ScrollView>
        </View>
      </ScrollView>
    </View>
  );
};

export default SearchScreen;

const styles = StyleSheet.create({
  searchView: {
    borderRadius: 10,
    backgroundColor: '#EAEAEF50',
    marginVertical: 10,
  },
});

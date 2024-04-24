import React, {useEffect, useState} from 'react';
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
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {base_image_url} from '../../Config/base_url';

const CompanyList = () => {
  const navigation = useNavigation();
  const [compData, setCompData] = useState([]);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;
  const [loading, setLoading] = useState(false);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);

  useEffect(() => {
    setLoading(true);
    getData().finally(() => setLoading(false));
  }, [token]);

  const getData = async () => {
    try {
      var data = `page_number=${page}`;
      console.log('data----------------------------', data);
      const comp_list = await fetchData.list_company(data, token);
      if (comp_list) {
        setCompData(comp_list?.data);
      }
    } catch (error) {
      console.log('error', error);
    }
  };

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

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      var data = 'page_number=' + nextPage;
      const response = await fetchData.list_company(data, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const updatedData = [...compData, ...response?.data];
        setCompData(updatedData);
      } else {
        setEndReached(true);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoadMore(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading ? (
        <View style={{padding: 10}}>
          <SkeletonPlaceholder>
            <SkeletonPlaceholder.Item style={{}}>
              <SkeletonPlaceholder.Item width="100%" height={150} />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
              <SkeletonPlaceholder.Item
                width="100%"
                height={150}
                borderRadius={10}
                style={{marginTop: 10}}
              />
            </SkeletonPlaceholder.Item>
          </SkeletonPlaceholder>
        </View>
      ) : (
        <FlatList
          data={compData}
          keyExtractor={(item, index) => item + index}
          renderItem={({item, index}) => {
            return (
              <TouchableOpacity
                onPress={() => navigation.navigate('CompanyDetails', {item})}
                key={index}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderColor: Color.lightgrey,
                  borderWidth: 1,
                  padding: 10,
                  borderRadius: 10,
                  marginTop: 10,
                  paddingHorizontal: 10,
                }}>
                <View style={{flexDirection: 'row', alignItems: 'center'}}>
                  {item?.logo === '' &&
                  item?.logo === null &&
                  item?.logo === 'null' ? (
                    <Image
                      source={require('../../assets/logos/user.png')}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'contain',
                        borderRadius: 100,
                        backgroundColor: Color.softGrey,
                        borderWidth: 1,
                        borderColor: Color.lightgrey,
                      }}
                    />
                  ) : (
                    <Image
                      source={{uri: base_image_url + item?.logo}}
                      style={{
                        width: 60,
                        height: 60,
                        resizeMode: 'contain',
                        borderRadius: 100,
                        backgroundColor: Color.Venus,
                        borderWidth: 0.5,
                        borderColor: Color.lightgrey,
                      }}
                    />
                  )}
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
                        textTransform: 'capitalize',
                        paddingHorizontal: 5,
                        paddingVertical: 5,
                      }}
                      numberOfLines={2}>
                      {item.name}
                    </Text>
                    <View
                      style={{
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
                          fontSize: 12,
                          color: Color.Venus,
                          fontFamily: Gilmer.Medium,
                          paddingHorizontal: 5,
                        }}
                        numberOfLines={1}>
                        {item.exact_location}
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
                <Text
                  style={{
                    fontSize: 12,
                    color: Color.primary,
                    fontFamily: Gilmer.Bold,
                    textDecorationLine: 'underline',
                    textAlign: 'right',
                    paddingVertical: 5,
                    paddingHorizontal: 10,
                  }}
                  numberOfLines={1}>
                  {item?.openings?.[0]?.vacancies} Jobs Open
                </Text>
              </TouchableOpacity>
            );
          }}
          onEndReached={() => {
            loadMoreData();
          }}
          onEndReachedThreshold={3}
          showsVerticalScrollIndicator={false}
        />
      )}
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

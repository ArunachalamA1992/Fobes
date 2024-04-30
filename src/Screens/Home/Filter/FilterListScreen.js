import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';
import Color from '../../../Global/Color';
import JobItemCard from '../../../Components/JobItemCard';
import {FlatList} from 'react-native';
import fetchData from '../../../Config/fetchData';

const FilterListScreen = ({navigation, route}) => {
  const [itemData, setItemData] = useState(route?.params?.item);
  const [loadMore, setLoadMore] = useState(false);
  const [page, setPage] = useState(1);
  const [endReached, setEndReached] = useState(false);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const loadMoreData = async () => {
    if (loadMore || endReached) {
      return;
    }
    setLoadMore(true);
    try {
      const nextPage = page + 1;
      var data = 'page_number=' + nextPage;
      const response = await fetchData.filter_job(data, token);
      if (response?.data.length > 0) {
        setPage(nextPage);
        const updatedData = [...itemData, ...response?.data];
        setItemData(updatedData);
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
      <FlatList
        data={itemData}
        keyExtractor={(item, index) => item + index}
        showsVerticalScrollIndicator={false}
        renderItem={({item, index}) => {
          return (
            <JobItemCard item={item} navigation={navigation} token={token} />
          );
        }}
        onEndReached={() => {
          loadMoreData();
        }}
        onEndReachedThreshold={3}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: Color.white,
  },
});

export default FilterListScreen;

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import {Gilmer} from '../Global/FontFamily';
import Color from '../Global/Color';
import CheckboxData, {RadioData} from './Checkbox';
import {Button, Divider, Searchbar} from 'react-native-paper';
import fetchData from '../Config/fetchData';
import {useSelector} from 'react-redux';
import axios from 'axios';
import F6Icon from 'react-native-vector-icons/FontAwesome6';

const TabContent = ({
  item,
  dateSelectedItem,
  handleDatePress,
  experienceSelectedItem,
  handleExperiencePress,
  distanceSelectedItem,
  handleDistancePress,
  jobtypeSelectedItem,
  handleJobtypePress,
  industrySelectedItem,
  handleIndustryPress,
  worktypeSelectedItem,
  handleWorkTypePress,
  locationData,
  fetchSuggestions,
  setLocationSuggestion,
  LocationSuggestion,
  setSearchLocation,
  searchLocation,
}) => {
  if (item?.date_posted) {
    return (
      <>
        {item?.date_posted?.map((option, index) => {
          return (
            <RadioData
              key={index}
              label={option.title}
              checked={dateSelectedItem.includes(option.id)}
              onPress={() => handleDatePress(option.id)}
            />
          );
        })}
      </>
    );
  } else if (item?.experience) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginVertical: 10,
        }}>
        {item?.experience?.map((item, index) => {
          return (
            <RadioData
              key={index}
              label={item.name}
              checked={experienceSelectedItem.includes(item.experience_id)}
              onPress={() => handleExperiencePress(item.experience_id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.distance) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginVertical: 10,
        }}>
        {item?.distance?.map((item, index) => {
          return (
            <RadioData
              key={index}
              label={item.title}
              checked={distanceSelectedItem.includes(item.id)}
              onPress={() => handleDistancePress(item.id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.job_type) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginVertical: 10,
        }}>
        {item?.job_type?.map((item, index) => {
          return (
            <RadioData
              key={index}
              label={item.name}
              checked={jobtypeSelectedItem.includes(item.id)}
              onPress={() => handleJobtypePress(item.id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.location) {
    return (
      <View
        style={{
          marginVertical: 10,
        }}>
        <Text
          style={{
            fontSize: 14,
            color: Color.black,
            fontFamily: Gilmer.Bold,
            marginVertical: 10,
          }}>
          Select Location
        </Text>
        <Searchbar
          placeholder="Search Location"
          placeholderTextColor={Color.grey}
          style={styles.searchView}
          value={searchLocation}
          icon={() => (
            <F6Icon name="location-dot" size={20} color={Color.lightgrey} />
          )}
          iconColor={Color.grey}
          inputStyle={{color: Color.black}}
          onChangeText={search => {
            setSearchLocation(search);
            fetchSuggestions(search);
          }}
        />
        {LocationSuggestion?.data?.length != 0 && (
          <View
            style={{
              maxHeight: 200,
              padding: 10,
              backgroundColor: Color.white,
              elevation: 3,
              borderRadius: 5,
              marginTop: 5,
            }}>
            {LocationSuggestion?.data?.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  onPress={() => {
                    setSearchLocation(item?.display_name?.split(',')[0]);
                    setLocationSuggestion({
                      data: [],
                      visible: false,
                    });
                  }}>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: Gilmer.Medium,
                      color: Color.black,
                    }}>
                    {item?.display_name?.split(',')[0]}
                  </Text>
                  {index < LocationSuggestion?.data.length - 1 && (
                    <Divider style={{height: 1, marginVertical: 5}} />
                  )}
                </TouchableOpacity>
              );
            })}
          </View>
        )}
      </View>
    );
  } else if (item?.industry) {
    return (
      <View
        style={{
          marginVertical: 10,
        }}>
        {item?.industry?.map((item, index) => {
          return (
            <CheckboxData
              key={index}
              label={item.name}
              checked={industrySelectedItem.includes(item.id)}
              onPress={() => handleIndustryPress(item.id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.work_type) {
    return (
      <View
        style={{
          flexDirection: 'row',
          flex: 1,
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          marginVertical: 10,
        }}>
        {item?.work_type?.map((item, index) => {
          return (
            <RadioData
              key={index}
              label={item.title}
              checked={worktypeSelectedItem?.includes(item.id)}
              onPress={() => handleWorkTypePress(item.id)}
            />
          );
        })}
      </View>
    );
  }
};

const VerticalTabView = props => {
  var {navigation} = props;
  const [selectedTab, setSelectedTab] = useState(0);
  const [ExperienceData, setExperienceData] = useState([]);
  const [search, setSearch] = useState('');
  const [searchLocation, setSearchLocation] = useState('');
  const [LocationSuggestion, setLocationSuggestion] = useState({
    data: [],
    visible: false,
  });
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const [datePostedData, setDatePostedData] = useState([
    {
      id: 1,
      title: 'All',
      value: 'all',
    },
    {
      id: 2,
      title: 'Past Week',
      value: 'past_week',
    },
    {
      id: 3,
      title: 'Past Month',
      value: 'past_month',
    },
    {
      id: 4,
      title: 'Past 24 Hours',
      value: 'past_24_hours',
    },
  ]);

  const [distanceData, setDistanceData] = useState([
    {
      id: 1,
      title: 'All',
      value: 'all',
    },
    {
      id: 2,
      title: 'Within 5 Km',
      value: 'within_5_km',
    },
    {
      id: 3,
      title: 'Within 10 Km',
      value: 'within_10_km',
    },
    {
      id: 4,
      title: 'within 50 km',
      value: 'within_50_km',
    },
  ]);

  const [jobtypeData, setJobtypeData] = useState([]);

  const [worktypeData] = useState([
    {
      id: 1,
      title: 'on-site',
      value: 0,
    },
    {
      id: 2,
      title: 'Remote',
      value: 1,
    },
  ]);

  const [filterSelectedItem, setFilterSelectedItem] = useState({
    date_posted: [],
    experience: [],
    distance: [],
    job_type: [],
    location: [],
    industry: [],
    work_type: [],
  });

  const [industryData, setIndustryData] = useState([]);
  const [locationData, setLocationData] = useState([]);

  useEffect(() => {
    getApiData();
  }, [ExperienceData]);

  const getApiData = async () => {
    try {
      //experiance
      const experience_data = await fetchData.get_experience(null, token);
      setExperienceData(experience_data?.data);
      //jobType
      const job_type_data = await fetchData.job_type(null, token);
      setJobtypeData(job_type_data?.data);
      //industry type
      const industry_type_data = await fetchData.industry_type(null, token);
      setIndustryData(industry_type_data?.data);
    } catch (error) {
      console.log('Filter error', error);
    }
  };

  const filterOptions = [
    {
      date_posted: [
        {id: 1, title: 'All'},
        {id: 2, title: 'Past Week'},
        {id: 3, title: 'Past Month'},
        {id: 4, title: 'Past 24 Hours'},
      ],
    },
    {
      experience: ExperienceData,
    },
    {
      distance: [
        {id: 1, title: 'All'},
        {id: 2, title: 'Within 5 Km'},
        {id: 3, title: 'Within 10 Km'},
        {id: 4, title: 'Within 50 Km'},
      ],
    },
    {
      job_type: jobtypeData,
    },
    {
      location: LocationSuggestion,
    },
    {
      industry: industryData,
    },
    {
      work_type: [
        {
          id: 1,
          title: 'on-site',
          value: 0,
        },
        {
          id: 2,
          title: 'Remote',
          value: 1,
        },
      ],
    },
  ];
  const [dateSelectedItem, setDateSelectedItem] = useState([]);
  const handleDatePress = itemId => {
    if (dateSelectedItem.includes(itemId)) {
      setDateSelectedItem(
        dateSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted?.filter(
          single => single.id !== itemId,
        ),
        experience: filterSelectedItem?.experience,
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setDateSelectedItem([...dateSelectedItem, itemId]);
      const selectedItem = datePostedData.find(single => single.id === itemId);
      setFilterSelectedItem({
        date_posted: [...filterSelectedItem?.date_posted, selectedItem],
        experience: filterSelectedItem?.experience,
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [experienceSelectedItem, setExperienceSelectedItem] = useState([]);
  const handleExperiencePress = itemId => {
    if (experienceSelectedItem.includes(itemId)) {
      setExperienceSelectedItem(
        experienceSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: filterSelectedItem?.experience?.filter(
          single => single.experience_id !== itemId,
        ),
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setExperienceSelectedItem([...experienceSelectedItem, itemId]);
      const selectedItem = ExperienceData.find(
        single => single.experience_id === itemId,
      );
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: [...filterSelectedItem?.experience, selectedItem],
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [distanceSelectedItem, setDistanceSelectedItem] = useState([]);
  const handleDistancePress = itemId => {
    if (distanceSelectedItem.includes(itemId)) {
      setDistanceSelectedItem(
        distanceSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: filterSelectedItem?.experience,
        distance: filterSelectedItem?.distance?.filter(
          single => single.id !== itemId,
        ),
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setDistanceSelectedItem([...distanceSelectedItem, itemId]);
      const selectedItem = distanceData.find(single => single.id === itemId);
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: filterSelectedItem?.experience,
        distance: [...filterSelectedItem?.distance, selectedItem],
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [jobtypeSelectedItem, setjobtypeSelectedItem] = useState([]);
  const handleJobtypePress = itemId => {
    if (jobtypeSelectedItem.includes(itemId)) {
      setjobtypeSelectedItem(
        jobtypeSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: filterSelectedItem?.experience,
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type?.filter(
          single => single.id !== itemId,
        ),
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setjobtypeSelectedItem([...jobtypeSelectedItem, itemId]);
      const selectedItem = jobtypeData.find(single => single.id === itemId);
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: filterSelectedItem?.experience,
        distance: filterSelectedItem?.distance,
        job_type: [...filterSelectedItem?.job_type, selectedItem],
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [industrySelectedItem, setIndustrySelectedItem] = useState([]);
  const handleIndustryPress = itemId => {
    if (industrySelectedItem.includes(itemId)) {
      setIndustrySelectedItem(
        industrySelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: filterSelectedItem?.experience,
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry?.filter(
          single => single.id !== itemId,
        ),
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setIndustrySelectedItem([...industrySelectedItem, itemId]);
      const selectedItem = industryData.find(single => single.id === itemId);
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: filterSelectedItem?.experience,
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: [...filterSelectedItem?.industry, selectedItem],
        work_type: filterSelectedItem?.work_type,
      });
    }
  };

  const [worktypeSelectedItem, setWorktypeSelectedItem] = useState([]);
  const handleWorkTypePress = itemId => {
    if (worktypeSelectedItem.includes(itemId)) {
      setWorktypeSelectedItem(
        worktypeSelectedItem?.filter(single => single !== itemId),
      );
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: filterSelectedItem?.experience,
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type?.filter(
          single => single.id !== itemId,
        ),
      });
    } else {
      setWorktypeSelectedItem([...worktypeSelectedItem, itemId]);
      const selectedItem = worktypeData.find(single => single.id === itemId);
      setFilterSelectedItem({
        date_posted: filterSelectedItem?.date_posted,
        experience: filterSelectedItem?.experience,
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: [...filterSelectedItem?.work_type, selectedItem],
      });
    }
  };
  const tabs = [
    'Date Posted',
    'Experience',
    'Distance',
    'Job Type',
    'Location',
    'Industry',
    'Work Type',
  ];

  const dataPayload = () => {
    const payload = {
      page: 1,
      location: filterSelectedItem?.location?.city,
      experience_id: filterSelectedItem?.experience
        .filter(item => item.experience_id)
        .map(item => item.experience_id)
        .join(','),
      job_type_id: filterSelectedItem?.job_type
        .filter(item => item.id)
        .map(item => item.id)
        .join(','),
      industry_type_id: filterSelectedItem?.industry
        .filter(item => item.industry_type_id)
        .map(item => item.industry_type_id)
        .join(','),
      created_at: filterSelectedItem?.date_posted
        .filter(item => item.value)
        .map(item => item.value)
        .join(','),
      is_remote: filterSelectedItem?.date_posted
        .filter(item => item.value)
        .map(item => item.value)
        .join(','),
      place: searchLocation,
    };

    const queryString = Object.entries(payload)
      .filter(([key, value]) => value !== undefined && value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    return queryString;
  };

  const appyFilter = async () => {
    try {
      var data = dataPayload();
      navigation.navigate('FilterList', {item: data});
    } catch (error) {
      console.log('error', error);
    }
  };

  const fetchSuggestions = async text => {
    try {
      const response = await axios.get(
        `https://nominatim.openstreetmap.org/search?format=json&limit=1&city=${text}`,
      );
      setLocationSuggestion({
        data: response?.data,
        visible: true,
      });
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          marginTop: 10,
        }}>
        <ScrollView
          style={{flex: 2, backgroundColor: '#EAEAEF'}}
          showsVerticalScrollIndicator={false}>
          {tabs.map((tab, index) => (
            <>
              <TouchableOpacity
                key={index}
                style={{
                  padding: 10,
                  backgroundColor:
                    selectedTab === index ? Color.primary : '#EAEAEF',
                  marginTop: 2,
                }}
                onPress={() => setSelectedTab(index)}>
                <Text
                  style={{
                    fontSize: 16,
                    color: selectedTab === index ? Color.white : Color.black,
                    fontFamily: Gilmer.SemiBold,
                  }}>
                  {tab}
                </Text>
              </TouchableOpacity>
              {index < tabs.length - 1 && (
                <Divider style={{height: 2, backgroundColor: Color.white}} />
              )}
            </>
          ))}
        </ScrollView>
        <View style={{flex: 2, backgroundColor: Color.white, padding: 10}}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <TabContent
              item={filterOptions?.[selectedTab]}
              dateSelectedItem={dateSelectedItem}
              handleDatePress={handleDatePress}
              experienceSelectedItem={experienceSelectedItem}
              handleExperiencePress={handleExperiencePress}
              distanceSelectedItem={distanceSelectedItem}
              handleDistancePress={handleDistancePress}
              jobtypeSelectedItem={jobtypeSelectedItem}
              handleJobtypePress={handleJobtypePress}
              industrySelectedItem={industrySelectedItem}
              handleIndustryPress={handleIndustryPress}
              worktypeSelectedItem={worktypeSelectedItem}
              handleWorkTypePress={handleWorkTypePress}
              locationData={locationData}
              fetchSuggestions={fetchSuggestions}
              setLocationSuggestion={setLocationSuggestion}
              LocationSuggestion={LocationSuggestion}
              setSearchLocation={setSearchLocation}
              searchLocation={searchLocation}
            />
          </ScrollView>
        </View>
      </View>
      <View
        style={{
          backgroundColor: Color.white,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          shadowColor: '#000',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 2,
          elevation: 2,
          borderTopLeftRadius: 30,
          borderTopRightRadius: 30,
        }}>
        <Button
          mode="contained"
          onPress={() => {
            setFilterSelectedItem({
              date_posted: [],
              experience: [],
              distance: [],
              job_type: [],
              location: '',
              industry: [],
              work_type: [],
            });
            setDateSelectedItem([]);
            setExperienceSelectedItem([]);
            setDistanceSelectedItem([]);
            setjobtypeSelectedItem([]);
            setIndustrySelectedItem([]);
            setWorktypeSelectedItem([]);
          }}
          style={{
            marginVertical: 10,
            backgroundColor: Color.white,
            borderRadius: 10,
          }}
          textColor="#000"
          labelStyle={{fontFamily: Gilmer.Bold, fontSize: 16}}>
          Clear Filters
        </Button>
        <Button
          mode="contained"
          onPress={() => {
            appyFilter();
          }}
          style={{
            marginVertical: 10,
            backgroundColor: Color.primary,
            borderRadius: 50,
            width: '50%',
          }}
          labelStyle={{fontFamily: Gilmer.Bold, fontSize: 16}}>
          Apply
        </Button>
      </View>
    </View>
  );
};

export default VerticalTabView;
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
    color: Color.black,
  },
  placeholderStyle: {
    fontSize: 16,
    color: Color.cloudyGrey,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: Color.black,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: Color.black,
  },
  searchView: {
    borderRadius: 10,
    backgroundColor: '#EAEAEF50',
    marginTop: 10,
  },
});

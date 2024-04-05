import React, {useState} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  FlatList,
  SafeAreaView,
} from 'react-native';
import {RadioButton} from 'react-native-paper';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import CheckBox from '@react-native-community/checkbox';
import CheckboxData, {RedioData} from '../../Components/Checkbox';

const FilterScreen = ({navigation}) => {
  const [selectedDateValue, setSelectedDateValue] = useState('option1');
  const [selectedExpValue, setSelectedExpValue] = useState('option1');
  const [selectedDistValue, setSelectedDistValue] = useState('option1');
  const [selectJobTypeValue, setSelectJobTypeValue] = useState('option1');
  const [selectWorkTypeValue, setSelectWorkTypeValue] = useState('option1');
  const [selectInd, setselectInd] = useState('');

  const [datePostedData] = useState([
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

  const [distanceData] = useState([
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

  const [jobtypeData] = useState([
    {
      id: 1,
      title: 'Full-time',
      value: 'full_time',
    },
    {
      id: 2,
      title: 'Part-time',
      value: 'part_time',
    },
    {
      id: 3,
      title: 'Contract',
      value: 'contract',
    },
    {
      id: 4,
      title: 'Internship',
      value: 'internship',
    },
  ]);

  const [worktypeData] = useState([
    {
      id: 1,
      title: 'on-site',
      value: 'on_site',
    },
    {
      id: 2,
      title: 'Hybrid',
      value: 'hybrid',
    },
    {
      id: 3,
      title: 'Remote',
      value: 'remote',
    },
    {
      id: 4,
      title: 'Internship',
      value: 'internship',
    },
  ]);

  const [ExperienceData] = useState([
    {
      id: 1,
      title: 'Fresher',
      value: 'fresher',
    },
    {
      id: 2,
      title: 'Experienced',
      value: 'experienced',
    },
  ]);
  const [filterSelectedItem, setFilterSelectedItem] = useState({
    date_posted: [],
    experience: [],
    distance: [],
    job_type: [],
    location: {},
    industry: [],
    work_type: [],
  });

  const [industryData] = useState([
    {id: 1, title: 'Custom software development', checked: true},
    {id: 2, title: 'Software Prototyping', checked: false},
    {id: 3, title: 'DevOps Automation', checked: false},
    {id: 4, title: 'Web Application Development', checked: false},
    {id: 5, title: 'Mobile Application Development', checked: false},
    {id: 6, title: 'Cloud Computing', checked: false},
  ]);

  function applyFilterClick() {
    try {
      console.log(
        'Date Posted ========== :' +
          selectedDateValue +
          '\n' +
          'Experience ========= :' +
          selectedExpValue +
          '\n' +
          'Distance ========= :' +
          selectedDistValue +
          '\n' +
          'Job Type ========= :' +
          selectJobTypeValue +
          '\n' +
          'Industry ======= :' +
          selectInd +
          '\n' +
          'Work Type ========= :' +
          selectWorkTypeValue,
      );
    } catch (error) {
      console.log('catch in applyFilter_Click : ', error);
    }
  }

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
      const selectedItem = datePosted.find(single => single.id === itemId);
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
          single => single.id !== itemId,
        ),
        distance: filterSelectedItem?.distance,
        job_type: filterSelectedItem?.job_type,
        location: filterSelectedItem?.location,
        industry: filterSelectedItem?.industry,
        work_type: filterSelectedItem?.work_type,
      });
    } else {
      setExperienceSelectedItem([...experienceSelectedItem, itemId]);
      const selectedItem = ExperienceData.find(single => single.id === itemId);
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
  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
            }}>
            Date Posted
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            {datePostedData?.map((item, index) => {
              return (
                <RedioData
                  key={index}
                  label={item.title}
                  checked={dateSelectedItem.includes(item.id)}
                  onPress={() => handleDatePress(item.id)}
                />
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
            }}>
            Experience
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            {ExperienceData?.map((item, index) => {
              return (
                <RedioData
                  key={index}
                  label={item.title}
                  checked={experienceSelectedItem.includes(item.id)}
                  onPress={() => handleExperiencePress(item.id)}
                />
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
            }}>
            Distance
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            {distanceData?.map((item, index) => {
              return (
                <RedioData
                  key={index}
                  label={item.title}
                  checked={distanceSelectedItem.includes(item.id)}
                  onPress={() => handleDistancePress(item.id)}
                />
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
            }}>
            Job Type
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            {jobtypeData?.map((item, index) => {
              return (
                <RedioData
                  key={index}
                  label={item.title}
                  checked={jobtypeSelectedItem.includes(item.id)}
                  onPress={() => handleJobtypePress(item.id)}
                />
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              textAlign: 'left',
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
            }}>
            Location
          </Text>
          <TouchableOpacity
            style={{
              height: 50,
              backgroundColor: Color.white,
              borderColor: Color.Venus,
              borderWidth: 1,
              borderRadius: 10,
              marginVertical: 10,
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 14,
                color: Color.lightBlack,
                fontFamily: Gilmer.Bold,
                paddingHorizontal: 10,
              }}>
              Select Location
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
            }}>
            Industry
          </Text>
          <View
            style={{
              marginVertical: 10,
            }}>
            {industryData?.map((item, index) => {
              return (
                <CheckboxData
                  key={index}
                  label={item.title}
                  checked={industrySelectedItem.includes(item.id)}
                  onPress={() => handleIndustryPress(item.id)}
                />
              );
            })}
          </View>
        </View>
        <View style={{marginTop: 10}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.lightBlack,
              fontFamily: Gilmer.Bold,
            }}>
            Work Type
          </Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              marginVertical: 10,
            }}>
            {worktypeData?.map((item, index) => {
              return (
                <RedioData
                  key={index}
                  label={item.title}
                  checked={worktypeSelectedItem.includes(item.id)}
                  onPress={() => handleWorkTypePress(item.id)}
                />
              );
            })}
          </View>
        </View>
        <TouchableOpacity
          onPress={() => applyFilterClick()}
          activeOpacity={0.5}
          style={{
            height: 50,
            backgroundColor: Color.primary,
            borderColor: Color.Venus,
            borderWidth: 1,
            borderRadius: 5,
            marginVertical: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text
            style={{
              fontSize: 16,
              color: Color.white,
              fontFamily: Gilmer.Bold,
              paddingHorizontal: 10,
            }}>
            Apply{' '}
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Color.white,
    padding: 10,
  },
  textStyle: {
    marginHorizontal: 20,
    marginTop: 10,
    color: 'black',
    fontWeight: '600',
  },
  singleRadioButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 10,
  },
});

export default FilterScreen;

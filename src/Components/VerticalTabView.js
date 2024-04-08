import React, {useState} from 'react';
import {View, Text, ScrollView, TouchableOpacity} from 'react-native';
import {Gilmer} from '../Global/FontFamily';
import Color from '../Global/Color';
import CheckboxData, {RadioData} from './Checkbox';
import {Button, Divider} from 'react-native-paper';

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
              label={item.title}
              checked={experienceSelectedItem.includes(item.id)}
              onPress={() => handleExperiencePress(item.id)}
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
              label={item.title}
              checked={jobtypeSelectedItem.includes(item.id)}
              onPress={() => handleJobtypePress(item.id)}
            />
          );
        })}
      </View>
    );
  } else if (item?.location) {
    return (
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
              label={item.title}
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

const VerticalTabView = () => {
  const [selectedTab, setSelectedTab] = useState(0);

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
      experience: [
        {id: 1, title: 'Fresher'},
        {id: 2, title: 'Experienced'},
      ],
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
      job_type: [
        {id: 1, title: 'Full-time'},
        {id: 2, title: 'Part-time'},
        {id: 3, title: 'Contract'},
        {id: 4, title: 'Internship'},
      ],
    },
    {
      location: '',
    },
    {
      industry: [
        {id: 1, title: 'Custom software development', checked: true},
        {id: 2, title: 'Software Prototyping', checked: false},
        {id: 3, title: 'DevOps Automation', checked: false},
        {id: 4, title: 'Web Application Development', checked: false},
        {id: 5, title: 'Mobile Application Development', checked: false},
        {id: 6, title: 'Cloud Computing', checked: false},
      ],
    },
    {
      work_type: [
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
      ],
    },
  ];
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
  const tabs = [
    'Date Posted',
    'Experience',
    'Distance',
    'Job Type',
    'Location',
    'Industry',
    'Work Type',
  ];

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
              worktypeSelectedIte={worktypeSelectedItem}
              handleWorkTypePress={handleWorkTypePress}
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
              location: {},
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
          onPress={() => {}}
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

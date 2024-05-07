import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Color from '../../Global/Color';
import {Gilmer} from '../../Global/FontFamily';
import {Button} from 'react-native-paper';
import common_fn from '../../Config/common_fn';
import fetchData from '../../Config/fetchData';
import {useSelector} from 'react-redux';
import moment from 'moment';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import FIcon from 'react-native-vector-icons/FontAwesome';

const ProjectScreen = ({navigation, route}) => {
  const [itemData] = useState(route.params.item);
  const userData = useSelector(state => state.UserReducer.userData);
  var {token} = userData;

  const [projectSelectedItem, setProjectSelectedItem] = useState({
    title: itemData?.title || '',
    project_employment: itemData?.education_level || '',
    project_status: itemData?.education_status || '',
    duration: {
      from:
        itemData.worked_from != undefined
          ? new Date(itemData.worked_from)
          : new Date(),
      end:
        itemData.worked_till != undefined
          ? new Date(itemData.worked_till)
          : new Date(),
    },
    details: itemData?.details || '',
    location: itemData?.location || '',
    site: itemData?.site || '',
    nature_employment: itemData?.nature || '',
    team_size: itemData?.size || '',
    role_in_project: itemData?.role || '',
    role_description: itemData?.role_description || '',
    skills: '',
  });

  const [projectemployment] = useState([
    {
      id: 1,
      name: 'Mobile Apllication Developer',
      value: 'mobile_application_developer',
    },
    {
      id: 2,
      name: 'UG - Computers',
      value: 'ug_computers',
    },
    {
      id: 3,
      name: 'Class XII',
      value: 'class_XII',
    },
    {
      id: 4,
      name: 'Class X',
      value: 'class_X',
    },
  ]);
  const [projectsite] = useState([
    {
      id: 1,
      name: 'Off Site',
      value: 'off_site',
    },
    {
      id: 2,
      name: 'On Site',
      value: 'on_site',
    },
  ]);
  const [nature_employment] = useState([
    {
      id: 1,
      name: 'Full time',
      value: 'full_time',
    },
    {
      id: 2,
      name: 'Part Time',
      value: 'part_time',
    },
    {
      id: 3,
      name: 'Contractual',
      value: 'contractual',
    },
  ]);
  const [projectStatus] = useState([
    {
      id: 1,
      name: 'In Progress',
      value: 'in_progress',
    },
    {
      id: 2,
      name: 'Finished',
      value: 'finished',
    },
  ]);

  const getAPI = async () => {
    try {
      var data = {
        projects: [
          {
            title: projectSelectedItem?.title,
            education_level: projectSelectedItem?.project_employment,
            education_status: projectSelectedItem?.project_status,
            worked_from: moment(projectSelectedItem?.duration?.from).format(
              'YYYY-MM-DD',
            ),
            worked_till: moment(projectSelectedItem?.duration?.end).format(
              'YYYY-MM-DD',
            ),
            details: projectSelectedItem?.details,
            location: projectSelectedItem?.location,
            site: projectSelectedItem?.site,
            nature: projectSelectedItem?.nature_employment,
            size: projectSelectedItem?.team_size,
            role: projectSelectedItem?.role_in_project,
            role_description: projectSelectedItem?.role_description,
            skills: [projectSelectedItem?.skills],
          },
        ],
      };

      if (itemData && itemData.id !== '' && itemData.id > 0) {
        if (!data.projects[0]) {
          data.projects[0] = {};
        }
        data.projects[0].id = itemData.id;
      }
      const projects_data = await fetchData.candidates_profile(data, token);
      if (projects_data) {
        common_fn.showToast(projects_data.message);
        navigation.navigate('Profile');
      } else {
        common_fn.showToast(projects_data.message);
      }
    } catch (error) {
      console.log('project error', error);
    }
  };

  const [FromdatePickerVisible, setFromDatePickerVisible] = useState(false);

  const showFromDatePicker = () => {
    setFromDatePickerVisible(true);
  };

  const hideFromDatePicker = () => {
    setFromDatePickerVisible(false);
  };

  const handleFromConfirm = date => {
    setProjectSelectedItem({
      title: projectSelectedItem?.title,
      project_employment: projectSelectedItem?.project_employment,
      project_status: projectSelectedItem?.project_status,
      duration: {
        from: date,
        end: projectSelectedItem?.duration?.end,
      },
      details: projectSelectedItem?.details,
      location: projectSelectedItem?.location,
      site: projectSelectedItem?.site,
      nature_employment: projectSelectedItem?.nature_employment,
      team_size: projectSelectedItem?.team_size,
      role_in_project: projectSelectedItem?.role_in_project,
      role_description: projectSelectedItem?.role_description,
      skills: projectSelectedItem?.skills,
    });
    hideFromDatePicker();
  };
  const [endDatePickerVisible, setEndDatePickerVisible] = useState(false);

  const showEndDatePicker = () => {
    setEndDatePickerVisible(true);
  };

  const hideEndDatePicker = () => {
    setEndDatePickerVisible(false);
  };

  const handleEndConfirm = date => {
    setProjectSelectedItem({
      title: projectSelectedItem?.title,
      project_employment: projectSelectedItem?.project_employment,
      project_status: projectSelectedItem?.project_status,
      duration: {
        from: projectSelectedItem?.duration?.from,
        end: date,
      },
      details: projectSelectedItem?.details,
      location: projectSelectedItem?.location,
      site: projectSelectedItem?.site,
      nature_employment: projectSelectedItem?.nature_employment,
      team_size: projectSelectedItem?.team_size,
      role_in_project: projectSelectedItem?.role_in_project,
      role_description: projectSelectedItem?.role_description,
      skills: projectSelectedItem?.skills,
    });
    hideEndDatePicker();
  };
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: Color.white,
        padding: 10,
      }}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Text
          style={{
            fontFamily: Gilmer.Medium,
            fontSize: 16,
            color: Color.black,
            fontWeight: '500',
            marginHorizontal: 5,
            marginVertical: 5,
          }}>
          Showcase your talent with the best projects you have worked on during
          college and work
        </Text>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Gilmer.Medium,
              fontSize: 14,
              color: Color.black,
              marginHorizontal: 5,
              marginVertical: 5,
            }}>
            Project Title
          </Text>
          <TextInput
            placeholder="Enter Your Project title"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.title}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 14,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Tag Project with employment/education
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {projectemployment.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      projectSelectedItem?.project_employment == item?.name
                        ? '#9DCBE2'
                        : Color.white,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    paddingHorizontal: 5,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor:
                      projectSelectedItem?.project_employment == item?.name
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setProjectSelectedItem({
                      title: projectSelectedItem?.title,
                      project_employment: item?.name,
                      project_status: projectSelectedItem?.project_status,
                      duration: {
                        from: projectSelectedItem?.duration?.from,
                        end: projectSelectedItem?.duration?.end,
                      },
                      details: projectSelectedItem?.details,
                      location: projectSelectedItem?.location,
                      site: projectSelectedItem?.site,
                      nature_employment: projectSelectedItem?.nature_employment,
                      team_size: projectSelectedItem?.team_size,
                      role_in_project: projectSelectedItem?.role_in_project,
                      role_description: projectSelectedItem?.role_description,
                      skills: projectSelectedItem?.skills,
                    });
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
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 14,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Tag Project with employment/education
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {projectStatus.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      projectSelectedItem?.project_status == item?.name
                        ? '#9DCBE2'
                        : Color.white,
                    // width: 150,
                    alignItems: 'center',
                    marginVertical: 10,
                    paddingHorizontal: 5,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor:
                      projectSelectedItem?.project_status == item?.name
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setProjectSelectedItem({
                      title: projectSelectedItem?.title,
                      project_employment:
                        projectSelectedItem?.project_employment,
                      project_status: item?.name,
                      duration: {
                        from: projectSelectedItem?.duration?.from,
                        end: projectSelectedItem?.duration?.end,
                      },
                      details: projectSelectedItem?.details,
                      location: projectSelectedItem?.location,
                      site: projectSelectedItem?.site,
                      nature_employment: projectSelectedItem?.nature_employment,
                      team_size: projectSelectedItem?.team_size,
                      role_in_project: projectSelectedItem?.role_in_project,
                      role_description: projectSelectedItem?.role_description,
                      skills: projectSelectedItem?.skills,
                    });
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
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View style={{marginVertical: 10, flex: 1}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.SemiBold,
              }}>
              Worked From
            </Text>
            <TouchableOpacity
              onPress={() => showFromDatePicker()}
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: Color.cloudyGrey,
                borderBottomWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Medium,
                }}>
                {moment(projectSelectedItem?.duration?.from).format(
                  'MMM, YYYY',
                )}
              </Text>
              <FIcon name="calendar" size={20} color={Color.black} />
            </TouchableOpacity>
            <DateTimePickerModal
              date={projectSelectedItem?.duration?.from}
              isVisible={FromdatePickerVisible}
              mode="date"
              onConfirm={handleFromConfirm}
              onCancel={hideFromDatePicker}
            />
          </View>
          <View style={{marginVertical: 10, flex: 1}}>
            <Text
              style={{
                fontSize: 16,
                color: Color.black,
                fontFamily: Gilmer.SemiBold,
              }}>
              Worked Till
            </Text>
            <TouchableOpacity
              onPress={() => showEndDatePicker()}
              style={{
                marginVertical: 10,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                padding: 10,
                flexDirection: 'row',
                alignItems: 'center',
                borderBottomColor: Color.cloudyGrey,
                borderBottomWidth: 1,
                borderRadius: 5,
                marginVertical: 10,
                marginHorizontal: 10,
                paddingHorizontal: 10,
                fontSize: 14,
                color: Color.cloudyGrey,
              }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 14,
                  color: Color.cloudyGrey,
                  fontFamily: Gilmer.Medium,
                }}>
                {moment(projectSelectedItem?.duration?.end).format('MMM, YYYY')}
              </Text>
              <FIcon name="calendar" size={20} color={Color.black} />
            </TouchableOpacity>
            <DateTimePickerModal
              date={projectSelectedItem?.duration?.end}
              isVisible={endDatePickerVisible}
              mode="date"
              onConfirm={handleEndConfirm}
              onCancel={hideEndDatePicker}
            />
          </View>
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            Details of the projects
          </Text>
          <TextInput
            placeholder="Details Of the Project"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.details}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: text,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            Project Location
          </Text>
          <TextInput
            placeholder="Project Location"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.location}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: text,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Project Site
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {projectsite.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      projectSelectedItem?.site == item?.name
                        ? '#9DCBE2'
                        : Color.white,
                    // width: 150,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor:
                      projectSelectedItem?.site == item?.name
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setProjectSelectedItem({
                      title: projectSelectedItem?.title,
                      project_employment:
                        projectSelectedItem?.project_employment,
                      project_status: projectSelectedItem?.project_status,
                      duration: {
                        from: projectSelectedItem?.duration?.from,
                        end: projectSelectedItem?.duration?.end,
                      },
                      details: projectSelectedItem?.details,
                      location: projectSelectedItem?.location,
                      site: item?.name,
                      nature_employment: projectSelectedItem?.nature_employment,
                      team_size: projectSelectedItem?.team_size,
                      role_in_project: projectSelectedItem?.role_in_project,
                      role_description: projectSelectedItem?.role_description,
                      skills: projectSelectedItem?.skills,
                    });
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
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{marginVertical: 10}}>
          <Text
            style={{
              fontFamily: Gilmer.Bold,
              fontSize: 18,
              color: Color.black,
              textTransform: 'capitalize',
              marginHorizontal: 5,
              marginTop: 10,
            }}>
            Nature of employment
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              flexWrap: 'wrap',
            }}>
            {nature_employment.map((item, index) => {
              return (
                <TouchableOpacity
                  key={index}
                  style={{
                    backgroundColor:
                      projectSelectedItem?.nature_employment == item?.name
                        ? '#9DCBE2'
                        : Color.white,
                    // width: 150,
                    paddingHorizontal: 5,
                    alignItems: 'center',
                    marginVertical: 10,
                    justifyContent: 'center',
                    borderRadius: 50,
                    marginHorizontal: 5,
                    borderWidth: 1,
                    borderColor:
                      projectSelectedItem?.nature_employment == item?.name
                        ? '#9DCBE2'
                        : Color.cloudyGrey,
                    flexDirection: 'row',
                  }}
                  onPress={() => {
                    setProjectSelectedItem({
                      title: projectSelectedItem?.title,
                      project_employment:
                        projectSelectedItem?.project_employment,
                      project_status: projectSelectedItem?.project_status,
                      duration: {
                        from: projectSelectedItem?.duration?.from,
                        end: projectSelectedItem?.duration?.end,
                      },
                      details: projectSelectedItem?.details,
                      location: projectSelectedItem?.location,
                      site: projectSelectedItem?.site,
                      nature_employment: item?.name,
                      team_size: projectSelectedItem?.team_size,
                      role_in_project: projectSelectedItem?.role_in_project,
                      role_description: projectSelectedItem?.role_description,
                      skills: projectSelectedItem?.skills,
                    });
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
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            Size of team
          </Text>
          <TextInput
            placeholder="Enter team size"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.team_size}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: text,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            Role of Project
          </Text>
          <TextInput
            placeholder="Enter Role of your Project"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.role_in_project}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: text,
                role_description: projectSelectedItem?.role_description,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            Role Description
          </Text>
          <TextInput
            placeholder="Enter Role Description"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.role_description}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: text,
                skills: projectSelectedItem?.skills,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View style={{marginVertical: 10, flex: 1}}>
          <Text
            style={{
              fontSize: 16,
              color: Color.black,
              fontFamily: Gilmer.SemiBold,
            }}>
            Skills Used
          </Text>
          <TextInput
            placeholder="Enter your Skills used"
            placeholderTextColor={Color.cloudyGrey}
            value={projectSelectedItem?.skills}
            onChangeText={text => {
              setProjectSelectedItem({
                title: projectSelectedItem?.title,
                project_employment: projectSelectedItem?.project_employment,
                project_status: projectSelectedItem?.project_status,
                duration: {
                  from: projectSelectedItem?.duration?.from,
                  end: projectSelectedItem?.duration?.end,
                },
                details: projectSelectedItem?.details,
                location: projectSelectedItem?.location,
                site: projectSelectedItem?.site,
                nature_employment: projectSelectedItem?.nature_employment,
                team_size: projectSelectedItem?.team_size,
                role_in_project: projectSelectedItem?.role_in_project,
                role_description: projectSelectedItem?.role_description,
                skills: text,
              });
            }}
            style={{
              borderBottomColor: Color.cloudyGrey,
              borderBottomWidth: 1,
              borderRadius: 5,
              marginVertical: 10,
              marginHorizontal: 10,
              paddingHorizontal: 10,
              fontSize: 14,
              color: Color.cloudyGrey,
              fontWeight: 'bold',
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'flex-end',
            marginVertical: 30,
          }}>
          <Button
            mode="contained"
            onPress={() => {
              navigation.navigate('Profile');
            }}
            style={{
              backgroundColor: '#DBF3FF',
              color: Color.red,
            }}
            textColor="#000">
            Delete
          </Button>
          <Button
            mode="contained"
            onPress={() => {
              getAPI();
            }}
            style={{
              backgroundColor: Color.primary,
              marginHorizontal: 10,
              alignItems: 'flex-end',
            }}
            textColor={Color.white}>
            Save
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

export default ProjectScreen;
